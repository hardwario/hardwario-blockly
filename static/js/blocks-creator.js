
window.addEventListener('load', load_saved_blocks);
window.addEventListener('load', load_pre_made_blocks);
window.addEventListener('load', set_form);

function set_form() {
    createModuleBlock = document.getElementById("createModuleBlock");

    createModuleBlock.addEventListener("submit", (event) => {
        // Ask user for name of the block
        event.preventDefault();
        const name = createModuleBlock.elements["name"].value;
        if (name == null || name == "") {
            document.querySelector(".name-error").innerHTML = "Please enter a module name";
            document.querySelector(".name-error").style.display = "block";
        }
        else {
            // Check if the block already exists
            if (user_blocks_list.includes(name)) {
                document.querySelector(".name-error").innerHTML = "Module already exists";
                document.querySelector(".name-error").style.display = "block";
            }
            else {
                // Create the block
                window.location.href = "/yaml_editor?user_block=" + name + '.yml';
            }
        }
    });
}

function load_saved_blocks() {
    // Load list of saved blocks
    var list = document.getElementById("list-user-blocks");
    list.innerHTML = "";
    for (var i = 0; i < user_blocks_list.length; i++) {
        // List item with delete button in another column on the same line
        var li = document.createElement("div");
        li.setAttribute("class", "row");

        var col = document.createElement("div");
        col.setAttribute("class", "col-sm-10");

        var li_name = document.createElement("a");
        li_name.appendChild(document.createTextNode(user_blocks_list[i]));
        li_name.setAttribute("onclick", "select_user_block('" + user_blocks_list[i] + "')");
        li_name.setAttribute("class", "list-group-item list-group-item-action col-10");
        col.appendChild(li_name);
        li.appendChild(col);

        var col2 = document.createElement("div");
        col2.setAttribute("class", "col-sm-2");

        var li_delete = document.createElement("button");
        li_delete.appendChild(document.createTextNode("Delete"));
        li_delete.setAttribute("onclick", "delete_user_block('" + user_blocks_list[i] + "')");
        li_delete.setAttribute("class", "btn btn-danger");
        col2.appendChild(li_delete);
        li.appendChild(col2);

        list.appendChild(li);
    }
}

function delete_user_block(name) {
    // Send request to delete the block with ajax
    $.ajax({
        url: "/delete_user_block",
        type: "GET",
        data: { name: name },
        success: function (data) {
            // Reload the list of projects
            window.location.href = "/blocks_creator";
        }
    });
}

function load_pre_made_blocks() {
    var list = document.getElementById("list-pre-made-blocks");
    list.innerHTML = "";
    for (var i = 0; i < pre_made_blocks_list.length; i++) {
        var li = document.createElement("a");
        li.appendChild(document.createTextNode(pre_made_blocks_list[i]));
        li.setAttribute("onclick", "select_pre_made_block('" + pre_made_blocks_list[i] + "')");
        li.setAttribute("class", "list-group-item list-group-item-action");
        list.appendChild(li);
    }
}

function select_pre_made_block(name) {
    window.location.href = "/yaml_editor?pre_made_block=" + name;
}

function select_user_block(name) {
    window.location.href = "/yaml_editor?user_block=" + name;
}

function open_user_folder() {
    $.ajax({
        url: "/open_user_folder",
        type: "GET",
        success: function (data) {
            console.log("User folder opened");
        }
    });
}