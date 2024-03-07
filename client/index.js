// let id = "eb4aded78f6047a9bb15a9b9dd41f0b2";


function logdata(event) {
    event.preventDefault();
    // var name = event.target.username.value;
    // var email = event.target.email.value;
    // var phone = event.target.phone.value;
    // var date_time = event.target.dtime.value;
    // console.log("Name: "+name);
    // console.log("Email: "+email);
    // console.log("Phone: "+phone);
    // console.log("Date and Time: "+date_time);

    name = document.getElementById('username').value;
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    dtime = document.getElementById('dtime').value;

    obj = {
        name: name,
        email: email,
        phone: phone,
        date: dtime
    }

    // localStorage.setItem(email, JSON.stringify(obj));

    // axios.post(`https://crudcrud.com/api/${id}/appointmentData`, obj)
    axios.post('http://localhost:3000/user/add-user', obj)
        .then(res => {
            addUserDetails(res.data)
            // console.log(res)
        })
        .catch(err => {
            document.body.innerHTML = "<h4>Something went wrong</h4>"
            console.log(err)
        })

    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('dtime').value = '';



}
function printDataAtStart() {
    axios.get('http://localhost:3000/user/get-users')
        .then(res => {
            for (let i of res.data) {
                addUserDetails(i);
            }
        })
}
window.addEventListener("DOMContentLoaded", () => printDataAtStart())

function addUserDetails(obj) {

    newli = document.createElement('li');
    newli.className = "list-group-item";
    text = document.createTextNode(obj.name + " - " + obj.email + " - " + obj.phone + " - " + obj.date);

    newli.appendChild(text);

    btn = document.createElement('button');
    btn.textContent = "DELETE";
    btn.className = 'delete';

    newli.appendChild(btn)

    btn = document.createElement('button');
    btn.textContent = "EDIT";
    btn.className = 'edit';

    newli.appendChild(btn)

    document.getElementById('list').appendChild(newli);
}

document.getElementById('list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            let li = e.target.parentElement;
            data = li.innerText.split(' - ');
            document.getElementById('list').removeChild(li);
            // localStorage.removeItem(email);
            name = data[0]
            email = data[1];
            phone = data[2];
            date = data[3].split('DELETEEDIT')[0];
            // console.log(name, email, phone, date);
            axios.get('http://localhost:3000/user/get-users')
                .then(res => {
                    for (i of res.data) {
                        if (i.email === email && i.name === name && i.phone === Number(phone) && i.date === date) {
                            axios.delete('http://localhost:3000/user/delete-user/' + i.id)
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
})

document.getElementById('list').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit')) {
        if (confirm('Are You Sure?')) {
            let li = e.target.parentElement;
            document.getElementById('list').removeChild(li);
            data = li.innerText.split(' - ');
            document.getElementById('username').value = data[0];
            document.getElementById('email').value = data[1];
            document.getElementById('phone').value = data[2];
            document.getElementById('dtime').value = data[3];
            // localStorage.removeItem(data[1]);
            name = data[0]
            email = data[1];
            phone = data[2];
            date = data[3].split('DELETEEDIT')[0];
            // console.log(name, email, phone, date);
            axios.get('http://localhost:3000/user/get-users')
                .then(res => {
                    for (i of res.data) {
                        if (i.email === email && i.name === name && i.phone === Number(phone) && i.date === date) {
                            axios.delete('http://localhost:3000/user/delete-user/' + i.id)
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
})