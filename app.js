const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".remove-btn");
const modalCont = document.querySelector(".modal-cont");
const mainCont = document.querySelector(".main-cont");
const textCont = document.querySelector(".textarea-cont");
const colors = ["lightpink", "lighblue", "lightgreen", "black"];
const defaultPriorityColor = colors[colors.length - 1];
let modalPriorityColor = defaultPriorityColor;
const allPriorityColors = document.querySelectorAll(".priority-color");
let addFlag = false;
let removeFlag = false;
let count = 0;
let lock = "lock";
let unlock = "lock-open";

// ******** DISPLAY MODAL ********
// If addFlag is true, display modal otherwise remove it

addBtn.addEventListener("click", (e) => {
  addFlag = !addFlag;
  console.log(addFlag);
  if (!addFlag) {
    modalCont.style.display = "none";
  } else {
    modalCont.style.display = "flex";
  }
});

// ******** GENERATE TICKET ********

function createTicket(ticketColor, ticketTask, count) {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
  <div class="ticket-color ${ticketColor}"></div>
  <div class="ticket-id">JTID-${count}</div>
  <div class="task-area">${ticketTask}</div>
  <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i>
  </div>
  `;
  mainCont.appendChild(ticketCont);

  handleRemoval(ticketCont);
  handleLock(ticketCont);
}

modalCont.addEventListener("keydown", (e) => {
  let key = e.key;
  if (key === "Shift") {
    let task = textCont.value;
    count++;
    createTicket(modalPriorityColor, task, count);

    modalCont.style.display = "none";
    addFlag = !addFlag;
    textCont.value = "";
  }
});

// ******** LISTENER FOR SETTING PRIORITY COLORS ********

allPriorityColors.forEach((colorElem, index) => {
  colorElem.addEventListener("click", (e) => {
    // Removing border from active elems
    allPriorityColors.forEach((activeElems, idx) => {
      activeElems.classList.remove("border");
    });

    colorElem.classList.add("border");

    modalPriorityColor = colorElem.classList[0];
  });
});

// ******** REMOVING TICKETS ********

removeBtn.addEventListener("click", (e) => {
  removeFlag = !removeFlag;
  // if (removeFlag) {
  //   removeBtn.style.backgroundColor = "black";
  // } else {
  //   removeBtn.style.backgroundColor = "#3d3d3d";
  // }
});

function handleRemoval(ticket) {
  if (removeFlag) {
    ticket.remove();
  }
}

// ******** HANDLING LOCK ********

// i) Lock / Unlock

function handleLock(ticket) {
  const ticketLockElem = ticket.querySelector(".ticket-lock");
  const ticketTaskArea = ticket.querySelector(".task-area");
  const ticketLock = ticketLockElem.children[0];
  ticketLock.addEventListener("click", (e) => {
    if (ticketLock.classList[1] === "fa-lock") {
      ticketLock.classList.remove("fa-lock");
      ticketLock.classList.add("fa-lock-open");
      ticketTaskArea.setAttribute("contenteditable", "true");
    } else {
      ticketLock.classList.remove("fa-lock-open");
      ticketLock.classList.add("fa-lock");
      ticketTaskArea.setAttribute("contenteditable", "false");
    }
  });
}

// ii) Editing
