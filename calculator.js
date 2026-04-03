let products=[];
    let cart=[];
    function addproduct(){
   
            let add=document.querySelector(".add").value;
            let productlist=document.querySelector(".productlist");
            let message=document.querySelector(".message");
            let option=document.createElement("option");
            option.text=add;
            option.value=add;
            productlist.add(option);
         
           

            

                message.innerText = `Product- ${add} successfully added`;
            
     
    setTimeout(()=>{
       
        message.innerText="";
    },1500);
    
}
 
function addprice(){
    let price=document.querySelector(".price").value;
    let selectedproduct=document.querySelector(".productlist").value;
    let message=document.querySelector(".message");
  
   
    
    if(price==""){
        message.innerText="Enter the price"
        return;

    }else if(selectedproduct=="Select Product"){
         message.innerText="Select the product first"
        return;
    }
       
    else{

        message.innerText=`price  ₹${price} added to ${selectedproduct}`;
    }
        
   
    products.push({
        name:selectedproduct,
        price:price
    });
     setTimeout(()=>{
       
        message.innerText="";
    },1500);
}
function check(){
    let checkoutproduct=document.querySelector(".checkoutproduct");
     checkoutproduct.innerHTML = '<option disabled selected>Select Product</option>';
     products.forEach(function(item){
        let option=document.createElement("option");
        option.text = item.name + " - ₹" + item.price;
        option.value = item.name;
        checkoutproduct.add(option);
     });
    }
   
  function Cart(){
   
    let message = document.querySelector(".checkout-message");
    let selectedProduct = document.querySelector(".checkoutproduct").value;
    let unitInput = document.getElementById("unit");

    if(!message){
        console.log("checkout-message div not found");
        return;
    }

    if(selectedProduct === "Select Product"){
        message.innerText = "Select product first";
        return;
    }

    if(!unitInput || unitInput.value === "" || Number(unitInput.value) <= 0){
        message.innerText = "Enter valid unit";
        return;
    }

    let productData = products.find(p => p.name === selectedProduct);

    if(!productData){
        message.innerText = "Price not added";
        return;
    }

    let totalPrice = Number(productData.price) * Number(unitInput.value);

    cart.push({
        name: productData.name,
        price: Number(productData.price),
        unit: Number(unitInput.value),
        total: totalPrice
    });

    unitInput.value = "";
    alert("Added to cart successfully");
}
    function pay(){

    let receiptBox = document.querySelector(".receiptdata");

    if(cart.length === 0){
        return;
    }

    let today = new Date();

    let date = today.toLocaleDateString();
    let time = today.toLocaleTimeString();

    let totalPrice = 0;

    let receiptHTML = `
        <div style="background:white; padding:15px;">
        <strong>Date:</strong> ${date} <br>
        <strong>Time:</strong> ${time} <br><br>

        <table border="1" width="100%" cellpadding="5">
            <tr>
                <th>Product</th>
                <th>$/Unit</th>
                <th>Unit(s)</th>
                <th>Price</th>
            </tr>
    `;
    

    cart.forEach(function(item){

        receiptHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.unit}</td>
                <td>${item.total}</td>
            </tr>
        `;

        totalPrice += item.total;
    });

    let tax = totalPrice * 0.05;   // 5% tax
    let amountDue = totalPrice + tax;

    receiptHTML += `
        </table>
        <br>
        <strong>Total Price :</strong> ${totalPrice} <br>
        <strong>Taxes :</strong> ${tax} <br>
        <strong>Amount Due :</strong> ${amountDue}
        </div>
    `;

    receiptBox.innerHTML = receiptHTML;

    cart = [];
}
    let buttons = document.querySelectorAll(".one");
let unitInput = document.getElementById("unit");

buttons.forEach(function(btn){
    btn.addEventListener("click", function(){
        unitInput.value += btn.innerText;
    });
});
        