window.addEventListener('load', load_saved_projects);
window.addEventListener('load', load_examples);

localStorage.setItem("hio_selected_project", "");

// Load list of strings from external server with AJAX
function load_examples() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var list = document.getElementById("list-example-projects");
      list.innerHTML = "";
      var projects = JSON.parse(this.responseText);
      for (var i = 0; i < projects.length; i++) {
        var li = document.createElement("a");
        li.appendChild(document.createTextNode(projects[i]));
        li.setAttribute("onclick", "select_example('" + projects[i] + "')");
        li.setAttribute("class", "list-group-item list-group-item-action");
        list.appendChild(li);
      }
    }
  };
  xhttp.open("GET", "http://localhost:8000/examples_list", true);
  xhttp.send();
}

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

/**List of the project as clickable list */
function load_saved_projects() {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.length > 0) {
      var list = document.getElementById("list-saved-projects");
      list.innerHTML = "";
      for (var i = 0; i < localStorage.length; i++) {
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
  }
}