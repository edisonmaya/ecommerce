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
                            ${product.quantity?`<div class="plus"><i class='bx bx-plus' id='${product.id}'></i></div>`:
                            `<span class="soldOut"><p>Sold Out</p></span>`}  
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
function imprimirProductos(db){
    const thirdSection = document.querySelector("#thirdSection");
    
    let html=``;
    for (const product of db.products) 
        {
            html+=`             
                <div class="cardProduct">
                    <div class="mix ${product.category}">
                        <div class = "cardProduct__img">
                            <img class="cardImg"src="${product.image}" alt="Image ${product.name}"/>
                            ${product.quantity?`<div class="plus"><i class='bx bx-plus' id='${product.id}'></i></div>`:
                            `<span class="soldOut"><p>Sold Out</p></span>`}  
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
                </div>
                `
        }   
        thirdSection.innerHTML= html;    
        //let config = document.querySelector("#thirdSection");
        //let mixer = mixitup(config);
        //let config =document.querySelector("#thirdSection")
        mixitup(thirdSection,{
            selectors: {  target : '.mix' },
            animation : { duration : 100  }
        }).filter('all'); 
}
function handleShowCart() {
    const iconCart = document.querySelector(".bx-shopping-bag");
    const cartHtml = document.querySelector(".cart");
    iconCart.addEventListener("click",function () {
        cartHtml.classList.toggle("cart__show");
    })
}
function CloseShowCart() {
    const bxX = document.querySelector(".x");
    const carttHtml = document.querySelector(".cart");
    bxX.addEventListener("click",function () {
        carttHtml.classList.toggle("cart__show");
    })
}    
function handleShowMenu() {
    const iconMenu = document.querySelector(".bxs-dashboard");
    const menutHtml = document.querySelector(".menu");
    iconMenu.addEventListener("click",function () {
        menutHtml.classList.toggle("menu__show");
    })
}
function CloseShowMenu() {
    const bxX = document.querySelector(".bx-x");
    const menutHtml = document.querySelector(".menu");
    bxX.addEventListener("click",function () {
        menutHtml.classList.toggle("menu__show");
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
            printTotal(db);
            handleAmountProducts(db);
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
        const a_nav1 = document.querySelector('.a_nav1');
        const a_nav2 = document.querySelector('.a_nav2');
        
        window.scrollY>0? header.classList.add('change'): header.classList.remove('change');
    })
}
function printProductsinCart(db) {
    const card__products = document.querySelector('.cart__products');
    let html ='';
    card__products.innerHTML= html;
    for (const product in db.cart) {
        const {quantity, price,name,image,id,amount} = db.cart[product];
        html += `
                <div class="cart_product">
                    <div class="cartProduct--img">
                        <img src="${image}" alt="imagen" />
                    </div>
                    <div class="cart__product--body">
                        <h4>${name} </h4>
                        <h5><p class="p1">Stock: ${quantity}<p class="p2"> | $${price}.00</p></p><h5>
                        <h5><p class="p2"> Subtotal: $${price*amount}.00</p>
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
function handleProductsInCart(db) {
    const cartProducts = document.querySelector(".cart__products");
    cartProducts.addEventListener('click',function (e) {
        
        if(e.target.classList.contains("bx-plus"))
        {
            const id = Number(e.target.parentElement.id);
            const productFind = db.products.find(
                (product) => product.id === id
                );
                if(productFind.quantity=== db.cart[productFind.id].amount) 
                return alert("Se agotó el producto")
            
            db.cart[id].amount++;
        }
        if(e.target.classList.contains("bx-minus"))
        {
            const id = Number(e.target.parentElement.id);
            if(db.cart[id].amount===1){
                const response = confirm("Estas Seguro de Eliminar este Producto?");
                if (!response) return;
                    delete db.cart[id];    
            }
            else{
            db.cart[id].amount--;
            }
        }
        if(e.target.classList.contains("bx-trash"))
        {
            const id = Number(e.target.parentElement.id);
            
                const response = confirm("Estas Seguro de Eliminar este Producto?");
                if (!response) return;
                    delete db.cart[id];    
        }
        window.localStorage.setItem("cart",JSON.stringify(db.cart));
        printProductsinCart(db);
        printTotal(db);
        handleAmountProducts(db);
    });

}
function printTotal(db) {
    const infoTotal=document.querySelector(".info__total");    
    const infoAmount=document.querySelector(".info__amount");
    let totalProducts= 0;
    let amountProducts= 0;    

    for (const product in db.cart) {
        const {amount,price} = db.cart[product];
        totalProducts += price * amount ;
        amountProducts += amount;
    }

    infoAmount.textContent = amountProducts + "units";
    infoTotal.textContent = "$" + totalProducts +".00"
}
function handleTotal(db) {

    const btnBuy = document.querySelector(".btn__buy");
    
    btnBuy.addEventListener("click",function () {
        console.log("hola")
        if (!Object.values(db.cart).length) return alert("Seleccione un Producto a Comprar");
        const response =confirm("Seguro que desea Comprar?");
        if(!response)return;
        const currentProducts =[];

        for (const product of db.products) {
            const productCart = db.cart[product.id];
            if (product.id === productCart?.id) {
                currentProducts.push({...product,
                quantity: product.quantity - productCart.amount});       
            }else{
                currentProducts.push(product);
            }
        }

        db.products = currentProducts; 
        db.cart = {}
        window.localStorage.setItem("products",JSON.stringify(db.products));
        window.localStorage.setItem("cart",JSON.stringify(db.cart));
        printTotal(db);
        printProductsinCart(db);
        printProducts(db);
        handleAmountProducts(db);
    });
}
function handleAmountProducts(db) {
    
    const amountProducts = document.querySelector(".amountProducts")
    let amount = 0;
    for (const product in db.cart) {    
        amount += db.cart[product].amount;
    }
    amountProducts.textContent = amount;
}
async function main() 
{
    load();
    const url = "https://ecommercebackend.fundamentos-29.repl.co/";
    const db={ products: JSON.parse( window.localStorage.getItem("products")) || 
    await getProducts(url), cart: JSON.parse(window.localStorage.getItem("cart")) || {}, }
    //printProducts(db);
    imprimirProductos(db)
    handleShowCart();
    CloseShowCart();
    handleShowMenu();
    CloseShowMenu();
    addToCartfromThirdSection(db);
    themeMode();
    scroll();
    printProductsinCart(db);
    handleProductsInCart(db);   
    printTotal(db);
    handleTotal(db);
    handleAmountProducts(db);
}

window.addEventListener("load",main);

