let tasks = [];

if (!localStorage.tasks) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

function Task(description) {
  this.description = description;
}

function sortArray(array) {
  array.sort(function a(obj1, obj2) {
    if (obj1.description < obj2.description) {
      return -1;
    }
    return 1;
  });
}

function createTask(array, ul) {
  const pre = document.createElement('pre');
  const index = array.length;

  for (let i = 0; i < index; i += 1) {
    const li = document.createElement('li');
    li.setAttribute('id', 'taskLi');
    li.appendChild(document.createTextNode(array[i].description));
    ul.appendChild(pre);
    pre.appendChild(li);
  }
}

function fillTask(ul) {
  document.getElementById('list').innerHTML = '';

  if (tasks.length > 0) {
    createTask(tasks, ul);
  }
}
function updateLocal() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  const interactive = document.createElement('div');

  const input = document.createElement('input');

  const button = document.createElement('button');
  button.innerHTML = 'add';

  const clearButton = document.createElement('button');
  clearButton.innerHTML = 'clear';

  const divList = document.createElement('div');
  divList.setAttribute('id', 'container');

  const ul = document.createElement('ul');
  ul.setAttribute('id', 'list');

  const body = document.querySelector('body');

  body.appendChild(interactive);
  interactive.appendChild(input);
  interactive.appendChild(button);
  interactive.appendChild(clearButton);
  body.appendChild(divList);
  divList.appendChild(ul);

  sortArray(tasks);
  fillTask(ul);
  updateLocal();

  function output() {
    if (input.value.trim() === '') {
      return;
    }
    tasks.push(new Task(input.value));
    updateLocal();
    sortArray(tasks);
    fillTask(ul);

    input.value = '';
  }
  button.addEventListener('click', output);

  window.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      output();
    }
  });

  clearButton.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
  });
}
window.addEventListener('load', render);
