window.addEventListener('load', function () {
	init();
});

// var newRecipeForm = document.getElementById("newRecipeForm");
// console.log(newRecipeForm.firstElementChild);
// var updateRecipeForm = document.getElementById("updateRecipeForm");
var mainUl = document.createElement('ul');
mainUl.setAttribute("class", "list-group");

function init() {
	showMeals();
	document.newRecipeForm.submitNew.addEventListener('click', function(e){
		e.preventDefault();
		var newMealInfo = document.newRecipeForm;
		addMeal(newMealInfo);
		console.log('Test event listener');
		showMeals();
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
				mainUl.innerHTML = "";
				recipes.forEach((recipe, i) => {
					let li = document.createElement('li');
					li.setAttribute("class", "list-group-item-action");
					li.innerHTML = recipe.name + '. Made: ' + recipe.date;
					li.addEventListener('click', function(e){
						if(e.target.childElementCount == 0){
						clearSelection(recipe);
						li.setAttribute("class", "list-group-item active");
						li.appendChild(displayMeal(recipe));
						} else {
							clearSelection(recipe);
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

function displayMeal(meal){
	let ulInner = document.createElement('ul');
	let details = ['Original Recipe: ' + meal.originalRecipe,
					'Ingredients Used: ' + meal.actualIngredients,
					'Cost: ' + meal.cost,
					'Servings: ' + meal.servings,
					'Additional Notes: ' + meal.notes
				]
details.forEach(detail =>{
	let liInner = document.createElement('li');
	liInner.textContent = detail;
	ulInner.appendChild(liInner);
	})
	let delBtn = document.createElement('button');
	delBtn.setAttribute("class", "btn btn-danger float-right");
	delBtn.innerHTML = 'Delete';
	delBtn.addEventListener('click', function(e){
		deleteMeal(meal.id);
		showMeals();
	})
	// let updateBtn = document.createElement('button');
	// updateBtn.innerHTML = 'Update this entry';
	// updateBtn.setAttribute("class","btn btn-secondary");
	// updateBtn.addEventListener('click', function(e){
	// 	newRecipeForm.setAttribute("class", "d-none form-inline");
	// 	updateRecipeForm.setAttribute("class", "form-inline");
	// })
	// ulInner.appendChild(updateBtn);
	ulInner.appendChild(delBtn);
	return  ulInner;
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
//xhr.open('PUT', 'api/pangolins/'+pangoId);