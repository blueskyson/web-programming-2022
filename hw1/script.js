// Check if browsers supports features we need.
// This is an IIFE, see https://stackabuse.com/javascripts-immediately-invoked-function-expressions
var isAdvancedUpload = function() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window && 'FileReader' in window;
}();

$(document).ready(function() {
    var fadeInTime = 500;
    var fadeOutTime = 500;
    var item_name = ''; // 酷酷的東西

    // switch between landing_pages 
    // https://www.w3schools.com/jquery/eff_fadeout.asp
    function goto_landing_page_01() {
        $('.landing_page_02').fadeOut(fadeOutTime);
        $('.landing_page_01').fadeIn(fadeInTime);
    }

    function goto_landing_page_02() {
        $('.landing_page_01').fadeOut(fadeOutTime);
        $('.landing_page_02').fadeIn(fadeInTime);
    }

    // FIXME: try to call functions one after another 
    //        without using setTimeout()
    function goto_landing_page_03() {
        $('.landing_page_02').fadeOut(fadeOutTime);
        $('.landing_page_03 > .left_panel').fadeIn(fadeInTime);
        setTimeout(function() {
            $('#box3').animate({ 'left': '25%' }, fadeInTime);
            $('#my_item').animate({ 'left': '25%' }, fadeInTime);
            $('.landing_page_03 > .right_panel').fadeIn(fadeInTime);
        }, fadeInTime);
    }

    // FIXME: try to call functions one after another 
    //        without using setTimeout()
    function goto_landing_page_04() {
        $('.landing_page_03 > .right_panel').fadeOut(fadeOutTime);
        setTimeout(function() {
            $('.landing_page_04 > .left_panel').fadeIn(fadeInTime);
            $('#exchange_icon, .landing_page_04 > .right_panel').fadeIn(fadeInTime);
        }, fadeOutTime);
        setTimeout(function() {
            $('.landing_page_03 > .left_panel').hide();
        }, fadeOutTime * 2);
    }

    // handle dragging files
    if (isAdvancedUpload) {
        // drag a file to go to landing_page_02
        // https://codepen.io/anastasialanz/pen/KdxxJx
        $('.dropzone').on('dragenter', goto_landing_page_02);

        // go back to landing_page_01 if file leaves
        $('.dropzone_box2').on('dragleave', goto_landing_page_01);

        // go to landing_page_03 if file dropped
        // https://codepen.io/hiralbest/pen/zKyVZW
        $('.dropzone_box2').on('dragover', function(e) {
            e.preventDefault();
        });

        $('.dropzone_box2').on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goto_landing_page_03();
        });
    }

    // click upload_icon to go to landing_page_03
    $('#upload_icon').click(function() {
        setTimeout(goto_landing_page_02, 0);
        setTimeout(goto_landing_page_03, fadeInTime);
    });

    // give item a name and go to landing_page_04
    $('#item_name_form > button').on('click', function(e) {
        e.preventDefault();
        item_name = $("#item_name_form > input").val();
        if (item_name == '') {
            item_name = $("#item_name_form > input").attr('placeholder');
        }
        $('#item_name_h1').text(item_name);
        goto_landing_page_04();
    });

    // scroll to select item to exchange
    // https://codepen.io/azizn/pen/GZdXbO
    var scroll_box_offset = 51;
    var urls = [
        "url(./res/item/04.png)",
        "url(./res/item/03.png)",
        "url(./res/item/02.png)",
        "url(./res/item/01.png)",
        "url(./res/item/05.png)",
    ]
    var mid_url_index = 2;
    $('.scroll_zone').on('mousewheel wheel', function(e) {
        if (e.originalEvent.wheelDelta / 120 > 0) { // scroll up event
            if (mid_url_index == 5) {
                mid_url_index = 0;
            } else {
                mid_url_index += 1;
            }
        } else { // scroll down event
            if (mid_url_index == 0) {
                mid_url_index = 5;
            } else {
                mid_url_index -= 1;
            }
        }
        $('#scroll_top').css("background-image", urls[mid_url_index - 1]);
        $('#scroll_mid').css("background-image", urls[mid_url_index]);
        $('#scroll_bot').css("background-image", urls[mid_url_index + 1]);
    });
});