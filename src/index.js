import "./style.css";

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
    this.project = null;
  }
}

let task1 = new Todo(
  "Task 1",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "2022-12-31",
  "high"
);

task1.project = "Work";

let task2 = new Todo(
  "Task 2",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "2022-12-31",
  "high"
);

task2.project = "Home";
const tasks = [task1, task2];

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

function createTaskDiv(task) {
  const taskDiv = document.createElement("div");
  taskDiv.setAttribute("class", "todo");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  const paragraph1 = document.createElement("p");
  paragraph1.textContent = task.title;

  const button = document.createElement("button");
  button.textContent = "Details";

  const paragraph2 = document.createElement("p");
  paragraph2.textContent = task.dueDate;

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(paragraph1);
  taskDiv.appendChild(button);
  taskDiv.appendChild(paragraph2);

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
})();
