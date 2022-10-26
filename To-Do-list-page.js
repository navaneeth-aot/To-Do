let addButton = document.getElementById("addTask");
let editbtn =  document.getElementById("edit");
let clearCompleted = document.getElementById("clearCompleted");
let searchbtn = document.getElementById("searchbtn");

let tasks = document.getElementById("tasks");
let titleOfTask = document.getElementById("titleOfTask");
let allCount = document.getElementById("allCount");
let activeCount = document.getElementById("activeCount");
let completedCount = document.getElementById("completedCount");

let title;
let value;
let indexForEdit;
let searchTeXt;
let foundIndex;
let currentDate;
let filtered = []
//retrieving data from local storge
let str = localStorage.getItem("array");
// convert string to valid object
let activeArray = JSON.parse(str) || [];

onload();
//getDate();

// addbutton click Event
addButton.addEventListener("click",() => {
    readData();
    sortByTitle(activeArray , 'arraytitle');
    createTask();
    counting();
});
//select box change Event
document.querySelector(".form-select").addEventListener("change", function() {
    if (this.value == "1") {
        sortByTitle(activeArray , 'arraytitle');
        createTask();
        createCompleteTask();

    }else {
       sortByDate(activeArray , 'date');
       createTask();
       createCompleteTask()
    }
});
//page load function
function onload() {
    loadAll();
    createTask();
    createCompleteTask();
    sortByTitle(activeArray , 'arraytitle');
    counting();
}
//All Tasks menu
function loadAll() {
    document.getElementById("activeContainerHeading").style.display=""
    document.getElementById("active").style.display=""
    document.getElementById("completedContainerHeading").style.display=""
    document.getElementById("completed").style.display=""
    createTask();
    createCompleteTask();
}
//active tasks menu
function loadActive() {
    document.getElementById("activeContainerHeading").style.display=""
    document.getElementById("active").style.display=""
    document.getElementById("completedContainerHeading").style.display="none"
    document.getElementById("completed").style.display="none"

}
//completed task menu
function loadCompleted() {
    document.getElementById("activeContainerHeading").style.display="none"
    document.getElementById("active").style.display="none"
    document.getElementById("completedContainerHeading").style.display=""
    document.getElementById("completed").style.display=""
}
//reading data from input
function readData() {
    title = document.querySelector("#taskTitle").value;
    let description = document.getElementById("taskdescription").value;
    let dueDate = document.getElementById("theDate").value;
    if (!title) {
        alert("Please insert Title")
    }
    else {
    var todo = {
        arraytitle: title,
        description: description,
        date: dueDate,
        status: "active"
    }
    activeArray.push(todo);
    }   

    var jsonArr = JSON.stringify(activeArray);
    // save to localStorage
    localStorage.setItem("array", jsonArr);
    
    clear();
}
//retrieving the index of object from array and store it in an array named filter
function searchByTitle() {
    let searchText = document.getElementById("searchText").value;
    
    result = activeArray.filter(function (x,index) {
     ind = (x.arraytitle.toLowerCase().includes(searchText));
     if(ind) {
      filtered.push(index);
     }
    });

    document.getElementById("active").innerHTML=""
    document.getElementById("completed").innerHTML=""
    for(i = 0; i<filtered.length; i++) {
      searchedActive();
      searchedCompleted();
    }
    filtered = []
}
// creating active tasks div
function createTask() {
    document.getElementById("active").innerHTML=""
    for(i=0; i<activeArray.length; i++) {
        active();
    }
}
// creating complete tasks div
function createCompleteTask() {
    document.getElementById("completed").innerHTML=""
    for(i=0; i<activeArray.length; i++){
        completed();
    }
}
// changing the status of the todo tasks according to the checkbox actions
function markedItem(indexOfcheckbox) {
    var checkBox = document.getElementById(indexOfcheckbox);
    if (checkBox.checked == true) {
        activeArray[indexOfcheckbox].status = "complete"
    }
    if (checkBox.checked == false) {
        activeArray[indexOfcheckbox].status = "active"
    }
    createTask();  
    createCompleteTask();
    counting();

    var jsonArr = JSON.stringify(activeArray);
    localStorage.setItem("array", jsonArr);
}
// initializing the value of delete button globally
function btnValue(x) {
    value = x;
}
// deleting the object from array 
function deleteTask() {
    activeArray.splice(value,1);
    createTask();
    createCompleteTask();
    counting();

    var jsonArr = JSON.stringify(activeArray);
    localStorage.setItem("array", jsonArr);
}
// deleteing all the objects which has status = 'complete'
function deleteCompleted() {
    for(k=0; k<activeArray.length; k++) {
        if(activeArray[k].status == "complete") {
            activeArray.splice(k,1);
            k--;
        }
    }
    createTask();
    createCompleteTask();
    counting();

    var jsonArr = JSON.stringify(activeArray);
    localStorage.setItem("array", jsonArr);
}
// loading the values from array to the edit modal
function editTask(index) {
    indexForEdit = index;
    document.getElementById("modalTitle").value = activeArray[index].arraytitle;
    document.getElementById("modalDescription").innerText = activeArray[index].description;
    document.getElementById("modalDate").value = activeArray[index].date;
}
// updating the data that user edited and submitted
function updateTask() {
  if(!document.getElementById("modalTitle").value) {
    alert("title cannot be null")
  }
  else { 
    activeArray[indexForEdit].arraytitle = document.getElementById("modalTitle").value;
    activeArray[indexForEdit].description = document.getElementById("modalDescription").innerText;
    activeArray[indexForEdit].date = document.getElementById("modalDate").value;
    sortedArray = sortByTitle(activeArray , 'arraytitle');
    createTask();

    var jsonArr = JSON.stringify(activeArray);
    localStorage.setItem("array", jsonArr);
  }
}
// sort using title
function sortByTitle (array , key) {
    return array.sort(function(a, b)
    {
    if (a.arraytitle.toLowerCase() < b.arraytitle.toLowerCase()) return false;
    if (a.arraytitle.toLowerCase() > b.arraytitle.toLowerCase()) return true;
    return 0;
    }); 
}
// sort using Date
function sortByDate (array , key) {
    return array.sort(function(a, b)
    {
    let date_a = new Date(a.date);
    let date_b = new Date(b.date);
    if (date_a < date_b) return -1;
    if (date_a > date_b) return 1;
    return 0;
    });
}
// clear contents in input field
function clear() {
    taskTitle.value = "";
    taskdescription.value = "";
    thedate = "";
}
// displaying  active todos 
function active() {
    if(activeArray[i].status == "active") {
        document.getElementById("active").innerHTML +=
        `<div id="tasks">
          <div class="task-item">
            <div class="d-flex align-self-center gap-3">
              <div class="round">
                <input class = "form-check-input rounded-circle" type = "checkbox" id="${i}" onclick = "markedItem(this.id)"/>
              </div>
              <div class="content">
                <div class="d-flex align-items-center gap-2">
                  <a class="titleOfTask text-decoration-none text-black text18" id="titleOfTask">${activeArray[i].arraytitle}</a>
                  <div class="status"></div>
                </div>
                <div class="dateAndTime p-1 rounded" id="dateAndTime"><img src="/images/calender.png" alt="" class="me-2"> by ${activeArray[i].date}</div>
              </div>
            </div>
            <div class="operations d-flex align-self-center gap-4 me-4">
              <i class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#editModal" id="${i}" onclick = "editTask(this.id)"></i>
              <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${i}" onclick = "btnValue(this.id)"></i>
            </div>
          </div>
        </div>`
    }
}
// displaying completed todo 
function completed() {
    if(activeArray[i].status == "complete") {
        document.getElementById("completed").innerHTML +=
        `<div id="tasks">
          <div class="task-item">
            <div class="items">
              <div class="round">
                <input class = "form-check-input rounded-circle" type = "checkbox" checked id="${i}" onclick = "markedItem(this.id)"/>
              </div>
              <div class="content">
                <div class="d-flex align-items-center gap-2">
                  <a class="titleOfTask text-decoration-none text-black text18" id="titleOfTask">${activeArray[i].arraytitle}</a>
                  <div class="status bg-success"></div>
                </div>
                <div class="dateAndTime" id="dateAndTime"><img src="/images/calender.png" alt="" class="me-2"> by ${activeArray[i].date}</div>
              </div>
            </div>
            <div class="operations d-flex align-self-center gap-4 me-4">
              <i class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#editModal" id="${i}" onclick = "editTask(this.id)"></i>
              <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${i}" onclick = "btnValue(this.id)"></i>
            </div>
          </div>
        </div>`
    }
}
// displaying todo if searched todo is in active
function searchedActive() {
    if(activeArray[filtered[i]].status == "active") {
        document.getElementById("active").innerHTML +=
        `<div id="tasks">
          <div class="task-item">
            <div class="items">
              <div class="round">
                <input class = "form-check-input rounded-circle" type = "checkbox" id="${filtered[i]}" onclick = "markedItem(this.id)"/>
              </div>
              <div class="content">
                <div class="d-flex align-items-center gap-2">
                  <a class="titleOfTask text-decoration-none text-black text18" id="titleOfTask">${activeArray[filtered[i]].arraytitle}</a>
                  <div class="status"></div>
                </div>
                <div class="dateAndTime gap-1" id="dateAndTime"> <img src="/images/calender.png" alt=""> by ${activeArray[filtered[i]].date}</div>
              </div>
            </div>
            <div class="operations d-flex align-self-center gap-4 me-4">
              <i class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#editModal" id="${filtered[i]}" onclick = "editTask(this.id)"></i>
              <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${filtered[i]}" onclick = "btnValue(this.id)"></i>
            </div>
          </div>
        </div>`
    }
}
// displaying todo if searched todo is in complete
function searchedCompleted() {
    if(activeArray[filtered[i]].status == "complete") {
        document.getElementById("completed").innerHTML +=
        `<div id="tasks">
          <div class="task-item">
            <div class="items">
              <div class="round">
                <input class = "form-check-input rounded-circle" type = "checkbox" checked id="${filtered[i]}" onclick = "markedItem(this.id)"/>
              </div>
              <div class="content">
                <div class="d-flex align-items-center gap-2">
                  <a class="titleOfTask text-decoration-none text-black text18" id="titleOfTask">${activeArray[filtered[i]].arraytitle}</a>
                  <div class="status"></div>
                </div>
                <div class="dateAndTime gap-1" id="dateAndTime"> <img src="/images/calender.png" alt=""> by ${activeArray[filtered[i]].date}</div>
              </div>
            </div>
            <div class="operations d-flex align-self-center gap-4 me-4">
              <i class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#editModal" id="${filtered[i]}" onclick = "editTask(this.id)"></i>
              <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${filtered[i]}" onclick = "btnValue(this.id)"></i>
            </div>
          </div>
        </div>`
    }
}
// counting the all todos , active todos and completed todos
function counting() {
    allCount.innerHTML = "0"
    activeCount.innerHTML = "0"
    completedCount.innerHTML = "0"
    for(i=0; i<activeArray.length; i++) {
        allCount.innerHTML++;
        if(activeArray[i].status == 'active') {
            activeCount.innerHTML++;
        }
        if(activeArray[i].status == 'complete') {
            completedCount.innerHTML++;
        }
    }
}
// todays date
// function getDate() {
//   var todayDate = new Date();
//   let day = todayDate.getDate();
//   let month = todayDate.getMonth();
//   let year = todayDate.getFullYear();
//   currentDate = `${day}-${month}-${year}`
//   document.getElementById("theDate").value = currentDate
//   console.log(currentDate);;
// }