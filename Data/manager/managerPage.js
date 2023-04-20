'use strict'

const $ = document
const addCustomer = $.getElementById('addCustomer')

let betUsername = true
username.addEventListener('keyup',(event)=>{
  username.value = username.value.toLowerCase();
})

addCustomer.addEventListener('click',()=>{
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
      alert('This username has already been used')
      betUsername = false
    }else{
      betUsername = true
    }
    if(betUsername){
      const currentdate = new Date();
      const datetime = `${currentdate.getFullYear()}/${currentdate.getDate()}/${currentdate.getMonth()+ 1}  |  ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`
      
      let formData = {
      "name": nameLast.value,
      "username": username.value,
      "email": email.value,
      "password": pass.value,
      "phoneNumber": phoneNum.value,
      "city": city.value,
      "address": address.value,
      "nationalCode": nationalCode.value,
      "time": datetime
    };

    fetch('http://127.0.0.1:5000/data/signup', {
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
      nameLast.value = ''
      username.value = ''
      email.value = ''
      pass.value = ''
      phoneNum.value = ''
      city.value = ''
      address.value = ''
      nationalCode.value = ''
  }
  })
  .catch(error => {
    console.log(error);
  })
  betUsername = true
  location.reload()
})

let qty = 0

fetch('http://127.0.0.1:5000/data/customers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
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
      console.log(user)
      qty++
      const liuser = $.createElement('li')
      liuser.setAttribute('id','liuser') 

      const iduser = $.createElement('input')
      iduser.setAttribute('id','iduser') 
      iduser.setAttribute('value',user.id)
      iduser.setAttribute('readonly','readonly')

      const upusername = $.createElement('input')
      upusername.setAttribute('id','upuser') 
      upusername.setAttribute('value',user.username)
      upusername.setAttribute('maxlength','22')
      upusername.setAttribute('onkeypress','return /[a-z_]/.test(String.fromCharCode(event.keyCode))')

      const upuser = $.createElement('input')
      upuser.setAttribute('id','upuser') 
      upuser.setAttribute('value',user.name)
      upuser.setAttribute('maxlength','35')

      const uppassword = $.createElement('input')
      uppassword.setAttribute('id','uppass') 
      uppassword.setAttribute('value',user.password)
      uppassword.setAttribute('maxlength','8')
      uppassword.setAttribute('minlength','8')

      const upemail = $.createElement('input')
      upemail.setAttribute('id','upemail') 
      upemail.setAttribute('value',user.email)
      upuser.setAttribute('maxlength','35')

      const upphoneNum = $.createElement('input')
      upphoneNum.setAttribute('id','upphoneNum') 
      upphoneNum.setAttribute('value',user.phoneNumber)
      upphoneNum.setAttribute('maxlength','10')
      upphoneNum.setAttribute('minlength','10')

      const upcity = $.createElement('input')
      upcity.setAttribute('id','upcity') 
      upcity.setAttribute('value',user.city)
      upcity.setAttribute('maxlength','15')
      upcity.setAttribute('minlength','2')

      const upaddress = $.createElement('input')
      upaddress.setAttribute('id','upaddress') 
      upaddress.setAttribute('value',user.address)
      upaddress.setAttribute('maxlength','120')

      const upnationalcode = $.createElement('input')
      upnationalcode.setAttribute('id','upnationalcode') 
      upnationalcode.setAttribute('value',user.nationalCode)
      upnationalcode.setAttribute('maxlength','10')


      const uptime = $.createElement('input')
      uptime.setAttribute('id','uptime') 
      uptime.setAttribute('value',user.time)

      const btnDelete = $.createElement('button')
      btnDelete.setAttribute('id','btnDelete') 
      btnDelete.setAttribute('class','btnDelete') 
      btnDelete.innerHTML = "Delete"

      
      const btnUpdata = $.createElement('button')
      btnUpdata.setAttribute('id','btnUpdata') 
      btnUpdata.setAttribute('class','btnUpdata') 
      btnUpdata.innerHTML = "Updata"

      
      liuser.append(iduser,upusername,upuser,uppassword,upemail,upphoneNum,upcity,upaddress,upnationalcode,uptime,btnDelete,btnUpdata)
      
      containerUsers.append(liuser)

            iduser.addEventListener('keydown',()=>{
                alert('You cannot change the ID.')
            })

            upusername.addEventListener('keyup',(event)=>{
              upusername.value = upusername.value.toLowerCase();
            })

      btnDelete.addEventListener('click',(event)=>{
        event.preventDefault()
        let formData = {
            "id": iduser.value
          }
        
        fetch('http://127.0.0.1:5000/data/deletecustomer', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
          .then(response=>{
            return response.json()
        })
          .then( response => {
            console.log(response);
        })
          .catch(error => {
            console.log(error);
        })
        liuser.remove()
})
  let usernamee = ''
upusername.addEventListener('click',()=>{
  usernamee = upusername.value
})

btnUpdata.addEventListener('click',(event)=>{
  event.preventDefault()
  if (usernamee == '') {
  usernamee = upusername.value
  }
  let formData = {
    "username": upusername.value
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
    console.log(usernamee,upusername.value)
    if (response.data.length != 0 && usernamee != upusername.value) {
      alert('This username has already been used')
      betUsername = false
    }else{
      betUsername = true
    } if(betUsername){
      let formData = {
        "id": iduser.value,
       "username": upusername.value,
       "name": upuser.value,
       "password": uppassword.value,
       "email": upemail.value,
       "phoneNumber": upphoneNum.value,
       "city": upcity.value,
       "address": upaddress.value,
       "nationalCode": upnationalcode.value,
       "time": uptime.value
      }
    
    fetch('http://127.0.0.1:5000/data/updatacustomer', {
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
        console.log(response);
    })
      .catch(error => {
        console.log(error);
    })
  }
})
.catch(error => {
  console.log(error);
})
betUsername = true
})
})
})


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
    let datacategorys = Object.entries(response)
    let categorys = []
    datacategorys.forEach(category =>{
        categorys = category[1]
    })
    let qty = 0
    categorys.forEach(category =>{
      console.log(category)
      qty++
      const option = $.createElement('option')
      option.value = category.id
      option.innerHTML = qty+ ' - ' + category.name
      const categoryy = $.getElementById('category')
      categoryy.append(option)
    })
})

