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
function drawCart() {
    
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



async function main() 
{
    load();
    const url = "https://ecommercebackend.fundamentos-29.repl.co/";
    const db={ products: JSON.parse( window.localStorage.getItem("products")) || await getProducts(url), cart: {} }
    printProducts(db);
    handleShowCart();
    drawCart(db);
    themeMode();
    scroll()
}


window.addEventListener("load",main);

