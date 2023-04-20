'use strict'

if (localStorage.getItem('username')) {
  setTimeout(()=>{
      window.location.href = './Data/user account/onlineShop.html';
  },1)
}

const $ = document

const loginForm = $.querySelector('form.login')
const signupForm = $.querySelector('form.signup')
const loginBtn = $.querySelector('label.text-login')
const signupBtn = $.querySelector('label.text-signup')
const loginText = $.querySelector('.title-text .login')
const signupText = $.querySelector('.title-text .signup')

signupForm.style.display = 'none'

signupBtn.onclick = () => {
  signupForm.style.display = 'block'
  loginForm.style.marginLeft = '-50%'
  loginText.style.marginLeft = '-50%'
}

loginBtn.onclick = () => {
  loginForm.style.display = 'block'
  loginForm.style.marginLeft = '0%'
  loginText.style.marginLeft = '0%'
  delysignup()
}

function delysignup() {
  setTimeout(()=>{
    signupForm.style.display = 'none'
  },300)
}

const blur = ()=> {
  if (pass.value.length != 8 ) {
    alertpass.style.display = 'block'
  }
  if (pass.value == '') {
    alertpass.style.display = 'none'
  }
}

const keyup = ()=> {
  if (pass.value.length == 8 ) {
    alertpass.style.display = 'none'
    }
}

pass.addEventListener('blur', blur)
pass.addEventListener('keyup', keyup)


email.addEventListener('blur',()=>{
  if (email.value == ''){
    lemail.style.top = '50%'
  }
})

email.addEventListener('keyup',()=>{
  if (email.value != '') {
    lemail.style.top = '0%'
  }
})

city.addEventListener('blur',()=>{
  if (city.value == ''){
    lcity.style.top = '50%'
  }
})

city.addEventListener('keyup',()=>{
  if (city.value != '') {
    lcity.style.top = '0%'
  }
})

address.addEventListener('keyup',()=>{
  if (address.value != '') {
    laddress.style.top = '0%'
  }
})

address.addEventListener('blur',()=>{
  if (address.value == ''){
    laddress.style.top = '50%'
  }
})

nationalCode.addEventListener('keyup',()=>{
  if (nationalCode.value != '') {
    lnationalCode.style.top = '0%'
  }
})

nationalCode.addEventListener('blur',()=>{
  if (nationalCode.value == ''){
    lnationalCode.style.top = '50%'
  }
})



let betUsername = true

username.addEventListener('keyup',(event)=>{
  username.value = username.value.toLowerCase();
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
})

window.addEventListener("DOMContentLoaded",() => {
  const btnSignup = $.querySelector('.btn-signup');
  var doneTimeout = null,
    resetTimeout = null;
    btnSignup.addEventListener("click",function(e) {
      if (nameLast.value != '' && username.value != '' && email.value != '' &&
          pass.value != '' && phoneNum.value.length == 10 && city.value != '' && nationalCode.value != '' && pass.value.length == 8 && betUsername == true) {
        e.preventDefault()
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
      setTimeout(()=>{
        nameLast.value = ''
        username.value = ''
        email.value = ''
        lemail.style.top = '50%'
        lnationalCode.style.top = '50%'
        pass.value = ''
        phoneNum.value = ''
        city.value = ''
        address.value = ''
        nationalCode.value = ''
      },3000)
    }
    });
});




const password = $.querySelectorAll('.password')
const iconPassword = $.querySelectorAll('.icon-password')


for (let i = 0; i < password.length; i++) {
  iconPassword[i].addEventListener('click',()=>{
    if(iconPassword[i].className == 'icon-password  bi-eye-slash-fill'){
      iconPassword[i].className = 'icon-password bi-eye-fill'
      password[i].setAttribute('type','text')
    }else{
      iconPassword[i].className = 'icon-password  bi-eye-slash-fill'
      password[i].setAttribute('type','password')
    }
  })
}

let betLoginAdmin = false
let betLoginManager = false


lpass.addEventListener('blur',()=>{
  let formData = {
    "name": uname.value,
    "password": lpass.value,
  }
  fetch('http://127.0.0.1:5000/data/loginmanager', {
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
    if (response.data.length != 0) {
      betLoginManager = true
    }else{ 
      let formData = {
        "name": uname.value,
        "password": lpass.value,
      }
      fetch('http://127.0.0.1:5000/data/admin', {
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
        let dataAdmin = Object.entries(response)
        let admins = []
        dataAdmin.forEach(admin =>{
          admins = admin[1]
        })
        console.log(response);
        if (response.data.length != 0) {
          betLoginAdmin = true
          admins.forEach(admin =>{
            localStorage.setItem('idadmin',admin.id);
          })
        }else{
          if (lpass.value.length != 8 ) {
            if (lpass.value != '') {
            alertlpass.style.display = 'block'
            }
          }
        }
      })
    }
  })
})

lpass.addEventListener('keyup',()=>{
  if (lpass.value.length == 8 ) {
    alertlpass.style.display = 'none'
    }
    
  if (lpass.value == '') {
    alertlpass.style.display = 'none'
  }
})


const btnLogin = $.querySelector('.btn-login')
const modalContainer = $.querySelector('#modalContainer')


btnLogin.addEventListener('click',()=>{
  if (betLoginManager == true) {
    uname.value = ''
    lpass.value = ''
  setTimeout(()=>{
    window.location.href = './Data/manager/managerPage.html'
  },1)
  }else{
  if (betLoginAdmin == true) {
    uname.value = ''
    lpass.value = ''
  setTimeout(()=>{
    window.location.href = './Data/admin/adminPage.html'
  },1)
  }else{
  let formData = {
    "name": uname.value,
    "password": lpass.value,
  }
  fetch('http://127.0.0.1:5000/data/login', {
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
    if (response.data.length != 0) {
      uname.value = ''
    lpass.value = ''
    }else{
      if(uname.value != '' && lpass.value != '' &&     alertlpass.style.display == 'none')
      modalContainer.style.display = 'block'
      setTimeout(()=>{
        modalContainer.style.display = 'none'
      },4000)
    }
    
    setTimeout(()=>{
      if (response.data.length != 0) {
        window.location.href = './Data/user account/onlineShop.html';
      }
    },1000)
    let dataUsers = Object.entries(response)
    let users = []
    dataUsers.forEach(user =>{
      users = user[1]
    })
    users.forEach(user =>{
      localStorage.setItem('id',user.id);
      localStorage.setItem('username',user.name)
      localStorage.setItem('password',user.password)
    })
  })
  .catch(error => {
    console.log(error);
    if(uname.value != '' && lpass.value != '' &&     alertlpass.style.display == 'none')
    modalContainer.style.display = 'block'
    setTimeout(()=>{
      modalContainer.style.display = 'none'
    },4000)
  })
}
}
})


