const apiGatewayUrl = "https://xyz.execute-api.us-east-1.amazonaws.com/prod/assets"; // Replace with your API Gateway URL

async function sendAssetData() {
    const assetData = {
        asset_id: "001",
        name: "Cisco Catalyst 9300",
        category: "Networking"
    };

    try {
        const response = await fetch(apiGatewayUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(assetData)
        });

        const result = await response.json();
        alert("Response: " + result);
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Call function on button click
document.getElementById("sendDataButton").addEventListener("click", sendAssetData);
