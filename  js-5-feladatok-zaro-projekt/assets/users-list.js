'use strict';

import {listUsers} from "./list-users.js";

export const getUsers = () => {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => listUsers(data))
        .catch(err => {console.log('Hiba történt az adatok lekérdezésekor', err)})
};

