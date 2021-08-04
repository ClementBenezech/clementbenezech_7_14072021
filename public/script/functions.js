/*Algo V2 things to do

initialize notfoundRecipeCollection with globalRecipeCollection.

replace all display globalRecipeCollection references by:
    foundRecipeCollection for display.
    notfoundRecipeCollection for search

Modify markAsNegativeResult() and markAsPositiveResult() so it cuts a recipe from one of the collections, and insert into another.

*/

//Upadate the list of ingredient filters matching current result set
function generateUniqueIngredientsFilters() {
        //Clearing the content of the recipe grid.
        currentIngredientsFilters = [];
        foundRecipeCollection.forEach(currentRecipe => {
            if (currentRecipe.positiveSearchResult == true) {        
                    currentRecipe.ingredients.forEach (element => {
                        normalizedSearchQuery = replaceDiacritics(document.getElementById("main-search-filter_ingredients").value).toLowerCase();
                        if ((normalizedSearchQuery != undefined) && (replaceDiacritics(element.ingredient.toLowerCase()).includes(normalizedSearchQuery))) {
                        currentIngredientsFilters.push(element.ingredient.toLowerCase());
                        uniqueIngredientsFilters = [...new Set(currentIngredientsFilters)];
                        currentIngredientsFilters = uniqueIngredientsFilters;
                        }
                })
            }
        })
}

//Update the list of Devices filters matching current result set
function generateUniqueDeviceFilters() {
    currentDeviceFilters = [];
        foundRecipeCollection.forEach(currentRecipe => {
            if (currentRecipe.positiveSearchResult == true) {
                normalizedSearchQuery = replaceDiacritics(document.getElementById("main-search-filter_device").value).toLowerCase();
                if ((normalizedSearchQuery != undefined) && (replaceDiacritics(currentRecipe.appliance.toLowerCase()).includes(normalizedSearchQuery))) {
                    currentDeviceFilters.push(currentRecipe.appliance.toLowerCase());
                    uniqueDeviceFilters = [...new Set(currentDeviceFilters)];
                    currentDeviceFilters = uniqueDeviceFilters;
                }
            }
        })
}

//Upadate the list of utensils filters matching current result set
function generateUniqueUtensilsFilters() {
    currentUtensilsFilters = [];
        foundRecipeCollection.forEach(currentRecipe => {
            if (currentRecipe.positiveSearchResult == true) {
                if (currentRecipe.utensils != undefined && currentRecipe.utensils != false ) {
                    currentRecipe.utensils.forEach(element => {
                        normalizedSearchQuery = replaceDiacritics(document.getElementById("main-search-filter_utensils").value).toLowerCase();
                        if ((normalizedSearchQuery != undefined) && (replaceDiacritics(element.toLowerCase()).includes(normalizedSearchQuery))) {
                            currentUtensilsFilters.push(element.toLowerCase());
                            uniqueUtensilsFilters = [...new Set(currentUtensilsFilters)];
                            currentUtensilsFilters = uniqueUtensilsFilters;
                        }
                    })
                }
            }
        })
}



//Creating an active advanced search filter label in the DOM, and its related event listener
function createActiveFilterInDOM(filter, filterType) {
    newActiveFilter = document.createElement("div");
    newActiveFilter.className = "search-tag-bar__tag search-tag-bar__tag--"+filterType;
    newActiveFilter.innerHTML = filter;
    newActiveFilter.id = filter;
    newActiveFilter.addEventListener( "click", () => {
        deleteActiveFilter(filter);
        executeMainSearch();
        applyAllAdvancedSearchFilters();
        recalculateAdvancedSearchTags();
        renderRecipeGrid();

    })
    document.getElementById("search_tag_bar").appendChild(newActiveFilter);
    return newActiveFilter;
}

        
//Generating advanced ingredients search tags in the dom
function generateIngredientsFiltersInDOM() {
        document.getElementById("search-filters__filters-container__ingredients").innerHTML = "";
        currentIngredientsFilters.forEach( filter => {
            newFilter = document.createElement("div");
            newFilter.className = "search-filters__filters-container__filter";
            newFilter.innerHTML = filter;
            document.getElementById("search-filters__filters-container__ingredients").appendChild(newFilter);
            newFilter.addEventListener("click", () => {
                if (activeIngredientsFilters.find(element => element == filter) == undefined) {
                    activeIngredientsFilters.push(filter);
                    newActiveFilter = createActiveFilterInDOM(filter, "ingredients");
                };
                document.getElementById("main-search-filter_ingredients").value = "";

                updateDisplayedRecipesByIngredients(filter);
                recalculateAdvancedSearchTags();
                renderRecipeGrid();
            })
        })
}
        

