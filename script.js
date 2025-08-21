//  set grid and render columns button dynamically
"use strict";
function setAnimation(animation) {
  localStorage.setItem("animation", animation);
  if (animation === "columnUpDown") {
    setAnimationColumnUpDown();
  } else if (animation === "infinityUp") {
    infinityUp();
  } else if (animation === "infinityDown") {
    infinityDown();
  }
}

function removeAnimation() {
  // Select all cards in all grids
  const wholeSection = document.querySelectorAll(".marquee-grid");
  const allCards = document.querySelectorAll(".single-card");

  allCards.forEach((card) => {
    // Remove animation property
    card.style.animation = "none";
    // Force reflow (optional, if you want to reset animations before reapplying)
    void card.offsetWidth;
  });
  wholeSection.forEach((grid) => {
    // Remove animation property
    grid.style.animation = "none";
    // Force reflow (optional, if you want to reset animations before reapplying)
    void grid.offsetWidth;
  });

  // If you also want to reset the container's flex direction
  const grids = document.querySelectorAll(".marquee-grid");
  grids.forEach((grid) => {
    grid.style.flexDirection = "";
  });
}

async function infinityUp() {
  removeAnimation();

  const grid = document.querySelector(".marquee-section");
  const firstChildren = grid.children[0];
  const secondChildren = grid.children[1];

  const columnControlSection = document.querySelector(
    ".single-column-controlSection"
  );
  columnControlSection.style.display = "none";

  // Duplicate the first child if only one exists, but wait before appending
  if (firstChildren && !secondChildren) {
    const clone = firstChildren.cloneNode(true);

    grid.appendChild(clone);
  }
  const singleCards = document.querySelectorAll(".single-card");
  singleCards.forEach((card) => {
    card.style = "none";
  });

  // Apply flex direction only once
  grid.style.flexDirection = "column";

  // Add animation to both children if present
  if (grid.children[0] && grid.children[1]) {
    [grid.children[0], grid.children[1]].forEach((child) => {
      child.style.animation = `infinityUp 50s linear infinite`;
    });
  }
}
async function infinityDown() {
  removeAnimation();
  const grid = document.querySelector(".marquee-section");
  const firstChildren = grid.children[0];
  const secondChildren = grid.children[1];

  // Duplicate the first child if only one exists, but wait before appending
  if (firstChildren && !secondChildren) {
    const clone = firstChildren.cloneNode(true);
    grid.appendChild(clone);
  }
  const columnControlSection = document.querySelector(
    ".single-column-controlSection"
  );
  columnControlSection.style.display = "none";
  // Apply flex direction only once
  grid.style.flexDirection = "column";

  // Add animation to both children if present
  if (grid.children[0] && grid.children[1]) {
    [grid.children[0], grid.children[1]].forEach((child) => {
      child.style.animation = `infinityDown 50s linear infinite`;
    });
  }
}
function setAnimationColumnUpDown() {
  removeAnimation();
  const gridBox = document.querySelector(".marquee-section");
  const grid = document.querySelector(".marquee-grid");
  if (!grid) return;
  if (gridBox.children[1]) {
    gridBox.removeChild(gridBox.children[1]);
  }
  const cards = grid.children;
  const cols = parseInt(localStorage.getItem("cols")) || 3;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const colIndex = i % cols;
    if (cols == 2) {
      if (colIndex === 0) {
        // Group 1 → scrollUp
        card.style.animation =
          "scrollUp 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
      } else if (colIndex === 1) {
        // Group 2 → scrollDown
        card.style.animation =
          "scrollDown 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
      }
    } else if (cols == 3) {
      if (colIndex === 0 || colIndex === 2) {
        // Group 1 and 2 → scrollUp
        card.style.animation =
          "scrollUp 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
      } else if (colIndex === 1) {
        // Group 3 → scrollDown
        card.style.animation =
          "scrollDown 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
      }
    } else if (cols == 4) {
      if (colIndex === 0 || colIndex === 2) {
        // Group 1 and 4 → scrollUp
        card.style.animation =
          "scrollUp 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
      } else if (colIndex === 1 || colIndex === 3) {
        // Group 2 and 3 → scrollDown
        card.style.animation =
          "scrollDown 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
      }
    }
  }
  //task
  const columnControlSection = document.querySelector(
    ".single-column-controlSection"
  );
  const singleCardControl = document.querySelector(
    ".single-column-controlSection"
  );

  // // Dynamically create column control buttons
  let buttonsHTML = "";
  if (localStorage.getItem("animation") == "columnUpDown") {
    columnControlSection.style.display = "block";
    for (let i = 1; i <= cols; i++) {
      buttonsHTML += `
      <button onclick="setdirectionUp(${i})">${i}st Column Up</button>
      <button onclick="setdirectionDown(${i})">${i}st Column Down</button>
    `;
    }
  } else {
    buttonsHTML = "";
  }
  columnControlSection.appendChild = buttonsHTML;
}

