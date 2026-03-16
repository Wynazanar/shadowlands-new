async function findPlayer(login, password) {
    let PLAYERS = [];
    try {
        let response = await fetch('./data/players.json');
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }

        PLAYERS = await response.json();
        return PLAYERS.find(p => p.login == login && p.password == password);
    } catch (e) {
        console.error(e.message);
    }
}

function setAccount() {
    const account = document.querySelector("#account");
    const auth = JSON.parse(localStorage.getItem("player")) || null;

    if (auth != null) {
        account.innerHTML = "";
        account.innerHTML = 
        `
        <p style="padding: 5px 10px; border: 1px solid var(--secondary); color: var(--secondary);border-radius: 200px;">
            ${auth.balance} мф
        </p>
        
        <svg width="24" height="24" fill="var(--secondary)" viewBox="0 0 24 24" >
            <path d="M21 6H7.05L5.94 2.68A1 1 0 0 0 4.99 2h-3v2h2.28l3.54 10.63A2 2 0 0 0 9.71 16h7.59a2 2 0 0 0 1.87-1.3l2.76-7.35c.11-.31.07-.65-.11-.92A1 1 0 0 0 21 6m-3.69 8H9.72l-2-6h11.84zM10 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"></path>
        </svg>
        <svg width="24" height="24" fill="var(--secondary)" viewBox="0 0 24 24" >
            <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2M9 4h6v2H9zM4 20V8h16v12z"></path>
        </svg>
        
        <div style="aspect-ratio: 1; width: 30px; cursor: pointer;" onclick="logout()">
            <img src="https://vzge.me/face/128/${auth.uuid.replace(/-/g, "")}" alt="">
        </div>`;
    } else {
        console.error("Not auth");
    }
}

setAccount();

function logout() {
    localStorage.removeItem("player");
    console.log("Вы вышли с аккаунта");
    location.reload();
}

async function login() {
    let login = document.querySelector("#login").value;
    let password = document.querySelector("#password").value;

    const player = await findPlayer(login, password);
    if (player != null) {
        localStorage.setItem("player", JSON.stringify(player));
        closeLoginModal();
        location.reload();
    }
}

function openLoginModal() {
    let modal = document.querySelector(".modal");

    modal.innerHTML = 
        `<div class="modal-content" style="height: fit-content;">
        <div class="modal-header">
            <h3>Войти в аккаунт</h3>
            <p style="cursor: pointer;" onclick="closeLoginModal()">x</p>
        </div>
        <div class="modal-body" style="flex-direction: column;">
            <input id="login" placeholder="Логин">
            <input id="password" placeholder="Пароль">
            <button onclick="login()">Войти</button>
        </div>
    </div>`;

    modal.classList.remove("hide");
    modal.classList.add("show");
}

function closeLoginModal() {
    let modal = document.querySelector(".modal");
    modal.classList.remove("show");
    modal.classList.add("hide");
}