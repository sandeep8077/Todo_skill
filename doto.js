(function() {
    let task = [];
    const button = document.getElementById('add');
    const ul_items = document.querySelector('.li-container');
    const counter = document.getElementById('counter');
    const itag = document.getElementsByClassName('fa-solid');
    const input = document.getElementById('add-input');


    //show popus notification
    function notification(text) {
        alert(text);
    }

    // add html element use Dom
    function addTaskToDom(item) {

        const li = document.createElement('li');

        li.innerHTML = ` <li class="li-items">
        <span><input data-id='${item.id}'class="check" ${item.complete ? 'checked' : '' } type="checkbox">
        
        <span>${item.text}</span></span>
        <i data-id="${item.id}" class="fa-solid fa-trash" ></i>
        </li>`

        ul_items.append(li)


    }

    // Render all Changes on the browser Screen
    function render() {
        ul_items.innerHTML = '';
        for (let i = 0; i < task.length; i++) {
            addTaskToDom(task[i]);
        }
        counter.innerText = task.length
    }




    // delete task
    function deleteTask(taskId) {
        const newtask = task.filter(function(item) {
            return item.id !== taskId;
        })
        task = newtask;
        render();

    }

    // mark if task is complete
    function markTaskAsComplete(taskId) {
        const mark = task.filter(function(item) {
            return item.id === taskId;
        });
        console.log(mark.length);

        if (mark.length > 0) {
            const currentTask = mark[0];
            currentTask.complete = !currentTask.complete;


            console.log(currentTask.complete);


            render();
            notification('task is completed');
            return;
        }
        notification('task is not completed');
    }

    //add task to the list
    function addTask(taskObj) {
        if (taskObj) {
            task.push(taskObj);
            notification('added task successfully');
            render();
            return;
        } else {
            notification('task is not added');

        }
    }





    function handleInputByClick(e) {

        //handle "Enter" key press event
        if (e.key === 'Enter') {
            const inputTag = document.getElementById('add-input');
            const valueInput = inputTag.value;
            if (!valueInput) {
                notification('please enter todo');
                return;
            }

            inputTag.value = '';
            const taskObj = {
                id: Date.now().toString(),
                text: valueInput,
                complete: false
            }
            addTask(taskObj);
        }


    }


    var count = 0;
    // handle delegation 
    function handeClickEvent(e) {
        const target = e.target;

        //handle delete button click event
        if (target.className === "fa-solid fa-trash") {
            const i_d = target.dataset.id;
            deleteTask(i_d);
        } else if (target.className === "check") {

            const i_d = target.dataset.id;
            markTaskAsComplete(i_d);
        }

        //handle button click event
        else if (target.className === 'button') {
            const inputV = document.getElementById('add-input');
            const valueInput = inputV.value;
            if (!valueInput) {
                notification('please Enter todo items');
                return;
            }

            inputV.value = '';
            const taskObj = {
                id: Date.now().toString(),
                text: valueInput,
                complete: false
            }
            addTask(taskObj);

        }

        //handle togle event
        else if (target.className === 'toggle') {
            console.log(target);

            if (count % 2 == 0) {
                document.getElementsByClassName('container')[0].style.backgroundColor = 'black';
                document.getElementsByClassName('sidebar')[0].style.float = 'right';
                document.getElementsByTagName('h1')[0].style.color = 'white';
                document.getElementById('totel').style.color = 'white';
                document.getElementsByClassName('button')[0].color = 'white';
                count++;
                console.log(count);
            } else {
                document.getElementsByClassName('container')[0].style.backgroundColor = 'lightgray';
                document.getElementsByClassName('sidebar')[0].style.float = 'left';
                document.getElementsByTagName('h1')[0].style.color = 'black';
                document.getElementById('totel').style.color = 'black';
                count++;

            }

        }

    }

    function initilizeApptodo() {

        input.addEventListener('keyup', handleInputByClick);
        document.addEventListener('click', handeClickEvent);
    }
    initilizeApptodo();


})();