function setGrid(cols) {
  removeAnimation();
  const grids = document.querySelectorAll(".marquee-grid"); // select all grids
  const singleCardControl = document.querySelector(".single-column-control");
  const columnControlSection = document.querySelector(
    ".single-column-controlSection"
  );

  grids.forEach((grid) => {
    // Remove existing dynamic grid classes
    [...grid.classList].forEach((cls) => {
      if (cls.startsWith("dynamic-grid-col-")) {
        grid.classList.remove(cls);
      }
    });

    // Add new grid class
    grid.classList.add(`dynamic-grid-col-${cols}`);
    localStorage.setItem("cols", cols);
  });

  // Dynamically create column control buttons
  let buttonsHTML = "";
  if (localStorage.getItem("animation") == "columnUpDown") {
    columnControlSection.style.display = "block";
    for (let i = 1; i <= cols; i++) {
      buttonsHTML += `
      <button onclick="setdirectionUp(${i})">${i}st Column Up</button>
      <button onclick="setdirectionDown(${i})">${i}st Column Down</button>
    `;
    }
  } else {
    buttonsHTML = "";
  }
  singleCardControl.innerHTML = buttonsHTML;
}
// initial grid set
setGrid(localStorage.getItem("cols"));

function setAnimationDirection() {
  const grid = document.querySelectorAll(".marquee-grid");
  const cards = grid.children;
  const cols = parseInt(localStorage.getItem("cols")) || 3;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.style.animation = "none";
    void card.offsetWidth; // force reflow

    const colIndex = i % cols;

    if (colIndex % 2 === 0) {
      card.style.animation =
        "scrollUp 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      card.style.animation =
        "scrollDown 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
    }
  }
}

function setdirectionUp(n) {
  const grid = document.querySelector(".marquee-grid");
  const cards = grid.children;
  const cols = parseInt(localStorage.getItem("cols")) || 3;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const colIndex = i % cols;

    if (colIndex === n - 1) {
      // check if card is in nth column
      card.style.animation = "none";
      void card.offsetWidth; // force reflow
      card.style.animation =
        "scrollUp 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
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

    if (colIndex === n - 1) {
      // check if card is in nth column
      card.style.animation = "none";

      card.style.animation =
        "scrollDown 3s infinite cubic-bezier(0.4, 0, 0.2, 1)";
    }
  }
}
function applyRotation() {
  const x = parseFloat(document.getElementById("rotateX").value) || 55;
  const z = parseFloat(document.getElementById("rotateZ").value) || -45;

  const column = document.querySelector(".marquee-grid");

  if (column) {
    column.style.transform = `perspective(1000px) rotateX(${x}deg) rotateZ(${z}deg)`;
    column.style.transformStyle = "preserve-3d";
  }
}

// Keep slider and number in sync

function applyTransform() {
  const x = parseFloat(document.getElementById("rotateX").value) ?? 55;
  const z = parseFloat(document.getElementById("rotateZ").value) ?? -45;
  const tx = parseFloat(document.getElementById("translateX").value) ?? -40;
  const ty = parseFloat(document.getElementById("translateY").value) ?? -45;
  const perspective =
    parseFloat(document.getElementById("perspectiveRange").value) ?? 1000;

  const marqueeGrid = document.querySelector(".purspective-set");
  marqueeGrid.style.transform = `
        rotateX(${x}deg)
        rotateZ(${z}deg)
        translateX(${tx}%)
        translateY(${ty}vw)
    `;

  const setPerspective = document.querySelector(".hight-set");
  console.log(setPerspective);
  setPerspective.style.perspective = `${perspective}px`;
  // setPerspective.style.transform = ``;
}

// overlay on the card
function addOverlayOnCard() {
  const cards = document.querySelectorAll(".single-card");
  cards.forEach((card) => {
    // check if overlay already exists
    if (!card.querySelector(".overlay")) {
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      card.appendChild(overlay);
    }
  });
}

function removeOverlayOnCard() {
  const cards = document.querySelectorAll(".single-card");
  cards.forEach((card) => {
    const overlay = card.querySelector(".overlay");
    if (overlay) {
      overlay.remove(); // remove the overlay div
    }
  });
}

const titleForm = document.getElementById("titleForm");
const titleInput = document.getElementById("title");
const cards = document.querySelectorAll(".single-card");

titleForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const titleValue = titleInput.value;

  cards.forEach((card) => {
    // remove old title if exists
    const oldTitle = card.querySelector(".card-title");
    if (oldTitle) oldTitle.remove();

    // create new title element
    const titleEl = document.createElement("div");
    titleEl.classList.add("card-title");
    titleEl.textContent = titleValue;

    // append on top of card
    card.appendChild(titleEl);
  });
});

function bindControls(rangeId, numberId) {
  const range = document.getElementById(rangeId);
  const number = document.getElementById(numberId);

  range.addEventListener("input", () => {
    number.value = range.value;
    applyTransform();
  });

  number.addEventListener("input", () => {
    range.value = number.value;
    applyTransform();
  });
}

// Bind all controls
bindControls("rotateXRange", "rotateX");
bindControls("rotateZRange", "rotateZ");
bindControls("translateXRange", "translateX");
bindControls("translateYRange", "translateY");
bindControls("perspectiveRange", "perspective");
