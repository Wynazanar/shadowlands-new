async function findPlayer(type="login", login, password) {
    let PLAYERS = [];
    try {
        let response = await fetch('./data/players.json');
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }

        PLAYERS = await response.json();
        switch (type) {
            case "login":
                return PLAYERS.find(p => p.login == login || p.nickname == login && p.password == password);
            case "id":
                return PLAYERS.find(p => p.id == login && p.nickname == password);
                    
        }
    } catch (e) {
        console.error(e.message);
    }
}

async function setAccount() {
    const account = document.querySelector("#account");
    const auth = JSON.parse(localStorage.getItem("player")) || null;

    const currentPlayer = await findPlayer("id", auth.id, auth.nickname);

    if (auth != null) {
        account.innerHTML = "";
        account.innerHTML = 
        `
        <p style="display: flex; align-items: center; gap: 10px;">
            <span style="color: var(--secondary); margin-top: 3px;">${currentPlayer.balance}</span>
            <svg width="24" height="24" fill="var(--secondary)" viewBox="0 0 24 24" >
                <path d="M20 7h-3V3c0-.33-.16-.64-.43-.82a.98.98 0 0 0-.92-.11L3.28 6.82C2.51 7.11 2 7.87 2 8.69V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2m-5-2.54V7H8.39zM4 20V9h16v2h-5c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h5v2zm16-4h-5v-3h5z"></path>
            </svg>
        </p>
        
        <svg width="26" height="26" fill="var(--secondary)" viewBox="0 0 24 24" >
            <path d="M21.93 7.66c-.02-.05-.04-.11-.07-.16a1 1 0 0 0-.06-.08c-.03-.04-.06-.09-.1-.12-.03-.03-.06-.04-.09-.07-.04-.03-.07-.06-.11-.09h-.01l-9-5.01a.99.99 0 0 0-.97 0l-9.01 5H2.5c-.04.02-.07.06-.11.09a.6.6 0 0 0-.09.07c-.04.04-.07.08-.1.12-.02.03-.05.05-.06.08-.03.05-.05.1-.07.16-.01.03-.03.05-.03.08-.02.08-.04.17-.04.26v8c0 .36.2.7.51.87l9 5 .15.06c.03.01.06.03.09.03a1.1 1.1 0 0 0 .5 0c.03 0 .06-.02.09-.03.05-.02.1-.03.15-.06l9-5c.32-.18.51-.51.51-.87v-8c0-.09-.01-.18-.04-.26 0-.03-.02-.05-.03-.08ZM12 4.15l6.94 3.86-2.44 1.36-6.94-3.86zm-4.5 2.5 6.94 3.86L12 11.87 5.06 8.01zM4 9.71l7 3.89v5.71l-7-3.89zm16 5.71-7 3.89V13.6l2.5-1.39v3.21l2-1.11V11.1L20 9.71z"></path>
        </svg>

        <svg width="24" height="24" fill="var(--secondary)" viewBox="0 0 24 24" >
            <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2M9 4h6v2H9zM4 20V8h16v12z"></path>
        </svg>
        
        <div style="aspect-ratio: 1; width: 30px; cursor: pointer;" onclick="logout()">
            <img src="https://vzge.me/face/128/${currentPlayer.uuid.replace(/-/g, "")}" alt="">
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
    let login = document.querySelector("#login");
    let password = document.querySelector("#password");

    if (login.value == "" || password.value == "") {
        alert("Ошибка входа");
        return 0;
    }

    const player = await findPlayer("login", login.value.toLowerCase(), password.value);
    if (player != null) {
        const player_toLocalStorage = {
            id: player.id,
            nickname: player.nickname,
            uuid: player.uuid,
            role: player.role
        };

        localStorage.setItem("player", JSON.stringify(player_toLocalStorage));
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
            <p style="cursor: pointer;" onclick="closeLoginModal()">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" >
                    <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                </svg>
            </p>
        </div>
        <div class="modal-body login" style="flex-direction: column;">
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