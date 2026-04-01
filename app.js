document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector("a-scene");
    const jellyBabyContainer = document.querySelector("#jelly-baby-container");
    const babyBody = document.querySelector("#baby-body");
    const successUI = document.querySelector("#success-ui");
    const restartBtn = document.querySelector("#restart-btn");
    const scanningOverlay = document.querySelector("#scanning-overlay");

    let isFound = false;

    // Listen for image target discovery
    sceneEl.addEventListener("targetFound", (event) => {
        if (isFound) return;
        
        console.log("Jelly Box Found! Jumping out...");
        isFound = true;

        // Hide scanning UI
        scanningOverlay.classList.add("hidden");

        // Scale up the character (The "Jump Out" Effect)
        jellyBabyContainer.setAttribute("animation", {
            property: "scale",
            from: "0.001 0.001 0.001",
            to: "1 1 1",
            dur: 1000,
            easing: "easeOutElastic"
        });

        // Start the squishy and jump animations
        babyBody.emit("jump"); // We use emit because we pre-defined animations with loop/autoplay false
        babyBody.setAttribute("animation__jump", "autoplay", true);
        babyBody.setAttribute("animation__squish", "autoplay", true);

        // Disney-Style "Star Burst" effect could be added here with particles
        
        // 10-second timer to show success and stop
        setTimeout(() => {
            console.log("Sequence complete.");
            successUI.classList.remove("hidden");
            
            // Optional: Freeze or gently float the baby
            babyBody.setAttribute("animation__jump", "autoplay", false);
        }, 10000);
    });

    sceneEl.addEventListener("targetLost", () => {
        console.log("Target lost, but keeping the baby on desk if it already jumped?");
        // For O2O experiences, usually we let the character stay for the duration
    });

    // Reset for another try
    restartBtn.addEventListener("click", () => {
        location.reload();
    });
});
