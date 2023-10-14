$(function() {
    $('#create-object').toggle();
    $('#field').on("click", function (e) {
        $('#create-object').toggle().css({
            'left':e.pageX - $('#create-object').width() / 2, 
            'top':e.pageY - $('#create-object').height()
        });
    })
    $("create-object-button").on("click", function () {

    });
});