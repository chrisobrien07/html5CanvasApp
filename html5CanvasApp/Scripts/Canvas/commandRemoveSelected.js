

function commandRemoveSelected() {
    this.commandName = 'commandReoveSelected';
    this.newstate = null;
    this.stage = 0;
    this.prompt99 = "Nothing Selected, cancelling command.";
    
    this.promptbox = $('#prompt-input');

    

    this.start = function (e, app) {
        for (var i = 0; i < app.states.length; i++) {
            if (app.states[i].isSelected) {
                app.states[i].splice(i, 1);
                i--;
            }
        }

        for (var i = 0; i < app.transitions.length; i++) {
            if (app.transitions[i].isSelected) {
                app.transitions[i].splice(i, 1);
                i--;
            }
        }


        this.end(app);
    }

    this.end = function (app) {
        app.currentCommand = null;
        $('#curr-cmd').text('');
        $('#prompt-input').val('Next Command:');

        var statesstr = ' :: ';
        $.each(app.states, function (key, value) {
            statesstr += value.stateName + ' :: '
        });
        $('#state-list').text(statesstr);
        app.draw();
    }



}