//Instruction On expense-tracker-code-explained.md
// 1 import our data from file ( in lieu of e.g. database)
import theExpenses from "./expense-data.js";

// 2. select the container element that our cards will be nested
let expenseContainer = document.getElementById("expense-container")

// 3. render out the data as a grid of cards!
function renderExpenses(expenses) {
    const expenseList = document.getElementById("expense-list")
    expenseContainer.innerHTML = ""; // clear the container

    expenses.forEach(
        (expense) => {
            expenseContainer.innerHTML += `
             <div class="card" id="${expense.id}">
              <div class="header">
                <div>
                  <div class="title">${expense.title}</div>
                  <div class="meta category">${expense.category}</div>
                </div>
                <div class="amount">$${expense.amount}</div>
              </div>
              <div class="meta date">${expense.date}</div>
              <div class="actions">
                <button class="edit-btn" id=${expense.id}>Edit</button>
                <button class="delete-btn" id=${expense.id}>Delete</button>
              </div>
            </div>
            `
        }
    );
}

// 4. render the results! we can call this function later to re-render changes on the page as well
renderExpenses(theExpenses);

// 5. implement add/edit behaviour
document
    .getElementById("expense-form-add")
    .addEventListener(
        "submit", // the form event I'm looking for
        function (event) {
            event.preventDefault(); // prevent default HTML form submission
            const title = document.getElementById("title").value;
            const category = document.getElementById("category").value;
            const amount = document.getElementById("amount").value;
            const date = document.getElementById("date").value;
            // we're going to write this behaviour to be reusable between
            //
            if (document.getElementById("submiter").innerText === "Add Expense")
                // ideally, a bit of quick input validation
                if(title && category && date && !isNaN(amount)) {
                    // ccreate a new expense object we'll be adding to the grid of cards!
                    const newExpense = {
                        id: theExpenses.length + 1, // jury-rigged auto-incrementing
                        title,
                        category,
                        date,
                        amount,
                    };
                    // to get this to show up, push it to the array of data & then re-render
                    theExpenses.push(newExpense);
                    renderExpenses(theExpenses);
                    this.reset();  // reset the from to clear inputs after submitting
                } else {
                    alert("Please fill in all fields correctly."); // placeholder 
                } else {
                    console.log("entered edit logic branch")
                    // non-obvious: if the text isn't "Add Expense" (because I'll change)
                    const expenseId = parseInt(document.getElementById("expense-id")); // reading from 
                    const expenseToEdit = theExpenses.find (
                        (expense) => expense.id === expenseId
                    );
                    console.log(expenseId);
                    console.log(expenseToEdit);
                    if (expenseToEdit) {// simple null check - did I actually get something
                        expenseToEdit.title = title;
                        expenseToEdit.category = category;
                        expenseToEdit.date = date;
                        expenseToEdit.amount = amount;
                        this.reset(); // after submitting, reset input fields
                        renderExpenses(theExpenses); // re-render data into 
                    }
                }
                
        }
    );

    // 6. implement live search filtration (as-you-type)
    document
        .getElementById("searchbox")
        .addEventListener(
            "input",
            function (event) {
                const searchTerm = event.target.value.toLowerCase(); // capture the value
                const filteredExpenses = theExpenses.filter (
                    //filter: apply a conditional expression to every element & return the ones that evaluate true
                    (expense) => expense.title.toLowerCase().includes(searchTerm)
                );
                renderExpenses(filteredExpenses);
            }
        );

        // 7. add an event listener to the entiere container of items,
        // and then differentiate between click events to fire specific logic
        // --> the alternative would be attaching a listener to every single card,
        // which becomes unfeasable when you have a TON of items
        expenseContainer.addEventListener(
            "click",
            function (event) {
                // a) look for the delete button click, or
                if(event.target.classList.contains("delete-btn")) {
                    const expenseId = parseInt(event.target.id)
                    const expenseIndex = theExpenses.findIndex(
                        // notice hwo I'm getting the "position" of the desired element in the array,
                        // "not" the element/object itself
                        (expense) => expense.id === expenseId
                    );
                    if (expenseIndex != -1) {
                        theExpenses.splice(expenseIndex, 1);
                        // pay attention to the parameters here (e.g mouseover split)
                        // param1 - the index to begin deleting "at" *required*)
                        // param2 - how many elements to remove (including starting elements)
                        //          is optional = if not provided, removes everything at once.
                        renderExpenses(theExpenses);
                    }
                        // b) look for the edit button click
                    } else if (event.target.classList.contains("edit-btn")) {
                        const expenseId = parseInt(event.target.id);
                        const expenseToEdit = theExpenses.find(
                            (expense) => expense.id === expenseId
                        );
                        // assign the existing values of the data object
                        if (expenseToEdit)
                        {
                            document.getElementById("title").value = expenseToEdit.title
                            document.getElementById("category").value = expenseToEdit.category
                            document.getElementById("date").value = expenseToEdit.date
                            document.getElementById("amount").value = expenseToEdit.amount
                            document.getElementById("expense-id").value = expenseToEdit.id
                            // and for my last trick, toggling the text of the button to toggle creating vs,
                            document.getElementById("submiter").innerText = "Save Changes"
                        }
                    }
                }
                
            
        )



