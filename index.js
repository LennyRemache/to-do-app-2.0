const inputText = document.querySelector(".input-txt");
const addBtn = document.querySelector(".add-btn");
const mainEl = document.querySelector("main");

//const currTasks = JSON.parse(localStorage.getItem("myTasks"));
//console.log(currTasks);
// if (currTasks) {
//     currTasks.forEach(task => {
//         mainEl.innerHTML += task;
//     })
// };

addBtn.addEventListener("click", () => {
    const task = inputText.value;
    if (task.length === 0) {
        inputText.setAttribute("placeholder",  "Please enter a task!");
        return;
    }
    else {
        inputText.setAttribute("placeholder",  "Your Task Here");
    }
    inputText.value = "";
    mainEl.innerHTML += `
        <div class="task">
            <input class="task-txt" type="text" value=${task} readonly />
            <div class="action-btns">
                <input class="edit-btn" type="button" value="EDIT" />
                <input class="del-btn" type="button" value="DELETE" />
            </div>
        </div>
    `;

    const tasks = [...document.querySelectorAll(".task")];
    //console.log(tasks);
    const taskTexts = [...document.querySelectorAll(".task-txt")];
    const editBtns = [...document.querySelectorAll(".edit-btn")];
    const delBtns = [...document.querySelectorAll(".del-btn")];

    //localStorage.setItem("myTasks", [...tasks]);
    // let taskArr = [];
    // tasks.forEach(test => {
    //     console.log(test.outerHTML);
    //     taskArr.push(test.outerHTML);
    // });
    // localStorage.setItem("myTasks", JSON.stringify(taskArr));

    editBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = editBtns.indexOf(btn);
            if (btn.value === "EDIT") {
                btn.value = "SAVE";
                taskTexts[id].removeAttribute("readonly");
                taskTexts[id].style.color = "crimson";
                taskTexts[id].focus();
                //taskTexts[id].value = taskTexts[id].value;
            }
            else {
                btn.value = "EDIT";
                taskTexts[id].setAttribute("readonly", "true");
                taskTexts[id].style.color = "white";
            }
        });
    });

    delBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = delBtns.indexOf(btn);
            tasks[id].remove();

        });
    });
});