addProduct.addEventListener('click',()=>{
let formDataa = {
  "name": productName.value,
  "description": description.value,
  "price": pricee.value,
  "image": linkImage.value,
  "categoryId": category.value,
 }

fetch('http://127.0.0.1:5000/data/addproduct', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(formDataa)
})
 .then(response=>{
   return response.json()
})
 .then( response => {
   console.log(response);
})
 .catch(error => {
   console.log(error);
}) 
productName.value = ''
description.value = ''
price.value = ''
linkImage.value = ''
category.value = ''
location.reload()
})

let qtyProducts = 0
fetch('http://127.0.0.1:5000/data/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
})
  .then(response=>{
    return response.json()
})
  .then( response => {
    let dataproducts = Object.entries(response)
    let products = []
    dataproducts.forEach(product =>{
        products = product[1]
    })
    products.forEach(product =>{
      console.log(product)
      qtyProducts++
      const liproduct = $.createElement('li')
      liproduct.setAttribute('id','liproduct') 

      const idproduct = $.createElement('input')
      idproduct.setAttribute('id','idproduct') 
      idproduct.setAttribute('value',product.productId)
      idproduct.setAttribute('readonly','readonly')

      const upproduct = $.createElement('input')
      upproduct.setAttribute('id','upproduct') 
      upproduct.setAttribute('value',product.productName)

      const updiscraption = $.createElement('input')
      updiscraption.setAttribute('id','updiscraption') 
      updiscraption.setAttribute('value',product.discraption)

      const upprice = $.createElement('input')
      upprice.setAttribute('id','price') 
      upprice.setAttribute('value',product.price)

      const upimage = $.createElement('input')
      upimage.setAttribute('id','upimage') 
      upimage.setAttribute('value',product.image)

      const upcategoryId = $.createElement('input')
      upcategoryId.setAttribute('id','upcategoryId') 
      upcategoryId.setAttribute('value',product.categoryId)

      const btnDeleteP = $.createElement('button')
      btnDeleteP.setAttribute('id','btnDeleteP') 
      btnDeleteP.setAttribute('class','btnDelete') 

      btnDeleteP.innerHTML = "Delete"

      
      const btnUpdataP = $.createElement('button')
      btnUpdataP.setAttribute('id','btnUpdataP') 
      btnUpdataP.setAttribute('class','btnUpdata') 
      btnUpdataP.innerHTML = "Updata"

      
      liproduct.append(idproduct,upproduct,updiscraption,upprice,upimage,upcategoryId,btnDeleteP,btnUpdataP)
      
      containerProducts.append(liproduct)

      idproduct.addEventListener('keydown',()=>{
                alert('You cannot change the ID.')
            })

      btnDeleteP.addEventListener('click',(event)=>{
        event.preventDefault()
        let formData = {
            "id": idproduct.value
          }
        
        fetch('http://127.0.0.1:5000/data/deleteproduct', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
          .then(response=>{
            return response.json()
        })
          .then( response => {
            console.log(response);
        })
          .catch(error => {
            console.log(error);
        })
        liproduct.remove()
})
btnUpdataP.addEventListener('click',(event)=>{
  event.preventDefault()
    let formData = {
       "id": idproduct.value,
       "name": upproduct.value,
       "description": updiscraption.value,
       "price": upprice.value,
       "image": upimage.value,
       "categoryId": upcategoryId.value,
      }
    
    fetch('http://127.0.0.1:5000/data/updataproduct', {
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
        console.log(response);
    })
      .catch(error => {
        console.log(error);
    })
  })
 })
})


addCategories.addEventListener('click',()=>{
    let formDataa = {
      "name": categories.value,
      "img": imgCategories.value,
      "description": CDescription.value
     }
    
    fetch('http://127.0.0.1:5000/data/addcategories', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(formDataa)
    })
     .then(response=>{
       return response.json()
    })
     .then( response => {
       console.log(response);
    })
     .catch(error => {
       console.log(error);
    }) 
    categories.value = ''
    imgCategories.value = ''
    CDescription.value = ''
    location.reload();
})


