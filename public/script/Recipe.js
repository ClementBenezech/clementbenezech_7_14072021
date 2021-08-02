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
                
                if (element.ingredient.toLowerCase().includes(whatYoureLookingFor.toLowerCase())) {
                    found = true;
                }
            })
            return found; 
                     
        },
        addToGrid: function () {
            recipeContainer = document.createElement("div");
            recipeContainer.className = "recipes-container__element";

            recipeImage = document.createElement("div");
            recipeImage.className = "recipes-container__element__image";

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
            recipeDescription.innerHTML = this.description;

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

            notFoundRecipeCollection.splice( removeIndex, 1 );

            foundRecipeCollection.push(this);

            

            
        },

        markAsNegativeResult: function () {
            //algo V2
            //Cut From foundCollection, put in notFoundCollection

                let removeIndex = foundRecipeCollection.findIndex( recipe => recipe.id === this.id );
                foundRecipeCollection.splice( removeIndex, 1 );
                notFoundRecipeCollection.push(this);

             
            
            /*console.log("just put "+this.name+" in notFoundRecipeCOllection");
            console.log(notFoundRecipeCollection);

            console.log("just removed "+this.name+" from FoundRecipeCOllection");
            console.log(foundRecipeCollection);*/
        }
    }
}