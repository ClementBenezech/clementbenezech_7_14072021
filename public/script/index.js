//Creating Global Recipe Collection.
const globalRecipeCollection = [];
let currentIngredientsFilters = [];

//Creating Recipe Objects and populating the list of recipes.
recipes.forEach(element => {
    currentRecipe = createRecipe(element);
    globalRecipeCollection.push(currentRecipe);
})

//NEED TO ADD EVENT LISTENERS ON CHEVRONS TO EXPAND OR HIDE THE ADVANCED SEARCH MENUS.
document.getElementById("expand_ingredients_menu").addEventListener("click", () => {
    document.getElementById("search-filters__filters-container__ingredients").setAttribute("class", "search-filters__filters-container search-filters__filters-container--visible");
    document.getElementById("expand_ingredients_menu").setAttribute("class", "search-filters__search-container__expand-arrow search-filters__search-container__expand-arrow--hidden")
    document.getElementById("shrink_ingredients_menu").setAttribute("class", "search-filters__search-container__shrink-arrow search-filters__search-container__shrink-arrow--visible")
});

document.getElementById("shrink_ingredients_menu").addEventListener("click", () => {
    document.getElementById("search-filters__filters-container__ingredients").setAttribute("class", "search-filters__filters-container search-filters__filters-container--hidden");
    document.getElementById("shrink_ingredients_menu").setAttribute("class", "search-filters__search-container__shrink-arrow search-filters__search-container__shrink-arrow--hidden")
    document.getElementById("expand_ingredients_menu").setAttribute("class", "search-filters__search-container__expand-arrow search-filters__search-container__expand-arrow--visible")
});

//Listening to keyDown inputs on the main search field
document.getElementById("main-search__text-input").addEventListener("keyup", () => {

    //retrieving user input
    let searchQuery = document.getElementById("main-search__text-input").value;
    //If the Keyword is at least 3 characters long
    if (searchQuery.length > 2){

        
        //Clearing the content of the recipe grid.
        document.getElementById("recipes-container").innerHTML = "";
        currentIngredientsFilters = [];

        //Checking each recipe in the collection for a match
        globalRecipeCollection.forEach(currentRecipe => {
            currentRecipe.markAsNegativeResult();
            //checking for a match in title
            if (currentRecipe.searchInTitle(searchQuery) == true) {
                //Add the recipe to DOM
                currentRecipe.addToGrid();
                currentRecipe.markAsPositiveResult();
            }
            //checking for a match in ingredients
            else if (currentRecipe.searchInIngredients(searchQuery) == true) {
                //Add the recipe to DOM
                currentRecipe.addToGrid();
                currentRecipe.markAsPositiveResult();
            }
            //checking for a match in description
            else if (currentRecipe.searchInDescription(searchQuery) == true) {
                //Add the recipe to DOM
                currentRecipe.addToGrid();
                currentRecipe.markAsPositiveResult();
            }

        })
        
        //reconstructing the ingredients list for advanced search
        console.log("ingredients actifs");
        globalRecipeCollection.forEach(currentRecipe => {
            if (currentRecipe.positiveSearchResult == true) {
                currentRecipe.ingredients.forEach (element => {
                    currentIngredientsFilters.push(element.ingredient);
                    uniqueIngredientsFilters = [...new Set(currentIngredientsFilters)];
                    currentIngredientsFilters = uniqueIngredientsFilters;
                })
            }
        })

        //Generating advanced ingredients search tags in the dom
        document.getElementById("search-filters__filters-container__ingredients").innerHTML = "";
        currentIngredientsFilters.forEach( filter => {
            newFilter = document.createElement("div");
            newFilter.className = "search-filters__filters-container__filter";
            newFilter.innerHTML = filter;
            document.getElementById("search-filters__filters-container__ingredients").appendChild(newFilter);
            //need to add the generation of the event listener on each filter, which will trigger the advanced search processing

        })
        }  
        else {
            document.getElementById("recipes-container").innerHTML = "";
        }
})

