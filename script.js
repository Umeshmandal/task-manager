// ==========================================
// TASK MANAGEMENT APPLICATION
// ==========================================

// Access DOM elements

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const clearCompletedBtn =
    document.getElementById("clearCompletedBtn");

// Load tasks from Local Storage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ==========================================
// DISPLAY TASKS
// ==========================================

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.classList.add("task-item");

        if (task.completed) {
            li.classList.add("completed");
        }

        const taskContent = document.createElement("div");

        taskContent.classList.add("task-content");

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;

        const taskText = document.createElement("span");

        taskText.classList.add("task-text");

        taskText.textContent = task.text;

        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-btn");

        deleteButton.textContent = "Delete";

        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskText);

        li.appendChild(taskContent);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        // Complete task

        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });

        // Delete task

        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });

    });

    updateTaskCount();

    updateEmptyMessage();
}

// ==========================================
// ADD TASK
// ==========================================

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;
    }

    const newTask = {

        id: Date.now(),

        text: text,

        completed: false

    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    displayTasks();

    taskInput.focus();
}

// ==========================================
// TOGGLE TASK
// ==========================================

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });

    saveTasks();

    displayTasks();
}

// ==========================================
// DELETE TASK
// ==========================================

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    saveTasks();

    displayTasks();
}

// ==========================================
// CLEAR COMPLETED
// ==========================================

function clearCompletedTasks() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });

    saveTasks();

    displayTasks();
}

// ==========================================
// LOCAL STORAGE
// ==========================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// ==========================================
// TASK COUNT
// ==========================================

function updateTaskCount() {

    const remaining = tasks.filter(function(task) {

        return !task.completed;

    }).length;

    taskCount.textContent =
        remaining +
        (remaining === 1
            ? " task remaining"
            : " tasks remaining");
}

// ==========================================
// EMPTY MESSAGE
// ==========================================

function updateEmptyMessage() {

    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();
    }
});

clearCompletedBtn.addEventListener(
    "click",
    clearCompletedTasks
);

// ==========================================
// INITIAL LOAD
// ==========================================

displayTasks();
