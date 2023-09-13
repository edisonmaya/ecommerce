function load() {
    setTimeout(() => { document.querySelector(".overlay").classList.add("overlay--hidden"); }, 800);
}
async function getProducts(url) {
    try {
        const data  = await fetch(url);
        const res = await data.json();
        window.localStorage.setItem("products",JSON.stringify(res));    
        return(res);
        
    } catch (error) {
        console.log(error);
    }
    
}
function printProducts(db){
    const thirdSection = document.querySelector("#thirdSection");
    let html=``;
    for (const product of db.products) 
    
        {
            html+=` <div class="cardProduct">
                        <div class = "cardProduct__img">
                            <img class="cardImg"src="${product.image}" alt="Image ${product.name}"/>
                            <div class="plus"><i class='bx bx-plus' id='${product.id}'></i></div>
                        </div>
                        <div class="card__Section_bottom">
                            <div class = "cardProduct__info">
                                <h3>$${product.price}.00</h3><span><b>Stock: ${product.quantity}</b></span>
                            </div>
                            <div class="cardProduct__Name">
                                <h4>${product.name}</h4>
                            </div>
                        </div>
                    </div>
                    `
            thirdSection.innerHTML=html;
        }       
}
function handleShowCart() {
    const iconCart = document.querySelector(".bx-shopping-bag");
    const cartHtml = document.querySelector(".cart");
    iconCart.addEventListener("click",function () {
        cartHtml.classList.toggle("cart__show");
        console.log(cartHtml);
    })
}
function addToCartfromThirdSection(db) {

    const productsHTML = document.querySelector("#thirdSection");

    productsHTML.addEventListener('click',function (e) {
        
        if(e.target.classList.contains('bx-plus')){
        const id = Number(e.target.id);
        console.log(id);
        const productFind = db.products.find(
            (product) => product.id === id
            );
            if(db.cart[productFind.id]){
                if(productFind.quantity=== db.cart[productFind.id].amount) 
                return alert("Se agotó el producto")
                db.cart[productFind.id].amount++;
            }
            else{
                db.cart[productFind.id] = {...productFind, amount:1}
            }
            window.localStorage.setItem("cart", JSON.stringify(db.cart));
            printProductsinCart(db);
        }
    })    
}
function themeMode() {
    const light = document.querySelector(".bx-sun");
    const dark = document.querySelector(".bx-moon");
    
    dark.addEventListener("click",function () {
        const atributo = document.documentElement.getAttribute("data-theme");
        if(atributo==="light")
        document.documentElement.setAttribute("data-theme","dark");
        
    });
    light.addEventListener("click",function () {
        const atributo = document.documentElement.getAttribute("data-theme");
        if(atributo==="dark")
        document.documentElement.setAttribute("data-theme","light");
    });
}
function scroll() {
    document.addEventListener('scroll',()=>{
        const header = document.querySelector('#header');
        if(window.scrollY>0)
        {header.classList.add('change')}
        else
        {header.classList.remove('change')}
    })
}

function printProductsinCart(db) {
    const card__products = document.querySelector('.cart__products');
    let html ='';
    console.log(card__products);
    for (const product in db.cart) {
        const {quantity, price,name,image,id,amount} = db.cart[product];
        html += `
                <div class="cart_product">
                    <div class="cartProduct--img">
                        <img src="${image}" alt="imagen" />
                    </div>
                    <div class="cart__product--body">
                        <h4>${name} | $ ${price}</h4>
                        <p>Stock: ${quantity}</p>
                        <div class="cart__product--body-op" id = '${id}'>
                            <i class='bx bx-minus'></i>
                            <span>${amount} unit</span>
                            <i class='bx bx-plus'></i>
                            <i class='bx bx-trash'></i>
                        </div>
                    </div>
                </div>
                `
                card__products.innerHTML= html;
            
        }
}

async function main() 
{
    load();
    const url = "https://ecommercebackend.fundamentos-29.repl.co/";
    const db={ products: JSON.parse( window.localStorage.getItem("products")) || 
    await getProducts(url), cart: JSON.parse(window.localStorage.getItem("cart")) || {}, }
    printProducts(db);
    handleShowCart();
    addToCartfromThirdSection(db);
    themeMode();
    scroll();
    printProductsinCart(db);

    const cartProducts = document.querySelector(".cart__products");
    cartProducts.addEventListener('click',function (e) {
        if(e.target.classList.contains("bx-plus"))
        {
            const id = Number(e.target.parentElement.id);
            db.cart[id].amount++;
        }
        if(e.target.classList.contains("bx-minus"))
        {
            const id = Number(e.target.parentElement.id);
            db.cart[id].amount--;
        }
        if(e.target.classList.contains("bx-trash"))
        {
            const id = Number(e.target.parentElement.id);
            delete db.cart[id];
        }
        printProductsinCart(db);
    })
    

    
}




window.addEventListener("load",main);

