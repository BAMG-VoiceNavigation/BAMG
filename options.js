// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("language");
  var language = select.children[select.selectedIndex].value;
  localStorage["rec_language"] = language;

  select = document.getElementById("rec_start");
  var rec_start = select.children[select.selectedIndex].value;
  localStorage["rec_start"] = rec_start;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}


// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["rec_language"];

  var select = document.getElementById("language");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
  favorite = localStorage["rec_start"];
  if (!favorite) {
    return;
  }
  select = document.getElementById("rec_start");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options)