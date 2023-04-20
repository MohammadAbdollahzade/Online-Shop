'use strict'

document.documentElement.style.setProperty('--theme-color',localStorage.getItem('Theme'));

if (!localStorage.getItem('Theme')) {
  localStorage.setItem('Theme','rgb(252, 185, 0)')
}

const btnsTheme = document.querySelectorAll('.bt')

for (let i = 0; i < btnsTheme.length; i++) {    
    btnsTheme[i].addEventListener("click",(event)=>{
       let color = event.target.getAttribute("data-color")
    localStorage.setItem('Theme',color)
       document.documentElement.style.setProperty('--theme-color',color);
    location.reload();
    })
}


let userId = localStorage.getItem('id');

let formData = {
    "id": userId
  }

  let suname = ''
fetch('http://127.0.0.1:5000/data/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
  .then(response=>{
    return response.json()
})
  .then( response => {
    let dataUsers = Object.entries(response)
    let users = []
    dataUsers.forEach(user =>{
      users = user[1]
    })
    users.forEach(user =>{
      titleUsername.innerHTML = user.name 
      titleUsernamee.innerHTML = user.name 
      nameLast.value = user.name 
      username.value = user.username
      suname = user.username
      email.value = user.email
      pass.value = user.password
      phoneNum.value = user.phoneNumber
      city.value = user.city
      address.value = user.address
      nationalCode.value = user.nationalCode
    })
})
  .catch(error => {
    console.log(error);
})

let betUsername = true

username.addEventListener('keyup',(event)=>{
  username.value = username.value.toLowerCase();
  if (username.value != suname) {
    let formData = {
    "username": username.value
  }
  fetch('http://127.0.0.1:5000/data/signup/username', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response=>{
    return response.json()
  })
  .then(response => {
    if (response.data.length != 0) {
      alertuname.style.display = 'block'
      betUsername = false
    }else{
      alertuname.style.display = 'none'
      betUsername = true
    }
  })
  .catch(error => {
    console.log(error);
  })
}
})

const blur = ()=> {
  if (pass.value.length != 8 ) {
    alertpass.style.display = 'block'
  }
  if (pass.value == '') {
    alertpass.style.display = 'none'
  }
}

const keydown = ()=> {
  if (pass.value.length == 8 ) {
    alertpass.style.display = 'none'
    }
}

pass.addEventListener('blur', blur)
pass.addEventListener('keydown', keydown)


email.addEventListener('blur',()=>{
  if (email.value == ''){
    lemail.style.top = '50%'
  }
})

email.addEventListener('keydown',()=>{
  if (email.value != '') {
    lemail.style.top = '0%'
  }
})

city.addEventListener('blur',()=>{
  if (city.value == ''){
    lcity.style.top = '50%'
  }
})

city.addEventListener('keydown',()=>{
  if (city.value != '') {
    lcity.style.top = '0%'
  }
})

address.addEventListener('keydown',()=>{
  if (address.value != '') {
    laddress.style.top = '0%'
  }
})

address.addEventListener('blur',()=>{
  if (address.value == ''){
    laddress.style.top = '50%'
  }
})

nationalCode.addEventListener('keydown',()=>{
  if (nationalCode.value != '') {
    lnationalCode.style.top = '0%'
  }
})

nationalCode.addEventListener('blur',()=>{
  if (nationalCode.value == ''){
    lnationalCode.style.top = '50%'
  }
})

const password = document.querySelector('.password')
const iconPassword = document.querySelector('.icon-password')


  iconPassword.addEventListener('click',()=>{
    if(iconPassword.className == 'icon-password  bi-eye-slash-fill'){
      iconPassword.className = 'icon-password bi-eye-fill'
      password.setAttribute('type','text')
    }else{
      iconPassword.className = 'icon-password  bi-eye-slash-fill'
      password.setAttribute('type','password')
    }
  })


window.addEventListener("DOMContentLoaded",() => {
  const btnSignup = document.querySelector('.btn-signup');
  var doneTimeout = null,
    resetTimeout = null;
    btnSignup.addEventListener("click",function(e) {
      if (nameLast.value != '' && username.value != '' && email.value != '' &&
          pass.value != '' && phoneNum.value.length == 10 && city.value != '' && nationalCode.value != '' && pass.value.length == 8 && betUsername == true) {
        
        let formData = {
        "id": userId,
        "username": username.value,
        "name": nameLast.value,
        "email": email.value,
        "password": pass.value,
        "phoneNumber": phoneNum.value,
        "city": city.value,
        "address": address.value,
        "nationalCode": nationalCode.value
        };
      fetch('http://127.0.0.1:5000/updata/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then( response => {
      })
      .catch(error => {
        console.log(error);
      });
      const runClass = "btn--running";
      const doneClass = "btn--done";
      const submitDuration = 2000;
      const resetDuration = 1500;
      
      // fake the submission
      this.disabled = true;
      this.classList.add(runClass);
      
      clearTimeout(doneTimeout);
      clearTimeout(resetTimeout);
      
      doneTimeout = setTimeout(() => {
        this.classList.remove(runClass);
        this.classList.add(doneClass);
        
        // reset the button
        resetTimeout = setTimeout(() => {
          this.disabled = false;
          this.classList.remove(doneClass);
        }, resetDuration);
        
      }, 600 + submitDuration);
      // setTimeout(()=>{
      //   // lemail.style.top = '50%'
      //   // lnationalCode.style.top = '50%'
      // },3000)
    }
    });
});

