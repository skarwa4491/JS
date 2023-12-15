let addBtn = document.querySelector('.addBtn');
let removeBtn = document.querySelector('.removeBtn');
let modalContainer = document.querySelector('.modal-container');
let mainContainer = document.querySelector('.main-container');
let toolBoxColors = document.querySelectorAll('.color');
let colorCategoryToSelect = document.querySelectorAll('.color-category');
let textAreaContainer = document.querySelector('.text-area-container');
let colors = ['coral', 'blue', 'green', 'grey'];
let defaultColor = colors[colors.length - 1];
let addFlag = false;
let removeFlag = false;
let lockClass = `fa-lock`;
let unLockClass = `fa-unlock`;
let allTickets = [];

// open and close modal
addBtn.addEventListener('click', (e) => {
    // Display Modal and generate ticket
    addFlag = !addFlag;
    if (addFlag) {
        modalContainer.style.display = 'flex';
    }
    else {
        modalContainer.style.display = 'none';
    }
});

// attach ticket on main container
modalContainer.addEventListener('keydown', (e) => {
    let ctrlKey = e.key == 'Shift' ? true : false;
    let shiftKey = e.ctrlKey;
    if (ctrlKey && shiftKey) {
        let textContent = textAreaContainer.value;
        let color = document.querySelector('.selected').classList[1];
        let id = generateId();
        let ticket = { color: color, id: id, content: textContent };
        allTickets.push(ticket);
        createTicket(color, id, textContent);
        modalContainer.style.display = 'none';
        addFlag = false;
        resetModalValues();
    }
});

//select color for ticket
colorCategoryToSelect.forEach((colorCategory) => {
    colorCategory.addEventListener('click', (e) => {
        e.target.classList.add('selected');
        colorCategoryToSelect.forEach((color) => {
            if (e.target !== color) {
                color.classList.remove('selected');
            }
        });
    });
});

// remove tickets
/** FIX ME : remove tickets from local array after deletion */
removeBtn.addEventListener('click', (e) => {
    removeFlag = !removeFlag;
    if (removeFlag) {
        document.querySelector('body').style.backgroundColor = '#FFC7C7';
        let allTickets = document.querySelectorAll('.ticket-container');
        allTickets.forEach((ticket) => {
            ticket.addEventListener('click', (e) => {
                handleRemoval(ticket);
            });
        });
    }
    else {
        document.querySelector('body').style.backgroundColor = '#B6BBC4';
    }
});

// filter tickets based on colors
toolBoxColors.forEach((toolBoxColor) => {


    toolBoxColor.addEventListener('click', (e) => {
        let currentTicketColor = toolBoxColor.classList[1];
        let filteredTickets = allTickets.filter((ticket, i) => { return ticket.color === currentTicketColor; });
        let allTicketsOnDom = document.querySelectorAll('.ticket-container');

        allTicketsOnDom.forEach((allTicketsOnDom) => {
            allTicketsOnDom.remove();
        });

        // display filtered tickets
        filteredTickets.forEach((filteredTicket) => {
            createTicket(filteredTicket.color, filteredTicket.id, filteredTicket.content);
        });
    });

    toolBoxColor.addEventListener('dblclick', (e) => {
        let allTicketsOnDom = document.querySelectorAll('.ticket-container');
        allTicketsOnDom.forEach((ticketOnDom) => {
            ticketOnDom.remove();
        });
        allTickets.forEach((ticket) => {
            createTicket(ticket.color, ticket.id, ticket.content);
        });
    });
});

// create ticket modal
function createTicket(color, id, content) {
    let ticketContainer = document.createElement('div');
    ticketContainer.setAttribute('class', 'ticket-container');
    ticketContainer.innerHTML = `<div class="ticket-color ${color}"></div>
    <div class="ticket-id">${id}</div>
    <textarea class="task-area" readonly>${content}</textarea>
    <div class="lock-container">
        <i class="fa-solid fa-lock"></i>
    </div>`;
    mainContainer.appendChild(ticketContainer);
    handleLock(ticketContainer);
    handleColor(ticketContainer);
}

// reset modal values
function resetModalValues() {
    textAreaContainer.value = '';
    colorCategoryToSelect.forEach((colorCategory) => {
        if (colorCategory.classList.contains(defaultColor)) colorCategory.classList.add('selected');
        else colorCategory.classList.remove('selected');
    });
}

// remove tickets from DOM
function handleRemoval(ticket) {
    if (removeFlag) ticket.remove();
}

// attach listener to lock icon for editing content of ticket
function handleLock(ticket) {
    let ticketLock = ticket.querySelector('.lock-container').children[0];
    let taskArea = ticket.querySelector('.task-area');
    ticketLock.addEventListener('click', (e) => {
        if (ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unLockClass);
            taskArea.readOnly = false;
        }
        else {
            ticketLock.classList.remove(unLockClass);
            ticketLock.classList.add(lockClass);
            taskArea.readOnly = true;
        }
    });
}

// change color of the ticket
function handleColor(ticket) {
    let colorTab = ticket.querySelector('.ticket-color');
    colorTab.addEventListener('click', (e) => {
        let currentTicketColor = colorTab.classList[1];
        let currentIdx = colors.indexOf(currentTicketColor) % colors.length;
        colorTab.classList.remove(currentTicketColor);
        colorTab.classList.add(colors[(currentIdx + 1) % colors.length]);
        let currentTicketId = ticket.querySelector('.ticket-id').innerText;
        let currentTicket = allTickets.filter((ticket) => ticket.id === currentTicketId);
        currentTicket[0].color = colorTab.classList[1];
    });

}

//filter tickets

function filterTickets() {

}

// helper function to generate id
function generateId() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return "#_" + result;
}