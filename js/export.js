const exportBtn = document.getElementById('export-btn');

function exportChecklist() {
  var storageJsonContent = JSON.stringify(localStorage, null, 4);

  saveFile(storageJsonContent);
}

function saveFile(file_content) {
  var blob = new Blob([file_content], {type: "application/json"});

  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Progress_Checklist_Export_${Date.now()}.json`;

  a.click();

  URL.revokeObjectURL(a.href);
}

exportBtn.addEventListener('click', () => {
  exportChecklist();
});
