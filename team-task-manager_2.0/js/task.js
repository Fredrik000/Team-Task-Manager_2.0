// Store selected elements as variables
const taskNameInput = document.getElementById("task-name-input");
const taskDeadlineInput = document.getElementById("task-deadline-input");
const taskDescInput = document.getElementById("task-desc-input");

const addTaskBtn = document.getElementById("add-task-btn");

const clearInQueueBtn = document.getElementById("clear-in-queue-btn");
const clearInProgressBtn = document.getElementById("clear-in-progress-btn");
const clearResolvedBtn = document.getElementById("clear-resolved-btn");

const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
let draggableId = 0;

taskDeadlineInput.setAttribute("required", "true");
taskDeadlineInput.setAttribute("min", "1980-01-01");
taskDeadlineInput.setAttribute("max", "2440-01-01");
taskNameInput.placeholder = "Task Name";
taskDeadlineInput.placeholder = "Deadline";
taskDescInput.placeholder = "Description";

// On click or keypress enter, check for errors and add task to array in localStorage
function addTask()
{
    if(taskNameInput.value.length && taskDeadlineInput.value.length && taskDescInput.value.length)
    {
	if(taskNameInput.value.length > 16)
	{
	    taskNameInput.value = "";
	    taskNameInput.style.borderColor = "#F00";
	    taskNameInput.placeholder = "Too long";
	}
	else
	{
	    const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
	    const taskItem = {taskPlacement:0, taskName:taskNameInput.value, taskDline:taskDeadlineInput.value, taskDesc:taskDescInput.value, selectedMember:0, selectedPlacement:0};

	    taskArray.push(taskItem);
	    localStorage.setItem("taskArray", JSON.stringify(taskArray));

	    let index = taskArray.indexOf(taskItem);
	    createTaskListElement(index);

	    taskNameInput.style.borderColor = "#A8B5BC";
	    taskDeadlineInput.style.borderColor = "#A8B5BC";
	    taskDescInput.style.borderColor = "#A8B5BC";

	    taskNameInput.value = "";
	    taskDeadlineInput.value = "";
	    taskDescInput.value = "";
	    
	    location.reload();
	}
    }
    else 
    {
        if (isEmptyOrSpaces(taskNameInput.value)) {
            taskNameInput.style.borderColor = "#F00";
            taskNameInput.placeholder = "Please Input Task.."
        }
	else
	{
	    taskNameInput.style.borderColor = "#A8B5BC";
	}
        if (taskDeadlineInput.value.length == 0) {
            taskDeadlineInput.style.borderColor = "#F00";
            taskDeadlineInput.placeholder = "Please Input Deadline"
        }
	else
	{
	    taskDeadlineInput.style.borderColor = "#A8B5BC";
	}
        if (taskDescInput.value.length == 0) {
            taskDescInput.style.borderColor = "#F00";
            taskDescInput.placeholder = "Please Input Description.."
        }
	else
	{
	    taskDescInput.style.borderColor = "#A8B5BC";
	}
    }
}

addTaskBtn.addEventListener("click", function() {
    addTask();
});
taskNameInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTask();
    }
});
taskDeadlineInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
	addTask();
    }
});

