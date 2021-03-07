var mobileClearBtn = document.getElementById("mobile-clear-btn");
var menuEl0 = document.getElementById("team-member-container");
var menuEl1 = document.getElementById("in-queue-container");
var menuEl2 = document.getElementById("in-progress-container");
var menuEl3 = document.getElementById("resolved-container");

var menus = [];
menus[0] = menuEl0;
menus[1] = menuEl1;
menus[2] = menuEl2;
menus[3] = menuEl3;

function menuFunction(id) {  

let currentMenu = JSON.parse(localStorage.getItem("currentMenu")) || 0;

    //Current selected object
    if(id == "prev")
        currentMenu--;
    if(id == "next")
        currentMenu++;

    //Reset loop if int goes higher/lower than amount of menus
    if(currentMenu < 0)
        currentMenu = 3;
    else if(currentMenu > 3)
        currentMenu = 0;

    localStorage.setItem("currentMenu", currentMenu);
    enableDisableMenus();
}

function enableDisableMenus(){
let currentMenu = JSON.parse(localStorage.getItem("currentMenu")) || 0;

     //Enable/Disable menus 
    for(let i = 0; i < menus.length; i++)
	menus[i].style.display = "none";
    menus[currentMenu].style.display = "block";
}

window.onresize = () => {
    handleResize();
}

function handleResize()
{
    if(window.innerWidth >= 1025)
    {
	for(let i = 0; i < menus.length; i++)
	    menus[i].style.display = "initial";

    }
    else
    {
	enableDisableMenus();
    }
}

mobileClearBtn.addEventListener("click", clearMobile);
function clearMobile()
{
    let currentMenu = JSON.parse(localStorage.getItem("currentMenu"));
    switch(currentMenu)
    {
	case 0:
	    localStorage.removeItem("teamMemberArray");
	    location.reload();
	    break;
	case 1:
	    clearList(0);
	    break;
	case 2:
	    clearList(1);
	    break;
	case 3:
	    clearList(2); 
	    break;
    }
}