const $ = document
const swiperslider = $.querySelector('.mySwiper')

let swiper = new Swiper(swiperslider, {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
})

const menuIcon = $.getElementById('nav-icon1')

let i = 0
menuIcon.addEventListener('click',()=>{
  if (i%2==0) {
    menuIcon.classList.add('open')
    menuBurger.style.display = 'block'
    menuBurger.style.left = '0'
    closePage.style.display = 'block'
  }else{
    menuIcon.classList.remove('open')
    menuBurger.style.left = '-20rem'
    closePage.style.display = 'none'
  }
  i++
}) 
closePage.addEventListener('click',()=>{
  menuIcon.classList.remove('open')
  menuBurger.style.left = '-20rem'
  closePage.style.display = 'none'
  i++
})

const SEGMENTED_CONTROL_BASE_SELECTOR = ".ios13-segmented-control";
const SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR =
    ".ios13-segmented-control .option input";
const SEGMENTED_CONTROL_BACKGROUND_PILL_SELECTOR =
    ".ios13-segmented-control .selection";
// Main
document.addEventListener("DOMContentLoaded", setup);
// Body functions
function setup() {
    forEachElement(SEGMENTED_CONTROL_BASE_SELECTOR, (elem) => {
        elem.addEventListener("change", updatePillPosition);
    });
    window.addEventListener("resize", updatePillPosition); // Prevent pill from detaching from element when window resized. Becuase this is rare I haven't bothered with throttling the event
}

function updatePillPosition() {
    forEachElement(
        SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR,
        (elem, index) => {
            if (elem.checked) moveBackgroundPillToElement(elem, index);
        }
    );
}

function moveBackgroundPillToElement(elem, index) {
    document.querySelector(
        SEGMENTED_CONTROL_BACKGROUND_PILL_SELECTOR
    ).style.transform = "translateX(" + elem.offsetWidth * index + "px)";
}
function forEachElement(className, fn) {
    Array.from(document.querySelectorAll(className)).forEach(fn);
}

  let bslide = ''
  let betslider = false
  fetch('http://127.0.0.1:5000/data/categoryname', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  })
  .then(response=>{
    return response.json()
  })
  .then( response => {
    let dataCategories = Object.entries(response)
    let categories = []
    dataCategories.forEach(categorie =>{
      categories = categorie[1]
    })
    let qty = 0
    for (let i = 1; i <= categories.length; i++) {      
      const conCards = $.createElement('div')
      conCards.setAttribute('class','con-cards-'+i+' con-cards')
      conCards.setAttribute('id','con-cards-'+i)
      boxs.append(conCards)
    }

  categories.forEach(categorie=>{
    qty++
    if(titleCategory.innerHTML == ''){
      titleCategory.innerHTML = categorie.name
    }
    const slide = $.createElement('div')
    slide.setAttribute('class','slide')
    slide.setAttribute('id',''+qty+'')
    slide.style.backgroundImage = `url('${categorie.image}')`

    if(bslide == ''){
      bslide = slide
    }

    slider.append(slide)
    const text = $.createElement('div')
    text.setAttribute('class','text')
    const title = $.createElement('h1')
    title.innerHTML = categorie.name
    const description = $.createElement('p')
    description.innerHTML = categorie.description

    text.append(title,description)
    slide.append(text)

    const conCards = $.querySelectorAll('.con-cards')

    let cslide = $.querySelectorAll('.slide')
    
    let sizeconCards = conCards.length-2
        conCards[sizeconCards].style.display = 'none'


      slide.addEventListener('click',(e)=>{
      bslide.style.width = '130px'
      bslide.style.boxShadow = '0px 10px 30px 0px rgba(0,0,0,.05)'
      bslide = slide
      slide.style.width = '150px'
      slide.style.boxShadow = localStorage.getItem('Theme') +' 0px 20px 70px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
      titleCategory.innerHTML = title.innerHTML
      for (let i = 0; i < conCards.length; i++) {
        if(conCards[i].id == 'con-cards-'+slide.id){
          conCards[i].style.display = 'flex'
        }else{
          conCards[i].style.display = 'none'
        }
    }
    })

  })
})
.catch(error => {
console.log(error);
})


