'use strict';
import {getUsers} from './users-list.js';
import {createUser} from "./edit-user.js";

window.addEventListener('load', function(){
    getUsers();
    const createButton = document.querySelector('button.create');
    createButton.addEventListener('click', () => {
        createUser();
    })
});