let qtyCategories = 0
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
    let datacategories = Object.entries(response)
    let categories = []
    datacategories.forEach(categorie =>{
        categories = categorie[1]
    })
    categories.forEach(categorie =>{
      console.log(categorie)
      qtyCategories++
      const licategorie = $.createElement('li')
      licategorie.setAttribute('id','licategorie') 

      const idcategorie= $.createElement('input')
      idcategorie.setAttribute('id','idcategorie') 
      idcategorie.setAttribute('value',categorie.id)
      idcategorie.setAttribute('readonly','readonly')

      const upcategorie = $.createElement('input')
      upcategorie.setAttribute('id','upcategorie') 
      upcategorie.setAttribute('value',categorie.name)

      const upimg = $.createElement('input')
      upimg.setAttribute('id','upimg') 
      upimg.setAttribute('value',categorie.image)

      const upDescription = $.createElement('input')
      upDescription.setAttribute('id','upDescription') 
      upDescription.setAttribute('value',categorie.description)

      const btnDeleteC = $.createElement('button')
      btnDeleteC.setAttribute('id','btnDeleteC') 
      btnDeleteC.setAttribute('class','btnDelete') 
      btnDeleteC.innerHTML = "Delete"

      
      const btnUpdataC = $.createElement('button')
      btnUpdataC.setAttribute('id','btnUpdataC')
      btnUpdataC.setAttribute('class','btnUpdata') 

      btnUpdataC.innerHTML = "Updata"

      
      licategorie.append(idcategorie,upcategorie,upimg,upDescription,btnDeleteC,btnUpdataC)
      
      containerCategories.append(licategorie)

      idcategorie.addEventListener('keydown',()=>{
                alert('You cannot change the ID.')
            })

      btnDeleteC.addEventListener('click',(event)=>{
        event.preventDefault()
        let formData = {
            "id": idcategorie.value
          } 
        fetch('http://127.0.0.1:5000/data/deletecategories', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
          .then(response=>{
            return response.json()
        })
          .then( response => {
            console.log(response);
        })
          .catch(error => {
            console.log(error);
        })
        licategorie.remove()
})
btnUpdataC.addEventListener('click',(event)=>{
  event.preventDefault()
    let formData = {
       "id": idcategorie.value,
       "name": upcategorie.value,
       "img": upimg.value,
       "description": upDescription.value
      }
    
    fetch('http://127.0.0.1:5000/data/updatacategories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
      .then(response=>{
        return response.json()
    })
      .then( response => {
        console.log(response);
    })
      .catch(error => {
        console.log(error);
    })
  })
 })
})


