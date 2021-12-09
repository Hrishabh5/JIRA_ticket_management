const addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textCont = document.querySelector(".textarea-cont");
let addFlag = false;

addBtn.addEventListener("click", (e) => {
  //   Display Modal - If addFlag is true, display modal otherwise remove it
  addFlag = !addFlag;
  console.log(addFlag);
  if (!addFlag) {
    modalCont.style.display = "none";
  } else {
    modalCont.style.display = "flex";
  }
});

//   Generate Ticket
function createTicket() {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
  <div class="ticket-color"></div>
  <div class="ticket-id">Sample id</div>
  <div class="task-area">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, vero
    ad! Ipsa, cum? Blanditiis, eum.
  </div>
  `;
  mainCont.appendChild(ticketCont);
}

modalCont.addEventListener("keydown", (e) => {
  let key = e.key;
  if (key === "Shift") {
    createTicket();
    modalCont.style.display = "none";
    addFlag = !addFlag;
    textCont.value = "";
  }
});
