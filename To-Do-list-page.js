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

let str = localStorage.getItem("array");
// convert string to valid object
let activeArray = JSON.parse(str);

onload();

addButton.addEventListener("click",() => {
    readData();
    sortByTitle(activeArray , 'arraytitle');
    createTask();
    counting();
});

document.querySelector(".form-select").addEventListener("change", function() {
    if (this.value == "1") {
        sortByTitle(activeArray , 'arraytitle');
        createTask();
        createCompleteTask();

    }else{
       sortByDate(activeArray , 'date');
       createTask();
       createCompleteTask()
    }
});

searchbtn.addEventListener('click',() => {
    searchByTitle()
})

function onload() {
    loadAll();
    createTask();
    createCompleteTask();
    sortByTitle(activeArray , 'arraytitle');
    counting();
}

function loadAll() {
    // document.getElementById("activeContainerHeading").style.display=""
    // document.getElementById("active").style.display=""
    // document.getElementById("completedContainerHeading").style.display=""
    // document.getElementById("completed").style.display=""
    createTask();
    createCompleteTask();
}

function loadActive() {
    document.getElementById("activeContainerHeading").style.display=""
    document.getElementById("active").style.display=""
    document.getElementById("completedContainerHeading").style.display="none"
    document.getElementById("completed").style.display="none"

}

function loadCompleted() {
    document.getElementById("activeContainerHeading").style.display="none"
    document.getElementById("active").style.display="none"
    document.getElementById("completedContainerHeading").style.display=""
    document.getElementById("completed").style.display=""
}

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
        desc: description,
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

function searchByTitle() {
    searchText = document.getElementById("searchText").value;

    var found = activeArray.findIndex(function(obj , index) {
        if(obj.arraytitle == searchText)
            return true;
    });
    
    foundIndex = found;
    searchedItem();
    document.getElementById("searchText").value = ""
}

function searchedItem() {
    if(foundIndex == -1) {
        alert("Data not Available");
    }
    else {
        if(activeArray[foundIndex].status == 'active') {
            document.getElementById("completed").style.display="none";
            document.getElementById("active").innerHTML=""
            searchedActive();
        }
        if(activeArray[foundIndex].status == 'complete') {
            document.getElementById("active").style.display="none";
            document.getElementById("completed").innerHTML=""
            searchedCompleted();
        }
        // document.getElementById("completed").innerHTML=""
        // searchedCompleted();
    }
}

function createTask() {
    
    document.getElementById("active").innerHTML=""
    for(i=0; i<activeArray.length; i++) {
        active();
    }
}

function createCompleteTask() {
    
    document.getElementById("completed").innerHTML=""
    for(i=0; i<activeArray.length; i++){
        completed();
    }
}

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
    // save to localStorage
    localStorage.setItem("array", jsonArr);
}

function btnValue(x) {
    value = x;
}

function deleteTask() {
    //allCount.innerHTML--;
    activeArray.splice(value,1);
    createTask();
    createCompleteTask();
    counting();

    var jsonArr = JSON.stringify(activeArray);
    // save to localStorage
    localStorage.setItem("array", jsonArr);
}

function deleteCompleted() {
    for(k=0; k<activeArray.length; k++) {
        if(activeArray[k].status == "complete") {
            activeArray.splice(k,1);
            k--;
            //allCount.innerHTML--;
        }
    }
    createTask();
    createCompleteTask();
    counting();

    var jsonArr = JSON.stringify(activeArray);
    // save to localStorage
    localStorage.setItem("array", jsonArr);
}

function editTask(index) {

    indexForEdit = index;
    document.getElementById("modalTitle").value = activeArray[index].arraytitle;
    document.getElementById("modalDescription").innerText = activeArray[index].desc;
    document.getElementById("modalDate").value = activeArray[index].date;
}

