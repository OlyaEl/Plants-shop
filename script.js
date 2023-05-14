const items = [{
        title: "Дионея или Венерина мухоловка",
        description: "Многолетнее комнатное растение",
        tags: ["plant"],
        price: 35,
        img: "./img/dioneya.jpg",
        rating: 4.7,
    },
    {
        title: "Антуриум Андре",
        description: "Яркое и достаточно неприхотливое растение",
        tags: ["plant", "flower"],
        price: 57,
        img: "./img/anturium-andre.jpg",
        rating: 3.8,
    },
    {
        title: "Мюленбекия",
        description: "Стелящаяся лиана",
        tags: ["plant"],
        price: 21,
        img: "./img/muylenbekiya.jpg",
        rating: 3.2,
    },
    {
        title: "Хлорофитум «Лемон»",
        description: "Добавит живых красок в ваш интерьер!",
        tags: ["plant"],
        price: 29,
        img: "./img/hlorofitum.jpg",
        rating: 3.4,
    },
    {
        title: "Арека",
        description: "Пальма заполнит зеленью в любое пространство.",
        tags: ["plant", "palm-tree"],
        price: 275,
        img: "./img/areka.jpg",
        rating: 3.7,
    },
    {
        title: "Эустома",
        description: "Сизая листва и нежные бутоны",
        tags: ["flower"],
        price: 16,
        img: "./img/eustoma.jpg",
        rating: 3.3,
    },
    {
        title: "Драцена Сандера",
        description: "Теплолюбивое и светолюбивое растение",
        tags: ["plant"],
        price: 31,
        img: "./img/bambuk.jpg",
        rating: 3.6,
    },
    {
        title: "Хамелациум",
        description: "Известен долгим цветением и «вощёными» лепестками",
        tags: ["plant", "flower"],
        price: 89,
        img: "./img/hamelacium.jpg",
        rating: 3.5,
    },
    {
        title: "Юкка",
        description: "Классикa для декорации интерьера!",
        tags: ["plant", "palm-tree"],
        price: 95,
        img: "./img/yukka.jpg",
        rating: 5.0,
    },
    {
        title: "Фикус «Бамбино»",
        description: "Мгновенно меняет внешний вид помещения",
        tags: ["plant"],
        price: 36,
        img: "./img/fikus.jpg",
        rating: 2.8,
    },
    {
        title: "Замиокулькас",
        description: "Одно из самых неприхотливых растений",
        tags: ["plant"],
        price: 42,
        img: "./img/zamioculcas.jpg",
        rating: 4.1,
    },
    {
        title: "Кампанула",
        description: "Цветок нежности и любви!",
        tags: ["flower"],
        price: 27,
        img: "./img/kampanula.jpg",
        rating: 4.9,
    },
];


const shopCards = document.querySelector('#shop-items');
const cardTemplate = document.querySelector('#item-template');
const nothingFound = document.querySelector('#nothing-found');

function createShopCard(cardItem) {
    const { title, description, tags, price, img, rating } = cardItem;
    const card = cardTemplate.content.cloneNode(true);

    card.querySelector('h1').textContent = title;
    card.querySelector('p').textContent = description;
    card.querySelector('span').textContent = `${price} руб`;
    card.querySelector('img').src = img;

    const ratingBox = card.querySelector('.rating');

    for (let i = 0; i < rating; i++) {
        const sprout = document.createElement('i');
        sprout.classList.add("fa", "fa-seedling");
        ratingBox.append(sprout);
    }

    const tagsCase = card.querySelector('.tags');

    tags.forEach((tag) => {
        const element = document.createElement('span');
        element.textContent = tag;
        element.classList.add('tag');
        tagsCase.append(element);
    });

    return card;
}



function showCards(arr) {
    nothingFound.textContent = "";
    shopCards.innerHTML = "";

    arr.forEach((card) => {
        shopCards.append(createShopCard(card));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}

const shopContent = items.slice();

showCards(shopContent.sort((a, b) => sortByAlphabet(a, b)));

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

searchButton.addEventListener("click", realizeSearch);
searchInput.addEventListener("search", realizeSearch);

function realizeSearch() {
    const searchField = searchInput.value.trim().toLowerCase();

    shopContent = items.filter((element) =>
        element.title.toLowerCase().includes(searchField)
    );

    shopContent.sort((a, b) => sortByAlphabet(a, b));
    showCards(shopContent);
    sortOptions.selectedIndex = 0;
}

const sortOptions = document.querySelector("#sort");
sortOptions.addEventListener("change", (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                shopContent.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                shopContent.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                shopContent.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                shopContent.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    showCards(shopContent);
});