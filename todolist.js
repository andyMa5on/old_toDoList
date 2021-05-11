// Javascript

function updateList (newItem) {

    if( newItem == ''){
        alert('Please enter a title')
        document.getElementById('addItem').focus();
    } else {
        const divElem = document.getElementById('listSection');
        const ulElem = document.getElementById('tdList');

        const liEl = document.createElement('li');

        const aUp = document.createElement('img');
        aUp.src = "Images//ArrowUp.png";
        aUp.setAttribute('id', 'moveUp');
        aUp.setAttribute('class', 'priorityArrows');
        aUp.setAttribute('onclick', 'moveFunc(this.id, this.parentElement);');
        aUp.setAttribute('alt', 'Move Up');
        liEl.appendChild(aUp);

        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('onchange', 'checkBox(this.checked);')
        liEl.appendChild(checkbox)

        const titleText = document.createTextNode(newItem);
        const inputTitle = document.createElement('input')
        inputTitle.setAttribute('value', '')
        inputTitle.setAttribute('class', 'titleInput')
        inputTitle.value = titleText.nodeValue
        liEl.appendChild(inputTitle);

        const brEl = document.createElement('br');
        liEl.appendChild(brEl);

        const aDown = document.createElement('img');
        aDown.src = "Images//ArrowDown.png";
        aDown.setAttribute('id', 'moveDown');
        aDown.setAttribute('class', 'priorityArrows pDown');
        aDown.setAttribute('onclick', 'moveFunc(this.id, this.parentElement);');
        aDown.setAttribute('alt', 'Move Up');
        liEl.appendChild(aDown);

        const txtArea = document.createElement('textarea');
        txtArea.setAttribute('id', 'areaDescrip')
        txtArea.placeholder = 'Add Description here'
        liEl.appendChild(txtArea);

        const remove = document.createElement('button');
        const binTag = document.createElement('img')
        binTag.src = "Images/delete_red.png"
        binTag.style.width = "90%"
        binTag.style.padding = "0.1em"
        remove.appendChild(binTag);
        remove.style.maxWidth = "30px"
        remove.setAttribute("onclick", "removeLi(this.parentElement);")
        liEl.appendChild(remove);

        ulElem.appendChild(liEl);

        divElem.appendChild(ulElem);

        magic()
    }
    
}

function removeLi(i) {

    let el = i
    el.remove()

}

function magic (){

    i = document.getElementById('nList').getAttribute('class')

    if( i == 'hidden'){
        let show = document.getElementById("nList")
    show.setAttribute('class', 'expand')
    let addicon = document.getElementById('addIcon')
    addicon.style.opacity = "50%"
    document.getElementById('addItem').focus();
    }else {
        let collapse = document.getElementById("nList")
        collapse.setAttribute('class', 'hidden')
        let addicon = document.getElementById('addIcon')
        addicon.style.opacity = "100%"
    }
}

function moveFunc(i, x) {

    if (i == 'moveDown'){

        let test = x.nextElementSibling
        console.log(test)

        test.insertAdjacentElement('afterend', x)
    } else {

        let test = x.previousElementSibling
        console.log(test)

        x.insertAdjacentElement('afterend', test)

    }
}

function checkBox(i) {

    const exDetails = document.getElementById('exDetails')

    if ( i == true) {
        exDetails.setAttribute('class', 'expand')
        exDetails.focus();
    }else {
        exDetails.setAttribute('class', 'hidden')
    }
}
