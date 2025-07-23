document.addEventListener('DOMContentLoaded', function() {
            const textarea = document.getElementById('textarea-ingredients');
            const recipeTableBody = document.getElementById('recipeTableBody');
            const recipeRows = recipeTableBody.getElementsByTagName('tr');
            const withBtn = document.getElementById('with-btn');
            const withoutBtn = document.getElementById('without-btn');

            function filterRecipes() {
                const inputText = textarea.value.toLowerCase().trim();
                
                const inputIngredients = inputText.split(',').map(item => item.trim()).filter(item => item !== '');
                const filterWith = withBtn.checked; 

                for (let i = 0; i < recipeRows.length; i++) {
                    const row = recipeRows[i];
                    
                    const recipeIngredientsCell = row.cells[1]; 
                    const recipeIngredientsHTML = recipeIngredientsCell.innerHTML.toLowerCase(); 

                    let allIngredientsFound = true; 
                    let anyIngredientFound = false; 

                    if (inputIngredients.length === 0) {
                        
                        row.style.display = '';
                        continue;
                    }

                    for (const inputIngredient of inputIngredients) {

                        if (recipeIngredientsHTML.includes(inputIngredient)) {
                            anyIngredientFound = true; 
                        } else {
                            allIngredientsFound = false; 
                        }
                    }

                    if (filterWith) {
                        
                        if (allIngredientsFound) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    } else {
                        
                        if (!anyIngredientFound) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    }
                }
            }

            textarea.addEventListener('input', filterRecipes);

            withBtn.addEventListener('change', filterRecipes);
            withoutBtn.addEventListener('change', filterRecipes);
        });