let qtyCart = 0
let qtyClick = 0
let q = 0


  function template(cards,productName,discraption,price,image,id,quantity = 1,btnName = 'Add to cart',backColor = 'linear-gradient(130deg,'+ localStorage.getItem('Theme') +'0%, '+ localStorage.getItem('Theme') +' 100%)',status) {

    
    const card = document.createElement('div')
    card.classList.add('card') 

    document.querySelector('.con-cards-'+cards).appendChild(card)


  const conImage = $.createElement('div')
  conImage.setAttribute('class','con-image')
  const img = $.createElement('img')
  img.setAttribute('class','img')
  img.setAttribute('id','imgc')
  img.setAttribute('src',image)
  const bg = $.createElement('img')
  bg.setAttribute('class','bg')
  bg.setAttribute('id','bgc')
  bg.setAttribute('src',image)
  conImage.append(img,bg)

  const contextprice = $.createElement('div')
  contextprice.setAttribute('class','con-textprice')

  const context = $.createElement('div')
  context.setAttribute('class','con-text')
  const contextPN = $.createElement('h3')
  contextPN.setAttribute('id', 'productNm')
  contextPN.innerHTML = productName
  const contextDC = $.createElement('p')
  contextDC.setAttribute('id','productDc')
  contextDC.innerHTML = discraption
  context.append(contextPN,contextDC)


  const conprice = $.createElement('div')
  conprice.setAttribute('id','conprice')
  conprice.setAttribute('class','con-price')
  conprice.innerHTML = '$ '
  const spanprice = $.createElement('span')
  spanprice.setAttribute('id','spanprice')
  let Priceq = price*quantity
  spanprice.innerHTML = Priceq.toLocaleString('en-US')
  conprice.append(spanprice)

  contextprice.append(context,conprice)

  const conallinputbtns = $.createElement('div')
  conallinputbtns.setAttribute('class','con-conallinputbtns')

  const coninputbtns = $.createElement('div')
  coninputbtns.setAttribute('class','con-input-btns')
  const less = $.createElement('button')
  less.setAttribute('class', 'less')
  less.setAttribute('id', "less")
  const iconLess = $.createElement('i')
  iconLess.setAttribute('class','bi bi-dash-lg')
  const inputqty = $.createElement('input')
  inputqty.setAttribute('id','qty')
  inputqty.value = quantity
  const plus = $.createElement('button')
  plus.setAttribute('class', 'plus')
  plus.setAttribute('id', "pluss")
  const iconPlus = $.createElement('i')
  iconPlus.setAttribute('class','bi bi-plus-lg')
  less.append(iconLess)
  plus.append(iconPlus)


  const conbtn = $.createElement('div')
  conbtn.setAttribute('class','con-btn')
  const add = $.createElement('button')
  add.setAttribute('class','add')
  add.setAttribute('id',id)
  add.setAttribute('onclick','handleAdd(event)')
  add.style.background = backColor
  add.innerHTML = btnName
  conbtn.append(add)
  conallinputbtns.append(coninputbtns,conbtn)

  if (btnName == 'Add to cart') {
    coninputbtns.append(less,inputqty,plus)
  }else{
    inputqty.setAttribute('readonly','readonly')
    coninputbtns.append(inputqty) 
  }
  if (status == 'Sent') {
    add.innerHTML = 'Sent'
    add.style.backgroundColor = '#50C878'
  }

  card.append(conImage,contextprice,conallinputbtns)  
  

  let pr = price
  let pricebb = Priceq;
less.addEventListener('click',(event)=>{
    const card = event.target.closest('.card');
    const input = card.querySelector('input');
    let oldVal = Number(input.value);
    if (oldVal == 1) {
      card.classList.remove('add-active');
      return;
    }
    input.value = oldVal - 1;
    pricebb = pricebb - pr;
    spanprice.innerHTML = pricebb.toLocaleString('en-US')
  });

  plus.addEventListener('click',(event)=>{
    const card = event.target.closest('.card');
    const input = card.querySelector('input');
    let oldVal = Number(input.value);
    input.value = oldVal + 1;
    pricebb = pricebb + pr;
    spanprice.innerHTML = pricebb.toLocaleString('en-US')
    price = pricebb
  })
    }
    
    fetch("http://127.0.0.1:5000/data/products", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    })
    .then(response=>{
        return response.json()
    })
    .then(response =>{
    let datapProducts= Object.entries(response)
    let category = []
    datapProducts.forEach(product =>{
        category = product[1]
    })
    
    let i = 0
    
    let formDataCart = {
        "id": userId
      }
      let carts = []
      fetch('http://127.0.0.1:5000/data/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataCart)
      })
      .then(response=>{
        return response.json()
      })
      .then( response => {
        let dataCart = Object.entries(response)
        dataCart.forEach(cart =>{
            carts = cart[1]
        })
        let i = 0
        let j = 0
        let betDataCart = true
            for (i ; i < category.length; i++) { 
              if (j != carts.length) {
              if(carts.length != 0){
                if (j < carts.length && category[i].productId == carts[j].productId && carts[j].status == 'cart') {
                 template(category[i].categoryId,category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId,carts[j].quantity,'Delete','rgba(255, 0, 0, 0.813)',carts[j].status)
                qtyCart++
                shoppingCart.setAttribute('data-product-count',`${qtyCart}
                `)
                j++
                betDataCart = false
              }
              if (j < carts.length && category[i].productId == carts[j].productId && carts[j].status == 'bought') {
                template(category[i].categoryId,category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId,carts[j].quantity,'Bought','#50C878',carts[j].status)
               qtyCart++
               shoppingCart.setAttribute('data-product-count',`${qtyCart}
               `)
               j++
               betDataCart = false
             }
            }
          }
              if (betDataCart) {
                template(category[i].categoryId,category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId)
          }
          betDataCart = true
          }
})
.catch(error => {
  console.log(error);
})
})