addOrders.addEventListener('click',()=>{

    const currentdate = new Date();
    const datetime = `${currentdate.getFullYear()}/${currentdate.getDate()}/${currentdate.getMonth()+ 1}  |  ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`

    let formDataa = {
      "customerId": customerId.value,
      "orderData": datetime,
      "productId": productId.value,
      "quantity": quantity.value,
      "itemNotes": itemNotes.value,
      "itemPrice": itemPrice.value,
      "itemDiscount": itemDiscount.value,
      "totalAmount": totalAmount.value,
      "itemTotal": itemTotal.value,
      "itemStatus": itemStatus.value,
      "paymentType": paymentType.value,
      "statuss": statuss.value
     }
    
    fetch('http://127.0.0.1:5000/data/addorders', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(formDataa)
    })
     .then(response=>{
       return response.json()
    })
     .then( response => {
       console.log(response);
    })
     .catch(error => {
       console.log(error);
    }) 
    customerId.value = ''
    productId.value = ''
    quantity.value = ''
    itemNotes.value = ''
    itemPrice.value = ''
    itemDiscount.value = ''
    totalAmount.value = ''
    itemTotal.value = ''
    itemStatus.value = ''
    paymentType.value = ''
    statuss.value = ''
    location.reload()
})


let qtyOrders = 0
fetch('http://127.0.0.1:5000/data/ordersa', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
})
  .then(response=>{
    return response.json()
})
  .then( response => {
    let dataOrders = Object.entries(response)
    let Orders = []
    dataOrders.forEach(Order =>{
      Orders = Order[1]
    })
    Orders.forEach(Order =>{
      console.log(Order)
      qtyOrders++
      const liOrders = $.createElement('li')
      liOrders.setAttribute('id','liOrders') 

      const idOrders= $.createElement('input')
      idOrders.setAttribute('id','idOrders') 
      idOrders.setAttribute('value',Order.order_id)
      idOrders.setAttribute('readonly','readonly')

      const upCOrders = $.createElement('input')
      upCOrders.setAttribute('id','upCOrders') 
      upCOrders.setAttribute('value',Order.customer_id)

      const upOrderData = $.createElement('input')
      upOrderData.setAttribute('id','upOrderData') 
      upOrderData.setAttribute('value',Order.order_data)

      const upProductId = $.createElement('input')
      upProductId.setAttribute('id','upProductId') 
      upProductId.setAttribute('value',Order.product_id)

      const upQuantity = $.createElement('input')
      upQuantity.setAttribute('id','upQuantity') 
      upQuantity.setAttribute('value',Order.quantity)

      const upitemNotes = $.createElement('input')
      upitemNotes.setAttribute('id','upitemNotes') 
      upitemNotes.setAttribute('value',Order.item_notes)

      const upItemPrice = $.createElement('input')
      upItemPrice.setAttribute('id','upItemPrice') 
      upItemPrice.setAttribute('value',Order.item_price)

      const upItemDiscount = $.createElement('input')
      upItemDiscount.setAttribute('id','upItemDiscount') 
      upItemDiscount.setAttribute('value',Order.item_discount)

      const upTotalAmount = $.createElement('input')
      upTotalAmount.setAttribute('id','upTotalAmount') 
      upTotalAmount.setAttribute('value',Order.total_amount)

      const upItemTotal = $.createElement('input')
      upItemTotal.setAttribute('id','upItemTotal') 
      upItemTotal.setAttribute('value',Order.item_total)

      const upItemStatus = $.createElement('input')
      upItemStatus.setAttribute('id','upItemStatus') 
      upItemStatus.setAttribute('value',Order.item_status)  

      const upPaymentType = $.createElement('input')
      upPaymentType.setAttribute('id','upPaymentType') 
      upPaymentType.setAttribute('value',Order.payment_type)

      const upStatus = $.createElement('input')
      upStatus.setAttribute('id','upStatus') 
      upStatus.setAttribute('value',Order.status)
      
      const btnDeleteO = $.createElement('button')
      btnDeleteO.setAttribute('id','btnDeleteO') 
      btnDeleteO.setAttribute('class','btnDelete') 
      btnDeleteO.innerHTML = "Delete"

      
      const btnUpdataO = $.createElement('button')
      btnUpdataO.setAttribute('id','btnUpdataO') 
      btnUpdataO.setAttribute('class','btnUpdata') 
      btnUpdataO.innerHTML = "Updata"

      liOrders.append(idOrders,upCOrders,upOrderData,upProductId,upQuantity,upitemNotes,upItemPrice,upItemDiscount,upTotalAmount,upItemTotal,upItemStatus,upPaymentType,upStatus,btnDeleteO,btnUpdataO)
      
      containerOrders.append(liOrders)

      idOrders.addEventListener('keydown',()=>{
                alert('You cannot change the ID.')
            })

      btnDeleteO.addEventListener('click',(event)=>{
        event.preventDefault()
        let formData = {
            "id": idOrders.value
          } 
        fetch('http://127.0.0.1:5000/data/deleteorders', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
          .then(response=>{
            return response.json()
        })
          .then( response => {
            console.log(response);
        })
          .catch(error => {
            console.log(error);
        })
        let formDataa = {
          "id": upCOrders.value,
          "productId": upProductId.value,
          "status": 'cart',
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
        liOrders.remove()
})

btnUpdataO.addEventListener('click',(event)=>{
    event.preventDefault()
    let formData = {
       "id": idOrders.value,
       "customerId": upCOrders.value,
       "orderData": upOrderData.value,
       "productId": upProductId.value,
       "quantity": upQuantity.value,
       "itemNotes": upitemNotes.value,
       "itemPrice": upItemPrice.value,
       "itemDiscount": upItemDiscount.value,
       "totalAmount": upTotalAmount.value,
       "itemTotal": upItemTotal.value,
       "itemStatus": upItemStatus.value,
       "paymentType": upPaymentType.value,
       "statuss": upStatus.value,
      }
    
    fetch('http://127.0.0.1:5000/data/updataorders', {
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
        console.log(response);
    })
      .catch(error => {
        console.log(error);
    })
  })

})
})

titleM.addEventListener('click',()=>{
  titleM.style.color = 'rgb(35, 35, 35)'
  titleA.style.color = '#fff'
  titleC.style.color = '#fff'
  titleP.style.color = '#fff'
  titleCa.style.color = '#fff'
  titleO.style.color = '#fff'
  titlePO.style.color = '#fff'
  menu.style.display = 'block'
  admin.style.display = 'none'
  customer.style.display = 'none'
  product.style.display = 'none'
  categorie.style.display = 'none'
  orders.style.display = 'none'
  pendingOrders.style.display = 'none'
})

titleA.addEventListener('click',()=>{
  titleM.style.color = '#fff'
  titleA.style.color = 'rgb(35, 35, 35)'
  titleC.style.color = '#fff'
  titleP.style.color = '#fff'
  titleCa.style.color = '#fff'
  titleO.style.color = '#fff'
  titlePO.style.color = '#fff'
  menu.style.display = 'none'
  admin.style.display = 'block'
  customer.style.display = 'none'
  product.style.display = 'none'
  categorie.style.display = 'none'
  orders.style.display = 'none'
  pendingOrders.style.display = 'none'
})

titleC.addEventListener('click',()=>{
  titleM.style.color = '#fff'
  titleA.style.color = '#fff'
  titleC.style.color = 'rgb(35, 35, 35)'
  titleP.style.color = '#fff'
  titleCa.style.color = '#fff'
  titleO.style.color = '#fff'
  titlePO.style.color = '#fff'
  menu.style.display = 'none'
  admin.style.display = 'none'
  customer.style.display = 'block'
  product.style.display = 'none'
  categorie.style.display = 'none'
  orders.style.display = 'none'
  pendingOrders.style.display = 'none'
})

titleP.addEventListener('click',()=>{
  titleM.style.color = '#fff'
  titleA.style.color = '#fff'
  titleC.style.color = '#fff'
  titleP.style.color = 'rgb(35, 35, 35)'
  titleCa.style.color = '#fff'
  titleO.style.color = '#fff'
  titlePO.style.color = '#fff'
  menu.style.display = 'none'
  admin.style.display = 'none'
  customer.style.display = 'none'
  product.style.display = 'block'
  categorie.style.display = 'none'
  orders.style.display = 'none'
  pendingOrders.style.display = 'none'
})

titleCa.addEventListener('click',()=>{
  titleM.style.color = '#fff'
  titleA.style.color = '#fff'
  titleC.style.color = '#fff'
  titleP.style.color = '#fff'
  titleCa.style.color = 'rgb(35, 35, 35)'
  titleO.style.color = '#fff'
  titlePO.style.color = '#fff'
  menu.style.display = 'none'
  admin.style.display = 'none'
  customer.style.display = 'none'
  product.style.display = 'none'
  categorie.style.display = 'block'
  orders.style.display = 'none'
  pendingOrders.style.display = 'none'
})

titleO.addEventListener('click',()=>{
  titleM.style.color = '#fff'
  titleA.style.color = '#fff'
  titleC.style.color = '#fff'
  titleP.style.color = '#fff'
  titleCa.style.color = '#fff'
  titleO.style.color = 'rgb(35, 35, 35)'
  titlePO.style.color = '#fff'
  menu.style.display = 'none'
  admin.style.display = 'none'
  customer.style.display = 'none'
  product.style.display = 'none'
  categorie.style.display = 'none'
  orders.style.display = 'block'
  pendingOrders.style.display = 'none'
})

titlePO.addEventListener('click',()=>{
  titleM.style.color = '#fff'
  titleA.style.color = '#fff'
  titleC.style.color = '#fff'
  titleP.style.color = '#fff'
  titleCa.style.color = '#fff'
  titleO.style.color = '#fff'
  titlePO.style.color = 'rgb(35, 35, 35)'
  menu.style.display = 'none'
  admin.style.display = 'none'
  customer.style.display = 'none'
  product.style.display = 'none'
  categorie.style.display = 'none'
  orders.style.display = 'none'
  pendingOrders.style.display = 'block'
})

addAdmin.addEventListener('click',()=>{
  let formData = {
    "username": usernameAdmin.value
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
      alert('This username has already been used')
      betUsername = false
    }else{
  let formDataa = {
    "name": nameAdmin.value,
    "username": usernameAdmin.value,
    "password": passwordAdmin.value,
   }
  
  fetch('http://127.0.0.1:5000/data/addadmin', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(formDataa)
  })
   .then(response=>{
     return response.json()
  })
   .then( response => {
     console.log(response);
  })
   .catch(error => {
     console.log(error);
  }) 
  nameAdmin.value = ''
  usernameAdmin.value = ''
  passwordAdmin.value = ''
}
})
location.reload()
  })