//Generating advanced devices search tags in the dom
function generateDeviceFiltersInDOM() {
        document.getElementById("search-filters__filters-container__device").innerHTML = "";
        currentDeviceFilters.forEach( filter => {
            newFilter = document.createElement("div");
            newFilter.className = "search-filters__filters-container__filter";
            newFilter.innerHTML = filter;
            document.getElementById("search-filters__filters-container__device").appendChild(newFilter);
            newFilter.addEventListener("click", () => {
                if (activeDeviceFilters.find(element => element == filter) == undefined) {
                activeDeviceFilters.push(filter);

                newActiveFilter = createActiveFilterInDOM(filter, "device");


                }
                document.getElementById("main-search-filter_device").value = "";

                updateDisplayedRecipesByDevice(filter);
                recalculateAdvancedSearchTags();
                renderRecipeGrid();
            })
            

        })
}      

//Generating advanced utensils search tags in the dom
function generateUtensilsFiltersInDOM() {
        document.getElementById("search-filters__filters-container__utensils").innerHTML = "";
        currentUtensilsFilters.forEach( filter => {
            newFilter = document.createElement("div");
            newFilter.className = "search-filters__filters-container__filter";
            newFilter.innerHTML = filter;
            document.getElementById("search-filters__filters-container__utensils").appendChild(newFilter);
            newFilter.addEventListener("click", () => {
                if (activeUtensilsFilters.find(element => element == filter) == undefined) {
                activeUtensilsFilters.push(filter);

                newActiveFilter = createActiveFilterInDOM(filter, "utensils");

                }
                document.getElementById("main-search-filter_utensils").value = "";

                updateDisplayedRecipesByUtensils(filter);
                recalculateAdvancedSearchTags();
                renderRecipeGrid();
            })

        })
}



//This Function will add an event listener on the "chevron" buttons allowing to expand the advanced search menus.
//It will also ensure expanding one menu will automatically shrink the other two.
function addMenuEventListener (filterValue,shrinkOrExpand) {

    let id = shrinkOrExpand+"_"+filterValue+"_menu";

    if (shrinkOrExpand == "expand") {

        document.getElementById(id).addEventListener("click", () => {    
            document.getElementById("search-filters__filters-container__"+filterValue).setAttribute("class", "search-filters__filters-container search-filters__filters-container--visible");
            document.getElementById("shrink_"+filterValue+"_menu").setAttribute("class", "search-filters__search-container__shrink-arrow search-filters__search-container__shrink-arrow--visible");
            document.getElementById("expand_"+filterValue+"_menu").setAttribute("class", "search-filters__search-container__expand-arrow search-filters__search-container__expand-arrow--hidden");

            filterTypes.forEach(filter => {
            
                if (filter != filterValue) {
                    document.getElementById("search-filters__filters-container__"+filter).setAttribute("class", "search-filters__filters-container search-filters__filters-container--hidden");
                    document.getElementById("shrink_"+filter+"_menu").setAttribute("class", "search-filters__search-container__shrink-arrow search-filters__search-container__shrink-arrow--hidden");
                    document.getElementById("expand_"+filter+"_menu").setAttribute("class", "search-filters__search-container__expand-arrow search-filters__search-container__expand-arrow--visible");
                }
            })
        })
    }  
    else if (shrinkOrExpand == "shrink") {

            document.getElementById(id).addEventListener("click", () => {    
                document.getElementById("search-filters__filters-container__"+filterValue).setAttribute("class", "search-filters__filters-container search-filters__filters-container--hidden");
                document.getElementById("shrink_"+filterValue+"_menu").setAttribute("class", "search-filters__search-container__shrink-arrow search-filters__search-container__shrink-arrow--hidden");
                document.getElementById("expand_"+filterValue+"_menu").setAttribute("class", "search-filters__search-container__expand-arrow search-filters__search-container__expand-arrow--visible");
            })
    }
}

