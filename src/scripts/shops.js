function loadShops() {
    const categories = {
        all: "Все",
        foods: "Еда",
        blocks: "Блоки",
        mobs: "Мобы",
        books: "Книги",
        artefacts: "Артефакты",
    };

    const cat = ["all", "foods", "blocks", "mobs", "books", "artefacts"];

    const shops = [
        {
            id: 1,
            item: "Golden Apple",
            tag: "Food",
            cost: 12,
            amount: 64,
            image: "https://ccvaults.com/assets/10.%20Items/18.%20Consumables/Golden_Apple.png"
        },
        {
            id: 2,
            item: "Golden carrot",
            tag: "Food",
            cost: 20,
            amount: 20,
            image: "https://ccvaults.com/thumbnails/10.%20Items/10.%20Food/Golden_Carrot.png"
        },
    ];

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
        shopsList.innerHTML += `
        <div class="shop">
            <img src="${shop.image}" alt="${shop.item}">
            <div class="shop-info">
                <h3>${shop.item}</h3>
                <p>${shop.tag}</p>
                <div style="display: flex; justify-content: space-between;">
                    <h4>${shop.amount} <span style="font-size: 12px;">шт</span></h4>
                    <span>—</span>
                    <h4>${shop.cost} <span style="font-size: 12px;">мф</span></h4>
                </div>
            </div>
        </div>`;
    });
}

loadShops();