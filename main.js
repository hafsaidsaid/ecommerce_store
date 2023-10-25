
//Click Buy Button
const buyBtns = document.querySelectorAll(".cards-container .card div button.btnBuy");
console.log(buyBtns);

buyBtns.forEach(btn=>{
    btn.addEventListener("click",buyFct)
});

const btnShow=document.querySelector(".cards-container button.btnShow");



function buyFct(e) {
    if(!e.target.parentElement.classList.contains("bought")) {
        e.target.textContent="✓ Done";
        btnShow.classList.add("activeShow");
        e.target.parentElement.parentElement.classList.add("bought");
    }else {
        // e.target.textContent="buy";
        btnShow.classList.remove("activeShow");
        // e.target.parentElement.parentElement.classList.remove("bought");
    }
}


// -------------------------------------show purchases----------------------------------------- //
let boxesContainer=document.querySelector(".sec-store .modalPur .boxes-container");
console.log(boxesContainer);

btnShow.addEventListener("click",()=> {
    document.querySelector(".sec-store .modalPur").classList.add("showModal");
    boxesContainer.innerHTML="";
    addProducts();
    let allQInputs = document.querySelectorAll(".sec-store .modalPur .boxes-container .box input");
    console.log(allQInputs);
    allQInputs.forEach(input=> {
        input.addEventListener("change",()=> {
            updateTotal();
        })
    });
    updateTotal();
    deleteFct();
});

//function add products to shopping cart
function addProducts() {
    const cards=document.querySelectorAll(".sec-store .cards-container .card");
    console.log(cards);
    cards.forEach(card=> {
        if(card.classList.contains("bought")) {
            let cardImgSrc= card.getElementsByTagName("img")[0].src;
            console.log(cardImgSrc);
            let cardTitle= card.getElementsByTagName("h3")[0].textContent;
            console.log(cardTitle);
            let cardPrcie= card.getElementsByClassName("price")[0].textContent;
            console.log(cardPrcie);
            let cardId=card.getAttribute("card-id");
            console.log(cardId);
            let b=createBox(cardImgSrc,cardTitle,cardPrcie,cardId);
            boxesContainer.appendChild(b);
        }
    })
}

// function create box
function createBox(imgSrc,title,price,cardId) {
    let box=document.createElement("div");
    box.className="box";
    box.setAttribute("card-id",cardId);
    let divOne=document.createElement("div");
    let itemImg=document.createElement("img");
    itemImg.src=`${imgSrc}`;
    let itemTitle=document.createElement("p");
    itemTitle.className="title";
    itemTitle.textContent=`${title}`;
    divOne.appendChild(itemImg);
    divOne.appendChild(itemTitle);
    box.appendChild(divOne);

    let divTwo=document.createElement("div");
    let quantity=document.createElement("p");
    quantity.textContent="quantity";
    let input=document.createElement("input");
    input.type="number";
    input.value=1;
    divTwo.appendChild(quantity);
    divTwo.appendChild(input);
    box.appendChild(divTwo);

    let itemPrice=document.createElement("h5");
    itemPrice.className="price";
    itemPrice.textContent=`${price}`;
    box.appendChild(itemPrice);

    let btnDelete=document.createElement("button");
    btnDelete.className="btnDelete";
    btnDelete.textContent="delete";
    box.appendChild(btnDelete);
    return box;
}

// console.log(modalBoxes);
// console.log(modalBoxes.parentElement);


function updateTotal() {
    let total=0;
    // console.log(boxesContainer);
    // console.log(boxesContainer.children.length);

    if(boxesContainer.children.length > 0) {
        const modalBoxes=document.querySelectorAll(".sec-store .modalPur .boxes-container .box");
        modalBoxes.forEach(box => {
            console.log(box.getElementsByTagName("input")[0].value);
            console.log(box.getElementsByClassName("price")[0].textContent);
            if(box.getElementsByTagName("input")[0].value>0) {
                total += parseInt(box.getElementsByTagName("input")[0].value) * parseFloat(box.getElementsByClassName("price")[0].textContent);
                console.log(total);
            }
            
        });
    }else {
        btnShow.classList.remove("activeShow");
    }
    document.querySelector("#total").textContent=`${total.toFixed(2)}$`;
}


//----------------------------------------Delete Product---------------------------------------//
function deleteFct(params) {
    
const allDeleteBtns = document.querySelectorAll(".sec-store .modalPur .boxes-container .box button.btnDelete");
console.log(allDeleteBtns);
allDeleteBtns.forEach(btn=> {
    btn.addEventListener("click",(e)=> {
        let cardId=e.target.parentElement.getAttribute("card-id");
        e.target.parentElement.remove();
        console.log("removed");
        const cards=document.querySelectorAll(".sec-store .cards-container .card");
        cards.forEach(card=> {
            if(card.getAttribute("card-id") == cardId) {
                card.classList.remove("bought");
                card.getElementsByClassName("btnBuy")[0].textContent='buy';
            }else {
                
            }
        })
        updateTotal();
    })
})
}



//----------------------------------------Close Modal---------------------------------------//
const closeModalIcon = document.querySelector(".sec-store .modalPur i");
console.log(closeModalIcon);

//click on closeIcon
closeModalIcon.addEventListener("click",(e)=> {
    e.target.parentElement.classList.remove("showModal");
});