const shoppingCart = $.querySelector('.shopping-cart')




function handleAdd(event) {
    const card = event.target.closest('.card')
    const add = event.target.closest('.add')
    const input = card.querySelector('input')
    if(event.target.innerHTML == 'Add to cart'){
        qtyCart++
        shoppingCart.setAttribute('data-product-count',`${qtyCart}`)
        add.innerHTML = 'Delete'
        add.style.background = 'rgba(255, 0, 0, 0.813)'
        card.classList.add('add-active')
        qtyClick++
        let formData = {
            "id": userId,
            "productId": event.target.id,
            "quantity": input.value,
            "status": 'cart',
          };
          fetch('http://127.0.0.1:5000/data/addcart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then( response => {
          })
          .catch(error => {
            console.log(error);
          });
    }else{
    if(event.target.innerHTML == 'Delete'){
        let formData = {
            "id": userId,
            "productId": event.target.id
          };
          fetch('http://127.0.0.1:5000/data/deletecart', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then( response => {
          })
          .catch(error => {
            console.log(error);
          });
        qtyCart--
        shoppingCart.setAttribute('data-product-count',`${qtyCart}`)
        add.innerHTML = 'Add to cart'
        add.style.background = localStorage.getItem('Theme')
        qtyClick++
        card.classList.remove('add-active')
        input.value = 1
    }
  }
  location.reload();
}

    function plusLess(event, type) {
        const card = event.target.closest('.card')
        const input = card.querySelector('input')
        let oldVal = Number(input.value)
        if (type == 'less') {
            if (oldVal == 1) {
                card.classList.remove('add-active')
                return
            }
            input.value = oldVal -= 1
        } else {
            input.value = oldVal += 1
        }
    }


const linavbarLeft = $.querySelectorAll('.navbar__item')
const navbarLeft = $.querySelectorAll('.navbar__item a i')
const textNavbarLeft = $.querySelectorAll('.navbar__item a span')


for (let i = 0; i < linavbarLeft.length; i++) {
  linavbarLeft[i].addEventListener('click',()=>{
    navbarLeft[i].style.color = localStorage.getItem('Theme')
    textNavbarLeft[i].style.color = localStorage.getItem('Theme')
    for (let j = 0; j < linavbarLeft.length; j++) {
      if (j != i) {
        navbarLeft[j].style.color = 'rgba(35, 35, 35, 0.685)'
      textNavbarLeft[j].style.color = 'rgba(35, 35, 35, 0.685)'
      }   
    }
  })
}

exit.addEventListener('click',()=>{
    localStorage.clear()
    window.location.href = '../../onlineShop.html';
})
exitt.addEventListener('click',()=>{
  localStorage.clear()
  window.location.href = '../../onlineShop.html';
})

Home.addEventListener('click',()=>{
  homePage.style.display = 'block'
  cartPage.style.display = 'none'
  profilePage.style.display = 'none'
  messagesPage.style.display = 'none'
  settingsPage.style.display = 'none'
})

cart.addEventListener('click',()=>{
  homePage.style.display = 'none'
  cartPage.style.display = 'block'
  profilePage.style.display = 'none'
  messagesPage.style.display = 'none'
  settingsPage.style.display = 'none'
})

profile.addEventListener('click',()=>{
  homePage.style.display = 'none'
  cartPage.style.display = 'none'
  profilePage.style.display = 'block'
  messagesPage.style.display = 'none'
  settingsPage.style.display = 'none'
})

settings.addEventListener('click',()=>{
  homePage.style.display = 'none'
  cartPage.style.display = 'none'
  profilePage.style.display = 'none'
  messagesPage.style.display = 'none'
  settingsPage.style.display = 'block'
})

messages.addEventListener('click',()=>{
  homePage.style.display = 'none'
  cartPage.style.display = 'none'
  profilePage.style.display = 'none'
  messagesPage.style.display = 'block'
  settingsPage.style.display = 'none'
})
Homee.addEventListener('click',()=>{
  homePage.style.display = 'block'
  cartPage.style.display = 'none'
  profilePage.style.display = 'none'
  messagesPage.style.display = 'none'
  settingsPage.style.display = 'none'
})

cartt.addEventListener('click',()=>{
  homePage.style.display = 'none'
  cartPage.style.display = 'block'
  profilePage.style.display = 'none'
  messagesPage.style.display = 'none'
  settingsPage.style.display = 'none'
})

profilee.addEventListener('click',()=>{
  homePage.style.display = 'none'
  cartPage.style.display = 'none'
  profilePage.style.display = 'block'
  messagesPage.style.display = 'none'
  settingsPage.style.display = 'none'
})

settingss.addEventListener('click',()=>{
  homePage.style.display = 'none'
  cartPage.style.display = 'none'
  profilePage.style.display = 'none'
  messagesPage.style.display = 'none'
  settingsPage.style.display = 'block'
})

