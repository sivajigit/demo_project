
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const total = document.getElementById("total");
const completed = document.getElementById("completed");

let tasks = [];

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      renderTasks();
    });

    li.append(checkbox, text, deleteButton);
    list.appendChild(li);
  });

  total.textContent = `Total: ${tasks.length}`;
  completed.textContent =
    `Completed: ${tasks.filter((task) => task.done).length}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  tasks.push({
    id: Date.now(),
    title: title,
    done: false
  });

  input.value = "";
  renderTasks();
});

renderTasks();
