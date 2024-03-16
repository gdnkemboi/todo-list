import "./style.css";

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
    this.project = "General";
  }
}

let task1 = new Todo(
  "Task 1",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "2022-12-31",
  "High"
);

task1.project = "Work";

let task2 = new Todo(
  "Task 2",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "2024-03-04",
  "High"
);

task2.project = "Home";

let task3 = new Todo("Task 3", "assignments", "2024-03-01", "Medium");
const tasks = [task1, task2, task3];

class Project {
  constructor(title) {
    this.title = title;
  }
}

const work = new Project("Work");
const home = new Project("Home");
const projects = [work, home];

function addTask() {
  const title = document.querySelector(".title").value;
  const description = document.querySelector(".description").value;
  const dueDate = document.querySelector(".due").value;
  const priority = document.querySelector(".priority > div > input").value;
  const task = new Todo(title, description, dueDate, priority);
  const addTaskPage = document.querySelector(".task");
  if (addTaskPage.classList.contains("projectTask")) {
    console.log(addTaskPage.classList[2]);
    task.project = addTaskPage.classList[2];
  }
  tasks.push(task);
}

function editTask(name) {
  console.log(name);
  const title = document.querySelector(".editTitle").value;
  console.log(title);
  const description = document.querySelector(".editDescription").value;
  const dueDate = document.querySelector(".editDue").value;
  const priority = document.querySelector(".priorityInput").value;
  for (let task of tasks) {
    if (task.title === name) {
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
      task.priority = priority;
      break;
    }
  }
}

function createTaskDiv(task) {
  const taskDiv = document.createElement("div");
  taskDiv.setAttribute("class", "todo");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");

  const paragraph1 = document.createElement("p");
  paragraph1.textContent = task.title;
  paragraph1.setAttribute("class", "taskName");

  const button = document.createElement("button");
  button.textContent = "Details";
  button.setAttribute("class", "taskDetailsBtn");

  const paragraph2 = document.createElement("p");
  paragraph2.textContent = task.dueDate;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.setAttribute("class", "editTaskBtn");

  const delBtn = document.createElement("button");
  delBtn.setAttribute("class", "deleteTask");
  delBtn.textContent = "Delete";

  if (task.done) {
    checkbox.setAttribute("checked", true);
    paragraph1.style.textDecoration = "line-through";
    taskDiv.style.opacity = 0.5;
  }
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(paragraph1);
  taskDiv.appendChild(button);
  taskDiv.appendChild(paragraph2);
  taskDiv.appendChild(editBtn);
  taskDiv.appendChild(delBtn);

  return taskDiv;
}

function addProject() {
  const title = document.querySelector(".projectName").value;
  const project = new Project(title);
  projects.push(project);
  console.log(projects);
}

function createProjectDiv(projects) {
  const myProjects = document.querySelector(".myProjects");
  myProjects.innerHTML = "";
  for (let project of projects) {
    const projectDiv = document.createElement("div");
    projectDiv.setAttribute("class", "project");
    projectDiv.textContent = project.title;
    myProjects.appendChild(projectDiv);
  }
}

function taskInput() {
  const modalInput = document.querySelector(".modalInput");
  const projectForm = document.querySelector(".modalInput > form");
  modalInput.removeChild(projectForm);
  const formElement = document.createElement("form");
  formElement.setAttribute("class", "taskForm");

  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("placeholder", "Title");
  formElement.appendChild(titleInput);

  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.setAttribute("placeholder", "Description");
  formElement.appendChild(descriptionTextarea);

  const dueDateDiv = document.createElement("div");
  dueDateDiv.setAttribute("class", "dueDate");

  const dueDateLabel = document.createElement("div");
  dueDateLabel.textContent = "Due date:";
  dueDateDiv.appendChild(dueDateLabel);

  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.setAttribute("placeholder", "DD/MM/YYYY");
  dueDateDiv.appendChild(dueDateInput);

  formElement.appendChild(dueDateDiv);

  const priorityDiv = document.createElement("div");
  priorityDiv.setAttribute("class", "priority");

  const priorityLabel = document.createElement("p");
  priorityLabel.textContent = "Priority:";
  priorityDiv.appendChild(priorityLabel);

  const priorityButtonsDiv = document.createElement("div");

  const priorityLevels = ["Low", "Medium", "High"];
  priorityLevels.forEach((level) => {
    const button = document.createElement("button");
    button.textContent = level;
    priorityButtonsDiv.appendChild(button);
    priorityButtonsDiv.appendChild(document.createTextNode(" "));
  });

  priorityDiv.appendChild(priorityButtonsDiv);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Add Task";
  priorityDiv.appendChild(submitButton);

  formElement.appendChild(priorityDiv);

  modalInput.appendChild(formElement);
}

