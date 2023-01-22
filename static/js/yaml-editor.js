window.addEventListener('load', load);

function save() {
    // Get contents of div with id editor
    var contents = editor.getValue();

    if(localStorage.getItem("hio_selected_block_type") == "pre_made") {
        var url = "http://localhost:8000/save_pre_made_blocks";
    } else {
        var url = "http://localhost:8000/save_user_blocks";
    }

    // Send YAML to the server
    $.ajax({
        type: "POST",
        url: url,
        data: {
            data: contents,
            name: localStorage.getItem("hio_block_name")
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
    editor.setValue(localStorage.getItem("hio_block_data"));
    document.getElementById("block-name").innerHTML = localStorage.getItem("hio_block_name");
}