// Creates a new task entry
function createTaskListElement(index)
{
    const inQueueUl = document.querySelector(".in-queue-ul")
    const inProgressUl = document.querySelector(".in-progress-ul");
    const resolvedUl = document.querySelector(".resolved-ul");

    const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];

    if(taskArray.length > 0)
    {
	const li = document.createElement("li");
	li.classList.add("task-item");

	// Create the different elements that make up an entry
	const cb = createCheckBox();
	const taskNameIcon = document.createElement("span");
	const taskDlineIcon = document.createElement("span");
	const taskDesc = document.createElement("div");
	const taskDescIcon = document.createElement("span");
	const taskDescContent = taskArray[index].taskDesc;
	const taskName = document.createElement("span");
	const taskDline = document.createElement("span");
	const dropdownsDiv = document.createElement("div");
	const memberSelect = createNameDropdown(index);
	const placementSelect = createPlacementDropdown(index);
	const flagged = document.createElement("span");

	li.setAttribute("id", JSON.stringify(draggableId));
	draggableId++;

	// Set icons
	taskNameIcon.innerHTML = "📋\xa0";
	taskNameIcon.classList.add("li-icons");
	taskDlineIcon.style.marginLeft = "auto";
	taskDlineIcon.innerHTML = "📆\xa0";
	taskDlineIcon.classList.add("li-icons");
	taskDescIcon.innerHTML = "🕮";
	taskDescIcon.classList.add("li-icons");

	dropdownsDiv.style.display = "flex";
	dropdownsDiv.style.width = "7rem";
	dropdownsDiv.style.flexDirection = "column";
	dropdownsDiv.style.justifyContent = "center";
	dropdownsDiv.style.alignItems = "center";
	dropdownsDiv.style.marginLeft = "1.2rem";
	dropdownsDiv.style.marginRight = "1.2rem";

	memberSelect.style.width = "100%";
	memberSelect.style.marginBottom = "0.2rem";
	placementSelect.style.width = "100%";
	if(window.innerWidth >= 1025)
	{
	    placementSelect.style.display = "none";
	}
	else
	{
	    placementSelect.style.display = "initial";
	}
	window.addEventListener("resize", function() {
	    if(window.innerWidth >= 1025)
	    {
		placementSelect.style.display = "none";
	    }
	    else
	    {
		placementSelect.style.display = "initial";
	    }
	});
	dropdownsDiv.appendChild(memberSelect);
	dropdownsDiv.appendChild(placementSelect);

	taskDesc.appendChild(taskDescIcon);
	taskDesc.setAttribute("display", "inline-block");
	taskDesc.style.cursor = "help";

	// Task Name attributes
	taskName.innerHTML = taskArray[index].taskName;
	// Task Deadline attributes
	taskDline.innerHTML = taskArray[index].taskDline;

	// Show flag when user clicks checkbox
	cb.addEventListener("click", () => {
	   flagged.classList.toggle("important");
	   taskName.classList.toggle("important-text");
	   taskDline.classList.toggle("important-text");
	});

	// Show description when user clicks book icon
	taskDesc.addEventListener("click", function(){
	   showTaskDescription(taskName.innerHTML, taskDescContent);
	});

	// Assemble task entry
	li.appendChild(cb);
	li.appendChild(flagged);
	li.appendChild(taskNameIcon);
	li.appendChild(taskName);
	li.appendChild(taskDlineIcon);
	li.appendChild(taskDline);
	li.appendChild(dropdownsDiv);
	li.appendChild(taskDesc);

	li.style.cursor = "not-allowed";
	li.style.userSelect = "none";

	// Append the assembled entry to the correct ul
	switch(taskArray[index].taskPlacement)
	{
	    case 0:
		inQueueUl.appendChild(li);
		break;
	    case 1:
		inProgressUl.appendChild(li);
		break;
	    case 2:
		resolvedUl.appendChild(li);
		break;
	}
	
	// Add delete functionality to entry
	handleDeletion(index, li, "taskArray");
    }
}

function showTaskDescription(name, content)
{
    const descBox = document.createElement("div");
    const descHeader = document.createElement("h2");
    descHeader.classList.add("description-header");
    const descText = document.createElement("p");
    const closeButton = document.createElement("div");
    closeButton.classList.add("add-btn");
    closeButton.classList.add("description-close-btn");

    descBox.classList.add("description-box");

    descHeader.innerHTML = `${name}:`;
    descText.innerHTML = content;
    closeButton.innerHTML = "X";

    descBox.appendChild(descHeader);
    descBox.appendChild(descText);
    descBox.appendChild(closeButton);

    closeButton.addEventListener("click", () => {
       closeButton.remove();
       descText.remove();
       descHeader.remove();
       descBox.remove();
    });

    document.body.appendChild(descBox);
}

// helper function
// checks wheter given string is empty or contains any number of spaces
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

// Dropdown-menu with team-member names
function createNameDropdown(index)
{
    let newNameOption = document.createElement("select");
    newNameOption.classList.add("select-member");

    let teamMemberArray = JSON.parse(localStorage.getItem("teamMemberArray")) || [];
    const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
    if (teamMemberArray.length > 0)
    {
        for (let x of teamMemberArray) {
            newNameOption[0] = new Option("[NONE SELECTED]");
            newNameOption[newNameOption.length] = new Option(x.name);
        }
        newNameOption.style.borderColor = "initial";
    }
    else
    {
        newNameOption[0] = new Option("[NO MEMBERS]");
        newNameOption.style.borderColor = "rgb(255, 0, 0)";
    }
    if(taskArray.length > 0)
    {
	newNameOption.selectedIndex = taskArray[index].selectedMember;
    }

    newNameOption.addEventListener("change", () => {
	let toChange = taskArray[index];
	toChange.selectedMember = newNameOption.selectedIndex;
	taskArray.splice(index, 1, toChange);
	localStorage.setItem("taskArray", JSON.stringify(taskArray));

        if (newNameOption.selectedIndex != 0) {
            newNameOption.parentNode.parentNode.classList.add("draggable");
            newNameOption.parentNode.parentNode.setAttribute("draggable", "true");
            newNameOption.parentNode.parentNode.style.cursor = "grab"

	    handleDraggables(index);
        }
        else {
            newNameOption.parentNode.parentNode.classList.remove("draggable");
            newNameOption.parentNode.parentNode.setAttribute("draggable", "false");
            newNameOption.parentNode.parentNode.style.cursor = "not-allowed";

	    location.reload();
        }

    });

    return (newNameOption);
}