function projectInput() {
  const modalInput = document.querySelector(".modalInput");
  const taskForm = document.querySelector(".modalInput > form");
  modalInput.removeChild(taskForm);
  const projectForm = document.createElement("form");
  projectForm.setAttribute("class", "projectForm");
  const projectInput = document.createElement("input");
  projectInput.setAttribute("type", "text");
  projectInput.setAttribute("placeholder", "Project Name");
  projectInput.setAttribute("class", "projectName");
  const projectFormBtn = document.createElement("button");
  projectFormBtn.setAttribute("class", "addProject");
  projectFormBtn.textContent = "Add Project";
  projectForm.appendChild(projectInput);
  projectForm.appendChild(projectFormBtn);
  modalInput.appendChild(projectForm);
}

function setPriority() {
  const priorityInput = document.querySelector(".priority > div > input");
  const priorityButtons = document.querySelectorAll(".priority > div > button");
  priorityButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      priorityInput.value = button.textContent;
      console.log(priorityInput.value);
    });
  });
}

setPriority();

function viewProject(name) {
  const todos = document.querySelector(".todos");
  todos.innerHTML = "";
  const projectTitle = document.createElement("h1");
  projectTitle.textContent = name;
  const addTaskToProject = document.createElement("div");
  addTaskToProject.setAttribute("class", "addTaskToProject");
  addTaskToProject.textContent = "+Add Task";
  todos.appendChild(projectTitle);
  todos.appendChild(addTaskToProject);
  for (let task of tasks) {
    if (task.project === name) {
      let taskDiv = createTaskDiv(task);
      todos.appendChild(taskDiv);
    }
  }
}

function addTaskToProject() {
  const modal = document.querySelector(".modal");
  const projectName = document.querySelector(".todos > h1").textContent;
  const addTaskPage = document.querySelector(".task");
  addTaskPage.classList.add("projectTask");
  addTaskPage.classList.add(projectName);
  const addProjectPage = document.querySelector(".addProjectPage");
  addProjectPage.style.display = "none";
  modal.style.display = "flex";
}

