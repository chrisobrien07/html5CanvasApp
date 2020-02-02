function loadAppScripts(i, app) {

    if (i < app.scriptsToLoad.length) {

        var fullPathName = app.scriptsToLoad[i];

        //alert(i + '-' + fullPathName);

        $.ajax({
            url: fullPathName,
            dataType: 'script',
            async: true,
            error: function (requestObject, error, errorThrown) {
                alert(error);
                alert(errorThrown);
            },
            success: function () {
                i++;
                if (i < app.scriptsToLoad.length) {
                    loadAppScripts(i, app);
                }
                else {
                    app.init();
                }
            }
        });
    }
}

$(document).ready(function () {
    var appInstance;


    appInstance = new app();
    appInstance.init();

    //$.getScript('/Scripts/Canvas/app.js').done(function (response, status) {
    //    if (status == 'success') {
    //        appInstance = new app();
    //        loadAppScripts(0, appInstance);
    //    }
    //});


    $('#toolshelf-list > li').on('click', function (e) {
        var commandName = $(this).attr('data-command-name');
        var cmd = appInstance.commands[commandName];
        appInstance.currentCommand = cmd;
        $('#curr-cmd').text(commandName.substr(7).replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); }));
        $('#prompt-input').focus()
        appInstance.currentCommand.start(e, appInstance);
    });

    //$('#prompt-input').on('focus', function (e) {
    //    if (appInstance.currentCommand != null) {
    //        $(this).val('').attr('placeholder', 'state name');
    //    }
    //});

    $('#prompt-input').on('keypress', function (e) {
        if (e.keyCode == 'Escape') {
            appInstance.currentCommand.end(appInstance);
        }
    });

    $('#prompt-input').on('keypress', function (e) {
        if (e.keyCode == 13) {
            appInstance.currentCommand.continue(e, appInstance);
        }
    });

    $('#canvasOne').on('click', function (e) {

        if (appInstance.currentCommand == undefined || appInstance.currentCommand == null) {
            //send click to the select comamand
            var cmdSel = new commandSelect();
            cmdSel.TrySelect(e, appInstance);
        }
        else {
            appInstance.currentCommand.continue(e, appInstance);
        }
    });

    $(document).on('mousemove', function (e) {
        $('#mouse-pos').text('mouse x:' + e.pageX + ', y:' + e.pageY);
    });


    var isDragging = false;
    var initX;
    var initY;
    var mouseX
    var mouseY;
    var deltaX;
    var deltaY;

    //TODO: Move to app settings
    var snapVal=5

    //TODO: tidy the following up for snaps etc.
    $("#canvasOne").mousedown(function (e) {
        isDragging = true;
        initX = e.pageX - $("#canvasOne")[0].getBoundingClientRect().left;
        initY = e.pageY - $("#canvasOne")[0].getBoundingClientRect().top;

    })
        .mousemove(function (e) {
            if (isDragging) {

                mouseX = e.pageX - $("#canvasOne")[0].getBoundingClientRect().left;
                mouseY = e.pageY - $("#canvasOne")[0].getBoundingClientRect().top;

                //try move selected
                for (var i = 0; i < appInstance.states.length; i++) {
                    if (appInstance.states[i].isSelected) {

                        deltaX = mouseX - initX;
                        deltaY = mouseY - initY;

                        if (Math.abs(deltaX) > snapVal || Math.abs(deltaY) > snapVal) {
                            appInstance.states[i].moveTopLeftTo(appInstance.states[i].left + deltaX, appInstance.states[i].top + deltaY);
                            initX = mouseX;
                            initY = mouseY;
                        }



                    }
                }
                for (var i = 0; i < appInstance.transitions.length; i++) {
                    appInstance.transitions[i].reAssignLinePoints(appInstance);
                }
                appInstance.draw();
            }

        })
        .mouseup(function (e) {
            isDragging = false;
        });
});