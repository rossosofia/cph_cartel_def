window.addEventListener("load", setup);
// const endpoint = "https://rossosofia.com/cph_cartel/wp-json/wp/v2/product?&_embed";
const endpoint = "https://rossosofia.com/cph_cartel/wp-json/wp/v2/";
console.log ("helloworld");

// when you put const you don't change the values of the variable. 


function setup() {
    getProducts(); 
    getProduct2(); 
    getInitiatives();
    // getProducts = getCategories in jonas video
}

function getProducts() {
    let endpoint2 = endpoint + "product?categories=4&_embed&per_page=3&order=asc";
    console.log(endpoint2);
    // with this method it's easier to console.log the data (array) with makes easier the debug (we can use the console). But in order to do this, we create a new variable with let, we changed the name and then we used endpoint + the url. this has to be done BEFORE fetching.
    fetch(endpoint2)
    // since we altrady have all the endpoint in the first URL, we only need to copy-paste this and change the + url 
    // ASK HOW TO INVERT THE ORDER OF THE ELEMENTS - anwer: order=asc or order=desc
    .then(res => res.json())
    .then(setupProducts);
    // getTheProducts();
}

function setupProducts(catArray){
    console.log(catArray)
    const template = document.querySelector("template#material-template-1").content;
    const parentElement = document.querySelector(".material_img");
    catArray.forEach(product => {
        const copy = template.cloneNode(true);
        copy.querySelector("img").src = product._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
        copy.querySelector("figcaption").textContent= `${product.title.rendered}`;
        parentElement.appendChild(copy);
    });
}


//  the methods are different on purpose :)) we were experimenting!

function getProduct2() {
    // fetch(endpoint + "product?categories=5&_embed") we were first using this one
    fetch(endpoint + "product?categories=5&_embed&per_page=3&order=asc")
    // fetch(endpoint + "product?categories=5&_embed&per_page=3") with this you fetch maximum 3 items from the list, from the earliest to the latest item added in the database
    .then(res => res.json())
    .then(setupProduct2);
}

function setupProduct2(catArray2){
    console.log(catArray2)
    const template2 = document.querySelector("template#material-template-2").content;
    const parentElement = document.querySelector(".material_img2");
    catArray2.forEach(product => {
        const copy = template2.cloneNode(true);
        copy.querySelector("img").src = product._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
        copy.querySelector("figcaption").textContent= `${product.title.rendered}`;
        parentElement.appendChild(copy);
    });
}



function getInitiatives() {
    fetch(endpoint + "product?categories=6&_embed&")
    .then(res => res.json())
    .then(setupInitiatives);
}

function setupInitiatives(catArray3){
    console.log(catArray3)
    const template3 = document.querySelector("template#material-template-initiatives").content;
    const parentElement = document.querySelector(".our_initiatives");
    catArray3.forEach(product => {
        const copy = template3.cloneNode(true);
        copy.querySelector("img").src = product._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
        copy.querySelector("figcaption").textContent= `${product.description}`;
        parentElement.appendChild(copy);
    });
}

// future improvement: we would like to fetch 3 random items from a bigger databese. Lasse suggested to fetch the array and then shuffle it.
// How to do it??? 