function createPlacementDropdown(index)
{
    const taskArray = JSON.parse(localStorage.getItem("taskArray"));
    let dropdown = document.createElement("select");
    dropdown.classList.add("select-placement");
    let toChange = taskArray[index];

    dropdown[0] = new Option("QUEUE");
    dropdown[1] = new Option("IN PROGRESS");
    dropdown[2] = new Option("RESOLVED");

    if(taskArray.length > 0)
    {
	dropdown.selectedIndex = taskArray[index].selectedPlacement;
    }
    
    dropdown.addEventListener("change", () => {
	if(toChange.selectedMember != 0)
	{
	    switch(dropdown.selectedIndex)
	    {
		case 0:
		    toChange.taskPlacement = 0;
		    toChange.selectedPlacement = 0;
		    taskArray.splice(index, 1, toChange);
		    localStorage.setItem("taskArray", JSON.stringify(taskArray));
		    break;
		case 1:
		    toChange.taskPlacement = 1;
		    toChange.selectedPlacement = 1;
		    taskArray.splice(index, 1, toChange);
		    localStorage.setItem("taskArray", JSON.stringify(taskArray));
		    break;
		case 2:
		    toChange.taskPlacement = 2;
		    toChange.selectedPlacement = 2;
		    taskArray.splice(index, 1, toChange);
		    localStorage.setItem("taskArray", JSON.stringify(taskArray));
		    break;
	    }
	}

	location.reload();
    });

    return dropdown;
}

// Refreshes all the member dropdowns, gets called when user adds or removes team member.
refreshDropdowns = () => {
    const memberDropdowns = document.querySelectorAll(".select-member");
    const placementDropdowns = document.querySelectorAll(".select-placement");
    let teamMemberArray = JSON.parse(localStorage.getItem("teamMemberArray"));
    const taskArray = JSON.parse(localStorage.getItem("taskArray"));

    memberDropdowns.forEach(dropdown => {
        for (let i = dropdown.length - 1; i >= 0; i--) {
            dropdown.remove(i);
        }
        if (teamMemberArray.length > 0) {
            dropdown.add(new Option("[NONE SELECTED]"));
            dropdown.style.borderColor = "initial";
	    let i;
            for (i = 0; i < teamMemberArray.length; i++) {
                dropdown.add(new Option(teamMemberArray[i].name));
            }
        }
        else {
            dropdown.add(new Option("[NO MEMBERS]"));
            dropdown.style.borderColor = "rgb(255, 0, 0)";
        }
        dropdown.parentNode.classList.remove("draggable");
        dropdown.parentNode.setAttribute("draggable", "false");
        dropdown.parentNode.style.cursor = "not-allowed";
    })
}

// Clears the corresponding ul and localstorage of tasks.
clearInQueueBtn.addEventListener("click", function(){
    clearList(0);
});
clearInProgressBtn.addEventListener("click", function(){
    clearList(1);
});
clearResolvedBtn.addEventListener("click", function(){
    clearList(2);
});

function clearList(listindex)
{
    const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
    if(taskArray.length > 0)
    {
	for(let i = 0; i < taskArray.length;)
	{
	    if(taskArray[i].taskPlacement == listindex)
	    {
		taskArray.splice(i, 1);
	    }
	    else
	    {
		i++;
	    }
	}
	
	localStorage.setItem("taskArray", JSON.stringify(taskArray));
	location.reload();
    }
}

// Create Checkbox
createCheckBox = () => {
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = false;
    return cb;
}

// Create Custom Checkbox
createImportantTag = () => {
    const spn = document.createElement("span");
    spn.className = "important"
    return spn;
}
