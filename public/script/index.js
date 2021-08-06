//Creating Global Recipe Collection and page context variables
const globalRecipeCollection = [];

var currentIngredientsFilters = [];
var currentDeviceFilters = [];
var currentUtensilsFilters = [];

var activeIngredientsFilters = [];
var activeDeviceFilters = [];
var activeUtensilsFilters = [];

const filterTypes = [ "ingredients", "device", "utensils"];

//Creating Recipe Objects and populating the list of recipes.
recipes.forEach(element => {
    currentRecipe = createRecipe(element);
    globalRecipeCollection.push(currentRecipe);
})

console.log(globalRecipeCollection);

/*Algo_V2*/
var notFoundRecipeCollection = [];
var foundRecipeCollection = [];
/*End of modification*/

console.log(replaceDiacritics("éEàèIî"));

//adding the event listeners on the advanced search menus to handle expanding and shrinking it properly

addMenuEventListener("ingredients", "expand");
addMenuEventListener("device", "expand");
addMenuEventListener("utensils", "expand");
addMenuEventListener("ingredients", "shrink");
addMenuEventListener("device", "shrink");
addMenuEventListener("utensils", "shrink");

addAdvancedSearchEventListener("ingredients");
addAdvancedSearchEventListener("device");
addAdvancedSearchEventListener("utensils");

//Rendering default recipe grid.
executeMainSearch();
renderRecipeGrid();
recalculateAdvancedSearchTags();

//Listening to keyDown inputs on the main search field
document.getElementById("main-search__text-input").addEventListener("keyup", () => {
        
    notFoundRecipeCollection = [];
    foundRecipeCollection = [];
    executeMainSearch();
    applyAllAdvancedSearchFilters();
    recalculateAdvancedSearchTags();
    renderRecipeGrid();
  
})

