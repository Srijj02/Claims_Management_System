const overlay=document.getElementById('overlay');
const form=document.getElementById('form');
const fullName=document.getElementById('fullName');
const userName=document.getElementById('userName');
const userPassword=document.getElementById('userPassword');
const userRole=document.getElementById('userRole');
const msg=document.getElementById('msg');
const body=document.getElementById('body');



// <!-- 
// CREATE TABLE users_table(id INT AUTO_INCREMENT PRIMARY KEY,
// fullName VARCHAR(30), userName VARCHAR(30), userPassword VARCHAR(200),userRole VARCHAR(30));
//  -->

function openOverLay() {
    overlay.style.display="block";
}

function closeOverLay() {
    overlay.style.display="none";
}

form.addEventListener('submit',(eve)=> {
    if(eve) eve.preventDefault();
    console.log('cliked');
    validate();
})

function validate() {
    if(fullName.value==="" || userName.value==="" || userPassword.value==="" || userRole.value==="") {
        msg.innerHTML="please fill the blank fields";
        msg.style.color='red';
    }
    else {
        msg.innerHTML="";
        add();
    }
}

let data=[];

function add() {
    let newData={
        fullName:fullName.value,
        userName:userName.value,
        userPassword:userPassword.value,
        userRole:userRole.value
    }

    fetch('http://localhost:3000/users',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newData)
    }).then(response=> {
        return response.json();
    }).then(addedData=> {
        data.push(addedData);
        display(data);
    })

    

    closeOverLay();
    resetForm();
    // window.location.reload();

    // window.location.reload();
}


function resetForm() {
    fullName.value="";
    userName.value="";
    userPassword.value="";
    userRole.value="";
}

window.onload=async function() {
    await fetch('http://localhost:3000/users',{
        method:'GET'
    })
    .then(response=> {
        return response.json();
    })
    .then(val=> {
        data=val;
    })
    display(data);
}

function display(data) {
    body.innerHTML="";
    data.map((val,index)=> {
        return body.innerHTML+=`<tr>
                <td>${index+1}</td>
                <td>${val.fullName}</td>
                <td>${val.userName}</td>
                <td>${val.userRole}</td>
                <td><button onclick="edit(${index})" id="editBtn"><i class="fa-regular fa-pen-to-square"></i></button><button onclick="del(${index})"id="delBtn"><i
                            class="fa-regular fa-trash-can"></i></button></td>
            </tr>`
    })
}

// fullName:fullName.value,
// userName:userName.value,
// userPassword:userPassword.value,
// userRole:userRole.value

function edit(index) {
    let currentId=data[index].id;

    fullName.value=data[index].fullName;
    userName.value=data[index].userName;
    userPassword.value=data[index].userPassword;
    userRole.value=data[index].userRole;

    overlay.style.display="block";

    let newData={
        fullName:fullName.value,
        userName:userName.value,
        userPassword:userPassword.value,
        userRole:userRole.value
    }


    fetch(`http://localhost:3000/users/${currentId}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newData)
    })
    .then(response=> {
        del(index);
        return response.json();
    })
    .then(updatedData=> {
        data[index]=updatedData;
        // window.location.reload();
        display(data);
    })
}

function del(index) {
    let currentId=data[index].id;

    fetch(`http://localhost:3000/users/${currentId}`,{
        method:'DELETE'
    })
    .then(()=> {
        data.splice(index,1);
        display(data);
    })
}