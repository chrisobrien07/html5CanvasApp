
function commandAddTransition() {
    this.commandName = 'commandAddTransition';
    this.newTransition = null;
    this.stage = 0;
    this.prompt1 = "Select control point on state transitioning from:";
    this.prompt2 = "Select control point on state transitioning to:";
    this.prompt99 = "your click was not close enough to a control point";

    this.fromPoint = null;
    this.toPoint = null;

    this.clickTolerance = 5;

    this.promptbox = $('#prompt-input');

    this.endEvent = new Event('commandEnd');

    this.start = function (e, app) {
        this.continue(e, app)
    }

    this.continue = function (e, app) {
        switch (this.stage) {
            case 0:
                this.newTransition = new transition();
                this.promptbox.val(this.prompt1);
                this.stage++;
                break;
            case 1:
                if (e.handleObj.type == 'click') {
                    var trySucces = false;

                    trySucces = this.tryAssignState(e, app);
                        
                    if (trySucces) {
                        this.promptbox.val(this.prompt2);
                        this.stage++;
                    }
                    else {
                        this.promptbox.val(this.prompt99);
                    }
                }
                break;

            case 2:
                if (e.handleObj.type == 'click') {
                    var trySucces = false;

                    trySucces = this.tryAssignState(e, app);

                    if (trySucces) {
                        this.newTransition.reAssignLinePoints(app);
                        app.transitions.push(Object.create(this.newTransition));


                        this.end(app);
                    }
                    else {
                        this.promptbox.val(this.prompt99);
                    }
                }                
                break;
        }
    }

    this.end = function (app) {
        this.stage = 0
        app.currentCommand = null;
        $('#curr-cmd').text('');
        $('#prompt-input').val('Next Command:');
        app.draw();
    }

    this.tryAssignState = function (e, app) {
        //is click within tolerance
        var clickX = e.clientX - $('#' + app.canvasElementId).offset().left;
        var clickY = e.clientY - $('#' + app.canvasElementId).offset().top;

        //loop through each state
        for (var i = 0; i < app.states.length; i++) {
            //loop through each control point in each state
            for (var cp = 0; cp < app.states[i].controlPoints.length; cp++) {
                if ((Math.abs(clickX - app.states[i].controlPoints[cp].X) < this.clickTolerance) && (Math.abs(clickY - app.states[i].controlPoints[cp].Y) < this.clickTolerance)) {
                    
                    if (this.stage == 1) {
                        this.newTransition.fromState = app.states[i].stateName;
                        this.newTransition.fromStateCPIndex = cp;
                    }

                    if (this.stage == 2) {
                        this.newTransition.toState = app.states[i].stateName;
                        this.newTransition.toStateCPIndex = cp;
                    }

                    //TODO: add logic to add path data using an algorythm
                    return true
                }
            }
        }

        //click was not near enough to a control point
        return false;
    }





}