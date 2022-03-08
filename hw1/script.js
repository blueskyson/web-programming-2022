// Check if browsers supports features we need.
// This is an IIFE, see https://stackabuse.com/javascripts-immediately-invoked-function-expressions
var isAdvancedUpload = function() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window && 'FileReader' in window;
}();

$(document).ready(function() {
    // Enumeration of all landing page
    const landing_page_01 = 1;
    const landing_page_02 = 2;
    const landing_page_03 = 3;

    var current_page = landing_page_01;
    var fadeInTime = 500;
    var fadeOutTime = 500;

    // switch between landing page 01 and 02 
    // https://www.w3schools.com/jquery/eff_fadeout.asp
    function goto_landing_page_02() {
        $(".landing_page_01").fadeOut(fadeOutTime);
        $(".landing_page_02").fadeIn(fadeInTime);
        current_page = landing_page_02;
    }

    function goto_landing_page_01() {
        $(".landing_page_02").fadeOut(fadeOutTime);
        $(".landing_page_01").fadeIn(fadeInTime);
        current_page = landing_page_01;
    }

    // click upload_icon to go to landing page 02
    $("#upload_icon").click(goto_landing_page_02);

    // drag a file to go to landing page 02
    // https://codepen.io/anastasialanz/pen/KdxxJx
    if (isAdvancedUpload) {
        $('.dropzone').on('dragenter', function() {
            if (current_page == landing_page_01) {
                goto_landing_page_02();
            }
        });
        $('.dropzone_box2').on('dragleave', function() {
            if (current_page == landing_page_02) {
                goto_landing_page_01();
            }
        });
    }
});