const inputText = document.querySelector('#texto-tarefa');
const btnCreate = document.querySelector('#criar-tarefa');
const listTasks = document.querySelector('#lista-tarefas');
const btnSave = document.querySelector('#salvar-tarefas');
const btnMoveUp = document.querySelector('#mover-cima');
const btnMoveDown = document.querySelector('#mover-baixo');
const btnRemove = document.querySelector('#remover-selecionado');

const createTask = () => {
  const listItem = document.createElement('li');
  listItem.innerHTML = inputText.value;
  listTasks.appendChild(listItem);
  inputText.value = '';
};

btnCreate.addEventListener('click', createTask);

const setSelected = (event) => {
  for (let index = 0; index < listTasks.children.length; index += 1) {
    listTasks.children[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
};

listTasks.addEventListener('click', setSelected);

const completeTask = (event) => {
  event.target.classList.toggle('completed');
};

listTasks.addEventListener('dblclick', completeTask);

const buttonClear = document.querySelector('#apaga-tudo');

const clearTasks = () => {
  for (let index = listTasks.children.length - 1; index >= 0; index -= 1) {
    listTasks.children[index].remove();
  }
};

buttonClear.addEventListener('click', clearTasks);

const buttonRemove = document.querySelector('#remover-finalizados');

const removeCompletedTask = () => {
  for (let index = listTasks.children.length - 1; index >= 0; index -= 1) {
    const currentItem = listTasks.children[index];

    if (currentItem.classList.contains('completed')) {
      listTasks.removeChild(currentItem);
    }
  }
};

buttonRemove.addEventListener('click', removeCompletedTask);

const saveTasks = () => {
  const tasks = listTasks.innerHTML;
  localStorage.setItem('savedTasks', tasks);
};

btnSave.addEventListener('click', saveTasks);

const loadTasks = () => {
  const getSavedTasks = localStorage.getItem('savedTasks');
  if (getSavedTasks !== null) {
    listTasks.innerHTML = getSavedTasks;
  }
};

loadTasks();

const moveUpTask = () => {
  const itemSelected = document.querySelector('.selected');

  if (itemSelected !== null && itemSelected.previousElementSibling) {
    const previousElement = itemSelected.previousElementSibling;

    listTasks.insertBefore(itemSelected, previousElement);
  }
};

btnMoveUp.addEventListener('click', () => moveUpTask());

const moveDownTask = () => {
  const itemSelected = document.querySelector('.selected');

  if (itemSelected !== null && itemSelected.nextElementSibling) {
    const nextElement = itemSelected.nextElementSibling;

    listTasks.insertBefore(nextElement, itemSelected);
  }
};

btnMoveDown.addEventListener('click', () => moveDownTask());

const removeTask = () => {
  for (let i = 0; i < listTasks.children.length; i += 1) {
    if (listTasks.children[i].classList.contains('selected')) {
      listTasks.children[i].remove();
    }
  }
};

btnRemove.addEventListener('click', () => removeTask());
