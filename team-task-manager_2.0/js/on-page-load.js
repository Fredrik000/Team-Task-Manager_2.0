//Pull values from local storage and run it on page-load
function loadFromLocalStorage()
{
    handleResize();
    // Create Memberlist from local storage.
    const teamMemberArray = JSON.parse(localStorage.getItem("teamMemberArray")) || [];
    if(teamMemberArray.length > 0)
    {
	for(let i = 0; i < teamMemberArray.length; i++)
	{
	    createNameListElement(i);
	}
    }

    // Create Tasklist from local storage
    const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
    if(taskArray.length > 0)
    {
	for(let i = 0; i < taskArray.length; i++)
	{
	    createTaskListElement(i);
	}
    }
}
