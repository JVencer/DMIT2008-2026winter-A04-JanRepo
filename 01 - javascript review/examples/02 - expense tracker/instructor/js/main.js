// 1. import our data from file (in lieu of e.g. a database / a REST API)
import theExpenses from "./expense-data.js";

// 2. select the container element that our cards will be nested in
const expenseContainer = document.getElementById("expense-container")

// 3. render out the data as a grid of cards!
function renderExpenses(expenses) {
    const expenseList = document.getElementById("expense-list")
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

