'use strict';

import {getUsers} from "./users-list.js";

export const editUser = (id) => {
    getUser(id).then(user => {
        const tableRow = document.querySelector('tr[data-id="'+id+'"]');
        tableRow.innerHTML = '<td>'+user.id+'</td>' +
            '<td><input type="text" name="name" id="name" value="'+user.name+'" class="form-control"/></td>' +
            '<td><input type="email" name="emailAddress" id="email" value="'+user.emailAddress+'" class="form-control"/></td>' +
            '<td><input type="text" name="address" id="address" value="'+user.address+'" class="form-control"/></td>' +
            '<td><button type="button" class="btn btn-primary btn-sm edit">Save</button> <button type="button" class="btn btn-sm btn-secondary undo">Cancel</button></td>';
        const saveButtons = document.querySelectorAll('button.edit');
        for(let i = 0; i < saveButtons.length; i++) {
            saveButtons[i].addEventListener('click', (e) => {
                const id = e.target.parentElement.parentElement.dataset.id;
                const nameInput = document.querySelector('tr[data-id="'+id+'"] input[name="name"]');
                const emailInput = document.querySelector('tr[data-id="'+id+'"] input[name="emailAddress"]');
                const addressInput = document.querySelector('tr[data-id="'+id+'"] input[name="address"]');
                saveEditUser(e.target.parentElement.parentElement.dataset.id, {
                    id: id,
                    name: nameInput.value,
                    emailAddress: emailInput.value,
                    address: addressInput.value,
                })
            })
        }
        const editButtons = document.querySelectorAll('button.undo');
        for(let i = 0; i < saveButtons.length; i++) {
            editButtons[i].addEventListener('click', (e) => {
                getUsers();
            })
        }
    });
}

const getUser = id => {
    return fetch(`http://localhost:3000/users/`+id)
        .then(response => response.json())
        .catch(err => {console.log('Hiba történt az adatok lekérdezésekor', err)})
};

const saveEditUser = (id, data) => {
    fetch(
        `http://localhost:3000/users/`+id,
        {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
    )
        .then(response => response.json())
        .then(() => getUsers())
        .catch(err => {console.log('Hiba történt az adatok lekérdezésekor', err)})
};

export const createUser = () => {
    const nameInput = document.querySelector('#createName');
    const emailInput = document.querySelector('#createEmail');
    const addressInput = document.querySelector('#createAddress');
    fetch(
        `http://localhost:3000/users/`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                name: nameInput.value,
                emailAddress: emailInput.value,
                address: addressInput.value,
            }) // body data type must match "Content-Type" header
        }
    )
        .then(response => response.json())
        .then(() => getUsers())
        .catch(err => {console.log('Hiba történt az adatok lekérdezésekor', err)})
}