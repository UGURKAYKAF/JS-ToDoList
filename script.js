// Listenin elemanları dizide tutulacak
let tasks = [];

// Dizide Json dosyasına aktarılacak eğer json dosyası yoksa kendş oluştursun
if (localStorage.getItem("tasks") === null) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  alert("Yapılacak iş yok!!");
} else {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
// const taskTime = document.getElementById("taskTime");
const taskTime2 = document.getElementById("taskTime2");
const taskAdd = document.getElementById("taskAdd");
const taskClear = document.getElementById("taskClear");

// Görevleri ekrana yazdıran fonksiyon
function showTasks() {
  taskList.innerHTML = "";

  // Saat değişkenine göre sıralama
  tasks.sort(function (a, b) {
    return a.time.localeCompare(b.time);
  });

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${task.title} - ${task.time}</span><button data-index="${index}">Sil</button>`;
    taskList.appendChild(li);
  });
}

// Görevleri localstorage'a kaydeden fonksiyon
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Görev ekleme işlemi
function addTask(e) {
  e.preventDefault();

  const title = taskInput.value.trim();
  const time = taskTime2.value;
//   const time = taskTime.value.trim();


  if (title === "" || time === "") {
    alert("Lütfen görev ve zaman bilgilerini girin!");
    return;
  }

  const task = { title, time };
  tasks.push(task);
  saveTasks();
  showTasks();

  taskInput.value = "";
  taskTime2.value = "";
}

// Görev silme işlemi
function deleteTask(e) {
  if (!e.target.matches("button")) return;

  const index = e.target.dataset.index;
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}

// Localstorage'daki tüm görevleri silme işlemi
function clearTasks() {
  const confirmClear = confirm("Tüm görevleri silmek istediğinizden emin misiniz?");

  if (confirmClear) {
    localStorage.removeItem("tasks");
    tasks = [];
    showTasks();
  }
}

taskAdd.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
taskClear.addEventListener("click", clearTasks);

showTasks();
