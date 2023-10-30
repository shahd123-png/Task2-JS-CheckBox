/*----------------------------------------------------select all------------------------------------------------------- */
const selectAll = document.getElementById("select-all");
const allCheckboxes = document.querySelectorAll(".all-list input[type='checkbox']");
const Parent1 = document.getElementById("parent-1");
const childCheckboxes1 = document.querySelectorAll(".child-checkbox1");
const Parent2 = document.getElementById("parent-2");
const childCheckboxes2 = document.querySelectorAll(".child-checkbox2");
const Parent3 = document.getElementById("parent-3");
const childCheckboxes3 = document.querySelectorAll(".child-checkbox3");


selectAll.addEventListener("click", function () {
    allCheckboxes.forEach(function (checkbox) {
        checkbox.checked = selectAll.checked;
    });
});

function checkSelectAll() {
    if (Parent1.checked && Parent2.checked && Parent3.checked) {
        selectAll.checked = true;
    } else {
        selectAll.checked = false;
    }
}

function updateSelectAll() {
    const allParentsChecked = Parent1.checked && Parent2.checked && Parent3.checked;
    selectAll.checked = allParentsChecked;
    selectAll.indeterminate = !allParentsChecked;
}

/*----------------------------------------------------First Parent (Team Members) select all------------------------------------------------------- */
//const childCheckboxes1 = document.querySelectorAll(".First-div .checkbox-list input[type='checkbox']");

Parent1.addEventListener("click", function () {
    childCheckboxes1.forEach(function (checkbox) {
        checkbox.checked = Parent1.checked;
        
    });
    checkSelectAll();
    updateSelectAll();

});

/*----------------------------------------------------Seconed Parent (What To Order?) select all------------------------------------------------------- */
Parent2.addEventListener("click", function () {
    childCheckboxes2.forEach(function (checkbox) {
        checkbox.checked = Parent2.checked;
    });
    checkSelectAll();
    updateSelectAll();
});

/*----------------------------------------------------Third Parent (What To Drink?) select all------------------------------------------------------- */
Parent3.addEventListener("click", function () {
    childCheckboxes3.forEach(function (checkbox) {
        checkbox.checked = Parent3.checked;
    });
    checkSelectAll();
    updateSelectAll();
});


/*----------------------------------------------------select any of children put indeterminate-------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
    childCheckboxes1.forEach(function (checkbox) {  // set up event listener on each child checkbox لكل واحد منهم 
        checkbox.addEventListener("change", function () {

            let allChecked = true;    // track whether all child checkboxes are checked عشان اغير حاله الاب
            let someChecked = false; //track if at least one child checkbox is checked عشان نحط علامه الماينس

            childCheckboxes1.forEach(function (childCheckbox) { // track state of all child checkboxes and update two variables:
                if (childCheckbox.checked) {
                    someChecked = true;
                } else {
                    allChecked = false;
                }
            });

            if (allChecked) { // if all children checked
                Parent1.checked = true;
                Parent1.indeterminate = false;
                updateSelectAll();
            }

            else if (someChecked) { //at least one حط الماينس
                Parent1.checked = false;
                Parent1.indeterminate = true;
                updateSelectAll();
            }

            else {
                Parent1.checked = false;
                Parent1.indeterminate = false;
                updateSelectAll();
            }
        });
    });

    childCheckboxes2.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {

            let allChecked = true;
            let someChecked = false;

            childCheckboxes2.forEach(function (childCheckbox) {
                if (childCheckbox.checked) {
                    someChecked = true;
                } else {
                    allChecked = false;
                }
            });

            if (allChecked) {
                Parent2.checked = true;
                Parent2.indeterminate = false;
                updateSelectAll();

            }

            else if (someChecked) {
                Parent2.checked = false;
                Parent2.indeterminate = true;
                updateSelectAll();

            }

            else {
                Parent2.checked = false;
                Parent2.indeterminate = false;
                updateSelectAll();

            }
        });
    });



    childCheckboxes3.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {

            let allChecked = true;
            let someChecked = false;

            childCheckboxes3.forEach(function (childCheckbox) {
                if (childCheckbox.checked) {
                    someChecked = true;
                } else {
                    allChecked = false;
                }
            });

            if (allChecked) {
                Parent3.checked = true;
                Parent3.indeterminate = false;
                updateSelectAll();

            }

            else if (someChecked) {
                Parent3.checked = false;
                Parent3.indeterminate = true;
                updateSelectAll();

            }

            else {
                Parent3.checked = false;
                Parent3.indeterminate = false;
                updateSelectAll();

            }
            someChecked =false;
        });
    });
});


/*-----------------------------------submit information--------------------------------------- */
const submitButton = document.querySelector(".button");
const errorBox = document.querySelector(".all-list");

submitButton.addEventListener("click", function (event) {
    //event.preventDefault();

    const selectedValues = [];
    let atLeastOneChecked1 = false;
    let atLeastOneChecked2 = false;
    let atLeastOneChecked3 = false;

    childCheckboxes1.forEach(function (checkbox) {
        if (checkbox.checked) {
            atLeastOneChecked1 = true;
            selectedValues.push(checkbox.nextElementSibling.textContent);
        }
    });

    childCheckboxes2.forEach(function (checkbox) {
        if (checkbox.checked) {
            atLeastOneChecked2 = true;
            
            selectedValues.push(checkbox.nextElementSibling.textContent);
        }
    });

    childCheckboxes3.forEach(function (checkbox) {
        if (checkbox.checked) {
            atLeastOneChecked3 = true;
            selectedValues.push(checkbox.nextElementSibling.textContent);
        }
    });

    if (atLeastOneChecked1 && atLeastOneChecked2 && atLeastOneChecked3) 
    {
        console.log("Your choices are: " + selectedValues.join(", "));
        errorBox.style.border = "none"; 
    }
    
    else {
        console.log("Error: Please select at least one choice from each list.");
        errorBox.style.border = "1px solid red"; 

    }
});
