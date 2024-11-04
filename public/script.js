// Select the elements
const diceResult = document.getElementById("diceResult");
const rollBtn = document.querySelector(".rollDice");
const diceImage = document.querySelector(".diceImg");

// Function to fetch the random number from /api/d6 and display it
async function rollDice() {
    try {
        // Fetch the random number from the API
        const response = await fetch("http://localhost:8000/api/d6");

        // Get the text response, which is the random number message
        const result = await response.text();

        // Set the inner HTML of the diceResult div to the result
        diceResult.innerHTML = result;
      
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        diceResult.innerHTML = "Error fetching dice roll.";
    }
}

// Add an event listener to the button to call rollDice when clicked
rollBtn.addEventListener("click", rollDice);
