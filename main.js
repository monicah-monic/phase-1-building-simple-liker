// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
// Add the .hidden class to the error modal so it does not appear when the page first loads
const errorModal = document.getElementById("modal");
errorModal.classList.add("hidden");

// Add click event listeners to all hearts
const hearts = document.querySelectorAll(".like-glyph");
hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    if (heart.textContent === EMPTY_HEART) {
      mimicServerCall()
        .then(() => {
          // Success: Change heart to full and add activated-heart class
          heart.textContent = FULL_HEART;
          heart.classList.add("activated-heart");
        })
        .catch((error) => {
          // Failure: Display error modal with server error message
          errorModal.classList.remove("hidden");
          errorModal.querySelector("#modal-message").textContent = error;
          setTimeout(() => {
            // Hide the error modal after 3 seconds
            errorModal.classList.add("hidden");
          }, 3000);
        });
    } else {
      // Change heart back to empty and remove activated-heart class
      heart.textContent = EMPTY_HEART;
      heart.classList.remove("activated-heart");
    }
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
