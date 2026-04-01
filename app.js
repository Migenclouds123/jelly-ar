/**
 * Jelly AR - Disney Style Interaction
 */

document.addEventListener("DOMContentLoaded", () => {
            const sceneEl = document.querySelector("a-scene");
            const scanningOverlay = document.querySelector("#scanning-overlay");
            const successUI = document.querySelector("#success-ui");
            const jellyBabyContainer = document.querySelector("#jelly-baby-container");
            const babyBody = document.querySelector("#baby-body");
            const restartBtn = document.querySelector("#restart-btn");

                              let isFound = false;

                              // Listen for image target discovery
                              sceneEl.addEventListener("targetFound", (event) => {
                                              if (isFound) return;

                                                               console.log("Jelly Box Found! Jumping out...");
                                              isFound = true;

                                                               // Hide scanning UI with a fade
                                                               scanningOverlay.classList.add("hidden");

                                                               // Trigger the animation sequence via event
                                                               jellyBabyContainer.emit("startJump");
                                              babyBody.emit("startJump");

                                                               // Show Success UI after a short delay (once jump begins)
                                                               setTimeout(() => {
                                                                                   successUI.classList.remove("hidden");
                                                               }, 3000);
                              });

                              // Reset logic
                              restartBtn.addEventListener("click", () => {
                                              location.reload(); // Simplest way to reset the AR engine
                              });

                              // Mock trigger for testing in console
                              window.testAR = () => {
                                              sceneEl.emit("targetFound");
                              };
});