messagess.addEventListener('click',()=>{
  homePage.style.display = 'none'
  cartPage.style.display = 'none'
  profilePage.style.display = 'none'
  messagesPage.style.display = 'block'
  settingsPage.style.display = 'none'
})
  function template2(index,productName,discraption,price,image,id,quantity,status) {
  const card = document.createElement('div')
  card.classList.add('card')
  document.querySelector('.con-cards-0').appendChild(card)


  const conImage = $.createElement('div')
  conImage.setAttribute('class','con-image')
  const img = $.createElement('img')
  img.setAttribute('class','img')
  img.setAttribute('id','imgc')
  img.setAttribute('src',image)
  const bg = $.createElement('img')
  bg.setAttribute('class','bg')
  bg.setAttribute('id','bgc')
  bg.setAttribute('src',image)
  conImage.append(img,bg)

  const contextprice = $.createElement('div')
  contextprice.setAttribute('class','con-textprice')

  const context = $.createElement('div')
  context.setAttribute('class','con-text')
  const contextPN = $.createElement('h3')
  contextPN.setAttribute('id', 'productNm')
  contextPN.innerHTML = productName
  const contextDC = $.createElement('p')
  contextDC.setAttribute('id','productDc')
  contextDC.innerHTML = discraption
  context.append(contextPN,contextDC)


  const conprice = $.createElement('div')
  conprice.setAttribute('id','conprice')
  conprice.setAttribute('class','con-price')
  conprice.innerHTML = '$ '
  const spanprice = $.createElement('span')
  spanprice.setAttribute('id','spanprice')
  let Priceq = price*quantity
  spanprice.innerHTML = Priceq.toLocaleString('en-US')
  conprice.append(spanprice)

  contextprice.append(context,conprice)
  
  const conallinputbtns = $.createElement('div')
  conallinputbtns.setAttribute('class','con-conallinputbtns')

  const coninputbtns = $.createElement('div')
  coninputbtns.setAttribute('class','con-input-btns')
  const less = $.createElement('button')
  less.setAttribute('class', 'less')
  less.setAttribute('id', "less")
  const iconLess = $.createElement('i')
  iconLess.setAttribute('class','bi bi-dash-lg')
  const inputqty = $.createElement('input')
  inputqty.setAttribute('id','qty')
  inputqty.value = quantity
  const plus = $.createElement('button')
  plus.setAttribute('class', 'plus')
  plus.setAttribute('id', "plus")
  const iconPlus = $.createElement('i')
  iconPlus.setAttribute('class','bi bi-plus-lg')
  less.append(iconLess)
  plus.append(iconPlus)


  const discount = $.createElement('div')
  discount.setAttribute('class','field discount')
  const inputdiscount = $.createElement('input')
  inputdiscount.setAttribute('id','discount')
  inputdiscount.setAttribute('maxlength',20)
  const ldiscount = $.createElement('label')
  ldiscount.setAttribute('class','ldiscount')
  ldiscount.innerHTML = 'Discount'
  discount.append(inputdiscount,ldiscount)


  const con4btn = $.createElement('div')
  con4btn.setAttribute('class','con4-btn')
  const removeProduct = $.createElement('button')
  removeProduct.setAttribute('class','remove-product')
  removeProduct.setAttribute('onclick','removeProducttt(event)')
  removeProduct.setAttribute('id',id)
  const iconDelete = $.createElement('i')
  iconDelete.setAttribute('class','bi bi-trash3')
  const buy = $.createElement('button')
  buy.setAttribute('class','buy')
  buy.setAttribute('id',id)
  if (status == 'cart') { 
    buy.innerHTML = 'Buy'
    coninputbtns.append(less,inputqty,plus)
    con4btn.append(removeProduct,buy)
    conallinputbtns.append(coninputbtns,discount,con4btn)
    card.append(conImage,contextprice,conallinputbtns)
  }
  if (status == 'bought') { 
    buy.innerHTML = 'Bought'
    buy.style.backgroundColor = '#50C878'
  }
  if(status == 'Sent'){
    buy.innerHTML = 'Sent'
    buy.style.backgroundColor = '#50C878'
  }
  removeProduct.append(iconDelete)
  if (status == 'Not Sent') { 
    buy.innerHTML = 'Not Sent'
    buy.style.backgroundColor = 'red'
    inputqty.setAttribute('readonly','readonly')
    coninputbtns.append(inputqty)
    con4btn.append(removeProduct,buy)
    conallinputbtns.append(coninputbtns,con4btn)
    card.append(conImage,contextprice,conallinputbtns)
    qtyCart++
    shoppingCart.setAttribute('data-product-count',`${qtyCart}`)
  }
  if(status == 'Sent' || status == 'bought'){
    buy.style.width = '100%'
    buy.style.borderRadius = '20px 20px 20px 20px'
    inputqty.setAttribute('readonly','readonly')
    coninputbtns.append(inputqty)
    con4btn.append(buy)
    conallinputbtns.append(coninputbtns,con4btn)
    card.append(conImage,contextprice,conallinputbtns)
  }
  discount.addEventListener('keyup',(event)=>{
    const ldiscount = event.target.nextElementSibling

      let pricebfore = price
    if (event.target.value == 'onlineshop') {
      event.target.style.color = 'green'
      ldiscount.style.color = 'green'
      event.target.style.borderColor = 'green'
      let pricev = price * 50 / 100
      spanprice.innerHTML = pricev.toLocaleString('en-US')
    }else{
      event.target.style.color = '#000'
      ldiscount.style.color = localStorage.getItem('Theme')
      event.target.style.borderColor = localStorage.getItem('Theme')
      spanprice.innerHTML = pricebfore.toLocaleString('en-US')
    }
  })

  discount.addEventListener('keydown',()=>{
    if (discount.value != '') {
      ldiscount.style.top = '0%'
    }
  })
  
  discount.addEventListener('blur',()=>{
    if (discount.value == ''){
      ldiscount.style.top = '50%'
    }
  })
  
  let pr = price
  let pricebb = Priceq;
less.addEventListener('click',(event)=>{
    const card = event.target.closest('.card');
    const input = card.querySelector('input');
    let oldVal = Number(input.value);
    if (oldVal == 1) {
      card.classList.remove('add-active');
      return;
    }
    input.value = oldVal - 1;
    pricebb = pricebb - pr;
    spanprice.innerHTML = pricebb.toLocaleString('en-US')
  });

plus.addEventListener('click',(event)=>{
    const card = event.target.closest('.card');
    const input = card.querySelector('input');
    let oldVal = Number(input.value);
    input.value = oldVal + 1;
    pricebb = pricebb + pr;
    spanprice.innerHTML = pricebb.toLocaleString('en-US')
    price = pricebb
  });
  
  buy.addEventListener('click',(event)=>{
  let rebate = '0%'
    if (status == 'cart') {
      let formDataa = {
        "id": userId,
        "productId": id,
        "quantity": inputqty.value,
        "status": 'bought',
      };
    
      fetch('http://127.0.0.1:5000/updata/sentcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataa)
      })
      .then( response => {
      })
      .catch(error => {
        console.log(error);
      });
    if (discount.value == 'onlineshop') {
      rebate = '50%'
    }
    buy.innerHTML = 'The order was sent'
    buy.style.backgroundColor = '#50C878'
    const currentdate = new Date();
    const datetime = `${currentdate.getFullYear()}/${currentdate.getDate()}/${currentdate.getMonth()+ 1}  |  ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`
    
    let formData = {
    "id": userId,
    "time": datetime,
    "totalAmount": spanprice.innerHTML,
    "paymentType": 'not in perosn',
    "status": 'waiting',
    "productId": id,
    "quantity": inputqty.value,
    "itemNotes": discraption,
    "itemPrice": price.toLocaleString('en-US'),
    "itemDiscount": rebate,
    "itemTotal": contextPN.innerHTML,
    "itemStatus": 'available',
  };
  fetch('http://127.0.0.1:5000/data/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then( response => {
  })
  .catch(error => {
    console.log(error);
  });

}
location.reload();
  })
}


