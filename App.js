import React, { useState } from 'react';
import { API } from 'aws-amplify';

function App() {
  const [file, setFile] = useState(null);
  const apiName = "AssetUploadAPI"; // Your API name
  const path = "/upload-asset"; // API Gateway endpoint

  const uploadFile = async () => {
    if (!file) {
      alert("Select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async () => {
      const fileContent = btoa(reader.result); // Convert file to Base64
      const assetId = file.name.split('.')[0];

      try {
        await API.post(apiName, path, {
          body: {
            asset_id: assetId,
            file_content: fileContent
          }
        });
        alert("File uploaded successfully!");
      } catch (err) {
        alert("Upload failed.");
      }
    };
  };

  return (
    <div>
      <h1>Asset Management System</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload Asset</button>
    </div>
  );
}

export default App;
