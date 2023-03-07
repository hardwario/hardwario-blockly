window.addEventListener('load', load_user_projects);
window.addEventListener('load', load_examples);
window.addEventListener('load', set_form);

localStorage.setItem("hio_selected_project", "");

var createProjectForm = null;

function set_form() {
  createProjectForm = document.getElementById("createProjectForm");

  createProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = createProjectForm.elements["name"].value;
  
    // Ask user for name of the project
    if (name == null || name == "") {
      alert("Name of the project cannot be empty");
    }
    else {
      // Check if the project already exists
      if (user_projects_list.includes(name)) {
        alert("Project already exists");
      }
      else {
        // Create the project
        window.location.href = "/blocks_editor?project=" + name;
      }
    }
  });
}

function select_example(name) {
  window.location.href = "/blocks_editor?example=" + name;
}

function select_project(name) {
  window.location.href = "/blocks_editor?project=" + name;
}

function delete_project(name) {
  var r = confirm("Are you sure you want to delete the project " + name + "?");
  if (r == true) {
    // Send request to delete the project with ajax
    $.ajax({
      url: "/delete_project",
      type: "GET",
      data: { project: name },
      success: function (data) {
        // Reload the list of projects
        window.location.href = "/";
      }
    });
  }
}

function new_project() {
  // Ask user for name of the project
  var name = prompt("Please enter the name of the project", "My project");
  if (name == null || name == "") {
    alert("Name of the project cannot be empty");
  }
  else {
    // Check if the project already exists
    if (user_projects_list.includes(name)) {
      alert("Project already exists");
    }
    else {
      // Create the project
      window.location.href = "/blocks_editor?project=" + name;
    }
  }
}

function load_examples() {
  var list = document.getElementById("list-example-projects");
  list.innerHTML = "";
  for (var i = 0; i < examples_list.length; i++) {
    var li = document.createElement("a");
    li.appendChild(document.createTextNode(examples_list[i]));
    li.setAttribute("onclick", "select_example('" + examples_list[i] + "')");
    li.setAttribute("class", "list-group-item list-group-item-action");
    list.appendChild(li);
  }
}

/**List of the project as clickable list */
function load_user_projects() {
  var list = document.getElementById("list-user-projects");
  list.innerHTML = "";
  for (var i = 0; i < user_projects_list.length; i++) {
    // List item with delete button in another column on the same line
    var li = document.createElement("div");
    li.setAttribute("class", "row");

    var col = document.createElement("div");
    col.setAttribute("class", "col-sm-10");

    var li_name = document.createElement("a");
    li_name.appendChild(document.createTextNode(user_projects_list[i]));
    li_name.setAttribute("onclick", "select_project('" + user_projects_list[i] + "')");
    li_name.setAttribute("class", "list-group-item list-group-item-action col-10");
    col.appendChild(li_name);
    li.appendChild(col);

    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-sm-2");

    var li_delete = document.createElement("button");
    li_delete.appendChild(document.createTextNode("Delete"));
    li_delete.setAttribute("onclick", "delete_project('" + user_projects_list[i] + "')");
    li_delete.setAttribute("class", "btn btn-danger col-2");
    col2.appendChild(li_delete);
    li.appendChild(col2);

    list.appendChild(li);
  }
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