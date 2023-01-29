// 1. Создайте инпут и при помощи этого инпута меняйте цвет бэкграунда на тот, который будет прописан в этом инпуте(учесть, что может быть передан не только текст, но еще и HEX, а также rgb)

// let inp = document.createElement('input');
// document.body.append(inp);
// inp.addEventListener('input', e => {
//        document.body.style.background = e.target.value
// });

// 2. Создайте блок и две кнопки для него(left и right), кнопка лефт отвечает за прокрутку блока влево на 180 градусов, а right аналогично вправо(используйте гугл для поиска информации о прокрутке блока)

// let block = document.querySelector('#block');
// let leftBtn = document.querySelector('#left');
// let rightBtn = document.querySelector('#right');
// leftBtn.addEventListener('click', () => {
//        block.style.transform = 'rotate(-0.5turn)'
// })
// rightBtn.addEventListener('click', () => {
//        block.style.transform = 'rotate(180deg)'
// })

// 3. Математическое округление. Создайте инпут, который будет округлять десятичное число в зависимости от его десятичной части к примеру, если ввести 5.7 вывести 6, если 5.4 вывести 5

// let inp = document.createElement('input');
// document.body.append(inp);
// inp.addEventListener('change', e => {
//        let res = e.target.value;
//        e.target.value = Math.round(res);
// });

// 4. Реализуйте логику контактной книжки, то есть, реализовать CR(создание и просмотр). Контакт должен иметь поля(name, lastName, age, address). Использовать bootstrap(карточки), json-server;

// const CONTACT_API = 'http://localhost:8000/contacts';

// let inpName = document.querySelector('#inp-name');
// let inpLastName = document.querySelector('#inp-lastName');
// let inpAge = document.querySelector('#inp-age');
// let inpAddress = document.querySelector('#inp-address');
// let addBtnContact = document.querySelector('#add-btn-cont');
// let readBtn = document.querySelector('#read-btn-cont');

// function createContact(e) {
//        e.preventDefault()
//        let contactObj = {
//               name: inpName.value,
//               lastname: inpLastName.value,
//               age: inpAge.value,
//               address: inpAddress.value
//        }
//        console.log(contactObj);

//        let res = fetch(CONTACT_API, {
//               method: 'POST',
//               body: JSON.stringify(contactObj),
//               headers: {
//                      'Content-Type': 'application/json;charset=utf-8'
//               }
//        });
// };

// addBtnContact.addEventListener('click', createContact);

// async function readContacts() {
//        let contactsList = document.querySelector('#contacts-list');
//        contactsList.innerHTML = '';
//        let res = await fetch(CONTACT_API);
//        let contacts = await res.json();
//        contacts.forEach(item => {
//               contactsList.innerHTML += `<div class="card m-5" style="width: 18rem;">
//                      <div class="card-body">
//                             <p class="card-text"><b>Name:</b> ${item.name}</p>
//                             <p class="card-text"><b>LastName:</b> ${item.lastname}</p>
//                             <p class="card-text"><b>Age:</b> ${item.age} y.o.</p>
//                             <p class="card-text"><b>Address:</b> ${item.address}</p>
//                      </div>
//             </div>`
//        })
// };
// readBtn.addEventListener('click', readContacts);

// 5. Отправить запрос на API: https://rickandmortyapi.com/api/character ; изучить эту ссылку и отобразить на странице карточки, в карточках должна быть следующая информация(картинка, имя, статус)

// let API = 'https://rickandmortyapi.com/api/character';
// async function read() {
//        let pers = document.querySelector('#container');
//        pers.innerHTML = '';
//        let res = await fetch(API);
//        let data = await res.json();
//        // console.log(data);
//        data.results.forEach(item => {
//               pers.innerHTML += `<div class="card m-5" style="width: 18rem;">
//                      <image src="${item.image}">
//                      <div class="card-body">
//                             <p class="card-text"><b>Name:</b> ${item.name}</p>
//                             <p class="card-text"><b>Status: </b>${item.status}</p>
//                      </div>
//             </div>`
//        })
// };
// read()

