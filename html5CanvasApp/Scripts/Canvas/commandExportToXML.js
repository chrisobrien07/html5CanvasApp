function commandExportToXML() {


    this.doc = document.implementation.createDocument("http://www.sormasys.com","smsys",null)
    this.DiagramElementsNode = document.createElement('diagramElements');
    this.start = function (e, app) {

        this.doc.documentElement.appendChild(this.DiagramElementsNode);
        this.writeStates(app);
        this.writeTransitions(app);
        alert(this.doc);
    }



    this.writeStates = function(app){

        var statesElement = document.createElement("states");
        var currentStateElement = null;
        if (app.states != undefined) {
            for (var i = 0; i < app.states.length; i++) {

                currentStateElement = document.createElement('state');
                currentStateElement.setAttribute('stateName', app.states[i].stateName);
                currentStateElement.setAttribute('left', app.states[i].left);
                currentStateElement.setAttribute('top', app.states[i].top);
                currentStateElement.setAttribute('isInitialState', app.states[i].isInitialState);
                currentStateElement.setAttribute('isFinalState', app.states[i].isFinalState);
                statesElement.appendChild(currentStateElement);
            }
        }
        this.DiagramElementsNode.appendChild(statesElement);
    }


    this.writeTransitions = function (app) {
        var transitionsElement = document.createElement("transitions");
        var currentTransElement = null;
        if (app.trasitions != undefined) {
            for (var i = 0; i < app.trasitions.length; i++) {
                currentTransElement = document.createElement('transition');
                currentStateElement.setAttribute('transitionName', app.transitions[i].transitionName);
                currentStateElement.setAttribute('fromState', app.transitions[i].fromState);
                currentStateElement.setAttribute('toState', app.transitions[i].toState);
                currentStateElement.setAttribute('fromStateCPIndex', app.transitions[i].fromStateCPIndex);
                currentStateElement.setAttribute('toStateCPIndex', app.transitions[i].toStateCPIndex);
                currentStateElement.setAttribute('linepoints', app.transitions[i].linePoints.join("::"));
                transitionsElement.appendChild(currentTransElement);
            }
        }

        this.DiagramElementsNode.appendChild(transitionsElement);

    }



}