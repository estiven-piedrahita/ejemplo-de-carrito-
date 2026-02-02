
const URL = "http://localhost:3001";

let products = [];
let cart = [];
console.log(cart);


    async function ReaderProductos() {
    let res = await fetch(`${URL}/products`)
    products = await res.json();
    

    showProductos(products)

    }


document.addEventListener("DOMContentLoaded", ReaderProductos);


function showProductos(data) {

    
    let containerProductos = document.getElementById("products");

    containerProductos.innerHTML = "";

    data.forEach(P => {     

        containerProductos.innerHTML += 
        `
        <article class="card" data-category="${P.category}">
            <h3>${P.name}</h3>
            <p>$${P.price}</p>
            <button class="add-btn" data-id="${P.id}">Agregar</button>
        </article>
        `
    });
}

function addCart(id){

    console.log(products);
    
    let produ = products.find(P => P.id === id)
    console.log(id);
    
    
    if (!produ) { 
        return;}

    let exist = cart.find(C => C.id === id);
    console.log(exist);
    
    if (exist) {
        exist.cantidad++;
    }
    else{
        let producto = {
        id : produ.id,
        titulo : produ.name,
        categoria : produ.category,
        precio : produ.price,
        cantidad : 1,

    }
    cart.push(producto);

    
    
    }
    showCard()
}

function showCard() {

    let containerCarrito = document.querySelector(".carrito");

    containerCarrito.innerHTML= "";
    
    cart.forEach(item=>{

        containerCarrito.innerHTML += 
    `
    <div class="card">
        <h5 class="card-header">${item.categoria}</h5>
        <div class="card-body">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">$${item.precio}</p>
            <div class="count border-2">
                <div class="d-flex gap-3 contadores">
                    <div>
                    <button data-id="${item.id}" class="p-1 restar">-</button>
                    <button data-id="${item.id}" class="p-1 resetear">reset</button>
                    <button data-id="${item.id}" class="p-1 sumar">+</button>
                    </div>
                    <div >
                    <p class="contador">${item.cantidad}</p>
                    </div>
                    
                </div>
        </div>
    </div>
    `
    calcular()
    })

    }

function calcular() {
    let total = 0;

    cart.forEach(item=>{
        total += item.precio * item.cantidad;
    });

    let containerTotal = document.querySelector(".total");
    containerTotal.textContent = ` Total : $${total}`;

}
document.addEventListener("click",(e)=>{

    let filtrar = e.target.closest(".filter-btn");
    if (filtrar) {
        const cateogry = filtrar.dataset.category;
        
        if (cateogry === "all") {
            showProductos(products);
        }
        else{
            let filtro = products.filter(f => f.category === cateogry);
            showProductos(filtro);
        }
        return;
    }






    let btn = e.target.closest(".add-btn");

    if (btn){
        btn = btn.dataset.id;
    addCart(btn);
    return
    }
    


    let restar = e.target.closest(".restar");
    if (restar) {
        const id = restar.dataset.id;

        let item = cart.find(c=> c.id === id);
        if (item) {
            item.cantidad--;
            if (item.cantidad === 0) {
            cart =  cart.filter(c=> c.id !== id);
            
        }
        showCard();
        }
        return;
    }

    let reset = e.target.closest(".resetear");
    if (reset) {
        const id = reset.dataset.id;
        let item = cart.find(c=> c.id === id);
        if (item) {
            item.cantidad = 1; 
            showCard();           
        }
        return;
    }

    let sumar = e.target.closest(".sumar");
    if (sumar) {
        const id = sumar.dataset.id;
        let item = cart.find(c=> c.id === id);
        if (item) {
            item.cantidad++;
            showCard();
        }
        return;
    }
});

