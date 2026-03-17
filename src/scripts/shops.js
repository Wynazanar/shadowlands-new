async function getItems() {
    let ITEMS = [];
    try {
        let response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }

        ITEMS = await response.json();
        return ITEMS;

    } catch (e) {
        console.error(e.message);
    }
}

async function loadShops() {
    const categories = {
        all: "Все",
        food: "Еда",
        blocks: "Блоки",
        mob: "Мобы",
        book: "Книги",
        decoration: "Декорации",
        armor: "Броня",
        artefact: "Артефакты",
    };

    const cat = ["all", "foods", "blocks", "mobs", "books", "artefacts"];
    const shops = await getItems();
    
    const shopsList = document.querySelector(".shops");
    const categoriesList = document.querySelector(".shop-categories");
    shopsList.innerHTML = "";
    categoriesList.innerHTML = "";

    cat.forEach(category => {
        categoriesList.innerHTML += 
        `<div style="padding: 7px 15px; background: var(--white); border-radius: 360px">
            ${categories[category]}
        </div>`;
    });

    shops.forEach(shop => {
        console.log(shop.tag);
        shopsList.innerHTML += `
        <div class="shop">
            <img src="${shop.image}" alt="${shop.item}">
            <div class="shop-info">
                <h3>${shop.item}</h3>
                <p>${categories[shop.tag]}</p>
                <div style="display: flex; justify-content: space-between;">
                    <h4>${shop.amount} <span style="font-size: 12px;">шт</span></h4>
                    <span>—</span>
                    <h4>${shop.cost} <span style="font-size: 12px;">мф</span></h4>
                </div>
                <button>Забронировать</button>
            </div>
        </div>`;
    });
}

loadShops();