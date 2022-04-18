//Deyisenler
let form = document.getElementById("form");
let form_div = document.getElementById("form-div");
let btn = document.getElementById("btn");
let first = document.querySelector("#todo");
let filter = document.getElementById("filter");
let index = 0;
allEventListeners();

function allEventListeners() {
  //butun listenerslar
  first.addEventListener("blur", firstTodo);
  form.addEventListener("submit", addTodo);
  form.addEventListener("change", addTodoStorage);
  form_div.addEventListener("click", deleteTodo);
  filter.addEventListener("click", filterTodo);
  document.addEventListener("DOMContentLoaded", loadTodo);
}


//Sehife yuklendiyinden todolari elave etmek
function loadTodo() {
  let todos = getTodoFromStorage();
  if (todos.length === 0) {
    todos.forEach((item) => {
      form_div.innerHTML = `<div class="todo-div " >
    <input type="text" id="todo" class="todo filterTodos " value="${item}">
    <div class="delete">
      <span class="x">&times</span>
    </div>
  </div>
    `
    });
  } else {
    form_div.innerHTML = "";
    console.log(todos.length);
    todos.forEach((item) => {
      form_div.innerHTML += `<div class="todo-div " >
  <input type="text" id="todo" class="todo filterTodos " value="${item}">
  <div class="delete">
    <span class="x">&times</span>
  </div>
</div>
  `;
    });
  }
}

//arrayi storageden almaq
function getTodoFromStorage() {
  let todos;
  if (JSON.parse(localStorage.getItem("Todos")) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Todos"));
  }
  return todos;
}

//arrayi local storaga elave etmek
function addTodoStorage() {
  let arr = getTodo();
  console.log(arr) 
   let todos = getTodoFromStorage();
   for(let i=0;i<arr.length;i++){
    todos[i]=arr[i];
   }
  //todos.push(arr[arr.length - 1]);
  localStorage.setItem("Todos", JSON.stringify(todos));
}

//Todo Arrayi
function getTodo() {
  let todos = document.querySelectorAll(".filterTodos");
  let arr = [];
  // arr massivine input deyerlerini elave etmek
  todos.forEach((item) => {
    arr.push(item.value.trim());
  });
  return arr;
}

//Todolari Filterlemekgut
function filterTodo(){
  let arr = getTodo();
  if (index === 0) {
    filter.src = "images/filterAZ.svg";
    // arr i A-Z siralamaq

    arr.sort((a, b) => {
      if (isNaN(Number(a)) && isNaN(Number(b))) {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return a - b;
      }
    });
    index++;
  } else {
    filter.src = "images/filterZA.svg";
    index--;
    arr.sort((a, b) => {
      if (isNaN(Number(a)) && isNaN(Number(b))) {
        if (a > b) {
          return -1;
        } else if (a < b) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return b - a;
      }
    });
  }
  form_div.innerHTML = "";
  //arrayi inputa menimsetmek
  arr.forEach((item) => {
    form_div.innerHTML += `
  <div class="todo-div " >
  <input type="text" id="todo" class="todo filterTodos local " value="${item}">
  <div class="delete">
    <span class="x">&times</span>
  </div>
</div>
  `;
  let input = document.querySelectorAll("#todo");
  input.forEach(findItem);
  });

}
//todo silmek
function deleteTodo(e) {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    deleteTodoFromStorage(e.target.previousElementSibling.value);
  } else if (e.target.className === "x") {
    e.target.parentElement.parentElement.remove();

    deleteTodoFromStorage(e.target.parentElement.previousElementSibling.value);
  }
}

//Todolari Localdan silmek
function deleteTodoFromStorage(deleteTodo) {
  let todos = getTodoFromStorage();
  todos.forEach((todo, index) => {
    if (todo == deleteTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("Todos", JSON.stringify(todos));
}

//todo elave elemek
function addTodo(e) {
  addTodoUI();
  e.preventDefault();
}

//ilk todo ucun
function firstTodo() {
  first.setAttribute("value", first.value);
}

//todo elave elemek
function addTodoUI() {
  form_div.innerHTML += `
    <div class="todo-div">
    <input type="text" id="todo" class="todo filterTodos local"/>
    <div class="delete">
      <span class="x">&times</span>
    </div>
  </div>`;
  alertify.notify("Əlavə olundu", "success", 1);
  let input = document.querySelectorAll("#todo");
  input.forEach(findItem);
}

//value menimsetme funksiyasi
function findItem(item) {
  item.addEventListener("keyup", (_) => {
    item.addEventListener("blur", (_) => {
      item.setAttribute("value", item.value);
    });
  });
}