function addAdvancedSearchEventListener(filterType) {
    document.getElementById("main-search-filter_"+filterType).addEventListener("keyup", () => {
        if (filterType == "ingredients") {
            generateUniqueIngredientsFilters();
            generateIngredientsFiltersInDOM();
        }
        else if (filterType == "device") {
            generateUniqueDeviceFilters();
            generateDeviceFiltersInDOM();
        }
        else if ((filterType == "utensils")) {
            generateUniqueUtensilsFilters();
            generateUtensilsFiltersInDOM();
        }
    }) 

        document.getElementById("main-search-filter_"+filterType).addEventListener("focus", () => {  
            document.getElementById("search-filters__filters-container__"+filterType).setAttribute("class", "search-filters__filters-container search-filters__filters-container--visible");
            document.getElementById("shrink_"+filterType+"_menu").setAttribute("class", "search-filters__search-container__shrink-arrow search-filters__search-container__shrink-arrow--visible");
            document.getElementById("expand_"+filterType+"_menu").setAttribute("class", "search-filters__search-container__expand-arrow search-filters__search-container__expand-arrow--hidden");

            filterTypes.forEach(filter => {
            
                if (filter != filterType) {
                    document.getElementById("search-filters__filters-container__"+filter).setAttribute("class", "search-filters__filters-container search-filters__filters-container--hidden");
                    document.getElementById("shrink_"+filter+"_menu").setAttribute("class", "search-filters__search-container__shrink-arrow search-filters__search-container__shrink-arrow--hidden");
                    document.getElementById("expand_"+filter+"_menu").setAttribute("class", "search-filters__search-container__expand-arrow search-filters__search-container__expand-arrow--visible");
                }

        })
    }) 
}


function updateDisplayedRecipesByUtensils(filter) {

    currentRecipeCollection = foundRecipeCollection.slice();

    currentRecipeCollection.forEach( recipe => {
        let found = false;
        //try to find the required filter in recipe properties
            recipe.utensils.forEach( utensil => {
                if (utensil.toLowerCase() == filter) {
                    //If filter is found in recipe, set a flag to true
                    found = true;
                }
            })    

        //If found flag is true
        if (found == false) {
            //mark recipe as 'not displayed'
            recipe.markAsNegativeResult();

        }
    })
}

function updateDisplayedRecipesByIngredients(filter) {
    
    currentRecipeCollection = foundRecipeCollection.slice();

    currentRecipeCollection.forEach( recipe => {
        let found = false;
            //If recipe is displayed, try to find the required filter in its properties
            recipe.ingredients.forEach( ingredient => {
                if (ingredient.ingredient.toLowerCase() == filter) {
                    //If filter is found in recipe, set a flag to true
                    found = true;
                }
            })    
        //If found flag is false
        if (found == false) {
            //mark recipe as 'not displayed'
                recipe.markAsNegativeResult();

        }
        else {


        }
    })
}

function updateDisplayedRecipesByDevice(filter) {

    currentRecipeCollection = foundRecipeCollection.slice();

    currentRecipeCollection.forEach( recipe => {
        let found = false;
            //If recipe is displayed, try to find the required filter in its properties
            if (recipe.appliance.toLowerCase() == filter) {

                    //If filter is found in recipe, set a flag to true
                    found = true;
            }
        //If found flag is true
        if (found == false) {
            //mark recipe as 'not displayed'
            recipe.markAsNegativeResult();
            
        }
    })
}

//Will remove an active search filter from the list of active filters, and also remove it from the DOM.
function deleteActiveFilter(filter) {

    activeIngredientsFilters = activeIngredientsFilters.filter(item => item !== filter);
    activeDeviceFilters = activeDeviceFilters.filter(item => item !== filter);
    activeUtensilsFilters = activeUtensilsFilters.filter(item => item !== filter);

    document.getElementById(filter).remove();

}

