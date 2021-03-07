// Store selected elements as variables
const teamMemberInput = document.getElementById("team-member-input");
const teamMemberUl = document.querySelector(".team-member-ul")
const addTeamMemberBtn = document.getElementById("add-team-member-btn");
const clearTeamMemberBtn = document.getElementById("clear-team-member-btn");
// const removeButtonImage = document.createElement("img");

// On click or keypress enter, run the function to add name to array in localStorage
function addTeamMember()
{
    if(isValidInput(teamMemberInput))
    {
        const teamMemberArray = JSON.parse(localStorage.getItem("teamMemberArray")) || [];
	const teamMember = {icon:getRandomIcon(), name:teamMemberInput.value};

        teamMemberArray.push(teamMember);
        localStorage.setItem("teamMemberArray", JSON.stringify(teamMemberArray));

        createNameListElement(teamMemberArray.length-1);

        teamMemberInput.value = "";
        teamMemberInput.style.borderColor = "#A8B5BC";
        taskNameInput.placeholder = "Name"

	location.reload();
    }
}
addTeamMemberBtn.addEventListener("click", addTeamMember);
teamMemberInput.addEventListener("keyup", function(event){

    if(event.keyCode === 13)
    {
	event.preventDefault();
	document.getElementById("add-team-member-btn").click();
    }
});

// helper function
// checks wheter given string is empty or contains any number of spaces
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}
function isValidInput(input)
{
    let valid = true;
    if(input.value.length > 16)
    {
	input.placeholder = "Too many characters";
	valid = false;
    }
    if(isEmptyOrSpaces(input.value))
    {
	input.placeholder = "Can't be spaces";
	valid = false;
    }
   
    if(!valid)
    {
	input.style.borderColor = "#F00";
	input.value = "";
    }
    return valid;
}

// Append the checkbox to the name-ul element
// Retrieve values from localStorage, and add it to teamMemberUl
function createNameListElement(index)
{
    const teamMemberArray = JSON.parse(localStorage.getItem("teamMemberArray")) || [];

    if(teamMemberArray.length != 0)
    {
	const li = document.createElement("li");
	const memIcon = document.createElement("span");
	const memName = document.createElement("span");

	memIcon.innerHTML = teamMemberArray[index].icon;
	memName.innerHTML = teamMemberArray[index].name;

	memIcon.classList.add("li-icons");
	memName.style.marginLeft = "1rem";

	li.appendChild(memIcon);
	li.appendChild(memName);
	teamMemberUl.appendChild(li);

	li.style.userSelect = "none";
	handleDeletion(index, li, "teamMemberArray");
	refreshDropdowns();
    }
}

// Functions witch clears the localStorage of team-member names
clearTeamMemberBtn.onclick = () => {
    localStorage.removeItem("teamMemberArray");
    location.reload();
}

function getRandomIcon()
{
    const icons = ["🐵", "🐱", "🐮", "🐭", "👽", "🐟", "🐕", "🐿", "🐦"];

    return icons[Math.floor(Math.random() * icons.length)];
}