// 6. Используя готовые данные для файла db.json, Сделайте R-отображение, U-изменение
// 6.1. Продолжаем предыдущий таск. Реализуйте логику корзины. У вас есть карточка с товаром, нажав на кнопку «добавить в корзину» добавляйте товар в локал сторадж, с возможностью указать количество товаров. Также в карточке должна быть кнопка, УДАЛИТЬ ИЗ КОРЗИНЫ, нажав на которую, товар удаляется из корзины, также на странице должна быть кнопка ОЧИСТИТЬ КОРЗИНУ, при нажатии на эту кнопку, все товары должны быть удалены из хранилища

const PRODUCTS_API = 'http://localhost:8000/products';

async function render() {
       let productsList = document.querySelector('#container');
       productsList.innerHTML = '';
       let res = await fetch(PRODUCTS_API);
       let products = await res.json();
       products.forEach(item => {
              productsList.innerHTML += `<div class="card m-5" style="width: 18rem;">
                     <img src="${item.image}" class="card-img-top" alt="error:(" height="200">
                     <div class="card-body">
                            <h5 class="card-title">${item.name}</h5><hr>
                            <p class="card-text"><b>Brand:</b> ${item.brand}</p>
                            <p class="card-text"><b>Description:</b> ${item.description}</p>
                            <p class="card-text"><b>Color:</b> ${item.color}</p>
                            <p class="card-text"><b>Price:</b> ${item.price} $</p>
                            <div class="d-flex flex-column justify-content-end">
                            <a href="#" class="btn btn-success mb-2 btn-add" id="add-${item.id}">Add to shopping cart</a>
                            <a href="#" class="btn btn-info mb-2 btn-upd" id="upd-${item.id}" 
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            >Update</a>
                            </div>
                     </div>
            </div>`
       });

       addToCartShopEvent();
       
       // cart shop **********************************************************************************
       let shopCart = document.querySelector('.cart');
       shopCart.innerHTML = '';
       let productsCartShop = getProductsFromStorage();
       // console.log(productsCartShop);
       productsCartShop.forEach(item => {
              shopCart.innerHTML += `<div class="card m-5 w-75 d-flex" style="width: 18rem;">
                     <div class="card-body d-flex">
                            <img src="${item.image}" class="img-fluid img-thumbnail w-25 h-25" alt="error:(">
                            <div class="container">
                                   <h5 class="card-title">${item.name}</h5>
                                   <div class="d-flex justify-content-end">
                                   <a href="#" class="btn btn-danger btn-del" id="del-${item.id}">Delete </a>
                                   </div>
                                   <hr>
                                   <p class="card-text">${item.brand}</p>
                                   <p class="card-text">color: ${item.color}</p>
                                   <p class="card-text">price: ${item.price} $</p>
                                   <p class="card-text">count: ${item.count}
                                   <p class="card-text">subprice: ${item.price*item.count} $</p>
                                   <a href="#" class="btn btn-outline-success btn-add-count" id="del-${item.id}">+</a>
                                   <a href="#" class="btn btn-outline-danger btn-del-count" id="del-${item.id}">-</a>
                                   
                            </div>
                     </div>
            </div>`
       });

       updateProdEvent();
       deleteToCartShopEvent();
       addCountProdEvent();
       delCountProdEvent();
       totalPrice();
       if (productsCartShop.length == 0) return;

};
render()

function initStorage() {
       if (!localStorage.getItem('products-data')) {
              localStorage.setItem('products-data', '[]');
       };
};
initStorage();

async function setToLocalStorage(products) {
       localStorage.setItem('products-data', JSON.stringify(products))
};

function getProductsFromStorage() {
       let products = JSON.parse(localStorage.getItem('products-data'));
       return products;
};

async function addProdToCart(e) {
       let productId = e.target.id.split('-')[1];
       // console.log(productId);
       let res = await fetch(PRODUCTS_API);
       let products = await res.json();
       // console.log(products);
       let prodObj = await products.find(item => item.id == productId)
       // console.log(prodObj);
       prodObj.count = 1;
       let product = getProductsFromStorage();
       product.push(prodObj);
       setToLocalStorage(product)
       render();
};

function addToCartShopEvent() {
       let btnAddToLocalStorage = document.querySelectorAll('.btn-add');
       btnAddToLocalStorage.forEach(item => item.addEventListener('click', addProdToCart));
};

function deleteProdToCart(e) {
       let productId = e.target.id.split('-')[1];
       // console.log(productId);
       let products = getProductsFromStorage();
       // console.log(products);
       products = products.filter(item => item.id != productId)
       setToLocalStorage(products);
       render();
};

