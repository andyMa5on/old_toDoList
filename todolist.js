// Javascript
const backDrop = document.getElementById('backdrop');
const addItemModule = document.getElementById('addItemModule')
const addButton = document.getElementById('addBttn');
const closeButton = document.getElementById('closeBttn')
const ulElement = document.getElementById('userInterface');
const userInput = document.getElementsByName('input');
const arrowUp = document.getElementsByName('move_up');
const ArrowDown = document.getElementsByName('move_down');

const toDoList = []

function addToDoListItemHandler() {
	let title = userInput[0].value
	let description = userInput[1].value

	let newItem = {
		title: title,
		description: description
	}

	toDoList.push(newItem)
	createLiElement(newItem.title, newItem.description)
	userInput[0].value = ''
	userInput.value = ''
}

function createLiElement(title, descrition) {
	const liEl = document.createElement('li')
	liEl.innerHTML = `
	<div class='card toDoCard'>
		<div class='central'>
			<img src='Images//ArrowUp.png' alt='Up Arrow' name='move_up' class='arrow_Up'>
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
	
	liEl.querySelector('.arrow_Up').addEventListener('click', function() {moveFunc(this, this.parentElement)})
	liEl.querySelector('.arrow_Down').addEventListener('click', function() {moveFunc(this, this.parentElement)})
	liEl.querySelector('.binButton').addEventListener('click', function() {removeLi(this.parentElement.parentElement.parentElement)})
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

function toggleBackdrop() {
	backDrop.classList.toggle('backdropVisible');
}

function closeHandler() {
	addModalHandler();
	userInput[0].value = ''
	userInput[1].value = ''
}

function updateList(newItem) {
	if (newItem == '') {
		alert('Please enter a title');
		document.getElementById('addItem').focus();
	} else {
		addToDoListItemHandler()
		updateUI()
		addModalHandler(); 
	}
}

function removeLi(i) {
	let el = i;
	let confirmDeletion = confirm('Are you sure you want to delete this item ? \n \n Click ok to delete.')
	if (confirmDeletion == true) {
		el.remove();
		updateUI();
	} else {
		return
	}
}

function addModalHandler() {
	addItemModule.classList.toggle('hidden');
	toggleBackdrop();
	userInput[0].focus()

}

function moveFunc(element, parent) {
	i = element.getAttribute('name')
	parent = parent.parentElement.parentElement
	console.log(parent)
	if (i == 'move_down') {
		let test = parent.nextElementSibling;
		console.log(test);

		test.insertAdjacentElement('afterend', parent);
	} else {
		let test = parent.previousElementSibling;
		console.log(test);

		parent.insertAdjacentElement('afterend', test);
	}
}

// Event listeners
backDrop.addEventListener('click', closeHandler);
addButton.addEventListener('click', function() {updateList(addItem.value)})
closeButton.addEventListener('click', closeHandler)