 function commandSelect() {

    this.snapToleranceSelect = 5;

    this.TrySelect = function (e, app) {

        var clickX = e.clientX - $('#' + app.canvasElementId).offset().left;
        var clickY = e.clientY - $('#' + app.canvasElementId).offset().top;

        for (var i = 0; i < app.states.length; i++) {

            //shift click to add item to selction set.
            //if(shift was not pressed when clicking){
            app.states[i].isSelected = false;
            //}
            var stateLeft = app.states[i].left;
            var stateTop = app.states[i].top;
            var stateRight = app.states[i].left + parseInt(app.states[i].width);
            var stateBottom = app.states[i].top + parseInt(app.states[i].height);

            if (clickX > stateLeft && clickX < stateRight) {
                if (clickY > stateTop && clickY < stateBottom) {
                    app.states[i].isSelected = true;
                    app.draw();

                    return app.states[i];
                }
            }
        }

        for (var i = 0; i < app.transitions.length; i++) {
            //shift click to add item to selction set.
            //if(shift was not pressed when clicking){
            app.transitions[i].isSelected = false;
            //}
            if (app.context.isPointInStroke(clickX, clickY)){
                app.transitions[i].isSelected = true;
                app.draw();

                return app.transitions[i];
            }

        }

        
    }

    this.trySelectAControlPoint = function (e, app) {
        var clickX = e.clientX - $('#' + app.canvasElementId).offset().left;
        var clickY = e.clientY - $('#' + app.canvasElementId).offset().top;

        //loop through each state
        for (var i = 0; i < app.states.length; i++) {

            //Loop through each control point
            for (var cp = 0; cp < app.states[i].controlPoints.length; cp++) {

                //if click is within snap
                if ((Math.abs(clickX - app.states[i].controlPoints[cp].X) < this.snapToleranceSelect) &&
                    (Math.abs(clickY - app.states[i].controlPoints[cp].Y) < this.snapToleranceSelect)) {
                    return app.states[i].controlPoints[cp];
                }
            }
        }

        return null;
    }

}