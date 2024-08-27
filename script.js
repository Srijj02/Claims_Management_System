const overlay = document.getElementById('overlay');
const form = document.getElementById('form')
const addBtn = document.getElementById('addBtn');
const bill_number = document.getElementById('bill_number');
const customer_id = document.getElementById('customer_id');
const bill_date = document.getElementById('bill_date');
const amount = document.getElementById('amount');
const status = document.getElementById('status');
const payment_due_date = document.getElementById('payment_due_date');
const payment_method = document.getElementById('payment_method');
const msg = document.getElementById('msg');
const body = document.getElementById('body');


function openOverLay(eve) {
    if (eve) eve.preventDefault();

    overlay.style.display = "block";

}

function closeOverLay(eve) {
    if (eve) eve.preventDefault();

    overlay.style.display = 'none';
}


form.addEventListener('submit', (eve) => {
    if (eve) eve.preventDefault();
    console.log('clicked');
    validate();
})

function validate() {
    if (bill_number.value === "" || customer_id.value === "" || bill_date.value === "" || amount.value === "" || status.value === "" || payment_due_date.value === "" || payment_method.value === "") {
        msg.innerHTML = "Please fill the blank fields";
        msg.style.color = "red";
    }
    else {
        msg.innerHTML = "";
        add();
    }
}

data = [];


window.onload = async function () {
    await fetch('http://localhost:3000/claims', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        return response.json();
    })
    .then(val => {
        console.log(val);
        data = val;
    })
    display(data)
}


function display(data) {
    body.innerHTML = "";
    data.map((val, index) => {
        return body.innerHTML += `<tr>
                <td>${index + 1}</td>
                <td>${val.bill_number}</td>
                <td>${val.customer_id}</td>
                <td>${val.bill_date.split('T')[0]}</td>
                <td>${val.amount}</td>
                <td>${val.status}</td>
                <td>${val.payment_due_date.split('T')[0]}</td>
                <td>${val.payment_method}</td>
                <td><button onclick="edit(${index})" id="editBtn"><i class="fa-regular fa-pen-to-square"></i></button ><button onclick="del(${index})" id="delBtn"><i class="fa-regular fa-trash-can"></i></button></td>
            </tr>`
    })
}


function add() {
    let newData = {
        bill_number: bill_number.value,
        customer_id: customer_id.value,
        bill_date: bill_date.value.split('T')[0],
        amount: amount.value,
        status: status.value,
        payment_due_date: payment_due_date.value.split('T')[0],
        payment_method: payment_method.value
    }

    console.log(newData);
    console.log(newData.bill_date);
    fetch('http://localhost:3000/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    // .then(addedData => {
    //     data.push(addedData);
    // })
    display(data);

    overlay.style.display = 'none';

    window.location.reload();
}

function edit(index) {
    console.log("hiiii");
    console.log(data[index].bill_date.split('T'));
    console.log(data[index].payment_due_date);


    let currentId = data[index].id;
    bill_number.value = data[index].bill_number;
    customer_id.value = data[index].customer_id;
    bill_date.value = data[index].bill_date.split('T')[0];
    amount.value = data[index].amount;
    status.value = data[index].status;
    payment_due_date.value = data[index].payment_due_date.split('T')[0];
    payment_method.value = data[index].payment_method;

    overlay.style.display = "block";

    let newData = {
        bill_number: bill_number.value,
        customer_id: customer_id.value,
        bill_date: bill_date.value,
        amount: amount.value,
        status: status.value,
        payment_due_date: payment_due_date.value,
        payment_method: payment_method.value
    }


    console.log(newData);


    fetch(`http://localhost:3000/claims/${currentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
    })
    .then(response => {
        del(index);
        return response.json();
    })
    .then(updatedData => {
        console.log(updatedData);
        data[index] = updatedData;
        display(data);
    })

    // window.location.reload();
}

function del(index) {
    let currentId = data[index].id;
    fetch(`http://localhost:3000/claims/${currentId}`, {
        method: 'DELETE'
    })
        .then(() => {
            data.splice(index, 1);
            display(data);
        })
}




