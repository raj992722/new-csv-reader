//  async function uploadFile() {
//     const fileInput = document.getElementById('fileInput');
//     const formData = new FormData(fileInput);
//     // formData.append('file', fileInput.files[0]);
  
//    const response=await fetch('/api/files/upload', {
//       method: 'POST',
//       body: formData,
//     });
//     if(response.ok){
//       // await loadFileList();
//       console.log(response);
//     }else{
//       console.error("file upload failed");
//     }
    
//   }

async function uploadFile() {
  try {
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData(document.getElementById('fileForm'));
    console.log(formData);
    console.log("fileInput",fileInput);

    const response = await fetch('/api/files/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log(response);
      await loadFileList();
    } else {
      console.error('File upload failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

  
  // async function loadFileList() {
  //   try {
  //     const response = await fetch('/api/files/list');
  //     if (!response.ok) {
  //       console.error('Failed to retrieve file list');
  //       return;
  //     }
  
  //     const { files } = await response.json();
  
  //     const selectFile = document.getElementById('selectFile');
  //     selectFile.innerHTML = '<option value="" disabled selected>Select a file</option>';
  //     files.forEach(file => {
  //       const option = document.createElement('option');
  //       option.value = file;
  //       option.textContent = file;
  //       selectFile.appendChild(option);
  //     });
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }
  
  async function loadFileList() {
    try {
      const response = await fetch('/api/files/list');
      if (!response.ok) {
        console.error('Failed to retrieve file list');
        return;
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const { files } = await response.json();
        console.log(files)
  
        const selectFile = document.getElementById('selectFile');
        selectFile.innerHTML = '<option value="" disabled selected>Select a file</option>';
        files.forEach(file => {
          const option = document.createElement('option');
          option.value = file;
          option.textContent = file;
          selectFile.appendChild(option);
        });
      } else {
        console.error('Unexpected response format. Expected JSON.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  
 async function loadData() {
    const selectedFile = document.getElementById('selectFile').value;
  
    fetch(`/api/files/data/${selectedFile}`)
    .then(response => response.json())
    .then(data => {
      renderTable(data);
    })
    .catch(error => console.error('Error:', error));
  }
  
  function renderTable(data) {
    const dataTable = document.getElementById('dataTable');
    dataTable.innerHTML = '';
  
    if (data.length === 0) {
      return;
    }
  
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
  
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
  
    dataTable.appendChild(headerRow);
  
    data.forEach(row => {
      const tr = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = row[header];
        tr.appendChild(td);
      });
      dataTable.appendChild(tr);
    });
  }
  
  function searchTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.querySelectorAll('tr');
  
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      let rowMatchesSearch = false;
  
      cells.forEach(cell => {
        if (cell.textContent.toLowerCase().includes(searchInput)) {
          rowMatchesSearch = true;
        }
      });
  
      if (rowMatchesSearch) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  // Add sorting functionality if needed
  
  loadFileList();
  