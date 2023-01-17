window.addEventListener('load', load_saved_projects);
window.addEventListener('load', load_examples);

// Load list of strings from external server with AJAX
function load_examples() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var list = document.getElementById("list-example-projects");
            list.innerHTML = "";
            var projects = JSON.parse(this.responseText);
            for (var i = 0; i < projects.length; i++) {
                var li = document.createElement("a");
                li.appendChild(document.createTextNode(projects[i]));
                //li.setAttribute("onclick", "loadProject('" + projects[i] + "')");
                li.setAttribute("class", "list-group-item list-group-item-action");
                list.appendChild(li);
            }
        }
    };
    xhttp.open("GET", "http://localhost:3000/examples_list", true);
    xhttp.send();
}

/**List of the project as clickable list */
function load_saved_projects() {
    if (typeof (Storage) !== "undefined") {
      if (localStorage.length > 0) {
        var list = document.getElementById("list-saved-projects");
        list.innerHTML = "";
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if(key.startsWith("hio_project_"))
          {
            var li = document.createElement("a");
            li.appendChild(document.createTextNode(key.slice("hio_project_".length)));
            //li.setAttribute("onclick", "loadProject('" + key + "')");
            li.setAttribute("class", "list-group-item list-group-item-action");
            list.appendChild(li);  
          }
        }
      }
    }
  }