fetch('http://127.0.0.1:5000/data/infoadmin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
})
  .then(response=>{
    return response.json()
})
  .then( response => {
    let dataadmins = Object.entries(response)
    let admins = []
    dataadmins.forEach(admin =>{
      admins = admin[1]
    })
    admins.forEach(admin =>{
      console.log(admin)
      const liadmin = $.createElement('li')
      liadmin.setAttribute('id','liadmin') 

      const idadmin= $.createElement('input')
      idadmin.setAttribute('id','idadmin') 
      idadmin.setAttribute('value',admin.id)
      idadmin.setAttribute('readonly','readonly')

      const upadmin = $.createElement('input')
      upadmin.setAttribute('id','upadmin') 
      upadmin.setAttribute('value',admin.name)

      const upusername = $.createElement('input')
      upusername.setAttribute('id','upusername') 
      upusername.setAttribute('value',admin.username)
      upusername.setAttribute('onkeypress','return /[a-z_]/.test(String.fromCharCode(event.keyCode))')

      const passadmin = $.createElement('input')
      passadmin.setAttribute('id','passadmin') 
      passadmin.setAttribute('value',admin.password)

      const btnDeleteAD = $.createElement('button')
      btnDeleteAD.setAttribute('id','btnDeleteAD') 
      btnDeleteAD.setAttribute('class','btnDelete') 
      btnDeleteAD.innerHTML = "Delete"

      
      const btnUpdataAD = $.createElement('button')
      btnUpdataAD.setAttribute('id','btnUpdataAD') 
      btnUpdataAD.setAttribute('class','btnUpdata') 
      btnUpdataAD.innerHTML = "Updata"
      
      liadmin.append(idadmin,upadmin,upusername,passadmin,btnDeleteAD,btnUpdataAD)
      
      containerAdmin.append(liadmin)

      idadmin.addEventListener('keydown',()=>{
                alert('You cannot change the ID.')
            })

        btnDeleteAD.addEventListener('click',(event)=>{
          event.preventDefault()
              let formData = {
                  "id": idadmin.value
                } 
              fetch('http://127.0.0.1:5000/data/deleteadmin', {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
              })
                .then(response=>{
                  return response.json()
              })
                .then( response => {
                  console.log(response);
              })
                .catch(error => {
                  console.log(error);
              })
              liadmin.remove()
      })
      
      let usernamee = ''
      upusername.addEventListener('click',()=>{
        usernamee = upusername.value
      })
            btnUpdataAD.addEventListener('click',(event)=>{
            event.preventDefault()
                if (usernamee == '') {
                usernamee = upusername.value
                }
                let formData = {
                  "username": upusername.value
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
                  if (response.data.length != 0 && usernamee != upusername.value) {
                    alert('This username has already been used')
                    betUsername = false
                  }else{
                    betUsername = true
              let formData = {
                 "id": idadmin.value,
                 "name": upadmin.value,
                 "username": upusername.value,
                 "password": passadmin.value,
                }
              
              fetch('http://127.0.0.1:5000/data/updataadmin', {
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
                  console.log(response);
              })
                .catch(error => {
                  console.log(error);
              })
            }
            })
            })
 })
})

