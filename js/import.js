// Add an event listener to the import button
const importBtn = document.getElementById('import-btn');

importBtn.addEventListener('click', () => {
  // Create a file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';

  // Listen for the file input change event
  fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const fileContent = e.target.result;
        // Process the file content and update localStorage
        processImportedFile(fileContent);

        // Remove the temporary file input element
        document.body.removeChild(fileInput);
      };

      reader.readAsText(selectedFile);
    }
  });

  // Programmatically trigger a click event on the file input
  fileInput.click();
});

function processImportedFile(fileContent) {
  try {
    const importedData = JSON.parse(fileContent);

    // Clear existing localStorage
    localStorage.clear();

    // Update localStorage with the imported data
    for (const key in importedData) {
      if (importedData.hasOwnProperty(key)) {
        localStorage.setItem(key, importedData[key]);
      }
    }

    // Optionally, you can refresh the page or update the UI to reflect the changes
    location.reload();
  } catch (error) {
    console.error('Error processing imported file:', error);
  }
}
