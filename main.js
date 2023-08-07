// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!

// Add the .hidden class to the error modal in the HTML so it does not appear when the page
document.querySelector("#modal").classList.add("hidden");

// When a user clicks on an empty heart: invoke mimicServerCall to simulate making a server request.
document.querySelector(".like-glyph").addEventListener("click", () => {
  if (
    !document.querySelector(".like-glyph").classList.contains("activated-heart")
  ) {
    mimicServerCall()
      // When the "server" returns a success status: change the heart to a full heart and add the .activated-heart class to make the heart appear red.
      .then(() => {
        document.querySelector(".like-glyph").innerHTML = FULL_HEART;
        document.querySelector(".like-glyph").classList.add("activated-heart");
      })

      // When the "server" returns a failure status:
      // 1. respond to the error using a .catch(() => { }) block after your.then(() => { }) block.
      // 2. Display the error modal by removing the .hidden class.
      // 3. Display the server error message in the modal.
      // 4. Use setTimeout to hide the modal after 3 seconds (add the .hidden class).
      .catch((error) => {
        document.querySelector("#modal").classList.remove("hidden");
        document.querySelector("#modal").innerHTML = error;
        setTimeout(() => {
          document.querySelector("#modal").classList.add("hidden");
        }, 3000);
      });

    // When a user clicks on a full heart: change the heart back to an empty heart and remove the .activated-heart class.
  } else {
    document.querySelector(".like-glyph").innerHTML = EMPTY_HEART;
    document.querySelector(".like-glyph").classList.remove("activated-heart");
  }
});
// Keep all your styling rules entirely in style.css. Do not manipulate any .style properties.
// Only manipulate the DOM once the server request responds (pessimistic). Do not make the heart full until you're inside a successful .then block.

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
