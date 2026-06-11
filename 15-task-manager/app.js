document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");

    const allBtn = document.getElementById("all-btn");
    const activeBtn = document.getElementById("active-btn");
    const completedBtn = document.getElementById("completed-btn");

    const clearBtn = document.getElementById("clear-btn");
    const totalCount = document.getElementById("task-count");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let activeFilter = "all";

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const updateTaskCount = () => {
        const activeTasks = tasks.filter(
            task => task.status === "active"
        ).length;

        totalCount.textContent = `${activeTasks} tasks remaining`;
    };

    const createTaskElement = (task, index) => {
        const li = document.createElement("li");

        li.textContent =
            task.status === "completed"
                ? ` ${task.text}`
                : task.text;

        li.addEventListener("click", () => {
            tasks[index].status =
                tasks[index].status === "active"
                    ? "completed"
                    : "active";

            saveTasks();
            renderTasks();
            updateTaskCount();
        });

        return li;
    };

    const renderTasks = () => {
        taskList.replaceChildren();

        let filteredTasks = tasks;

        if (activeFilter === "active") {
            filteredTasks = tasks.filter(
                task => task.status === "active"
            );
        }

        if (activeFilter === "completed") {
            filteredTasks = tasks.filter(
                task => task.status === "completed"
            );
        }

        filteredTasks.forEach(task => {
            const originalIndex = tasks.indexOf(task);

            taskList.appendChild(
                createTaskElement(task, originalIndex)
            );
        });
    };

    addBtn.addEventListener("click", () => {
        const text = taskInput.value.trim();

        if (!text) return;

        tasks.push({
            text,
            status: "active"
        });

        saveTasks();
        renderTasks();
        updateTaskCount();

        taskInput.value = "";
    });

    allBtn.addEventListener("click", () => {
        activeFilter = "all";
        renderTasks();
    });

    activeBtn.addEventListener("click", () => {
        activeFilter = "active";
        renderTasks();
    });

    completedBtn.addEventListener("click", () => {
        activeFilter = "completed";
        renderTasks();
    });

    clearBtn.addEventListener("click", () => {
        tasks = tasks.filter(
            task => task.status !== "completed"
        );

        saveTasks();
        renderTasks();
        updateTaskCount();
    });

    renderTasks();
    updateTaskCount();
});