function updateTask() {

    activeArray[indexForEdit].arraytitle = document.getElementById("modalTitle").value;
    activeArray[indexForEdit].desc = document.getElementById("modalDescription").innerText;
    activeArray[indexForEdit].date = document.getElementById("modalDate").value;
    sortedArray = sortByTitle(activeArray , 'arraytitle');
    createTask();

    var jsonArr = JSON.stringify(activeArray);
    // save to localStorage
    localStorage.setItem("array", jsonArr);
}

function sortByTitle (array , key) {
    return array.sort(function(a, b)
    {
    if (a.arraytitle.toLowerCase() < b.arraytitle.toLowerCase()) return -1;
    if (a.arraytitle.toLowerCase() > b.arraytitle.toLowerCase()) return 1;
    return 0;
    }); 
}

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

function clear() {
    taskTitle.value = "";
    taskdescription.value = "";
    thedate = "";
}

function active() {
    if(activeArray[i].status == "active") {
        document.getElementById("active").innerHTML +=
        `<div id="tasks">
          <div class="task-item">
            <div class="items">
              <div class="round">
                <input class = "form-check-input rounded-circle" type = "checkbox" id="${i}" onclick = "markedItem(this.id)"/>
              </div>
              <div class="content">
                <div class="titleBox">
                  <a class="titleOfTask text-decoration-none text-black" id="titleOfTask">${activeArray[i].arraytitle}</a>
                  <div class="status"></div>
                </div>
                <div class="dateAndTime" id="dateAndTime">by ${activeArray[i].date}</div>
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
                <div class="titleBox">
                  <a class="titleOfTask text-decoration-none text-black" id="titleOfTask">${activeArray[i].arraytitle}</a>
                  <div class="status bg-success"></div>
                </div>
                <div class="dateAndTime" id="dateAndTime">by ${activeArray[i].date}</div>
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

function searchedActive() {
    if(activeArray[foundIndex].status == "active") {
        document.getElementById("active").innerHTML +=
        `<div id="tasks">
          <div class="task-item">
            <div class="items">
              <div class="round">
                <input class = "form-check-input rounded-circle" type = "checkbox" id="${foundIndex}" onclick = "markedItem(this.id)"/>
              </div>
              <div class="content">
                <div class="titleBox">
                  <a class="titleOfTask text-decoration-none text-black" id="titleOfTask">${activeArray[foundIndex].arraytitle}</a>
                  <div class="status"></div>
                </div>
                <div class="dateAndTime" id="dateAndTime">by ${activeArray[foundIndex].date}</div>
              </div>
            </div>
            <div class="operations d-flex align-self-center gap-4 me-4">
              <i class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#editModal" id="${foundIndex}" onclick = "editTask(this.id)"></i>
              <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${foundIndex}" onclick = "btnValue(this.id)"></i>
            </div>
          </div>
        </div>`
    }
}

function searchedCompleted() {
    if(activeArray[foundIndex].status == "complete") {
        document.getElementById("completed").innerHTML +=
        `<div id="tasks">
          <div class="task-item">
            <div class="items">
              <div class="round">
                <input class = "form-check-input rounded-circle" type = "checkbox" checked id="${foundIndex}" onclick = "markedItem(this.id)"/>
              </div>
              <div class="content">
                <div class="titleBox">
                  <a class="titleOfTask text-decoration-none text-black" id="titleOfTask">${activeArray[foundIndex].arraytitle}</a>
                  <div class="status bg-success"></div>
                </div>
                <div class="dateAndTime" id="dateAndTime">by ${activeArray[foundIndex].date}</div>
              </div>
            </div>
            <div class="operations d-flex align-self-center gap-4 me-4">
              <i class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#editModal" id="${foundIndex}" onclick = "editTask(this.id)"></i>
              <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${foundIndex}" onclick = "btnValue(this.id)"></i>
            </div>
          </div>
        </div>`
    }
}

function counting() {
    //console.log("success")
    allCount.innerHTML = ""
    activeCount.innerHTML = ""
    completedCount.innerHTML = ""
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