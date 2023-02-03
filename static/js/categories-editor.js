
window.addEventListener('load', load);

function save() {
    // Get contents of div with id editor
    var contents = editor.getValue();

    // Send YAML to the server
    $.ajax({
        type: "POST",
        url: "/save_categories",
        data: {
            data: contents
        },
        success: function (data) {
            // Display success message
            var message = document.getElementById("message");
            message.innerHTML = "Saved";
            setTimeout(function () {
                message.innerHTML = "";
            }

            , 2000);
        }
    });  
}

function load() {
    // Load YAML from the server
    $.ajax({
        type: "GET",
        url: "/load_categories",
        success: function (data) {
            // Display YAML in the editor
            editor.setValue(data);
        }
    });
}