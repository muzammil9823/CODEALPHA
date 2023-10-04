document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");


    function createTask(taskText, priority) {
        const li = document.createElement("li");
        li.classList.add(`priority-${priority}`);
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="priority-buttons">
                <button class="priority-button low">Low</button>
                <button class="priority-button medium">Medium</button>
                <button class="priority-button high">High</button>
                <button class="priority-button urgent">Urgent</button>
            </div>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;
        taskList.appendChild(li);

        
        const deleteButton = li.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            li.remove();
        });

    
        const editButton = li.querySelector(".edit-button");
        const taskTextElement = li.querySelector(".task-text");
        editButton.addEventListener("click", function () {
            li.classList.toggle("edit-mode");
            if (li.classList.contains("edit-mode")) {
                taskTextElement.contentEditable = true;
                taskTextElement.focus();
                editButton.textContent = "Save";
            } else {
                taskTextElement.contentEditable = false;
                editButton.textContent = "Edit";
            }
        });

        
        const priorityButtons = li.querySelectorAll(".priority-button");
        priorityButtons.forEach((button) => {
            button.addEventListener("click", function () {
                li.classList.remove("priority-low", "priority-medium", "priority-high", "priority-urgent");
                const priorityClass = button.textContent.toLowerCase();
                li.classList.add(`priority-${priorityClass}`);
            });
        });
    }


    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
        
            createTask(taskText, "medium");
            taskInput.value = "";
        }
    });

    
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});