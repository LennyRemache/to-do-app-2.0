const inputText = document.querySelector(".input-txt");
const addBtn = document.querySelector(".add-btn");
const mainEl = document.querySelector("main");
let todos = [];

const currTasks = JSON.parse(localStorage.getItem("myTasks"))
if (currTasks) {
    todos = currTasks;
    renderTasks();
}

addBtn.addEventListener("click", () => {
    const task = inputText.value;
    if (task.length === 0) {
        inputText.setAttribute("placeholder",  "Please enter a task!");
        inputText.style.color = "crimson";
        return;
    }
    else {
        inputText.setAttribute("placeholder",  "Your Task Here");
    }
    inputText.value = "";
    todos.push(task);
    renderTasks();
});

function renderTasks() {

    localStorage.setItem("myTasks", JSON.stringify(todos))

    let allTasks = ""
    todos.forEach(todo => {
        //console.log(todo);
        allTasks += `
        <div class="task">
            <input class="task-txt" type="text" value=${todo} readonly />
            <div class="action-btns">
                <input class="edit-btn" type="button" value="EDIT" />
                <input class="del-btn" type="button" value="DELETE" />
            </div>
        </div>
        `;
    });
    mainEl.innerHTML = allTasks;

    const tasks = [...document.querySelectorAll(".task")];
    const taskTexts = [...document.querySelectorAll(".task-txt")];
    const editBtns = [...document.querySelectorAll(".edit-btn")];
    const delBtns = [...document.querySelectorAll(".del-btn")];

    editBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = editBtns.indexOf(btn);
            if (btn.value === "EDIT") {
                btn.value = "SAVE";
                taskTexts[id].removeAttribute("readonly");
                taskTexts[id].style.color = "crimson";
                taskTexts[id].focus();
            }
            else {
                // btn.value = "EDIT";
                // taskTexts[id].setAttribute("readonly", "true");
                // taskTexts[id].style.color = "white";
                //console.log(taskTexts[id].value);
                if (taskTexts[id].value.length === 0) {
                    todos.splice(id, 1);
                    renderTasks();
                    return;
                }
                todos[id] = taskTexts[id].value;
                //console.log(todos);
                renderTasks();
            }
        });
    });

    delBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = delBtns.indexOf(btn);
            todos.splice(id, 1);
            renderTasks();
        });
    });
}