fetch('http://127.0.0.1:5000/data/manager', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
})
  .then(response=>{
    return response.json()
})
  .then( response => {
    let datamanagers = Object.entries(response)
    let managers = []
    datamanagers.forEach(manager =>{
      managers = manager[1]
    })
    managers.forEach(manager =>{
      console.log(manager)
      const limanager = $.createElement('li')
      limanager.setAttribute('id','limanager') 

      const upmanager = $.createElement('input')
      upmanager.setAttribute('id','upmanager') 
      upmanager.setAttribute('value',manager.name)

      const upusername = $.createElement('input')
      upusername.setAttribute('id','upusername') 
      upusername.setAttribute('value',manager.username)
      upusername.setAttribute('onkeypress','return /[a-z_]/.test(String.fromCharCode(event.keyCode))')

      const passmanager = $.createElement('input')
      passmanager.setAttribute('id','passmanager') 
      passmanager.setAttribute('value',manager.password)
      
      limanager.append(upmanager,upusername,passmanager)
      
      containerManager.append(limanager)

      let usernameee = ''
      upusername.addEventListener('click',()=>{
        usernameee = upusername.value
      })
      btnUpdataM.addEventListener('click',(e)=>{
                if (usernameee == '') {
                  usernameee = upusername.value
                }
                let formDataa = {
                  "username": upusername.value
                }
                fetch('http://127.0.0.1:5000/data/signup/username', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formDataa)
                })
                .then(response=>{
                  return response.json()
                })
                .then(response => {
                  if (response.data.length != 0 && usernameee != upusername.value) {
                  console.log(response);
                    alert('This username has already been used')
                  }else{             
        let formData = {
           "name": upmanager.value,
           "username": upusername.value,
           "password": passmanager.value,
          }
        
        fetch('http://127.0.0.1:5000/data/updatamanager', {
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
            console.log(response);
        })
          .catch(error => {
            console.log(error);
        })
      }
    })
  })
      })
    })