const cartPage = $.querySelector('.cart')

fetch("http://127.0.0.1:5000/data/products", {
method: 'GET',
headers: {
  'Content-Type': 'application/json'
},
})
    .then(response=>{
        return response.json()
    })
    .then(response =>{
    let datapProducts= Object.entries(response)
    let category = null
    datapProducts.forEach(product =>{
        category = product[1]
    })
let formDataCart = {
  "id": userId
}
let carts = []
fetch('http://127.0.0.1:5000/data/cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formDataCart)
})
.then(response=>{
  return response.json()
})
.then( response => {
  let dataCart = Object.entries(response)
  dataCart.forEach(cart =>{
      carts = cart[1]
  })

  let i = 0
  let j = 0
  let betDataCart = true
      for (i ; i < category.length; i++) { 
        if(carts.length != 0){
            if (j < carts.length && category[i].productId == carts[j].productId) {
          template2(1,category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId,carts[j].quantity,carts[j].status)
          j++
          betDataCart = false
      }
    }else{
      emptyBasket.style.display = ' block'
      cartPage.style.height = '79vh'
    }
  }
})
.catch(error => {
console.log(error);
})
})

const removeProduct = $.getElementById('removeProduct')

function removeProducttt(event){
  const card = event.target.closest('.card')
  let formData = {
    "id": userId,
    "productId": event.target.id
  }
  fetch('http://127.0.0.1:5000/data/deletecart', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then( response => {
  })
  .catch(error => {
    console.log(error);
  });
  qtyCart--
  shoppingCart.setAttribute('data-product-count',`${qtyCart}`)
  card.remove()
location.reload();
}

setTimeout(()=>{
setInterval(()=>{
if(qtyCart == 0){
  emptyBasket.style.display = 'block'
  cartPage.style.height = '79vh'
}
},0)
},1500)





document.addEventListener("DOMContentLoaded", () => {
  setTimeout(()=>{
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");
  let counter = 0;
  const slideWidth = slides[0].clientWidth;
  arrowLeft.addEventListener("click", () => {
    if (counter > 0) {
      counter--;
      slider.style.left = "-" + counter * slideWidth + "px";
    }
  });

  arrowRight.addEventListener("click", () => {
    if (counter < slides.length - 1) {
      counter++;
      slider.style.left = "-" + counter * slideWidth + "px";
    }
  });
},2000) 
});

let productsName = []

fetch("http://127.0.0.1:5000/data/products", {
method: 'GET',
headers: {
  'Content-Type': 'application/json'
},
})
    .then(response=>{
        return response.json()
    })
    .then(response =>{
    let datapProducts= Object.entries(response)
    let category = []
    datapProducts.forEach(product =>{
        category = product[1]
      })

    for (let i = 0; i < category.length; i++) {
      productsName[i] = category[i].productName
    }

})
.catch(error => {
  console.log(error);
})

let qtysearch = 0

function template3(productName,discraption,price,image,id,quantity = 1,btnName = 'Add to cart',backColor = 'linear-gradient(130deg, '+localStorage.getItem('Theme')+' 0%, '+localStorage.getItem('Theme')+' 100%)',status) {
  if (qtysearch!=0) {    
    let cardss = $.querySelector('.cardss')
    cardss.classList.remove('cardss')
    cardss.remove()
  }

  qtysearch++
  const card = document.createElement('div')
  card.setAttribute('class','cardss')
  card.classList.add('card') 
    document.querySelector('.con-cards-search').appendChild(card)


const conImage = $.createElement('div')
conImage.setAttribute('class','con-image')
const img = $.createElement('img')
img.setAttribute('class','img')
img.setAttribute('id','imgc')
img.setAttribute('src',image)
const bg = $.createElement('img')
bg.setAttribute('class','bg')
bg.setAttribute('id','bgc')
bg.setAttribute('src',image)
conImage.append(img,bg)

const contextprice = $.createElement('div')
contextprice.setAttribute('class','con-textprice')

const context = $.createElement('div')
context.setAttribute('class','con-text')
const contextPN = $.createElement('h3')
contextPN.setAttribute('id', 'productNm')
contextPN.innerHTML = productName
const contextDC = $.createElement('p')
contextDC.setAttribute('id','productDc')
contextDC.innerHTML = discraption
context.append(contextPN,contextDC)


const conprice = $.createElement('div')
conprice.setAttribute('id','conprice')
conprice.setAttribute('class','con-price')
conprice.innerHTML = '$ '
const spanprice = $.createElement('span')
spanprice.setAttribute('id','spanprice')
let Priceq = price*quantity
spanprice.innerHTML = Priceq.toLocaleString('en-US')
conprice.append(spanprice)

contextprice.append(context,conprice)

const conallinputbtns = $.createElement('div')
conallinputbtns.setAttribute('class','con-conallinputbtns')

const coninputbtns = $.createElement('div')
coninputbtns.setAttribute('class','con-input-btns')
const less = $.createElement('button')
less.setAttribute('class', 'less')
less.setAttribute('id', "less")
const iconLess = $.createElement('i')
iconLess.setAttribute('class','bi bi-dash-lg')
const inputqty = $.createElement('input')
inputqty.setAttribute('id','qty')
inputqty.value = quantity
const plus = $.createElement('button')
plus.setAttribute('class', 'plus')
plus.setAttribute('id', "pluss")
const iconPlus = $.createElement('i')
iconPlus.setAttribute('class','bi bi-plus-lg')
less.append(iconLess)
plus.append(iconPlus)


const conbtn = $.createElement('div')
conbtn.setAttribute('class','con-btn')
const add = $.createElement('button')
add.setAttribute('class','add')
add.setAttribute('id',id)
add.setAttribute('onclick','handleAdd(event)')
add.style.background = backColor
add.innerHTML = btnName
conbtn.append(add)

conallinputbtns.append(coninputbtns,conbtn)
if (btnName == 'Add to cart') {
  coninputbtns.append(less,inputqty,plus)
}else{
  inputqty.setAttribute('readonly','readonly')
  coninputbtns.append(inputqty) 
}
if (status == 'Sent') {
  add.innerHTML = 'Sent'
  add.style.backgroundColor = '#50C878'
}

card.append(conImage,contextprice,conallinputbtns)  


let pr = price
let pricebb = Priceq;
less.addEventListener('click',(event)=>{
  const card = event.target.closest('.card');
  const input = card.querySelector('input');
  let oldVal = Number(input.value);
  if (oldVal == 1) {
    card.classList.remove('add-active');
    return;
  }
  input.value = oldVal - 1;
  pricebb = pricebb - pr;
  spanprice.innerHTML = pricebb.toLocaleString('en-US')
});

plus.addEventListener('click',(event)=>{
  const card = event.target.closest('.card');
  const input = card.querySelector('input');
  let oldVal = Number(input.value);
  input.value = oldVal + 1;
  pricebb = pricebb + pr;
  spanprice.innerHTML = pricebb.toLocaleString('en-US')
  price = pricebb
})
  }

btnSearch.addEventListener('click',(event)=>{
  event.preventDefault()

      const slide = $.querySelector('.slide') 
      slide.style.width = '130px'
      slide.style.boxShadow = '0px 10px 30px 0px rgba(0,0,0,.05)'

    const conCards = $.querySelectorAll('.con-cards')
    titleCategory.innerHTML = 'Search'
      for (let i = 0; i < conCards.length; i++) {
          conCards[i].style.display = 'none'
    }

    pageSearch.style.display = 'flex'

    fetch("http://127.0.0.1:5000/data/products", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response=>{
        return response.json()
    })
    .then(response =>{
    let datapProducts= Object.entries(response)
    let category = []
    datapProducts.forEach(product =>{
        category = product[1]
    })
        
    let formDataCart = {
        "id": userId
      }
      let carts = []
      fetch('http://127.0.0.1:5000/data/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataCart)
      })
      .then(response=>{
        return response.json()
      })
      .then( response => {
        let dataCart = Object.entries(response)
        dataCart.forEach(cart =>{
            carts = cart[1]
        })
        let i = 0
        let j = 0
        let betDataCart = true
            for (i ; i < category.length; i++) { 
              if (j != carts.length) {
              if(carts.length != 0){
                if (j < carts.length && category[i].productId == carts[j].productId && carts[j].status == 'cart' && category[i].productName == search.value) {
                 template3(category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId,carts[j].quantity,'Delete','rgba(255, 0, 0, 0.813)',carts[j].status)
                j++
                betDataCart = false
              }
              if (j < carts.length && category[i].productId == carts[j].productId && category[i].productName == search.value) {
                template3(category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId,carts[j].quantity,'Bought','#50C878',carts[j].status)
               j++
               betDataCart = false
             }
            }
          }
              if (betDataCart && category[i].productName == search.value) {
                template3(category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId)
          }
          betDataCart = true
          }
})
.catch(error => {
  console.log(error);
})
})
})


