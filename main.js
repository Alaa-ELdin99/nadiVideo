let openCart = document.getElementById("openCart");
let closeCart = document.getElementById("closeCart");
let cart = document.querySelector(".cart");
let content = document.querySelector(".content");
let cartList = document.querySelector(".cart-list");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");


openCart.addEventListener("click", function () {
    cart.classList.add("active");
});

closeCart.addEventListener("click", function () {
    cart.classList.remove("active");
});

let movies = [

    {
        id: 1,
        image: "img1.jpeg",
        name: "Winnie the pooh",
        price: 20,
        time: "per night",
    },
    {
        id: 2,
        image: "img2.jpeg",
        name: "Searching",
        price: 25,
        time: "per night",
    },
    {
        id: 3,
        image: "img3.jpg",
        name: "Guardians of the galaxy",
        price: 40,
        time: "per night",
    },
    {
        id: 4,
        image: "img4.jpg",
        name: "Fast X",
        price: 10,
        time: "per night",
    },
    {
        id: 5,
        image: "img5.jfif",
        name: "Shazam",
        price: 15,
        time: "per night",
    },
    {
        id: 6,
        image: "img6.jfif",
        name: "Avatar",
        price: 50,
        time: "per night",
    },

];

let listCards = []
if (localStorage.movies != null) {
    listCards = JSON.parse(localStorage.movies)
}
else {
    listCards = []
}
getMovieLocalStorage()

function addToCart(id) {
    let movie = movies.find((mo) => mo.id === id)
    let movieIndex = listCards.findIndex((mo) => mo.id === id)
    if (movieIndex > -1) {
        listCards[movieIndex].quantity += 1
    }
    else {
        listCards.push({ ...movie, quantity: 1 });
    }
    reloadCart()
}

function initApp() {
    movies.forEach((value) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("movies-box");
        newDiv.innerHTML = `
        <img src="image/${value.image}"/>
        <h2>${value.name}</h2>
        <span>${value.price}</span>
        <span>${value.time}</span>
        <button class="btn btn-outline-success" onclick="addToCart(${value.id})">Add To Cart</button>
        <button id="open" class="btn btn-outline-success" onclick="openNewWindow()">Rent Now</button>
        `
        content.appendChild(newDiv);
    })
}
initApp();


function reloadCart() {
    cartList.innerHTML = ""
    let totalPrice = 0;
    let count = 0;
    listCards.forEach((value) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity
        let newLi = document.createElement("li");
        newLi.classList.add("box");
        newLi.innerHTML = `
        <img src="image/${value.image}"/>
        <h2>${value.name}</h2>
        <span>${value.price}</span>
        <div>
        <button class="btn btn-outline-success" onclick="changeDuration(${value.id}, ${value.quantity + 1})">+</button>
        <div>${value.quantity}</div>
        <button class="btn btn-outline-success" onclick="changeDuration(${value.id}, ${value.quantity - 1})">-</button>
        </div>
        `
        cartList.appendChild(newLi)
    });
    total.innerHTML = totalPrice
    quantity.innerHTML = count
    localStorage.setItem("movies", JSON.stringify(listCards))
}


function changeDuration(id, newDuration) {
    // console.log("done")
    let movieIndex = listCards.findIndex((mo) => mo.id === id)
    if (newDuration === 0) {
        listCards.splice(movieIndex, 1)
    }
    else {
        listCards[movieIndex].quantity = newDuration
    }
    reloadCart()
}

function getMovieLocalStorage() {
    localStorage.getItem("movie")
    reloadCart()
}

function openNewWindow() {
    window.open("form.html", "", "width= 1500px, height=700px")
}