//Will run main search algorithm
function executeMainSearch () {

     //retrieving user input
     let searchQuery = document.getElementById("main-search__text-input").value;
     //If the Keyword is at least 3 characters long
     if (searchQuery.length > 2){      

        //emptying the grid.
        document.getElementById("recipes-container").innerHTML = "";
  
        notFoundRecipeCollection = [];
        foundRecipeCollection = [];
  
        checkInTitles(searchQuery);
        checkInIngredients(searchQuery);
        checkInDescriptions(searchQuery);        
     }
     else {
         foundRecipeCollection = globalRecipeCollection.slice();
     }


        

}

//Will restrict the search results dataset to recipes matching the advanced search filters
function applyAllAdvancedSearchFilters () {
    
    activeIngredientsFilters.forEach( filter => {
        updateDisplayedRecipesByIngredients(filter);
    })

    activeDeviceFilters.forEach( filter => {
        updateDisplayedRecipesByDevice(filter);
    })

    activeUtensilsFilters.forEach( filter => {
        updateDisplayedRecipesByUtensils(filter);
    })


}

function displayNoPositiveMatchMessage() {
    noMatchMessageContainer = document.createElement("div");
    noMatchMessageContainer.className = "no-match-found__container";
    noMatchMessageContainer.innerHTML = "<i class='far fa-sad-tear no-match-found__icon'></i><div class='no-match-found__message'>Désolé, nous n'avons pas trouvé de résultat correspondant à votre recherche</div>"
    document.getElementById("recipes-container").appendChild(noMatchMessageContainer);
};

//"META" function that will re-generate all advanced filters labels according to current search, and update the DOM.
function recalculateAdvancedSearchTags() {

    generateUniqueIngredientsFilters();
    generateUniqueDeviceFilters();
    generateUniqueUtensilsFilters();

    generateIngredientsFiltersInDOM();
    generateDeviceFiltersInDOM();
    generateUtensilsFiltersInDOM();
}


//Will render the results matching search / advanced search in the result grid. 
function renderRecipeGrid(){

    //emptying the grid.
    document.getElementById("recipes-container").innerHTML = "";
    let matchingResults = false;
    foundRecipeCollection.forEach(recipe => {
        if (recipe.positiveSearchResult == true) {
        recipe.addToGrid();
        matchingResults = true;
        }
    })
    if (matchingResults == false) {
        displayNoPositiveMatchMessage();
    }
}


//From Stackoverflow.
function replaceDiacritics(str){

    var diacritics = [
      {char: 'A', base: /[\300-\306]/g},
      {char: 'a', base: /[\340-\346]/g},
      {char: 'E', base: /[\310-\313]/g},
      {char: 'e', base: /[\350-\353]/g},
      {char: 'I', base: /[\314-\317]/g},
      {char: 'i', base: /[\354-\357]/g},
      {char: 'O', base: /[\322-\330]/g},
      {char: 'o', base: /[\362-\370]/g},
      {char: 'U', base: /[\331-\334]/g},
      {char: 'u', base: /[\371-\374]/g},
      {char: 'N', base: /[\321]/g},
      {char: 'n', base: /[\361]/g},
      {char: 'C', base: /[\307]/g},
      {char: 'c', base: /[\347]/g}
    ]
  
    diacritics.forEach(function(letter){
      str = str.replace(letter.base, letter.char);
    });
  
    return str;
  };

function checkInTitles (searchQuery) {

    globalRecipeCollection.forEach(currentRecipe => {
        //checking for a match in title
        console.log("searchInTitle returns "+currentRecipe.searchInTitle(searchQuery)+" for "+searchQuery+" in "+currentRecipe.name);
        if (currentRecipe.searchInTitle(searchQuery) === true) {
            currentRecipe.markAsPositiveResult();
        }
        if (currentRecipe.searchInTitle(searchQuery) == false) {
            
            currentRecipe.markAsNegativeResult();
        }
        console.log(foundRecipeCollection);
      })

}

function checkInIngredients (searchQuery) {
    notFoundRecipeCollection.forEach(currentRecipe => {
        //checking for a match in ingredients
        if (currentRecipe.searchInIngredients(searchQuery) == true) {
            currentRecipe.markAsPositiveResult();
        }
        })


}

function checkInDescriptions (searchQuery) {
    notFoundRecipeCollection.forEach(currentRecipe => {
        //checking for a match in description
        if (currentRecipe.searchInDescription(searchQuery) == true) {
            currentRecipe.markAsPositiveResult();
        } 
      })

}

        