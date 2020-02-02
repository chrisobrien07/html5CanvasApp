

function state() {
    this.stateName = 'State Name';
    this.isInitialState = false;
    this.isFinalState = false;
    this.top = 0;
    this.left = 0;
    this.width = 150;
    this.height = 75;

    this.lineWidth = "1";
    this.strokeColour = '#000000';
    this.fontColor = '#000000';
    this.font = "20px Sans-Serif";
    this.textBaseline = "middle";
    this.textAlign = "center";

    this.background = '#ffffff'

    this.isSelected = false;
    this.controlPoints = [];
    this.controlpointSize = "5"

    this.draw = function (context) {

        
        
        //state box
        context.fillStyle = this.background;
        context.lineWidth = this.lineWidth;
        if (this.isSelected) {
            context.strokeStyle = '#ff00ff';
        }
        else {
            context.strokeStyle = this.strokeColour;
        }

        //shadow
        context.shadowOffsetX = 4;
        context.shadowOffsetY = 4;
        context.shadowColor = 'black';
        context.shadowBlur = 8;
        context.fillRect(this.left, this.top, this.width, this.height);
        context.shadowColor = "transparent";
        context.strokeRect(this.left, this.top, this.width, this.height);
        

        //State name text
        context.fillStyle = this.fontColor;
        context.font = this.font;
        context.textBaseline = this.textBaseline;
        context.textAlign = this.textAlign;
        
        context.fillText(this.stateName, this.left + (this.width / 2), this.top + (this.height / 2));


        if (this.isSelected) {
            //continue to draw control points.
            for (var i = 0; i < this.controlPoints.length; i++) {
                this.drawControlPoint(context, this.controlPoints[i])

            }
        }

        
    };

    this.setControlPoints = function () {
        this.controlPoints[0] = new point(this.left + this.width, this.top);
        this.controlPoints[1] = new point(this.left + this.width, this.top + (this.height / 2));
        this.controlPoints[2] = new point(this.left + this.width, this.top + this.height);
        this.controlPoints[3] = new point(this.left + (this.width / 2), this.top + this.height);
        this.controlPoints[4] = new point(this.left, this.top + this.height);
        this.controlPoints[5] = new point(this.left, (this.top + this.height / 2));
        this.controlPoints[6] = new point(this.left, this.top);
        this.controlPoints[7] = new point(this.left + (this.width / 2), this.top);
    }

    this.moveTopLeftTo = function(ToX,ToY){
        this.left = ToX;
        this.top = ToY;
        this.setControlPoints();
    }

    this.drawControlPoint = function (context, controlPoint) {
        context.fillStyle = "#f0f";
        var dist = this.controlpointSize / 2;
        context.fillRect(controlPoint.X - dist, controlPoint.Y - dist, this.controlpointSize, this.controlpointSize);

    }
}