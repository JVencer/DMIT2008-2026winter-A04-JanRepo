// 1. import our data from file (in lieu of e.g. a database / a REST API)
import theExpenses from "./expense-data.js";

// 2. select the container element that our cards will be nested in
const expenseContainer = document.getElementById("expense-container")

// 3. render out the data as a grid of cards!
function renderExpenses(expenses) {
    expenseContainer.innerHTML = "";  // clear the container in preparation for rendering data
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
        "submit",  // the form event I'm looking for
        function (event) {
            event.preventDefault();  // prevent default HTML form submission behaviour
            const title = document.getElementById("title").value;
            const category = document.getElementById("category").value;
            const date = document.getElementById("date").value;
            const amount = parseFloat(document.getElementById("amount").value);
            // we're going to write this behaviour to be reusable between adding new & editing existing cards
            // Because I Can, I'll use the inline text on the button to determine whether we're adding or editing
            if (document.getElementById("submiter").innerText === "Add Expense") {
                // ideally, a bit of quick input validation
                if (title && category && date && !isNaN(amount)) {
                    // create a new expense object we'll be adding to the grid of cards!
                    const newExpense = {
                        id: theExpenses.length +1,  // jury-rigged auto-incrementing ID
                        title,
                        category,
                        date,
                        amount,
                    };
                    // to get this to show up, push it to the array of data & then re-render the page
                    theExpenses.push(newExpense);
                    renderExpenses(theExpenses);
                    this.reset();  // reset the form to clear inputs after submission
                } else {
                    alert("Please fill in all fields correctly.");  // placeholder feedback (<-- being non-specific is bad)
                }
            } else {
                // non-obvious: if the text isn't "Add Expense" (beacuse I'll change it when editing), do this other behaviour (for editing)
                const expenseId = parseInt(document.getElementById("expense-id").value);  // reading from hidden input
                const expenseToEdit = theExpenses.find(
                    (expense) => expense.id === expenseId
                );
                if (expenseToEdit) {  // simple null check - did I actually find a matching instance?
                    expenseToEdit.title = title;
                    expenseToEdit.category = category;
                    expenseToEdit.date = date;
                    expenseToEdit.amount = amount;
                    this.reset();  // after submitting, reset input fields
                    renderExpenses(theExpenses);  // re-render data into cards to reflect changes
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
            const searchTerm = event.target.value.toLowerCase();  // capture the value
            const filteredExpenses = theExpenses.filter(
                // filter: apply a conditional expression to every element & return the ones that evaluate true
                (expense) => expense.title.toLowerCase().includes(searchTerm)
            );
            renderExpenses(filteredExpenses);
        }
    );

// 7. add an event listener to the entire container of items,
//    *and then* differentiate between click events to fire specific logic
//    -> the alternative would be attaching a listener to every single card,
//       which becomes unfeasible when you have a TON of items
expenseContainer.addEventListener(
    "click",
    function (event) {
        // a) look for the delete button click, or
        if (event.target.classList.contains("delete-btn")) {
            const expenseId = parseInt(event.target.id)
            const expenseIndex = theExpenses.findIndex(
                // notice how I'm getting the *position* of the desired element in the array,
                // *not* the element/object itself
                (expense) => expense.id === expenseId
            );
            if (expenseIndex != -1) {
                theExpenses.splice(expenseIndex, 1);
                // ^ pay attention to the parameters here (e.g. mouseover splice in vscode):
                //    param1 - the index to begin deleting at (required)
                //    param2 - how many elements to remove (including starting element).
                //              is optional - if not provided, removes everything at or after the param1 index
                renderExpenses(theExpenses);
            }
        // b) look for the edit button click
        } else if (event.target.classList.contains("edit-btn")) {
            const expenseId = parseInt(event.target.id);
            const expenseToEdit = theExpenses.find(
                (expense) => expense.id === expenseId
            );
            // assign the existing values of the data object to the input field values
            if (expenseToEdit) {
                document.getElementById("title").value = expenseToEdit.title
                document.getElementById("category").value = expenseToEdit.category
                document.getElementById("date").value = expenseToEdit.date
                document.getElementById("amount").value = expenseToEdit.amount
                document.getElementById("expense-id").value = expenseToEdit.id
                // and for my last trick, toggling the text of the button to toggle creating vs. editing in step5
                document.getElementById("submiter").innerText = "Save Changes"
            }
        }
        
    }
);