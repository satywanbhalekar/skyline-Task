// Define the allocated time in minutes
const ALLOCATED_TIME = 5;

// Get the password form, input, submit button, and time remaining container
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const submitButton = document.getElementById("submit-button");
const timeRemainingContainer = document.getElementById("time-remaining-container");

// Get the door elements
const doorLeft = document.querySelector(".door-left");
const doorRight = document.querySelector(".door-right");

// Get the lock element and its hole
const lock = document.querySelector(".lock");
const lockHole = document.querySelector(".lock-hole");

// Get the time-up container and its message element
const timeUpContainer = document.getElementById("time-up-container");
const timeUpMessage = document.querySelector("#time-up-container p");

// Initialize the time remaining
let timeRemaining = ALLOCATED_TIME * 60;

// Update the time remaining on the page
function updateTimeRemaining() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  document.getElementById("time-remaining").textContent = formattedTime;
}

// Start the lab by sliding the doors open and starting the timer
function startLab() {
  // Slide the doors open
  doorLeft.classList.add("slide-left");
  doorRight.classList.add("slide-right");

  // Set up the lock animation
  lock.style.animation = "rotate 1s linear forwards";
  lockHole.style.animation = "fade 1s linear forwards";

  // Hide the password form and show the time remaining container
  passwordForm.style.display = "none";
  timeRemainingContainer.style.display = "block";

  // Start the timer
  const timerId = setInterval(() => {
    timeRemaining--;
    updateTimeRemaining();

    // If the time is up, show the time-up message and exit the lab
    if (timeRemaining <= 0) {
      timeUpMessage.textContent = "You have exhausted your allocated time!";
      timeUpContainer.style.display = "flex";
      exitLab(timerId);
      exitLab();
    }
  }, 1000);
}

// Exit the lab by sliding the doors closed and resetting the timer
// function exitLab(timerId) {
//   // Slide the doors closed
//   doorLeft.classList.remove("slide-left");
//   doorRight.classList.remove("slide-right");

//   // Reset the lock animation
//   lock.style.animation = "";
//   lockHole.style.animation = "";

//   // Reset the timer
//   timeRemaining = ALLOCATED_TIME * 60;
//   updateTimeRemaining();

//   // Hide the time-up message
//   timeUpContainer.style.display = "none";

//   // Hide the lab
//   document.getElementById("time-remaining-container").style.display = "none";

//   // Stop the timer
//   clearInterval(timerId);
// }
function exitLab() {
    // Clear the password input field
    passwordInput.value = "";
  
    // Hide the lab and time remaining container
    document.getElementById("lab").style.display = "none";
    timeRemainingContainer.style.display = "none";
  
    // Reset the timer and hide the time-up message
    timeRemaining = ALLOCATED_TIME * 60;
    updateTimeRemaining();
    timeUpContainer.style.display = "none";
  
    // Stop the timer
    clearInterval(timerId);
  
    // Redirect to the home page

  }
 

// Add an event listener to the password form submit button
submitButton.addEventListener("click", event => {
  event.preventDefault();

  // Get the entered password
  const password = passwordInput.value;

  // If the password is correct, start the lab
  if (password === "mypassword") {
    startLab();
  } else {
    // Otherwise, show an error message
    alert("Incorrect password. Please try again.");
  }

  // Clear the password input
  passwordInput.value = "";
});

// Add an event listener to the exit button
document.getElementById("exit-button").addEventListener("click", () => {
  exitLab();
});
const exitButton = document.getElementById("exit-button");
        exitButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
// Initialize the time remaining on the page
updateTimeRemaining();