const main = (() => {
  const todosDiv = document.querySelector(".todos");
  createProjectDiv(projects);
  for (let task of tasks) {
    todosDiv.appendChild(createTaskDiv(task));
  }

  document.addEventListener("click", (event) => {
    const today = new Date();
    if (event.target.classList.contains("home")) {
      todosDiv.innerHTML = "";
      for (let task of tasks) {
        todosDiv.appendChild(createTaskDiv(task));
      }
    } else if (event.target.classList.contains("today")) {
      todosDiv.innerHTML = "";
      for (let task of tasks) {
        let dueDate = new Date(task.dueDate);
        if (
          dueDate.getFullYear() === today.getFullYear() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getDate() === today.getDate()
        ) {
          todosDiv.appendChild(createTaskDiv(task));
        }
      }
    } else if (event.target.classList.contains("upcoming")) {
      todosDiv.innerHTML = "";
      for (let task of tasks) {
        let dueDate = new Date(task.dueDate);
        let oneWeek = new Date();
        oneWeek.setDate(today.getDate() + 7);
        if (oneWeek.getFullYear() > today.getFullYear()) {
          oneWeek.setFullYear(today.getFullYear());
        }

        if (
          dueDate.getFullYear() === today.getFullYear() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getDate() > today.getDate() &&
          dueDate <= oneWeek
        ) {
          todosDiv.appendChild(createTaskDiv(task));
        } else if (
          dueDate.getFullYear() > today.getFullYear() &&
          oneWeek.getFullYear() === today.getFullYear() &&
          dueDate.getMonth() === 0 &&
          today.getMonth() === 11 &&
          dueDate.getDate() > today.getDate()
        ) {
          todosDiv.appendChild(createTaskDiv(task));
        }
      }
    } else if (event.target.classList.contains("important")) {
      todosDiv.innerHTML = "";
      for (let task of tasks) {
        console.log(task.priority);
        if (task.priority === "High") {
          todosDiv.appendChild(createTaskDiv(task));
        }
      }
    }
  });

  const modal = document.querySelector(".modal");
  const addTaskBtn = document.querySelector(".addTask");
  addTaskBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  const closeModalBtn = document.querySelector(".closeModal");
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    const addProjectPage = document.querySelector(".addProjectPage");
    addProjectPage.style.display = "block";
  });

  const projectBtn = document.querySelector(".addProjectPage");
  projectBtn.addEventListener("click", () => {
    projectInput();
    const addProjectBtn = document.querySelector(".addProject");
    addProjectBtn.addEventListener("click", (event) => {
      event.preventDefault();
      addProject();
      createProjectDiv(projects);
      taskInput();
      modal.style.display = "none";
    });
  });

  const taskBtn = document.querySelector(".task");
  taskBtn.addEventListener("click", () => {
    const projectForm = document.querySelector(".projectForm");
    if (projectForm) {
      taskInput();
    }
  });

  const addToDoBtn = document.querySelector(".addToDo");
  addToDoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addTask();
    for (let task of tasks) {
      createTaskDiv(task);
    }

    if (todosDiv.querySelector("h1") !== null) {
      viewProject(todosDiv.querySelector("h1").textContent);
    }
    console.log(tasks);
    modal.style.display = "none";
  });

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("project")) {
      console.log(event.target.textContent);
      viewProject(event.target.textContent);
    }
  });

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("addTaskToProject")) {
      addTaskToProject();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("checkbox")) {
      let taskName = event.target.parentElement.querySelector(".taskName");
      if (event.target.checked) {
        taskName.style.textDecoration = "line-through";
        event.target.parentElement.style.opacity = "0.5";
        for (let task of tasks) {
          if (taskName.textContent === task.title) {
            task.done = true;
          }
        }
      } else {
        taskName.style.textDecoration = "none";
        event.target.parentElement.style.opacity = "1";
        for (let task of tasks) {
          if (taskName.textContent === task.title) {
            task.done = false;
          }
        }
      }
    }
  });

  function showDetailsModal(name) {
    const detailsModal = document.querySelector(".detailsModal");
    const detailsModalHeader = document.querySelector(".detailsModalHeader");
    detailsModalHeader.removeChild(detailsModalHeader.firstChild);
    const detailsModalClose = document.querySelector(".closeDetailsModal");
    const detailsModalBody = document.querySelector(".detailsModalBody");
    detailsModalBody.innerHTML = "";
    const taskName = document.createElement("h3");
    const project = document.createElement("div");
    const priority = document.createElement("div");
    const dueDate = document.createElement("div");
    const description = document.createElement("div");
    for (let task of tasks) {
      if (task.title === name) {
        taskName.textContent = task.title;
        project.textContent = "Project: " + task.project;
        priority.textContent = "Priority: " + task.priority;
        dueDate.textContent = "Due Date: " + task.dueDate;
        description.textContent = "Description: " + task.description;
        detailsModalHeader.insertBefore(taskName, detailsModalClose);
        detailsModalBody.appendChild(project);
        detailsModalBody.appendChild(priority);
        detailsModalBody.appendChild(dueDate);
        detailsModalBody.appendChild(description);
        detailsModal.style.display = "flex";
        return;
      }
    }
  }

  document.addEventListener("click", function (event) {
    const detailsModal = document.querySelector(".detailsModal");
    if (event.target.classList.contains("taskDetailsBtn")) {
      showDetailsModal(
        event.target.parentElement.querySelector(".taskName").textContent
      );
    } else if (event.target.classList.contains("closeDetailsModal")) {
      detailsModal.style.display = "none";
    }
  });

  function showEditModal(name) {
    const editModal = document.querySelector(".editModal");
    const editModalHeader = document.querySelector(".editModalHeader")
    const editModalClose = document.querySelector(".closeEditModal");
    const editModalBody = document.querySelector(".editModalBody");
    editModalBody.innerHTML = "";

    const editForm = document.createElement("form");
    editForm.setAttribute("class", "editForm");

    const ogName = document.createElement("input");
    ogName.setAttribute("type", "hidden");
    ogName.setAttribute("class", "ogName");
    ogName.value = name;
    editForm.appendChild(ogName);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Title");
    titleInput.setAttribute("class", "editTitle");

    const descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.setAttribute("placeholder", "Description");
    descriptionTextarea.setAttribute("class", "editDescription");

    const dueDateDiv = document.createElement("div");
    dueDateDiv.setAttribute("class", "dueDate");

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.setAttribute("placeholder", "DD/MM/YYYY");
    dueDateInput.setAttribute("class", "editDue");
    dueDateDiv.appendChild(dueDateInput);

    dueDateDiv.appendChild(dueDateInput);

    const priority = document.createElement("div");
    priority.setAttribute("class", "priority");

    const priorityPara = document.createElement("p");
    priorityPara.textContent = "Priority:";
    priority.appendChild(priorityPara);

    const priorityBtnsDiv = document.createElement("div");

    const priorityBtnInput = document.createElement("input");
    priorityBtnInput.setAttribute("type", "hidden");
    priorityBtnInput.setAttribute("class", "priorityInput");

    const lowPriorityBtn = document.createElement("button");
    lowPriorityBtn.setAttribute("class", "priorityBtn");
    lowPriorityBtn.textContent = "Low";

    const mediumPriorityBtn = document.createElement("button");
    mediumPriorityBtn.setAttribute("class", "priorityBtn");
    mediumPriorityBtn.textContent = "Medium";

    const highPriorityBtn = document.createElement("button");
    highPriorityBtn.setAttribute("class", "priorityBtn");
    highPriorityBtn.textContent = "High";

    priorityBtnsDiv.appendChild(priorityBtnInput);
    priorityBtnsDiv.appendChild(lowPriorityBtn);
    priorityBtnsDiv.appendChild(mediumPriorityBtn);
    priorityBtnsDiv.appendChild(highPriorityBtn);

    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "confirmEdit");
    editBtn.textContent = "Confirm Edit";

    priority.appendChild(priorityBtnsDiv);
    priority.appendChild(editBtn)

    for (let task of tasks) {
      if (task.title === name) {
        titleInput.value = task.title;
        descriptionTextarea.value = task.description;
        dueDateInput.value = task.dueDate;
        priorityBtnInput.value = task.priority;
        editForm.appendChild(titleInput);
        editForm.appendChild(descriptionTextarea);
        editForm.appendChild(dueDateDiv);
        editForm.appendChild(priority);
        editModalBody.appendChild(editForm);
        editModal.style.display = "flex";
        return;
      }
    }
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("priorityBtn")) {
      event.preventDefault();
      const priorityInput = document.querySelector(".priorityInput");
      priorityInput.value = event.target.textContent;
    }
  });

  document.addEventListener("click", function (event) {
    const editModal = document.querySelector(".editModal");
    if (event.target.classList.contains("editTaskBtn")) {
      showEditModal(
        event.target.parentElement.querySelector(".taskName").textContent
      );
    } else if (event.target.classList.contains("closeEditModal")) {
      editModal.style.display = "none";
    } else if (event.target.classList.contains("confirmEdit")) {
      event.preventDefault();
      const name = document.querySelector(".ogName").value;
      editTask(name);
      editModal.style.display = "none";
      todosDiv.innerHTML = "";
      for (let task of tasks) {
        todosDiv.appendChild(createTaskDiv(task));
      }

      if (todosDiv.querySelector("h1") !== null) {
        viewProject(todosDiv.querySelector("h1").textContent);
      }
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteTask")) {
      let taskName = event.target.parentElement.querySelector(".taskName");
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title === taskName.textContent) {
          tasks.splice(i, 1);
          todosDiv.removeChild(event.target.parentElement);
          break;
        }
      }
    }
  });
})();
