

function commandAddState() {
    this.commandName = 'commandAddState';
    this.newstate = null;
    this.stage = 0;
    this.prompt1 = "Enter the new state name:";
    this.prompt2 = "select the new states position on the canvas:";
    this.promptbox = $('#prompt-input');

    this.endEvent = new Event('commandEnd');

    this.start = function(e,app){
        this.continue(e,app)
    }

    this.continue = function (e, app) {
        switch (this.stage) {
            case 0:
                this.newstate = new state();
                this.promptbox.val(this.prompt1);
                this.stage++;
                break;

            case 1:
                if (e.handleObj.type == 'keypress') {
                    this.newstate.stateName = $('#prompt-input').val().substr(this.prompt1.length)
                    this.promptbox.val(this.prompt2);
                    this.stage++;
                }
                break;

            case 2:
                this.newstate.left = e.clientX - $('#' + app.canvasElementId).offset().left - (this.newstate.width/2);
                this.newstate.top = e.clientY - $('#' + app.canvasElementId).offset().top - (this.newstate.height / 2);
                this.newstate.setControlPoints();
                app.states.push(Object.create(this.newstate));
                this.end(app);
                break;
        }
    };



    this.end = function (app) {
        this.stage = 0
        app.currentCommand = null;
        $('#curr-cmd').text('');
        $('#prompt-input').val('Next Command:');

        var statesstr = ' :: ';
        $.each(app.states, function (key,value) {
            statesstr += value.stateName + ' :: '
        });
        $('#state-list').text(statesstr);
        app.draw();
    }



}