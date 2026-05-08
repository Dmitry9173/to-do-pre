let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

// Загружает задачи из localStorage или возвращает список по умолчанию
function loadTasks() {
    const storedTasks = localStorage.getItem('todoTasks');
    return storedTasks ? JSON.parse(storedTasks) : items;
}

// Создаёт элемент задачи на основе текста
function createItem(itemText) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");
    
    textElement.textContent = itemText;
    
    // Удаление задачи
    deleteButton.addEventListener('click', () => {
        clone.remove();
        saveTasks(getTasksFromDOM());
    });
    
    // Копирование задачи
    duplicateButton.addEventListener('click', () => {
        const newItem = createItem(textElement.textContent);
        listElement.prepend(newItem);
        saveTasks(getTasksFromDOM());
    });
    
    // Редактирование задачи
    editButton.addEventListener('click', () => {
        textElement.contentEditable = true;
        textElement.focus();
    });
    
    // Сохранение после редактирования (потеря фокуса)
    textElement.addEventListener('blur', () => {
        textElement.contentEditable = false;
        saveTasks(getTasksFromDOM());
    });
    
    // Сохранение по нажатию Enter
    textElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            textElement.blur();
        }
    });
    
    return clone;
}

// Собирает все задачи из DOM
function getTasksFromDOM() {
    const elements = listElement.querySelectorAll('.to-do__item-text');
    return Array.from(elements).map(el => el.textContent);
}

// Сохраняет задачи в localStorage
function saveTasks(tasks) {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Инициализация приложения
function init() {
    items = loadTasks();
    listElement.innerHTML = '';
    
    items.forEach(item => {
        listElement.append(createItem(item));
    });
    
    // Обработка отправки формы
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = inputElement.value.trim();
        
        if (taskText) {
            listElement.prepend(createItem(taskText));
            saveTasks(getTasksFromDOM());
            inputElement.value = '';
        } else {
            alert('Пожалуйста, введите текст задачи!');
        }
    });
}

// Запуск после загрузки страницы
document.addEventListener('DOMContentLoaded', init);