console.log('====================================');
console.log("Connected");
console.log('====================================');


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
    console.log('Hi ');
    let text=ProductTitle+' with Color '+ 'and Size '+'added to cart';
    document.getElementById('Onsubmittext').innerText =text;
}



fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448').then(res => res.json()).then(data => {


    const buttonData = data.product.options[0].values;
    console.log(buttonData[0]);

    const buttonContainer = document.getElementById('buttonContainer');
    buttonData.forEach(buttonData => {
        const button = document.createElement('button');
        button.style.backgroundColor = buttonData.values;
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.marginLeft = '0.5rem';
        buttonContainer.appendChild(button);
    })

    const sizeData = data.product.options[1].values;

    const radioContainer = document.getElementById('radioContainer');
    console.log(sizeData);

    sizeData.forEach(sizeData => {
        const radioLabel = document.createElement('label');
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'radioOption';
        radioInput.id = 'radioOption';
        radioInput.value = 'value';
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
    text = text.substring(25, text.length - 4);
    document.getElementById('description').innerText = text;
    console.log(data.product.title);
})