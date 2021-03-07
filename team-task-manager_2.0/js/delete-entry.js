function handleDeletion(index, listItem, storageKey) {
	const removeButton = document.createElement("div");
	const removeButtonImage = document.createElement("img");

	Object.assign(removeButton.style, {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "1rem",
		height: "100%",
		cursor: "initial",
	});

	removeButtonImage.src = "images/trashcan.svg";
	removeButton.appendChild(removeButtonImage);
	listItem.appendChild(removeButton);
	if(listItem.parentElement.id == "team-member-ul")
	{
	    removeButton.style.marginLeft = "auto";
	}

	let buttonParent = removeButton.parentNode;
	removeButton.addEventListener("click", () => {
		let i = 0;
		while ((buttonParent = buttonParent.previousSibling) != null) {
			i++;
		}

		const storageHandle = JSON.parse(localStorage.getItem(storageKey)) || [];

		storageHandle.splice(index, 1);
		localStorage.setItem(storageKey, JSON.stringify(storageHandle));

		buttonParent = removeButton.parentNode;
		buttonParent.parentNode.removeChild(buttonParent.parentNode.childNodes[i]);
			
		location.reload();
		
		if(storageKey == "teamMemberArray")
		{
		    const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
		    if(taskArray.length > 0)
		    {
			for(let j = 0; j < taskArray.length; j++)
			{
			    if(taskArray[j].selectedMember == i+1);
			    {
				let toChange = taskArray[j];
				toChange.selectedMember = 0;
				taskArray.splice(j, 1, toChange);
				localStorage.setItem("taskArray", JSON.stringify(taskArray));
			    }
			}
		    }
		}
	});

	removeButton.addEventListener("mouseover", () => {
		buttonParent.style.backgroundColor = "#E87878";
	})
	removeButton.addEventListener("mouseout", () => {
		buttonParent.style.backgroundColor = "initial";
	})

}
