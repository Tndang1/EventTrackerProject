window.addEventListener('load', function () {
	init();
});

var mainUl = document.createElement('ul');
mainUl.setAttribute("class", "list-group");
var homePage = location.href;

function init() {
	showMeals();
	let showNewMealForm = document.getElementById('addAMealForm');
	let newMealDiv = document.getElementById('newRecipeDiv');
	let updateMealDiv = document.getElementById('updateRecipeDiv');
	let alertBar = document.getElementById('alertBar');
	showNewMealForm.addEventListener('click', function(e){
		alertBar.setAttribute('class', 'd-none');
		if(showNewMealForm.innerText == 'Add a meal?'){
			showNewMealForm.innerText = 'Cancel';
			showNewMealForm.setAttribute('class', 'btn btn-danger');
			newMealDiv.setAttribute("class", "container text-center");

		} else {
			showNewMealForm.innerText = 'Add a meal?';
			showNewMealForm.setAttribute('class', 'btn btn-primary mb-2');
			newMealDiv.setAttribute('class', 'd-none');
			updateMealDiv.setAttribute('class', 'd-none');
			document.newRecipeForm.reset();
			document.updateRecipeForm.reset();
			showMeals();

		}
	})
	document.newRecipeForm.submitNew.addEventListener('click', function(e){
		e.preventDefault();
		showNewMealForm.innerText = 'Add a meal?';
		showNewMealForm.setAttribute('class', 'btn btn-primary mb-2');
		newMealDiv.setAttribute('class', 'd-none');
		var newMealInfo = document.newRecipeForm;
		addMeal(newMealInfo);
		console.log('Test event listener');
		updateMealDiv.setAttribute('class', 'd-none');
		document.newRecipeForm.reset();
		showMeals();
		alertBar.setAttribute('class','alert alert-success alert-dismissible');
	})
};

function showMeals(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/recipes');
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4){
			if (xhr.status === 200){
				let recipes = JSON.parse(xhr.responseText);
				recipes = recipes.sort((a,b) => a.date-b.date).reverse();
				let showAllMeals = document.getElementById('showAllMeals');
				showAllMeals.innerHTML = "";
				mainUl.innerHTML = "";
				recipes.forEach((recipe) => {
					let li = document.createElement('li');
					li.setAttribute("class", "list-group-item-action");
					li.innerHTML = recipe.name + '. Made: ' + recipe.date;
					li.addEventListener('click', function(e){
						if(e.target.className == 'list-group-item-action'){
						clearSelection(recipe);
						getMeal(recipe.id);
						// li.setAttribute("class", "list-group-item active");
						// li.appendChild(displayMeal(recipe));
						// } 
						// else {
						// 	clearSelection(recipe);
						}
					})
					mainUl.appendChild(li);
				});
				showAllMeals.appendChild(mainUl);
			}
		} else {
			console.error(xhr.status);
		}
	};
	xhr.send();
}

function clearSelection(recipe){
	for (let i = 0; i < mainUl.childElementCount; i++){
		if(mainUl.childNodes[i].firstChild.nextSibling !== null){
			mainUl.childNodes[i].innerHTML = recipe.name + '. Made: ' + recipe.date;
			mainUl.childNodes[i].setAttribute("class", "list-group-item-action");
		}
	}
}

function getMeal(mealId){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/recipes/' + mealId);
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4){
			if(xhr.status === 200){
				let meal = JSON.parse(xhr.responseText);
				displayMeal(meal);
			} else {
				console.error(xhr.status);
			}
		}
	};
	xhr.send();
}

