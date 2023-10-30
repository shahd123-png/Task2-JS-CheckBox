const selectAll = document.getElementById("select-all");
const allCheckboxes = document.querySelectorAll(".all-list input[type='checkbox']");
const parent1 = document.getElementById("parent-1");
const childCheckboxes1 = document.querySelectorAll(".child-checkbox1");
const parent2 = document.getElementById("parent-2");
const childCheckboxes2 = document.querySelectorAll(".child-checkbox2");
const parent3 = document.getElementById("parent-3");
const childCheckboxes3 = document.querySelectorAll(".child-checkbox3");

selectAll.addEventListener("click", function () {
    allCheckboxes.forEach(function (checkbox) {
        checkbox.checked = selectAll.checked;

    });
});

handleParentCheckbox(parent1, childCheckboxes1);
handleParentCheckbox(parent2, childCheckboxes2);
handleParentCheckbox(parent3, childCheckboxes3);

document.addEventListener("DOMContentLoaded", function () {
    setupChildCheckboxes(Array.from(childCheckboxes1), parent1);
    setupChildCheckboxes(Array.from(childCheckboxes2), parent2);
    setupChildCheckboxes(Array.from(childCheckboxes3), parent3);

    for (const checkbox of childCheckboxes1) {
        setupCheckboxListenerForCheckbox(checkbox, parent1);
    };
    for (const checkbox of childCheckboxes2) {
            setupCheckboxListenerForCheckbox(checkbox, parent2);
    };
    for (const checkbox of childCheckboxes3) {
        setupCheckboxListenerForCheckbox(checkbox, parent3);
    };
});

function checkSelectAll() {
    const parent1Checked = parent1.checked;
    const parent2Checked = parent2.checked;
    const parent3Checked = parent3.checked;
    const allParentsChecked = parent1Checked && parent2Checked && parent3Checked;
    if (allParentsChecked) {
        selectAll.checked = true;
        selectAll.indeterminate = false;
    } else if (parent1Checked || parent2Checked || parent3Checked) {
        selectAll.indeterminate = true;
        selectAll.checked = false;
    } else {
        selectAll.indeterminate = false;
        selectAll.checked = false;
    }
}

function handleParentCheckbox(parentCheckbox, childCheckboxes) {
    parentCheckbox.addEventListener("click", function () {
        childCheckboxes.forEach(function (checkbox) {
            checkbox.checked = parentCheckbox.checked;
        });
        checkSelectAll();
    });
}

function setupChildCheckboxes(childCheckboxes, parentCheckbox) {
    for (let i = 0; i < childCheckboxes.length; i++) {
        const checkbox = childCheckboxes[i];
        checkbox.addEventListener("change", function () {
            const allChecked = childCheckboxes.every((childCheckbox) => childCheckbox.checked);
            const someChecked = childCheckboxes.some((childCheckbox) => childCheckbox.checked);

            parentCheckbox.checked = allChecked;
            parentCheckbox.indeterminate = someChecked && !allChecked;

            checkSelectAll();
        });
    };
}



function setupCheckboxListenerForCheckbox(checkbox, parentCheckbox) {
    checkbox.addEventListener("change", function () {
        let allChecked = true;
        let someChecked = false;

        const childCheckboxes = getChildCheckboxes(parentCheckbox);

        childCheckboxes.forEach(function (childCheckbox) {
            if (childCheckbox.checked) {
                someChecked = true;
            } else {
                allChecked = false;
            }
        });

        if (allChecked) {
            parentCheckbox.checked = true;
            parentCheckbox.indeterminate = false;
        } else if (someChecked) {
            parentCheckbox.checked = false;
            parentCheckbox.indeterminate = true;
        } else {
            parentCheckbox.checked = false;
            parentCheckbox.indeterminate = false;
        }
        checkSelectAll();
    });
}

function getChildCheckboxes(parentCheckbox) {
    if (parentCheckbox === parent1) {
        return childCheckboxes1;
    } else if (parentCheckbox === parent2) {
        return childCheckboxes2;
    } else if (parentCheckbox === parent3) {
        return childCheckboxes3;
    }
    return [];
}

/*-----------------------------------submit information--------------------------------------- */
const submitButton = document.querySelector(".button");
const errorBox = document.querySelector(".all-list");

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
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


