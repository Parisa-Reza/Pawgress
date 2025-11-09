const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const renderImage = document.getElementById("renderImage");
const renderMotivate = document.getElementById("renderMotivate");

// check if there is any saved todo list on the local storage

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : []; // ternary operator
//JSON.parse() converts string to object

// check saved todo list progress image on the local storage
const savedImageIndex = JSON.parse(localStorage.getItem("currentImageIndex"));
const savedMotivateIndex = JSON.parse(
  localStorage.getItem("currentMotivateIndex")
);
const images = [
  "cat-images/download (1).jpeg",
  "cat-images/download (2).jpeg",
  "cat-images/download.jpeg",
  "cat-images/images.jpeg",
];
const motivate = [
  "LET'S DO IT WARRIOR!",
  "KEEP GOING WARRIOR!",
  "ALMOST THERE WARRIOR!",
  "CONGRATULATIONS WARRIOR!",
];

if (savedMotivateIndex !== null && motivate[savedMotivateIndex]) {
  renderMotivate.innerText = motivate[savedMotivateIndex];
}
if (savedImageIndex !== null && images[savedImageIndex]) {
  renderImage.src = images[savedImageIndex];
}

// save current todo list on local storage

function saveTodo() {
  // JSON.stringify() converts object to string
  localStorage.setItem("todos", JSON.stringify(todos));
  if (todos.length === 0) {
    renderImage.src = ""; // hide image
    renderMotivate.innerText = "";
    localStorage.removeItem("currentImageIndex"); // remove saved image index
    localStorage.removeItem("currentMotivateIndex");
    return;
  }
}

// adding to do list

addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (!text) {
    return;
  }

  todos.push({ text, completed: false });
  todoInput.value = "";

  rendering();
  saveTodo();
  showImage();
});

//creating a todo list node
// in the node there will be checkbox, todo text, delete button
// editing for double clicking

//creating a todo list node
const createTodoListNode = (todo, index) => {
  const li = document.createElement("li");
  li.className = "flex items-center justify-between bg-purple-100 p-2 ";

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.className = "w-4 h-4 accent-purple-600";

  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    listTextSpan.style.textDecoration = todo.completed ? "line-through" : "";
    saveTodo();
    showImage();
  });

  // text
  const listTextSpan = document.createElement("span");
  listTextSpan.textContent = todo.text;
  listTextSpan.className = "flex-1 ml-3 ";
  
  if (todo.completed) {
    listTextSpan.style.textDecoration = "line-through";
  }

  // edit
 const editBtn = document.createElement("button");
  const editIcon = document.createElement("i");

  editIcon.classList.add("fa-solid", "fa-pen-to-square", "text-purple-500","mr-2","hover:text-purple-800");
    
  editBtn.appendChild(editIcon);
  
  editBtn.addEventListener("click", () => {
    const newText = prompt("edit the to-do", todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      listTextSpan.textContent = todo.text;
      saveTodo();
    }
  });

  // delete button
  const deleteBtn = document.createElement("button");
  const deleteIcon = document.createElement("i");

  deleteIcon.classList.add("fa-solid", "fa-trash", "text-purple-500","hover:text-purple-800");

  deleteBtn.appendChild(deleteIcon);



  deleteBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    rendering();
    saveTodo();
    showImage();
  });

  li.appendChild(checkbox);
  li.appendChild(listTextSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
};


//rendering the whole todo list from the todo array

const rendering = () => {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const node = createTodoListNode(todo, index);
    todoList.appendChild(node);
  });
};
rendering();

//1/4 hole ekta pic dkhabe
//2/4 hole ekta pic dkhabe, 3/4 hole arekta
// purata complete hole ekta pic dkhabe
//so progress variable rakha lagbe ja  pic render kore

function showImage() {
  let countTasks = todos.length;
  let completedt = todos.filter((todo) => todo.completed).length; // completed tasks

  const progress = completedt / countTasks;

  let condition =
    progress <= 1 / 4 ? 0 : progress <= 2 / 4 ? 1 : progress < 1 ? 2 : 3;

  const images = [
    "cat-images/download (1).jpeg",
    "cat-images/download (2).jpeg",
    "cat-images/download.jpeg",
    "cat-images/images.jpeg",
  ];
  const motivate = [
    "LET'S DO IT WARRIOR!",
    "KEEP GOING WARRIOR!",
    "ALMOST THERE WARRIOR!",
    "CONGRATULATIONS WARRIOR!",
  ];
  renderImage.src = images[condition];
  renderMotivate.innerText = motivate[condition];
  let currentImageIndex = condition;
  let currentMotivateIndex = condition;

  localStorage.setItem("currentImageIndex", JSON.stringify(currentImageIndex));

  localStorage.setItem(
    "currentMotivateIndex",
    JSON.stringify(currentMotivateIndex)
  );
  saveTodo();
}
