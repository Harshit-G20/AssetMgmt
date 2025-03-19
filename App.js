const apiGatewayUrl = "https://your-api-gateway-url"; // Replace with your API Gateway URL

async function uploadFile() {
    const file = document.getElementById('fileUpload').files[0];
    if (!file) {
        alert("Please select a file first.");
        return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async function () {
        const fileContent = btoa(reader.result); // Convert to Base64
        const assetId = file.name.split('.')[0]; // Extract asset ID

        try {
            const response = await fetch(apiGatewayUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    asset_id: assetId,
                    file_content: fileContent
                })
            });

            if (response.ok) {
                alert("File uploaded successfully!");
            } else {
                alert("Upload failed.");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };
}

async function fetchAssets() {
    try {
        const response = await fetch(`${apiGatewayUrl}/list-assets`);
        const assets = await response.json();

        const assetList = document.getElementById('assetList');
        assetList.innerHTML = "";
        assets.forEach(asset => {
            const li = document.createElement("li");
            li.textContent = asset;
            assetList.appendChild(li);
        });
    } catch (err) {
        alert("Error fetching assets: " + err.message);
    }
}
