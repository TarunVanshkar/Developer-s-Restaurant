
async function getMenu(){
    const url = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
    const data = await url.json();
    const cardContainer = document.getElementById("cards-container");
    /*
    // DOM of card to be created
    <div class="card">
                <img src="https://source.unsplash.com/random/1920x1080/?cheeseburger" alt="">
                <h3>Cheeseburger</h3>
                <p>Price: 5.99</p>
            </div>
    */

    for(let i=0; i<data.length; i++)
    {
        const div = document.createElement("div");
        div.className = "card";
    
        const img = document.createElement("img");
        img.src = data[i].imgSrc;
    
        const h3 = document.createElement("h3");
        h3.innerText = data[i].name;

        const p = document.createElement("p");
        p.innerText = `Price: ${data[i].price}`;

        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        
        cardContainer.appendChild(div); 
    }
    
}

function TakeOrder(){
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            const menu = ['Cheeseburger', 'Pizza', 'Tacos', 'Sushi', 'Pasta', 'Fried Chicken', 'Grilled Cheese Sandwich', 'Steak', 'Caesar Salad', 'Fish and Chips', 'Ramen', 'Burrito', 'Pho', 'Pad Thai', 'Gyro', 'Ice Cream', 'Smoothie', 'Apple Pie', 'Chocolate Cake', 'Pancakes', 'Cupcake', 'Crepes', 'Club Sandwich', 'Falafel', 'Curry'];

            const orders=[];
            for(let i=0; i<3; i++)
            {
                let randomIndex = Math.floor(Math.random() * menu.length);
                orders.push(menu[randomIndex])
            }
            resolve(orders)
        }, 2500)
    });
    return promise
}

function orderPrep(){
    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve({order_status:true, paid:false})
        }, 1500)
    })
    return promise;
}

function payOrder(){
    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve({order_status:true, paid:true})
        }, 1000)
    })
    return promise;
}

function thankyouFnc(){
    alert("thankyou for eating with us today!");
}


const functionBegin = async function(){
    getMenu();

    const orders = await TakeOrder();
    console.log(orders)

    const orderStatus = await orderPrep();
    console.log("Order Placed: " + orderStatus.order_status + ", Payment Status: " + orderStatus.paid)

    if(orderStatus.paid === false)
    {
        const paymentStatus = await payOrder();
        console.log("Payment Status: " + paymentStatus.paid);
    }

    thankyouFnc();
}
functionBegin();