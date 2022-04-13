//Deyisenler
let form = document.getElementById("form");
let form_div = document.getElementById("form-div");
let btn = document.getElementById("btn");
let first = document.querySelector(".to");
let filter = document.getElementById("filter");
let index = 0;
allEventListeners();

function allEventListeners() {
  //butun listenerslar
  first.addEventListener("blur", firstTodo);
  form.addEventListener("submit", addTodo);
  form_div.addEventListener("click", deleteTodo);
  filter.addEventListener("click", filterTodo);
}

//Todolari Filterlemek
function filterTodo(e) {
  let todos = document.querySelectorAll(".filterTodos");
  let arr = [];
  // arr massivine input deyerlerini elave etmek
  todos.forEach((item) => {
    arr.push(item.value.trim());
  });
  if (index === 0) {
    filter.src = "images/filterAZ.svg";
    // arr i A-Z siralamaq
    arr.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });
    index++;
  } else {
    filter.src = "images/filterZA.svg";
    index--;
    arr.sort((a, b) => {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  form_div.innerHTML = "";
  //arrayi inputa menimsetmek
  arr.forEach((item) => {
    form_div.innerHTML += `
  <div class="todo-div">
  <input type="text" id="todo" class="todo filterTodos" value="${item}">
  <div class="delete">
    <span class="x">&times</span>
  </div>
</div>
  `;
  });
}

//todo silmek
function deleteTodo(e) {
  if (e.target.className === "delete") {
    if (e.target.parentElement.parentElement.childElementCount === 1) {
      alert("Son Todonu Silmek Mumkun deil");
    } else {
      e.target.parentElement.remove();
    }
  } else if (e.target.className === "x") {
    if (
      e.target.parentElement.parentElement.parentElement.childElementCount === 1
    ) {
      alert("Son Todonu Silmek Mumkun deil");
    } else {
      e.target.parentElement.parentElement.remove();
    }
  }
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
    <input type="text" id="todo" class="todo filterTodos"/>
    <div class="delete">
      <span class="x">&times</span>
    </div>
  </div>`;
  let input = document.querySelectorAll("#todo");
  input.forEach(findItem);
}

//value menimsetme funksiyasi
function findItem(item) {
  item.addEventListener("keyup", (e) => {
    item.addEventListener("blur", (e) => {
      item.setAttribute("value", item.value);
    });
  });
}
