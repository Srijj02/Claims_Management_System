const form=document.getElementById('form');
const userName=document.getElementById('userName');
const password=document.getElementById('password');
const msg=document.getElementById('msg');


form.addEventListener('submit',(eve)=> {
    if(eve) eve.preventDefault();

    validate(eve);
    
})

function validate(eve) {
    if(userName.value ==="" || password.value==="" ) {
        msg.innerHTML="Please fill the blank fields"
        msg.style.color="red";
    }
    else {
        msg.innerHTML="";
        login(eve);
    }
}

function login(eve) {
    if(eve) eve.preventDefault();

    const newData= {
        userName:userName.value,
        userPassword:password.value
    }

    fetch('http://localhost:3000/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newData)
    })
    .then(response=> {
        console.log("helloooooo");
        console.log(response);
        return response.json();
    })
    .then(data=> {
        console.log(data.role);
        if(data.message!="Invalid credentials"){
            if(data.role==='admin'){
                window.location.href='users.html';
            }
            else {
            window.location.href='index.html';
            }

        }
        else{
            msg.innerHTML='Invalid credentials';
            msg.style.color='red';
        }
    })

}

