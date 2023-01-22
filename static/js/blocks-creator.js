
window.addEventListener('load', load_saved_blocks);
window.addEventListener('load', load_pre_made_blocks);

localStorage.setItem("hio_block_data", "");
localStorage.setItem("hio_block_name", "");
localStorage.setItem("hio_selected_block_type", "");

function load_saved_blocks() {
    // Load list of saved blocks
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/load_user_blocks",
        success: function (data) {
            // Display list of saved blocks
            var list = document.getElementById("list-user-blocks");
            list.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement("a");
                li.appendChild(document.createTextNode(data[i]));
                li.setAttribute("onclick", "select_block('" + data[i] + "')");
                li.setAttribute("class", "list-group-item list-group-item-action");
                list.appendChild(li);
            }
        }
    });
}
    
function load_pre_made_blocks() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/load_pre_made_blocks",
        success: function (data) {
            // Display list of saved blocks
            var list = document.getElementById("list-pre-made-blocks");
            list.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement("a");
                li.appendChild(document.createTextNode(data[i]));
                li.setAttribute("onclick", "select_example_block('" + data[i] + "')");
                li.setAttribute("class", "list-group-item list-group-item-action");
                list.appendChild(li);
            }
        }
    });
}

function select_example_block(pre_made_block) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            localStorage.setItem("hio_block_data", data);
            localStorage.setItem("hio_block_name", pre_made_block);
            localStorage.setItem("hio_selected_block_type", "pre_made");
            window.location.href = "http://localhost:8000/yaml_editor";
        }
    };
    xhttp.open("GET", "http://localhost:8000/load_pre_made_blocks_file?name=" + pre_made_block, true);
    xhttp.send();
}

function select_block(block) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            localStorage.setItem("hio_block_data", data);
            localStorage.setItem("hio_block_name", block);
            localStorage.setItem("hio_selected_block_type", "user");
            window.location.href = "http://localhost:8000/yaml_editor";
        }
    };
    xhttp.open("GET", "http://localhost:8000/load_user_blocks_file?name=" + block, true);
    xhttp.send();
}