fetch('http://127.0.0.1:5000/data/ordersa', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
})
  .then(response=>{
    return response.json()
})
  .then( response => {
    let dataOrders = Object.entries(response)
    let Orders = []
    dataOrders.forEach(Order =>{
      Orders = Order[1]
    })
    Orders.forEach(Order =>{
      if (Order.status == 'waiting') {   
      qtyOrders++
      const liOrders = $.createElement('li')
      liOrders.setAttribute('id','liOrders') 

      const idOrders= $.createElement('input')
      idOrders.setAttribute('id','idOrders') 
      idOrders.setAttribute('value',Order.order_id)
      idOrders.setAttribute('readonly','readonly')

      const upCOrders = $.createElement('input')
      upCOrders.setAttribute('id','upCOrders') 
      upCOrders.setAttribute('value',Order.customer_id)
      upCOrders.setAttribute('readonly','readonly')

      const upOrderData = $.createElement('input')
      upOrderData.setAttribute('id','upOrderData') 
      upOrderData.setAttribute('value',Order.order_data)
      upOrderData.setAttribute('readonly','readonly')

      const upProductId = $.createElement('input')
      upProductId.setAttribute('id','upProductId') 
      upProductId.setAttribute('value',Order.product_id)
      upProductId.setAttribute('readonly','readonly')

      const upQuantity = $.createElement('input')
      upQuantity.setAttribute('id','upQuantity') 
      upQuantity.setAttribute('value',Order.quantity)
      upQuantity.setAttribute('readonly','readonly')

      const upitemNotes = $.createElement('input')
      upitemNotes.setAttribute('id','upitemNotes') 
      upitemNotes.setAttribute('value',Order.item_notes)
      upitemNotes.setAttribute('readonly','readonly')

      const upItemPrice = $.createElement('input')
      upItemPrice.setAttribute('id','upItemPrice') 
      upItemPrice.setAttribute('value',Order.item_price)
      upItemPrice.setAttribute('readonly','readonly')

      const upItemDiscount = $.createElement('input')
      upItemDiscount.setAttribute('id','upItemDiscount') 
      upItemDiscount.setAttribute('value',Order.item_discount)
      upItemDiscount.setAttribute('readonly','readonly')

      const upTotalAmount = $.createElement('input')
      upTotalAmount.setAttribute('id','upTotalAmount') 
      upTotalAmount.setAttribute('value',Order.total_amount)
      upTotalAmount.setAttribute('readonly','readonly')

      const upItemTotal = $.createElement('input')
      upItemTotal.setAttribute('id','upItemTotal') 
      upItemTotal.setAttribute('value',Order.item_total)
      upItemTotal.setAttribute('readonly','readonly')

      const upItemStatus = $.createElement('input')
      upItemStatus.setAttribute('id','upItemStatus') 
      upItemStatus.setAttribute('value',Order.item_status)  
      upItemStatus.setAttribute('readonly','readonly')

      const upPaymentType = $.createElement('input')
      upPaymentType.setAttribute('id','upPaymentType') 
      upPaymentType.setAttribute('value',Order.payment_type)
      upPaymentType.setAttribute('readonly','readonly')

      const upStatus = $.createElement('input')
      upStatus.setAttribute('id','upStatus') 
      upStatus.setAttribute('value',Order.status)
      upStatus.setAttribute('readonly','readonly')

      const btnSent = $.createElement('button')
      btnSent.setAttribute('id','btnSent') 
      btnSent.setAttribute('class','btnUpdata') 
      btnSent.innerHTML = "Sent"
      
      const btnNotSent = $.createElement('button')
      btnNotSent.setAttribute('id','btnNotSent') 
      btnNotSent.setAttribute('class','btnUpdata') 
      btnNotSent.innerHTML = "Not Sent"

      liOrders.append(idOrders,upCOrders,upOrderData,upProductId,upQuantity,upitemNotes,upItemPrice,upItemDiscount,upTotalAmount,upItemTotal,upItemStatus,upPaymentType,upStatus,btnNotSent,btnSent)
      
      containerPendingOrders.append(liOrders)

      idOrders.addEventListener('keydown',()=>{
                alert('You cannot change the ID.')
            })

btnSent.addEventListener('click',(e)=>{
  let formData = {
    "id": idOrders.value,
    "statuss": 'Sent',
   }
 
 fetch('http://127.0.0.1:5000/data/sentorders', {
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
     console.log(response);
 })
   .catch(error => {
     console.log(error);
 })

 let formDataa = {
  "id": upCOrders.value,
  "productId": upProductId.value,
  "status": 'Sent',
};

fetch('http://127.0.0.1:5000/updata/sentcart', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formDataa)
})
.then( response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
});

})

btnNotSent.addEventListener('click',(e)=>{
  let formData = {
    "id": idOrders.value,
    "statuss": 'NotSent',
   }
 
 fetch('http://127.0.0.1:5000/data/sentorders', {
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
     console.log(response);
 })
   .catch(error => {
     console.log(error);
 })

 let formDataa = {
  "id": upCOrders.value,
  "productId": upProductId.value,
  "status": 'Not Sent'
};

fetch('http://127.0.0.1:5000/updata/sentcart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formDataa)
})
.then( response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
});
})
}
})
})