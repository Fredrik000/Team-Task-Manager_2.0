let currentDragIndex = 0;
function handleDraggables(index)
{
    const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
    let toChange; 
    // Get handle to every draggable element, and every container holding draggables
    let draggables = document.querySelectorAll(".draggable");
    let containers = document.querySelectorAll(".drag-container");

    // for each draggable, add an eventlistener for the start of the drag as well as the end,
    // and add them to appropriate classes for handling style and related events.
    draggables.forEach(draggable => {
	draggable.addEventListener("dragstart", () => {
	    draggable.classList.add("dragging");
	    draggable.style.backgroundColor = "#00FF6644"; 
	    currentDragIndex = draggable.id;
	    toChange = taskArray[currentDragIndex];
	});

	draggable.addEventListener("dragend", () => {
	    draggable.classList.remove("dragging");
	    draggable.style.backgroundColor = "initial"; 
	});
    });

    // this handles the draggable containers in the same way
    containers.forEach(container => {
	container.addEventListener("dragenter", e => {
	    // Update task placement index in localstorage
	    if(taskArray.length > 0)
	    {
		switch(e.target.id)
		{
		    case "in-queue-ul":
			toChange.taskPlacement = 0;
			break;
		    case "in-progress-ul":
			toChange.taskPlacement = 1;
			break;
		    case "resolved-ul":
			toChange.taskPlacement = 2;
			break;
		}

		taskArray.splice(currentDragIndex, 1, toChange);
		localStorage.setItem("taskArray", JSON.stringify(taskArray));
	    }
	})

	container.addEventListener("dragover", e => {
	    e.preventDefault();

	    // get currently dragged element so we can append it to the new container.
	    const currentDraggable = document.querySelector(".dragging");

	    // find which draggable element is below the cursor when dragging an element
	    const elementBelowDrag = getElementBelowDrag(container, e.clientY);

	    // if there is no element below currently dragging element, just append the current to the list
	    if(elementBelowDrag == null)
	    {
		container.appendChild(currentDraggable);
	    } // otherwise insert it before the one below it.
	    else
	    {
		container.insertBefore(currentDraggable, elementBelowDrag);
	    }
	    
	    
	}) // change style when not dragging over
    })
}

// This function uses the currently dragged over container and the mouse y position, and
// determines which element is below the currently dragging element, by use of the reduce() function
function getElementBelowDrag(container, mouseY)
{
    const otherDraggables = [...container.querySelectorAll(".draggable")];

    return otherDraggables.reduce((closest, child) => {
	const box = child.getBoundingClientRect();	
	const offset = mouseY - box.top - box.height / 2;
	if(offset < 0 && offset > closest.offset)
	{
	    return { offset: offset, element: child }
	}
	else
	{
	    return closest;
	}
    }, {offset: Number.NEGATIVE_INFINITY}).element;
}
