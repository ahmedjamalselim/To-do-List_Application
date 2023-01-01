// selectors
let submit = document.querySelector(".submit");
let inputField = document.querySelector(".input-field");
let tasks = document.querySelector(".tasks");
let erase = document.querySelector(".delete-all");

// variables
let myArr = [];

// running the submit button with enter button on the keyboard
window.onkeyup = function (e) {
  if (e.key == "Enter") {
    submit.click();
  }
};

// adding element to the array from the local storage
if (localStorage.getItem("task")) {
  myArr = JSON.parse(localStorage.getItem("task"));
}

LStorageGetter();

// running code
window.onload = function () {
  inputField.focus();
};

submit.onclick = function () {
  if (inputField.value !== "") {
    addElementToArray(inputField.value);
    inputField.value = "";
  }
};

// delete element from the page
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();

    //remove from local storage
    LSremoveTask(e.target.parentElement.getAttribute("data-id"));
  }

  //check done or not in the status of the task
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");

    // toggle done in the local storage
    LStaskDone(e.target.getAttribute("data-id"));
  }
});

// delete all thing

erase.onclick = function () {
  tasks.innerHTML = "";
  window.localStorage.removeItem("task");
};

// functions
function addElementToArray(ele) {
  const task = {
    id: Date.now(),
    title: ele,
    done: false,
  };

  myArr.push(task);

  addTaskToThePage(myArr);
}

function addTaskToThePage(myArr) {
  tasks.innerHTML = "";

  myArr.forEach((task) => {
    let myDiv = document.createElement("div");
    myDiv.className = "task";
    myDiv.setAttribute("data-id", task.id);
    myDiv.appendChild(document.createTextNode(task.title));

    if (task.done) {
      myDiv.className = "task done";
    }

    let mySpan = document.createElement("span");
    mySpan.className = "delete rounded-pill";
    mySpan.appendChild(document.createTextNode("Delete"));

    myDiv.appendChild(mySpan);

    tasks.appendChild(myDiv);
  });

  LStorageSaver(myArr);
}

//add tasks to local storage
function LStorageSaver(myArr) {
  window.localStorage.setItem("task", JSON.stringify(myArr));
}

//get tasks from local storage
function LStorageGetter() {
  if (window.localStorage.getItem("task")) {
    let tasks = JSON.parse(localStorage.getItem("task"));
    addTaskToThePage(tasks);
  }
}

// remove element from the local storage
function LSremoveTask(taskId) {
  myArr = myArr.filter((task) => task.id != taskId);
  LStorageSaver(myArr);
}

// refer as done in the local storage
function LStaskDone(taskId) {
  for (let i = 0; i < myArr.length; i++) {
    if (myArr[i].id == taskId) {
      myArr[i].done == false ? (myArr[i].done = true) : (myArr[i].done = false);
    }
  }
  LStorageSaver(myArr);
}
