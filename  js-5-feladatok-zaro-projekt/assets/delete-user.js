'use strict';

import {getUsers} from "./users-list.js";

export const deleteUser = (id) => {
    fetch(`http://localhost:3000/users/`+id, {method: 'DELETE'})
        .then(() => getUsers())
        .catch(err => {console.log('Hiba történt az adatok lekérdezésekor', err)})
}