function deleteToCartShopEvent() {
       let btnClearToLocalStorage = document.querySelectorAll('.btn-del');
       // console.log(btnClearToLocalStorage);
       btnClearToLocalStorage.forEach(item => item.addEventListener('click', deleteProdToCart));
};

function addCountProd(e) {
       let productId = e.target.id.split('-')[1];
       // console.log(productId);
       let products = getProductsFromStorage();
       let productObj = products.find(item => item.id == productId);
       // console.log(productObj);
       productObj.count += 1
       setToLocalStorage(products)
       render()
};

function addCountProdEvent() {
       let btnAddCountProd = document.querySelectorAll('.btn-add-count');
       // console.log(btnAddCountProd);
       btnAddCountProd.forEach(item => item.addEventListener('click', addCountProd))
}

function delCountProd(e) {
       let productId = e.target.id.split('-')[1];
       // console.log(productId);
       let products = getProductsFromStorage();
       let productObj = products.find(item => item.id == productId);
       // console.log(productObj);

       if (productObj.count === 1) {
              return deleteProdToCart(e);
       } else productObj.count -= 1
       setToLocalStorage(products);
       render();
};

function delCountProdEvent() {
       let btnAddCountProd = document.querySelectorAll('.btn-del-count');
       // console.log(btnAddCountProd);
       btnAddCountProd.forEach(item => item.addEventListener('click', delCountProd))
};

function totalPrice() {
       let totalPrice = document.querySelector('#total-price');
       let products = getProductsFromStorage();
       let total = 0;
       products.forEach(item => {
              return total += item.price * item.count;
       });
       totalPrice.innerHTML = `Total price: ${total} $`;
};

function clearLocalStorage() {
       localStorage.clear();
       initStorage();
       render()
};

let clearBtnLocal = document.querySelector('#btn-clear-local-storage');
// console.log(clearBtnLocal);
clearBtnLocal.addEventListener('click', clearLocalStorage);

// group inputs
let inpNameProd = document.querySelector('#inp-prod-name');
let inpBrandProd = document.querySelector('#inp-prod-brand');
let inpPriceProd = document.querySelector('#inp-prod-price');
let inpDescProd = document.querySelector('#inp-prod-desc');
let inpImageProd = document.querySelector('#inp-prod-image');
let inpColorProd = document.querySelector('#inp-prod-color');
// console.log(inpNameProd, inpBrandProd, inpPriceProd, inpDescProd, inpImageProd, inpColorProd);

async function updateProd(e) {

       let productId = e.target.id.split('-')[1];
       // console.log(productId);

       let res = await fetch(PRODUCTS_API);
       let products = await res.json();

       let productObj = products.find(item => item.id == productId);
       // console.log(productObj);

       inpNameProd.value = productObj.name;
       inpBrandProd.value = productObj.brand;
       inpPriceProd.value = productObj.price;
       inpDescProd.value = productObj.description;
       inpImageProd.value = productObj.image;
       inpColorProd.value = productObj.color;

       let btnSave = document.querySelector('.save-changes');
       // console.log(btnSave);
       btnSave.setAttribute('id', productId);
       btnSave.addEventListener('click', saveChanges)
};

function updateProdEvent() {
       let btnUpdProd = document.querySelectorAll('.btn-upd');
       btnUpdProd.forEach(item => item.addEventListener('click', updateProd));
};

async function saveChanges(e) {
       let productId = e.target.id
       // console.log(productId);

       let res = await fetch(PRODUCTS_API);
       let products = await res.json();

       let productObj = products.find(item => item.id == productId);
       // console.log(productObj);

       productObj.name = inpNameProd.value;
       productObj.brand = inpBrandProd.value;
       productObj.price = inpPriceProd.value;
       productObj.description = inpDescProd.value;
       productObj.image = inpImageProd.value;
       productObj.color = inpColorProd.value;

       fetch(`${PRODUCTS_API}/${productId}`, {
              method: 'PATCH',
              body: JSON.stringify(productObj),
              headers: {
                     'Content-Type': 'application/json;charset=utf-8'
              }
       })

       inpNameProd.value = '';
       inpBrandProd.value = '';
       inpPriceProd.value = '';
       inpDescProd.value = '';
       inpImageProd.value = '';
       inpColorProd.value = '';

       let btnCloseChanges = document.querySelector('.btn-close');
       btnCloseChanges.click();

       e.target.removeAttribute('id');
       render();
};

       
