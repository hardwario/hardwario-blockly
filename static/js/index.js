window.addEventListener('load', load_user_projects);
window.addEventListener('load', load_examples);

localStorage.setItem("hio_selected_project", "");

function select_example(example) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = this.responseText;
      localStorage.setItem("hio_selected_project", data);
      window.location.href = "http://localhost:8000/blocks_editor";
    }
  };
  xhttp.open("GET", "http://localhost:8000/get_example?example=" + example, true);
  xhttp.send();
}

function select_project(key) {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.length > 0) {
      var data = localStorage.getItem(key);
      localStorage.setItem("hio_selected_project", data);
      window.location.href = "http://localhost:8000/blocks_editor";
    }
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
      window.location.href = "http://localhost:8000/blocks_editor?project=" + name;
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
    var li = document.createElement("a");
    li.appendChild(document.createTextNode(user_projects_list[i]));
    li.setAttribute("onclick", "select_project('" + user_projects_list[i] + "')");
    li.setAttribute("class", "list-group-item list-group-item-action");
    list.appendChild(li);
  }
  /*if (typeof (Storage) !== "undefined") {
    if (localStorage.length > 0) {
      var list = document.getElementById("list-user-projects");
      list.innerHTML = "";
      for (var i = 0; i < user_projects_list.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("hio_project_")) {
          var li = document.createElement("a");
          li.appendChild(document.createTextNode(key.slice("hio_project_".length)));
          li.setAttribute("onclick", "select_project('" + key + "')");
          li.setAttribute("class", "list-group-item list-group-item-action");
          list.appendChild(li);
        }
      }
    }
  }*/
}