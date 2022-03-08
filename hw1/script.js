$(document).ready(function() {
    // fade in fade out
    // https://www.w3schools.com/jquery/eff_fadeout.asp
    var fadeInTime = 500;
    var fadeOutTime = 500;
    $("#upload_icon").click(function() {
        /* hide */
        $("#box").fadeOut(fadeOutTime);
        $("#upload_icon").fadeOut(fadeOutTime);
        $("#rotating_text").fadeOut(fadeOutTime);
        /* show */
        $("#box2").show();
        $("#rotating_ray").fadeIn(fadeInTime);
    });
});