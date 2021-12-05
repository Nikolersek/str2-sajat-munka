let gotCharacters;

const init = async () => {
    await getJson();
    drawCharacters();
    startCharacterSelectedEventHandler();
    startSearchCharacterEventHandler();
};

const getJson = () => {
    return fetch("/json/got.json")
        .then(response => response.json())
        .then(
            json =>
                gotCharacters = json
                    .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                    .filter(character => !character.dead)
        );
}

const drawCharacters = () => {
    const section = document.querySelector('section');
    for(let i in gotCharacters) {
        if(!gotCharacters.dead) {
            section.innerHTML+= '<div class="box" data-index="'+i+'">' +
                '<img src="'+gotCharacters[i].portrait+'" alt="">' +
                '<div>'+gotCharacters[i].name+'</div>'
            '</div>'
        }
    }
};

const startCharacterSelectedEventHandler = () => {
    const boxes = document.querySelectorAll('.box');
    for(let i = 0; i !== boxes.length; i++) {
        boxes[i].addEventListener('click', () => {
            selectCharacter(i);
        });
    }
}

const selectCharacter = i => {
    removeCharacterBio();
    document.querySelector('.box[data-index="'+i+'"]').classList.add('selected');
    const bio = document.querySelector('.bio');
    bio.innerHTML = '<div>' +
            '<img src="'+gotCharacters[i].picture+'" alt=""/>'+
            '<div>'+gotCharacters[i].name+(gotCharacters[i].house ? '<img src="/assets/houses/'+gotCharacters[i].house+'.png" alt=""/>' : '')+'</div>' +
            '<p>'+gotCharacters[i].bio+'</p>' +
        '</div>';
}

const removeCharacterBio = () => {
    const selectedBox = document.querySelector('.box.selected');
    const bio = document.querySelector('.bio');
    if(selectedBox) {
        selectedBox.classList.remove('selected');
    }
    bio.innerHTML = '';
}

const startSearchCharacterEventHandler = () =>  {
    const searchButton = document.querySelector('i');
    const bio = document.querySelector('.bio');
    let selectedIndex = null;
    searchButton.addEventListener('click', () => {
        const input = document.querySelector('input');
        selectedIndex = null;
        if(input.value) {
            gotCharacters.forEach((character, index) => {
                if(character.name.toLowerCase() === input.value.toLowerCase()) {
                    selectedIndex = index;
                }
            });
            if(selectedIndex === null) {
                bio.innerHTML = 'Character not found';
            }
            else {
                selectCharacter(selectedIndex);
            }
        }
        else {
            removeCharacterBio();
        }
    });
};

init();