function displayMeal(meal){

let infoTab = document.createElement('table');
let details = [		'Original Recipe: ' + meal.originalRecipe,
					'Name:' + meal.name,
					'Date Made:' + meal.date,
					'Ingredients Used: ' + meal.actualIngredients,
					'Cost: ' + meal.cost,
					'Servings: ' + meal.servings,
					'Additional Notes: ' + meal.notes
				]
	let recRow = document.createElement('tr');
	let recData = document.createElement('td');
	let add = document.createElement('a');
	add.href = meal.originalRecipe;
	recData.appendChild(add);
	recRow.appendChild(recData);
	infoTab.appendChild(recRow);
		details.forEach(detail =>{
		let row = document.createElement('tr');
		let data = document.createElement('td');
		data.innerText = detail;
		row.appendChild(data);
		infoTab.appendChild(row);
		})

	let delBtn = document.createElement('button');
	delBtn.setAttribute("class", "btn btn-danger float-right");
	delBtn.innerHTML = 'Delete';
	delBtn.addEventListener('click', function(e){
		deleteMeal(meal.id);
		showMeals();
	})
	let homeBtn = document.createElement('button');
	homeBtn.innerHTML = 'Return to index';
	homeBtn.setAttribute('class','btn btn-info center')
	homeBtn.addEventListener('click', init());
	let updateBtn = document.createElement('button');
	updateBtn.innerHTML = 'Update this entry';
	updateBtn.setAttribute("class","btn btn-secondary float-left");
	updateBtn.addEventListener('click', function(e){
		console.log(e.target.parentElement);
		showUpdateMealForm(meal);
	})
	let buttonRow = document.createElement('tr');
	let updateBtnData = document.createElement('td');
	let homeBtnData = document.createElement('td');
	let delBtnData = document.createElement('td');

	updateBtnData.appendChild(updateBtn);
	homeBtnData.appendChild(homeBtn);
	delBtnData.appendChild(delBtn);
	
	buttonRow.appendChild(updateBtnData);
	buttonRow.appendChild(homeBtnData);
	buttonRow.appendChild(delBtnData);
	let mealInfoDiv = document.getElementById('displayMealDiv');
	mealInfoDiv.appendChild(infotab);
}

function showUpdateMealForm(mealInfo){
	// mainUl.innerHTML = "";
	
	var updateRecipeForm = document.updateRecipeForm;

	let newMealDiv = document.getElementById('newRecipeDiv');
	let updateMealDiv = document.getElementById('updateRecipeDiv');
	updateMealDiv.setAttribute("class", "container text-center");
	newMealDiv.setAttribute("class", "d-none");
	let showNewMealFormBtn = document.getElementById('addAMealForm');
	showNewMealFormBtn.setAttribute('class', 'd-none');
	// showNewMealFormBtn.setAttribute('class', 'btn btn-danger');
	// showNewMealFormBtn.innerText = 'Cancel';

	updateRecipeForm.name.setAttribute('value', mealInfo.name);
	updateRecipeForm.originalRecipe.setAttribute('value', mealInfo.originalRecipe);
	updateRecipeForm.cost.setAttribute('value', mealInfo.cost);
	updateRecipeForm.servings.setAttribute('value', mealInfo.servings);
	updateRecipeForm.actualIngredients.textContent = mealInfo.actualIngredients;
	updateRecipeForm.notes.textContent = mealInfo.notes;

	document.updateRecipeForm.submitUpdate.addEventListener('click', function(e){
		console.log(e.target);
		var updatedMealInfo = document.updateRecipeForm;
		updatedMealInfo.id = mealInfo.id;
		updateMeal(updatedMealInfo);
	})
}

function updateMeal(mealUpdate){
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/recipes/' + mealUpdate.id);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4){
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText);
				console.log(data);
				updateRecipeForm.reset();
				showMeals();
			}
		}
	};
	let recipeUpdate = {
		name:mealUpdate.name.value,
		originalRecipe:mealUpdate.originalRecipe.value,
		cost:parseFloat(mealUpdate.cost.value),
		servings:parseInt(mealUpdate.servings.value),
		actualIngredients:mealUpdate.actualIngredients.value,
		notes:mealUpdate.notes.value
	};
	let mealJSON = JSON.stringify(recipeUpdate);
	xhr.send(mealJSON);

}

function addMeal(meal){
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/recipes');
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4){
			if (xhr.status == 200 || xhr.status == 201) {
				var data = JSON.parse(xhr.responseText);
				document.newRecipeForm.reset();
			}
		}
	};
	let recipe = {
		name:meal.name.value,
		originalRecipe:meal.originalRecipe.value,
		cost:parseFloat(meal.cost.value),
		servings:parseInt(meal.servings.value),
		actualIngredients:meal.actualIngredients.value,
		notes:meal.notes.value
	};
	let mealJSON = JSON.stringify(recipe);
	xhr.send(mealJSON);
	showMeals();
}

function deleteMeal(mealId){
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/recipes/' + mealId);
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4){
			if(xhr.status == 204){
				console.log('Successfully Deleted a thing.');
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
	xhr.send();
	showMeals();
}