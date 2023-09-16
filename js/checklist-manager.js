const addChecklistButton = document.getElementById('add-checklist-button');
const checklistContainer = document.getElementById('checklists-container');

// A function to add the tasks
function addTask(cardBody, checkboxValue, taskText) {
  // Creating a new div for the task
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('form-check');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checkboxValue;
  checkbox.classList.add('form-check-input');

  const labelContainer = document.createElement('div');
  labelContainer.classList.add('form-check-label');

  const label = document.createElement('div');
  label.classList.add('text-secondary', 'editable');
  label.setAttribute('contenteditable', 'true');
  label.textContent = taskText;

  labelContainer.appendChild(label);

  taskContainer.appendChild(checkbox);
  taskContainer.appendChild(labelContainer);

  // Implementing task deletion and auto save
  taskContainer.addEventListener('input', () => {
    if (taskContainer.childNodes[1].textContent == '') {
      taskContainer.remove();
    }
    autoSave();
  });

  cardBody.appendChild(taskContainer);
}

// A function to remove the checklist and remove it from storage
function removeChecklist(cardDiv) {
  // Extracting the unique key associated with this checklist
  const checklistKey = cardDiv.dataset.key;

  // Removing the checklist data from local storage
  localStorage.removeItem(checklistKey);

  // Removing the checklist from the container
  cardDiv.remove();
}

// A function to be used in loading and creaing new checklist
function addChecklist(key, version, title, tasks = []) {
  // Creating the card div
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card', 'm-3', 'checklist');

  // Creating the header part of the card
  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');

  const cardHeaderHeading = document.createElement('h3');

  // Heading Changeable Version Part
  const versionEditable = document.createElement('div');
  versionEditable.classList.add('d-inline-block', 'text-secondary', 'editable', 'version-editable');
  versionEditable.setAttribute('contenteditable', 'true');
  versionEditable.textContent = version;

  versionEditable.addEventListener('input', () => {
    autoSave();
  });

  // Heading Changeable Title Part
  const titleEditable = document.createElement('div');
  titleEditable.classList.add('d-inline-block', 'text-secondary', 'editable', 'title-editable');
  titleEditable.setAttribute('contenteditable', 'true');
  titleEditable.textContent = title;

  titleEditable.addEventListener('input', () => {
    autoSave();
  });

  // Putting the card header together
  cardHeaderHeading.appendChild(document.createTextNode('Checklist for releasing '));
  cardHeaderHeading.appendChild(versionEditable);
  cardHeaderHeading.appendChild(document.createTextNode(' of '));
  cardHeaderHeading.appendChild(titleEditable);
  cardHeader.appendChild(cardHeaderHeading);

  // Creating the body part of the card
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  if (tasks != []) {
    tasks.forEach((task) => {
      addTask(cardBody, task[0], task[1]);
    });
  }

  // Creating the footer part of the card
  const cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer', 'text-center');

  // Creating the Add Task Button
  const addTaskBtn = document.createElement('button');
  addTaskBtn.textContent = 'Add Task';
  addTaskBtn.classList.add('btn', 'btn-success', 'me-1', 'add-task');

  // Creating the Remove Checklist Button
  const removeChecklistBtn = document.createElement('button');
  removeChecklistBtn.textContent = 'Remove Checklist';
  removeChecklistBtn.classList.add('btn', 'btn-danger', 'remove-checklist');

  // Putting the Footer Together
  cardFooter.appendChild(addTaskBtn);
  cardFooter.appendChild(removeChecklistBtn);

  // Make the Add Task Button Work
  addTaskBtn.addEventListener('click', () => {
    addTask(cardBody, false, '');
  });

  // Make the Remove Checklist Button Work
  removeChecklistBtn.addEventListener('click', () => {
    removeChecklist(cardDiv);
  });

  const checklistKey = key;
  cardDiv.dataset.key = checklistKey;

  // Putting the card together
  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(cardBody);
  cardDiv.appendChild(cardFooter);

  checklistContainer.appendChild(cardDiv);
}

// A Function to load the checklists
function loadChecklists() {
  checklistContainer.textContent = '';

  // Retrieve all keys from local storage
  const keys = Object.keys(localStorage);
  keys.sort();

  keys.forEach((key) => {
    // Check if the key is a checklist data key (starts with "checklistData_")
    if (key.startsWith('checklistData_')) {
      const storedData = localStorage.getItem(key);

      if (storedData) {
        const checklistData = JSON.parse(storedData);

        // Extract version, title, and tasks from the loaded data
        const versionEditable = checklistData.version;
        const titleEditable = checklistData.title;
        const tasks = checklistData.items;

        // Add the checklist with its data
        addChecklist(key, versionEditable, titleEditable, tasks);
      }
    }
  });
}

// A Function to auto-save the checklists content
function autoSave() {
  const checklists = document.querySelectorAll('.checklist');

  checklists.forEach((cardDiv, index) => {
    const versionEditable = cardDiv.querySelector('.version-editable');
    const titleEditable = cardDiv.querySelector('.title-editable');

    const items = [];
    const checklistCheckbox = cardDiv.querySelectorAll('.card-body input');
    const checklistTasks = cardDiv.querySelectorAll('.card-body div.text-secondary');

    for (var i = 0; i < checklistCheckbox.length; i++) {
      items.push([checklistCheckbox[i].checked, checklistTasks[i].textContent])
    }

    const checklistKey = cardDiv.dataset.key;


    localStorage.setItem(`${checklistKey}`, JSON.stringify({ version: versionEditable.textContent, title: titleEditable.textContent, items }));
  });
}

// Event listener to add a new checklist
addChecklistButton.addEventListener('click', () => {
  addChecklist(`checklistData_${Date.now()}`, 'v0.1.0', 'Progress Checklist');
});

// Load all checklists on page load
window.addEventListener('load', () => {
  loadChecklists();
});
