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
        <div style="width: 35px; height: 35px;">
            <img style="border-radius: 360px;" src="${auth.profile_image}" alt="">
        </div>`;
    } else {
        console.error("Not auth");
    }
}

setAccount();
// setPlayer();

function setPlayer() {
    const player = {
        id: 1,
        nickname: "Wynazanar",
        balance: 156,
        role: "admin",
        profile_image: "https://avatars.mds.yandex.net/i?id=017153dbd37314f52fda30a94576cabe4462269e-5487767-images-thumbs&n=13",
        created_at: "2026-03-14",
        updated_at: "2026-03-14",
    };
    
    localStorage.setItem("player", JSON.stringify(player));
}