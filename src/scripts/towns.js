async function loadTowns() {
    let TOWNS = [];
    try {
        let response = await fetch('./data/towns.json');
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }

        TOWNS = await response.json();
    } catch (e) {
        console.error(e.message);
    }


    const townsList = document.querySelector(".towns");
    townsList.innerHTML = "";

    TOWNS.forEach(town => {
        townsList.innerHTML += `
        <div class="town">
            <img src="src/images/towns/${town.images[0]}" alt="${town.name}">
            <div class="town-info">
                <h3>${town.name}</h3>
                <p>${town.description}</p>
                <button onclick='openAboutTownModal(${JSON.stringify(town)})'>Подробнее →</button>
            </div>
        </div>`;
    });
}

loadTowns();

async function openAboutTownModal(town) {
    let imgs = "";
    for (let i = 0; i < town.images.length; i++) {
        imgs += `<img onclick="changePhoto('${town.images[i]}')" src="src/images/towns/${town.images[i]}" alt="${town.name}">`;
    }

    let villagers = [];

    try {
        let response = await fetch('./data/players.json');
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }

        const VILLAGERS = await response.json();
        town.villagers.forEach(tv => {
            const SEARCH = VILLAGERS.find(v => v.id == tv.player_id);
            const newVil = {
                id: SEARCH.id,
                nickname: SEARCH.nickname,
                uuid: SEARCH.uuid,
                role: tv.role
            };

            villagers.push(newVil);
        });
    } catch (e) {
        console.error(e.message);
    }

    console.log(villagers);

    document.body.classList.add("no-scroll");
    let modal = document.querySelector(".modal");
    modal.innerHTML =
        `<div class="modal-content">
        <div class="modal-header">
            <h3>${town.name}</h3>
            <p style="cursor: pointer;" onclick="closeAboutTownModal()">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" >
                    <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                </svg>
            </p>
        </div>
        <div class="modal-body">
            <div>
                <div class="body-photos">
                    <img loading="lazy" id="general-photo" src="src/images/towns/${town.images[0]}" alt="${town.name}">
                    <div class="photo-list">${imgs}</div>
                </div>
                ${villagers.length > 0 ?
                    `<div class="body-villagers">
                        <h2>Жители города</h2>
                        <div>
                            ${villagers.map(villager =>
                                `<div class="villager-card">
                                    <div class="villager-card-content">
                                        <img loading="lazy" alt="" src="https://nmsr.nickac.dev/bust/${villager.uuid.replace(/-/g, "")}">
                                        <div>
                                            <h3>${villager.nickname}</h3>
                                            <p>${villager.role}</p>
                                        </div>
                                    </div>
                                    <a href="accounts/?id=${villager.id}&nickname=${villager.nickname}">Профиль</a>
                                </div>`).join("")}
                        </div>
                    </div>` : ""}
            </div>
            <div class="body-content">
                <h2 class="modal-content-title">История города</h2>
                <p>${town.about}</p>
            </div>
        </div>
    </div>`;

    modal.classList.remove("hide");
    modal.classList.add("show");
}

function closeAboutTownModal() {
    document.body.classList.remove("no-scroll");
    let modal = document.querySelector(".modal");
    modal.classList.remove("show");
    modal.classList.add("hide");
}

function changePhoto(photo_) {
    let photo = document.querySelector("#general-photo");
    photo.src = `src/images/towns/${photo_}`;
}