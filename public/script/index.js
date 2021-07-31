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

/*Algo_V2*/
const notFoundRecipeCollection = globalRecipeCollection;
const foundRecipeCollection = [];
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

renderRecipeGrid();
recalculateAdvancedSearchTags();

//Listening to keyDown inputs on the main search field
document.getElementById("main-search__text-input").addEventListener("keyup", () => {

    //retrieving user input
    let searchQuery = document.getElementById("main-search__text-input").value;
    //If the Keyword is at least 3 characters long
    if (searchQuery.length > 2){      
    executeMainSearch();
    }
    else {
        globalRecipeCollection.forEach(currentRecipe => {
            currentRecipe.markAsPositiveResult();
        });
    }
    applyAllAdvancedSearchFilters();
    recalculateAdvancedSearchTags();
    renderRecipeGrid();
  
})

