import {
  checkIcon,
  getEditIcon,
  getDeleteIcon,
  getConfirmIcon,
} from "./components/utils/icons";

const todoListEl = document.getElementById("todo-list");
const todoAddBtnEl = document.getElementById("todo-add-btn");
const inputEl = document.getElementById("todo-input");

todoAddBtnEl.addEventListener("click", () => {
  //   console.log(inputEl.value);
  addTask(inputEl.value);
  inputEl.value = "";
  renderTodo();
});

const tasks = [
  {
    id: 0,
    text: "Test #1",
    completed: false,
    isEditing: false,
  },
  {
    id: 1,
    text: "Test #2",
    completed: false,
    isEditing: false,
  },
  {
    id: 2,
    text: "Test #3",
    completed: false,
    isEditing: false,
  },
  {
    id: 3,
    text: "Test #4",
    completed: false,
    isEditing: false,
  },
];

const renderTodo = () => {
  todoListEl.innerHTML = tasks
    .map(
      (task) =>
        `<div class="flex items-center">
             <div class="mr-4">
                ${checkIcon}  
             </div>
            <div class="flex flex-col py-4 w-[80%]">
            ${
              task.isEditing
                ? `<input id="confirm-btn-${task.id}" type="text" value=${task.text} id="disabled-input" aria-label="Rewrite" class="font-semibold mb-auto bg-gray-300 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>`
                : `<dd class="text-lg font-semibold">${task.text}</dd>`
            }
               
             </div>
          <div class="flex ml-auto gap-2">
            ${task.isEditing ? getConfirmIcon(task.id) : getEditIcon(task.id)}
            ${getDeleteIcon(task.id)}   
           </div>
          </div>`
    )
    .join("");

  const allTodoDeleteEls = document.querySelectorAll(".todo-delete-icon");
  const allTodoEditEls = document.querySelectorAll(".todo-edit-icon");
  const allTodoConfirmEls = document.querySelectorAll(".todo-confirm-icon");

  allTodoDeleteEls.forEach((node) => {
    node.addEventListener("click", () => {
      deleteTask(parseInt(node.dataset.taskId));
      renderTodo();
    });
  });

  allTodoEditEls.forEach((node) => {
    node.addEventListener("click", () => {
      onEditMode(parseInt(node.dataset.taskId));
      renderTodo();
    });
  });

  allTodoConfirmEls.forEach((node) => {
    node.addEventListener("click", () => {
      const taskId = parseInt(node.dataset.taskId);
      const newText = document.getElementById(`confirm-btn-${taskId}`).value;

      editTask(parseInt(taskId, newText));
      renderTodo();
    });
  });
};

const addTask = (text) => {
  tasks.unshift({
    id: tasks.length,
    text: text,
    completed: false,
    isEditing: false,
  });
};

const deleteTask = (id) => {
  // console.log("id", id);
  const index = tasks.findIndex((task) => task.id === id);
  // console.log("index", index);

  // console.log("tasks before", tasks);
  tasks.splice(index, 1);
  // console.log("tasks after", tasks);
};

const editTask = (id, text) => {
  const index = tasks.findIndex((item) => item.id === id);

  tasks[index] = {
    ...tasks[index],
    text,
    isEditing: false,
  };
};

const onEditMode = (id) => {
  const index = tasks.findIndex((item) => item.id === id);
  tasks[index] = {
    ...tasks[index],
    isEditing: true,
  };
};

addTask("testujemy dodawanie");
editTask({
  id: 2,
  text: "task EDIT",
  completed: true,
});

renderTodo();
