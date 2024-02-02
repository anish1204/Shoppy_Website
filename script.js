// console.log('====================================');
// console.log("Connected");
// console.log('====================================');

const dataOfForm = document.getElementById('radioContainer');
const dataOfColor = document.getElementById('buttonContainer');



dataOfForm.addEventListener('change',function(event){
    if(event.target.type === 'radio')
    {
        // console.log(event.target.value);
        SelectedSize=event.target.value;
    }
})
dataOfColor.addEventListener('click',function(event){
    if(event.target.type === 'button')
    {
        console.log(event.target.value);
        SelectedColor=event.target.value
    }
})


function previewImage(imageSrc) {
    var previewImage = document.getElementById('previewImage');
    previewImage.src = imageSrc;
  }



let count = 1;
let ProductTitle;
let SelectedColor;
let SelectedSize;

function updateCount() {
    document.getElementById('count').textContent = count;
}
document.getElementById('incrementButton').addEventListener('click', function () {
    count++;
    updateCount();
});
document.getElementById('decrementButton').addEventListener('click', function () {
    if (count > 1) {
        count--;
        updateCount();
    }
});

function showRadioValue()
{
    // console.log('Hi ');
    let text=ProductTitle+' with Color '+SelectedColor+ ' and Size '+ SelectedSize +' added to cart';
    document.getElementById('Onsubmittext').innerText =text;
}

fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448').then(res => res.json()).then(data => {


    const buttonData = data.product.options[0].values;
    // console.log(buttonData[0] + ' Hi');

    
    
    let i=0;
    let colors =[];
    const buttonContainer = document.getElementById('buttonContainer');
    buttonData.forEach(buttonData => {
        const button = document.createElement('button');
        let color = buttonData[1];
        for (let key in buttonData) {
            colors.push(key);
            // console.log(key + ': ' + buttonData[key]);
        }
        button.style.backgroundColor = colors[i];
        button.type='button';
        button.onclick="alert('Button 2 Clicked')";
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.marginLeft = '0.5rem';
        
        button.value=button.style.backgroundColor;
        // console.log(button.value);
        buttonContainer.appendChild(button);
        i++;
    })

    const sizeData = data.product.options[1].values;

    const radioContainer = document.getElementById('radioContainer');
    // console.log(sizeData);

    sizeData.forEach(sizeData => {
        const radioLabel = document.createElement('label');
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'radioOption';
        radioInput.id = 'radioOption';
        radioInput.value = sizeData;
        radioLabel.appendChild(radioInput);
        radioLabel.appendChild(document.createTextNode(sizeData));
        radioContainer.appendChild(radioLabel);
    })


    ProductTitle= data.product.title;
    document.getElementById('Pdttitle').innerText = data.product.vendor;
    document.getElementById('DisPrice').innerText = data.product.price;
    document.getElementById('OrgPrice').innerText = data.product.compare_at_price;
    document.getElementById('ProductTitle').innerText = data.product.title;
    let text = data.product.description;
    
    let final_price = data.product.price;
    final_price = final_price.substring(1,final_price.length);
    // console.log(final_price);
    let initial_price = data.product.compare_at_price;
    initial_price = initial_price.substring(1,initial_price.length);
    let discount = initial_price-final_price;
    discount = discount/initial_price;
    discount=discount*100;
    // console.log(discount|0);


    text = text.substring(25, text.length - 4);
    document.getElementById('DiscountedAmount').innerText = (discount|0) + '% Off';
    document.getElementById('description').innerText = text;
    // console.log(data.product.title);
})