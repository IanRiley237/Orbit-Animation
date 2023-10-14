$(function() {
    $("#reset-simulation-button").on("click", function () {
        celestialObjects = [];
        clear();
        pause();
    });
    $("#create-defaults-button").on("click", function () {
        celestialObjects.push(...createDefaultCelestialObjects());
    });
    $("#play-simulation-button").on("click", function () {
        play();
    });
    $("#pause-simulation-button").on("click", function () {
        pause();
    });

    $('#create-object').toggle();
    $('#field').on("click", function (e) {
        $('#create-object').toggle().css({
            'left':e.pageX - $('#create-object').width() / 2, 
            'top':e.pageY - $('#create-object').height()
        });
        $("#create-object-x:text").val(e.pageX);
        $("#create-object-y:text").val(e.pageY);
    })
    $("#create-object-button").on("click", function () {
        $('#create-object').toggle();
        var pos = new Vector();
        pos[0] = parseFloat($("#create-object-x:text").val());
        pos[1] = parseFloat($("#create-object-y:text").val());
        var vel = new Vector();
        vel[0] = parseFloat($("#create-object-dx:text").val());
        vel[1] = parseFloat($("#create-object-dy:text").val());
        var color = $("#color-input").val();
        celestialObjects.push(createObject(pos, vel, 2, color));
    });
});
