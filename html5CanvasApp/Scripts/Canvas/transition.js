function transition() {
    this.transitionName = 'Transition Name';

    this.lineWidth = "1";
    this.strokeColour = '#000000';
    this.fontColor = '#000000';
    this.font = "20px Sans-Serif";
    this.textBaseline = "middle";
    this.textAlign = "center";

    this.fromState = null;
    this.toState = null;

    this.fromStateCPIndex = null;
    this.toStateCPIndex = null;

    this.isSelected = false;
    this.linePoints = [];

    this.controlPoints = [];

    this.draw = function (context) {

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.lineCap = 'square';
        context.lineJoin = 'round';
        context.beginPath();

        if (this.isSelected) {
            context.strokeStyle = "#ff00ff";
        }

        for (var i = 0; i < this.linePoints.length; i++) {
            if (i == 0) {
                context.moveTo(this.linePoints[i].X, this.linePoints[i].Y)
            }
            else {
                context.lineTo(this.linePoints[i].X, this.linePoints[i].Y)
            }
        }
        context.stroke();
        context.closePath();


        
    };


    this.reAssignLinePoints = function (app) {
        var fromState = app.findState(this.fromState);
        if (fromState != null) {
            this.linePoints[0] = fromState.controlPoints[this.fromStateCPIndex];
        }

        var toState = app.findState(this.toState);
        if (toState != null) {
            this.linePoints[1] = toState.controlPoints[this.toStateCPIndex];
        }
    }
}