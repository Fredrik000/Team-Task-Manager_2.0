// Store selected elements as variables
const nameAssigner = document.getElementById("name-assigner");
const taskAssigner = document.getElementById("task-assigner");
const taskAssignerUl = document.getElementById("task-assigner-ul");
const assignTaskBtn = document.getElementById("assign-task-btn");
const selectName = document.getElementById("name-assigner");
const selectTask = document.getElementById("task-assigner");
const removeAssignedBtn = document.getElementById("remove-assigned-button");

// Declare variables
let AssignedNameArray = [];
let AssignedTaskArray = [];



// On click, run the function to add assigned name to array in localStorage
assignName = () => {
    if (localStorage.AssignedNameArray) {
        AssignedNameArray = JSON.parse(localStorage.getItem("AssignedNameArray"));
    }
    const nameAssignerInput = nameAssigner.value;
    AssignedNameArray.push(nameAssignerInput);
    localStorage.setItem("AssignedNameArray", JSON.stringify(AssignedNameArray));
};

// On click, run the function to add assigned task to array in localStorage
assignTask = () => {
    if (localStorage.AssignedTaskArray) {
        AssignedTaskArray = JSON.parse(localStorage.getItem("AssignedTaskArray"));
    }
    const taskAssignerInput = taskAssigner.value;
    AssignedTaskArray.push(taskAssignerInput);
    localStorage.setItem("AssignedTaskArray", JSON.stringify(AssignedTaskArray));
};

// append the checkbox to the taskAssignerUl element
// retrieve elements from localStorage, and add it to taskAssignerUl
assignTaskListElement = () => {
    AssignedNameArray = JSON.parse(localStorage.getItem("AssignedNameArray"));
    AssignedTaskArray = JSON.parse(localStorage.getItem("AssignedTaskArray"));
    const li = document.createElement("li");
    const cb = createCheckBox();
    li.appendChild(cb);
    li.appendChild(document.createTextNode(`Name: ${AssignedNameArray.slice(-1)[0]} - Task: `));
    li.appendChild(document.createTextNode(AssignedTaskArray.slice(-1)[0]));
    taskAssignerUl.appendChild(li);
    cb.addEventListener("click", () => {
        li.classList.toggle("strikethrough");
    });
}

assignTaskBtn.addEventListener("click", () => {
    assignName();
    assignTask();
    assignTaskListElement();
});