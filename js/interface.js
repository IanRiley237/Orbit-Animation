var worker;
var $objects = [];
$(function() {
    createSimulation();
});
function createSimulation() {
    if (typeof(Worker) == "undefined") {
      console.log("No Web Worker support.");
      return;
    }
    if (typeof (worker) == "undefined") {
        worker = new Worker("js/simulator.js");
    }
    worker.onmessage = (event) => {
        switch (event.data[0]) {
            case 'apply':
                event.data.slice(1).forEach(applyObjects)
                worker.postMessage(["continue"]);
                break;
            default:
                break;
        }
    };
}

function killSimulation() {
    if (typeof (worker) == "undefined") {
        return;
    }
    worker.terminate();
    worker = undefined;
}

function applyObjects(object, index) {
    if ($objects[index] != undefined) {
        $("#body" + index).css({
            "left": object.xPos, // TODO: factor in width and height
            "top": object.yPos
        })
    } else {
        $objects.push($("<div></div>"));
        $("#field").append(
            $objects[index].attr("id", "body" + index).attr("class", "body").css({
                "borderRadius": "100%",
                "backgroundColor": object.color,
                "left": object.xPos, // TODO: factor in width and height
                "top": object.yPos,
            })//.draggable()
        );
    }
}

$("#create-defaults-button").on("click", () => {
    worker.postMessage(["default"]);
});

$("#reset-simulation-button").on("click", () => {
    killSimulation();
    createSimulation();
    $objects.forEach(element => {
        element.remove();
    });
    $objects = [];
});

$("#play-simulation-button").on("click", () => {
    worker.postMessage(["play"]);
});

$("#pause-simulation-button").on("click", () => {
    worker.postMessage(["pause"]);
});


$('#field').on("click", (e) => {
    $('#create-object').toggle().css({
        'left':e.pageX - $('#create-object').width() / 2, 
        'top':e.pageY - $('#create-object').height()
    });
    $("#create-object-x:text").val(e.pageX);
    $("#create-object-y:text").val(e.pageY);
})

$("#create-object-button").on("click", () => {
    $('#create-object').toggle();
    let xPos = parseFloat($("#create-object-x:text").val() || 0);
    let yPos = parseFloat($("#create-object-y:text").val() || 0);
    let xVel = parseFloat($("#create-object-dx:text").val() / 10000 || 0);
    let yVel = parseFloat($("#create-object-dy:text").val() / 10000 || 0);
    var color = $("#color-input").val();
    worker.postMessage([
        "object",
        [xPos, yPos, xVel, yVel, 2, 1, color]]);
});

$("#resolutionInput").on("change", () => {
    worker.postMessage([
        "resolution",
        9999 - $("#resolutionInput").val() || '0']);
});