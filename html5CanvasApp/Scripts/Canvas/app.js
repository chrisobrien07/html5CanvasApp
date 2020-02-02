


//TODO move to the rounded number

//TODO remove transition
//TODO remove state
//TODO export to xml

function app() {

    this.scriptsToLoad = [
        
        '/Scripts/Canvas/point.js',
        '/Scripts/Canvas/state.js',
        '/Scripts/Canvas/transition.js',
        '/Scripts/Canvas/commandAddState.js',
        '/Scripts/Canvas/commandAddTransition.js',
        '/Scripts/Canvas/commandAlignHorizontal.js',
        '/Scripts/Canvas/fncSelect.js',
        '/Scripts/Canvas/commandExportToXML.js'
    ];

    this.canvasElementId = 'canvasOne';
    this.canvasWidth = $('#canvas-container').width();
    this.canvasHeight = "500";
    this.theCanvas = $('#' + this.canvasElementId)[0];
    this.context = null;
    this.commands = [];
    this.currentCommand = null;
    this.states = [];
    this.transitions = [];


    this.init = function () {
        
        //add commands from links
        this.commands['commandAddState'] = new commandAddState();
        this.commands['commandAddTransition'] = new commandAddTransition();
        this.commands['commandAlignHorizontal'] = new commandAlignHorizontal();
        this.commands['commandExportToXML'] = new commandExportToXML();

        this.context = $('#' + this.canvasElementId)[0].getContext("2d");
        $('#' + this.canvasElementId).attr('width', this.canvasWidth);
        $('#' + this.canvasElementId).attr('height', this.canvasHeight);

        if (!this.canvasSupport()) {
            return;
        }

        this.draw();
    };

    this.canvasSupport = function () {
        return Modernizr.canvas;
    };

    this.draw = function () {

        //canvas background
        this.context.fillStyle = "#eee";
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        for (var i = 0; i < this.states.length; i++) {
            this.states[i].draw(this.context);
        }


        for (var i = 0; i < this.transitions.length; i++) {
            this.transitions[i].reAssignLinePoints(this);
            this.transitions[i].draw(this.context);
        }

    }    

    this.findState = function(name){

        for (var i = 0; i < this.states.length; i++) {
            if (this.states[i].stateName == name) {
                return this.states[i];
            }
        }

        //not found
        return null;
    }
}

//////////////////
//End of App
