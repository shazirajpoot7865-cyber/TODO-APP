const input = document.getElementById("taskinput");
const addbtn = document.getElementById("addbtn");
const tasklist = document.getElementById("tasklist");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);
renderTasks();
addbtn.addEventListener("click", addTask);
input.addEventListener("keypress",function(e){
    if(e.key ==="Enter"){
        addTask();
    }
});
function addTask() {
    const tasktext = input.value.trim();
    if (tasktext === "") {
        alert("Please Enter a Text");
        return;
    }
    const task = {
        text: tasktext,
        completed: false,
    };
    tasks.push(task);
    input.value = "";
    saveTasks();
    renderTasks();
}
//display all tasks//
function renderTasks() {
    tasklist.innerHTML = "";
    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        const tasktext = document.createElement("span");
        tasktext.textContent = task.text;
        if (task.completed) {
            tasktext.classList.add("completed");
        }
        const buttonsdiv=document.createElement("div");
        //Done button//
        const donebtn=document.createElement("button");
        donebtn.textContent="done";
        donebtn.addEventListener("click",function(){
        tasks[index].completed=!tasks[index].completed;
        saveTasks();
        renderTasks();
    })
     const deletebtn=document.createElement("button");
        deletebtn.textContent="delete";
        deletebtn.addEventListener("click",function(){
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });
        buttonsdiv.appendChild(donebtn);
        buttonsdiv.appendChild(deletebtn);
        li.appendChild(tasktext);
        li.appendChild(buttonsdiv);
        tasklist.appendChild(li);
    });
}
    function saveTasks(){
     const data=JSON.stringify(tasks);
        localStorage.setItem("tasks",data)
    }