search.addEventListener('keyup',(event)=>{
  let searchValue = search.value 
  
  if (searchValue) {
    boxSearch.style.borderRadius = '5px 0 0 0' 
      boxHistory.style.display = 'block'
      let filteredWords
      filteredWords = productsName.filter(word=>{
          return word.toLowerCase().startsWith(searchValue.toLowerCase())
      })

      if (filteredWords == 0) {
          filteredWords = productsName.filter(word=>{
              return word.toLowerCase().includes(searchValue.toLowerCase())
          })
      }

      suggestionsWordsGenerator(filteredWords)

  }else{
    boxSearch.style.borderRadius = '5px 0 0 5px' 
      boxHistory.style.display = 'none'
  }
  if (event.key == 'Enter') {
    boxSearch.style.borderRadius = '5px 0 0 5px' 
      boxHistory.style.display = 'none'
      event.preventDefault()

      const slide = $.querySelector('.slide') 
      slide.style.width = '130px'
      slide.style.boxShadow = '0px 10px 30px 0px rgba(0,0,0,.05)'

    const conCards = $.querySelectorAll('.con-cards')
    titleCategory.innerHTML = 'Search'
      for (let i = 0; i < conCards.length; i++) {
          conCards[i].style.display = 'none'
    }

    pageSearch.style.display = 'flex'

    fetch("http://127.0.0.1:5000/data/products", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response=>{
        return response.json()
    })
    .then(response =>{
    let datapProducts= Object.entries(response)
    let category = []
    datapProducts.forEach(product =>{
        category = product[1]
    })
        
    let formDataCart = {
        "id": userId
      }
      let carts = []
      fetch('http://127.0.0.1:5000/data/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataCart)
      })
      .then(response=>{
        return response.json()
      })
      .then( response => {
        let dataCart = Object.entries(response)
        dataCart.forEach(cart =>{
            carts = cart[1]
        })
        let i = 0
        let j = 0
        let betDataCart = true
            for (i ; i < category.length; i++) { 
              if (j != carts.length) {
              if(carts.length != 0){
                if (j < carts.length && category[i].productId == carts[j].productId && carts[j].status == 'cart' && category[i].productName == search.value) {
                 template3(category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId,carts[j].quantity,'Delete','rgba(255, 0, 0, 0.813)',carts[j].status)
                j++
                betDataCart = false
              }
              if (j < carts.length && category[i].productId == carts[j].productId && category[i].productName == search.value) {
                template3(category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId,carts[j].quantity,'Bought','#50C878',carts[j].status)
               j++
               betDataCart = false
             }
            }
          }
              if (betDataCart && category[i].productName == search.value) {
                template3(category[i].productName,category[i].discraption,category[i].price,category[i].image,category[i].productId)
          }
          betDataCart = true
          }
})
.catch(error => {
  console.log(error);
})
})
  }
})

function suggestionsWordsGenerator(wordsArray) {
  let listItemsArray = wordsArray.map(word=>{
      return '<li>' + word + '</li>'
  })

  let customListItem

  if (!listItemsArray.length) {
      customListItem = '<li>' + search.value + '</li>'
  }else{
      customListItem = listItemsArray.join('')
  }

  boxHistory.innerHTML = customListItem
  select()
}


function select() {
  let allListItems = boxHistory.querySelectorAll('li')
  allListItems.forEach(wordItem => {
      wordItem.addEventListener('click',(event)=>{
          search.value = event.target.textContent
          boxSearch.style.borderRadius = '5px 0 0 5px' 
          boxHistory.style.display = 'none'
      })
  });
}

const Loading = $.querySelector(".loading");
const startWeb = $.querySelector(".startweb");


document.addEventListener('DOMContentLoaded', function() {
  Loading.style.display = "none";
  startWeb.style.display = "block";
  $.body.style.backgroundColor = "#f1f3f5"
});