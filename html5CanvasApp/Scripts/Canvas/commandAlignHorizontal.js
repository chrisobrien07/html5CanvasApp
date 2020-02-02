

function commandAlignHorizontal() {

    
    this.commandName = 'commandAlignHorizontal';
    this.stage = 0;
    this.prompt1 = "Select First Item: Next item will be aligned to this.";
    this.prompt2 = "Select second item to align to first item:";
    this.promptbox = $('#prompt-input');


    this.firstItem = null;
    this.secondItem = null;
    this.start = function (e, app) {
        this.continue(e, app)
        this.stage=0
    }

    this.continue = function (e, app) {
        switch (this.stage) {
            case 0:
                
                for (var i = 0; i < app.states.length; i++) {
                    app.states[i].isSelected = false;                    
                }

                app.draw();

                this.promptbox.val(this.prompt1);
                this.stage++;
                break;
            case 1:
                if (e.handleObj.type == 'click') {
                    var cmdSel = new commandSelect();
                    var tryClickedItem = cmdSel.TrySelect(e, app);

                    if (tryClickedItem.stateName.length > 0) {
                        this.firstItem = tryClickedItem;
                        this.promptbox.val(this.prompt2);
                        this.stage++;                        
                    }
                }
                break;
            case 2:
                if (e.handleObj.type == 'click') {
                    var cmdSel = new commandSelect();
                    var tryClickedItem = cmdSel.TrySelect(e, app);

                    if (tryClickedItem.stateName.length > 0) {
                        this.secondItem = tryClickedItem;
                        this.secondItem.moveTopLeftTo(this.secondItem.left, this.firstItem.top)
                        this.end(app);
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
}