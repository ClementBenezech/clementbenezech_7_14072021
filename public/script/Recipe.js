function createRecipe (recipeData) {
    return {
        //RecipeProperties
        id: recipeData.id,
        name: recipeData.name,
        description: recipeData.description,
        servings: recipeData.servings,
        time: recipeData.time,
        ingredients: recipeData.ingredients,
        appliance: recipeData.appliance,
        utensils: recipeData.ustensils,
        positiveSearchResult: true,
        searchInTitle: function (whatYoureLookingFor) {
            //Looking for main search input in the title
            
            if (replaceDiacritics(this.name.toLowerCase()).includes(replaceDiacritics(whatYoureLookingFor.toLowerCase()))) {
                return true;
            }
            return false;
        },

        searchInDescription: function (whatYoureLookingFor) {
            //Looking for main search input in the description
            if (replaceDiacritics(this.description.toLowerCase()).includes(replaceDiacritics(whatYoureLookingFor.toLowerCase()))) {
                return true;
            }
            return false;
        },

        searchInIngredients: function (whatYoureLookingFor) {
            //Looking for main search input in the ingredients
            let found = false
            this.ingredients.forEach(element => {

                if (replaceDiacritics(element.ingredient.toLowerCase()).includes(replaceDiacritics(whatYoureLookingFor.toLowerCase()))) {

                    found = true;
                    
                }
            })
            return found;

                     
        },
        addToGrid: function () {
            recipeContainer = document.createElement("div");
            recipeContainer.className = "recipes-container__element";

            recipeImage = document.createElement("img");
            recipeImage.className = "recipes-container__element__image";
            recipeImage.src = "public/images/"+this.id+".jpg";
            recipeImage.alt = "Photo d'une recette de "+this.name;

            recipeLabelsContainer = document.createElement("div");
            recipeLabelsContainer.className = "recipes-container__element__labels-container";

            recipeTitle = document.createElement("div");
            recipeTitle.className = "recipes-container__element__labels-container__title";
            recipeTitle.innerHTML = this.name;

            recipeCookingTime = document.createElement("div");
            recipeCookingTime.innerHTML = this.time;
            recipeCookingTime.className = "recipes-container__element__labels-container__cooking-time";

            recipeIngredientsContainer = document.createElement("div");
            recipeIngredientsContainer.className = "recipes-container__element__labels-container__ingredients-container";
            
            recipeDescription = document.createElement("div");
            recipeDescription.className = "recipes-container__element__labels-container__description";
            recipeDescription.innerHTML = this.description.substring(0, 200)+"...";

            document.getElementById("recipes-container").appendChild(recipeContainer);
            recipeContainer.appendChild(recipeImage);
            recipeContainer.appendChild(recipeLabelsContainer);
            
            recipeLabelsContainer.appendChild(recipeTitle);
            recipeLabelsContainer.appendChild(recipeCookingTime);

            recipeContainer.appendChild(recipeIngredientsContainer);
            
            this.ingredients.forEach(element => {

                //Creating the Container div for ingredient
                ingredientContainer = document.createElement("div");
                ingredientContainer.className = "recipes-container__element__labels-container__ingredients-container__ingredient-container";
                recipeIngredientsContainer.appendChild(ingredientContainer);

                //Creating the ingredient name label
                ingredientName = document.createElement("div");
                ingredientName.innerHTML = element.ingredient;
                ingredientName.className = "recipes-container__element__labels-container__ingredients-container__ingredient-name";
                ingredientContainer.appendChild(ingredientName)

                //Creating the ingredient quantity label
                ingredientQuantity = document.createElement("div");
                if (element.unit != undefined) {
                    if (element.quantity != undefined) {
                        ingredientQuantity.innerHTML = element.quantity+" "+element.unit;
                    }
                    else {
                        ingredientQuantity.innerHTML = element.unit
                    }       
                }
                
                ingredientQuantity.className = "recipes-container__element__labels-container__ingredients-container__ingredient-quantity";
                ingredientContainer.appendChild(ingredientQuantity)
            })

            recipeContainer.appendChild(recipeDescription);
            
        },
        markAsPositiveResult: function () {
            //algo V2
            //Cut From notFound, put in found
                let removeIndex = notFoundRecipeCollection.findIndex( recipe => recipe.id === this.id );
                if (removeIndex >= 0) {
                console.log("Removing recipe with index "+removeIndex+" From not found recipes");
                notFoundRecipeCollection.splice(removeIndex , 1 );
                }

                foundRecipeCollection.push(this);

        },

        markAsNegativeResult: function () {
            //algo V2
            //Cut From foundCollection, put in notFoundCollection

            if (this.id != undefined) {
                result = notFoundRecipeCollection.push(this);
            }
  
            if (foundRecipeCollection.find( recipe => recipe.id == this.id ) != undefined) {
                    foundRecipeCollection.splice(foundRecipeCollection.findIndex( recipe => recipe.id == this.id ), 1 );
            }
            

        },
    }
}