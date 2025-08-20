//  set grid and render columns button dynamically
function setGrid(cols) {
    const grid = document.querySelector("#marquee-grid");
    const singleCardControl = document.querySelector(".single-column-control");
    const hasDynamicGridClass = [...grid.classList].some(cls =>
        cls.startsWith("dynamic-grid-col-")
    );

    console.log(hasDynamicGridClass);
    if (hasDynamicGridClass) {
        grid.classList.forEach(cls => {
            if (cls.startsWith("dynamic-grid-col-")) {
                grid.classList.remove(cls);
            }
        });

        grid.classList.add(`dynamic-grid-col-${cols}`);

    }
    localStorage.setItem("cols", cols);

    const cards = grid.children; // get all cards

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        // reset animation
        card.style.animation = "none";
        void card.offsetWidth; // force reflow

        const colIndex = i % cols; // determine which column this card is in

        // alternate animations by column
        if (colIndex % 2 === 0) {
            card.style.animation = "scrollUp 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
        } else {
            card.style.animation = "scrollDown 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
        }
        if (cols == 2) {
            singleCardControl.innerHTML = `
                <button onclick="setdirectionUp(1)">1st Column Up</button>
                <button onclick="setdirectionDown(1)">1st Column Down</button>
                <button onclick="setdirectionUp(2)">2nd Column Up</button>
                <button onclick="setdirectionDown(2)">2nd Column Down</button>`;
        }
        if (cols == 3) {
            singleCardControl.innerHTML = `
                <button onclick="setdirectionUp(2)">1st Column Up</button>
                <button onclick="setdirectionDown(2)">1st Column Down</button>
                <button onclick="setdirectionUp(2)">2nd Column Up</button>
                <button onclick="setdirectionDown(3)">2nd Column Down</button>
                <button onclick="setdirectionUp(3)">3rd Column Up</button>
                <button onclick="setdirectionDown(4)">3rd Column Down</button>`;
        }
        if (cols == 4) {
            singleCardControl.innerHTML = `
                <button onclick="setdirectionUp(2)">1st Column Up</button>
                <button onclick="setdirectionDown(2)">1st Column Down</button>
                <button onclick="setdirectionUp(2)">2nd Column Up</button>
                <button onclick="setdirectionDown(3)">2nd Column Down</button>
                <button onclick="setdirectionUp(3)">3rd Column Up</button>
                <button onclick="setdirectionDown(4)">3rd Column Down</button>
                <button onclick="setdirectionUp(4)">4th Column Up</button>
                <button onclick="setdirectionDown(4)">4th Column Down</button>`;
        }

    }
}

function setAnimationDirection() {
    const grid = document.querySelector("#marquee-grid");
    const cards = grid.children;
    const cols = parseInt(localStorage.getItem("cols")) || 3;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.style.animation = "none";
        void card.offsetWidth; // force reflow

        const colIndex = i % cols;

        if (colIndex % 2 === 0) {
            card.style.animation = "scrollUp 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
        } else {
            card.style.animation = "scrollDown 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
        }
    }
    const column = document.querySelector('.marquee-grid');
    column.style.transform = `rotateX(55deg) rotateY(0deg) rotateZ(-45deg)`;
}

function setdirectionUp(n) {
    const grid = document.querySelector(".marquee-grid");
    const cards = grid.children;
    const cols = parseInt(localStorage.getItem("cols")) || 3;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const colIndex = i % cols;

        if (colIndex === n - 1) { // check if card is in nth column
            card.style.animation = "none";
            void card.offsetWidth; // force reflow
            card.style.animation = "scrollUp 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
        }
    }
}

function setdirectionDown(n) {
    const grid = document.querySelector(".marquee-grid");
    const cards = grid.children;
    const cols = parseInt(localStorage.getItem("cols")) || 3;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const colIndex = i % cols;

        if (colIndex === n - 1) { // check if card is in nth column
            card.style.animation = "none";

            card.style.animation = "scrollDown 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
        }
    }
}

// function applyRotation() {
//     const x = document.getElementById("rotateX").value || 55;
//     const z = document.getElementById("rotateZ").value || -45;

//     const column = document.querySelector('.marquee-grid');

//     // Apply both X and Z rotations
//     column.style.transform = `rotateX(${x}deg) rotateZ(${z}deg)`;
//     column.style.transformStyle = "preserve-3d"; // ensures proper 3D rendering
// }

// Keep slider and number in sync
function bindControls(rangeId, numberId) {
    const range = document.getElementById(rangeId);
    const number = document.getElementById(numberId);

    range.addEventListener("input", () => {
        number.value = range.value;
        applyRotation();
    });

    number.addEventListener("input", () => {
        range.value = number.value;
        applyRotation();
    });
}

// Bind rotateX and rotateZ
bindControls("rotateXRange", "rotateX");
bindControls("rotateZRange", "rotateZ");

// Initial setup
applyRotation();