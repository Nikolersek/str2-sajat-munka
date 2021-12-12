'use strict';

import {deleteUser} from "./delete-user.js";
import {editUser} from "./edit-user.js";

export const listUsers = (users) => {
    const table = document.querySelector('table tbody');
    table.innerHTML = '';
    users.forEach(user => {
        table.innerHTML+= '<tr data-id="'+user.id+'">' +
            '<td>'+user.id+'</td>'+
            '<td>'+user.name+'</td>'+
            '<td>'+user.emailAddress+'</td>'+
            '<td>'+user.address+'</td>'+
            '<td>' +
                '<i class="fas fa-edit cursor"></i> <i class="fas fa-trash-alt cursor"></i>' +
            '</td>'+
            '<tr>';
    });
    const deleteIcons = document.querySelectorAll('i.fa-trash-alt');
    for(let i = 0; i < deleteIcons.length; i++) {
        deleteIcons[i].addEventListener('click', (e) => {
            deleteUser(e.target.parentElement.parentElement.dataset.id);
        })
    }

    const editIcons = document.querySelectorAll('i.fa-edit');
    for(let i = 0; i < editIcons.length; i++) {
        editIcons[i].addEventListener('click', (e) => {
            editUser(e.target.parentElement.parentElement.dataset.id);
        })
    }
};