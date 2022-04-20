$(document).ready(function() {
    $("#list_btn").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/list",
            success: function(result) {
                var json = JSON.parse(result);
                var output = "";
                for (var i in json) {
                    output += i + ": " + json[i] + "<br>";
                }
                $("#ajax-zone").html(output);
            },
            error: function(result) {
                alert('error');
            }
        });
    });

    $("#search_form").on("submit", function(e) {
        e.preventDefault();
        var form_data = $(this).serializeArray();
        console.log(form_data)
        $.ajax({
            type: "POST",
            url: "./search",
            data: form_data,
            success: function(result) {
                $("#ajax-zone").html(result);
            }
        });
    });

    $("#add_form").on("submit", function(e) {
        e.preventDefault();
        var form_data = $(this).serializeArray();
        console.log(form_data)
        $.ajax({
            type: "POST",
            url: "./add",
            data: form_data,
            success: function(result) {
                var json = JSON.parse(result);
                var output = "";
                for (var i in json) {
                    output += i + ": " + json[i] + "<br>";
                }
                $("#ajax-zone").html(output);
            }
        });
    });

    $("#delete_form").on("submit", function(e) {
        e.preventDefault();
        var form_data = $(this).serializeArray();
        console.log(form_data)
        $.ajax({
            type: "POST",
            url: "./delete",
            data: form_data,
            success: function(result) {
                var json = JSON.parse(result);
                var output = "";
                for (var i in json) {
                    output += i + ": " + json[i] + "<br>";
                }
                $("#ajax-zone").html(output);
            }
        });
    });
});