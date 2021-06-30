// Javascript
const backDrop = document.getElementById('backdrop');
const addItemModule = document.getElementById('addItemModule')
const AddItemButton = document.getElementById('addIcon')
const addButton = document.getElementById('addBttn');
const closeButton = document.getElementById('closeBttn')
const ulElement = document.getElementById('userInterface');
const userInput = document.getElementsByName('input');
const arrowUp = document.getElementsByName('move_up');
const ArrowDown = document.getElementsByName('move_down');

const toDoList = []

function addModalHandler() {
	addItemModule.classList.toggle('hidden');
	toggleBackdrop();
	userInput[0].focus()

}

function validateInput(newItem) {
	if (newItem == '') {
		alert('Please enter a title');
		document.getElementById('addItem').focus();
	} else {
		addToDoListItemHandler()
		updateUI()
		addModalHandler(); 
	}
}

function addToDoListItemHandler() {
	let id = Date.now()
	let title = userInput[0].value
	let description = userInput[1].value

	let newItem = {
		id: id,
		title: title,
		description: description
	}

	toDoList.push(newItem)
	createLiElement(newItem.id, newItem.title, newItem.description)
	userInput[0].value = ''
	userInput.value = ''
}

function createLiElement(id, title, descrition) {
	const liEl = document.createElement('li')
	liEl.innerHTML = `
	<div class='card toDoCard'>
		<div class='central'>
			<img src='Images//ArrowUp.png' alt='Up Arrow' name='move_up' class='arrow_Up'>
			<input type='hidden' id='id' value=${id}>
			<input type='text'value=${title} class='titleInput' editable>
			<br>
			<img src='Images//ArrowDown.png' alt='Down Arrow' name='move_down' class='arrow_Down'>
			<textarea class='areaDescrip'>${descrition}</textarea>
		</div>
		<div class='flex'>
			<button class='binButton'><img src='Images/delete_red.png' class='binImage' alt='delete item'></button>
		</div>
	</div>
	`;
	
	liEl.querySelector('.titleInput').addEventListener('change', function () {titleHandler(this.value, this.previousElementSibling.value)})
	liEl.querySelector('.areaDescrip').addEventListener('change', function () {descriptionHandler(this.value, this.parentElement.children[1].value)})
	liEl.querySelector('.arrow_Up').addEventListener('click', function() {moveFunc(this, this.parentElement, this.nextElementSibling.value)})
	liEl.querySelector('.arrow_Down').addEventListener('click', function() {moveFunc(this, this.parentElement, this.parentElement.children[1].value)})
	liEl.querySelector('.binButton').addEventListener('click', function() {removeLi(this.parentElement.parentElement.parentElement, this.parentElement.previousElementSibling.children[1].value)})
	ulElement.appendChild(liEl);
}

function updateUI() {
	const entryText = document.getElementById('entry-text');
	if (toDoList.length === 0) {
		entryText.style.display = 'block';
	} else {
		entryText.style.display = 'none';
	}
}

function titleHandler(newValue, arrayId) {
	let idx = findArrayIndex(arrayId)
	toDoList[idx].title = newValue
}

function descriptionHandler(newValue, arrayId) {
	let idx = findArrayIndex(arrayId)
	toDoList[idx].description = newValue
}

function toggleBackdrop() {
	backDrop.classList.toggle('backdropVisible');
}

function closeHandler() {
	addModalHandler();
	userInput[0].value = ''
	userInput[1].value = ''
}

function findArrayIndex(arrayId) {
	const arrayIndex = toDoList.findIndex((item, idx, list) =>{
		return item.id == arrayId
	})
	return arrayIndex
}

function removeLi(i, arrayId) {
	let idx = findArrayIndex(arrayId)
	let el = i;
	let confirmDeletion = confirm('Are you sure you want to delete this item ? \n \n Click ok to delete.')
	if (confirmDeletion == true) {
		toDoList.splice(idx, 1) ;
		el.remove();
		updateUI();
	} else {
		return
	}
}

function moveFunc(element, parent, arrayId) {
	i = element.getAttribute('name')
	parent = parent.parentElement.parentElement
	if (i == 'move_down') {
		const arrayIndex = findArrayIndex(arrayId)
		const item2Move = toDoList[arrayIndex]
		const swapWith = toDoList[arrayIndex + 1]
		toDoList[arrayIndex] = swapWith
		toDoList[arrayIndex + 1] = item2Move
		let test = parent.nextElementSibling;
		test.insertAdjacentElement('afterend', parent);
	} else {
		const arrayIndex = findArrayIndex(arrayId)
		const item2Move = toDoList[arrayIndex]
		const swapWith = toDoList[arrayIndex - 1]
		toDoList[arrayIndex] = swapWith
		toDoList[arrayIndex - 1] = item2Move
		let test = parent.previousElementSibling;
		parent.insertAdjacentElement('afterend', test);
	}
}

// Event listeners
backDrop.addEventListener('click', closeHandler);
AddItemButton.addEventListener('click', addModalHandler)
addButton.addEventListener('click', function() {validateInput(addItem.value)})
closeButton.addEventListener('click', closeHandler)