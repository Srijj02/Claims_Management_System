const form=document.getElementById('form');
const fullName=document.getElementById('fullName');
const emailId=document.getElementById('emailId');
const password=document.getElementById('password');
const submit=document.getElementById('submit');
const msg=document.getElementById('msg');
const userRole=document.getElementById('userRole');

console.log(userRole.value);

form.addEventListener('submit',(eve)=> {
    if(eve) eve.preventDefault();
    
    console.log("clicked");
    validate(eve);

})

function validate(eve) {
    if(fullName.value==="" || emailId.value==="" || password.value===""  ) {
        msg.innerHTML="Please fill the blank fields";
        msg.style.color='red';
    }
    else {
        msg.innerHTML="";
        add(eve);
    }
}

function add(eve) {
    if(eve) eve.preventDefault();

    const newData={
        fullName:fullName.value,
        userName:emailId.value,
        userPassword:password.value,
        userRole:userRole.value
    }

    fetch('http://localhost:3000/users',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newData)
    }).then((response)=> {
        return response.json()
    })
    .then(val=> {
        window.location.href='/login.html'
    })
}

