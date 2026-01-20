
# 🧾 Step-by-Step Explanation of Expense Tracker Code

---

## 1. Import Data

```js
import theExpenses from "./expense-data.js";
```
- Imports a list of predefined expense objects to work with.

---

## 2. Get Container Element

```js
const expenseContainer = document.getElementById("expense-container");
```
- This is the HTML container where all expense cards will be displayed.

---

## 3. `renderExpenses(expenses)`

```js
function renderExpenses(expenses) {
  const expenseList = document.getElementById("expense-list");
  expenseContainer.innerHTML = "";
```
- Clears the container to prevent duplicate rendering.

```js
  expenses.forEach((expense) => {
    expenseContainer.innerHTML += `
      <div class="card" id="${expense.id}">
        <div class="header">
          <div>
            <div class="title">${expense.title}</div>
            <div class="meta category">${expense.category}</div>
          </div>
          <div class="amount">${expense.amount}</div>
        </div>
        <div class="meta date">${expense.date}</div>
        <div class="actions">
          <button class="edit-btn" id=${expense.id}>Edit</button>
          <button class="delete-btn" id=${expense.id}>Delete</button>
        </div>
      </div>`;
  });
}
```

- Iterates over the list of expenses and appends a card-like UI block for each one.

---

## 4. Initial Render

```js
renderExpenses(theExpenses);
```
- Displays the initial list of expenses on page load.

---

## 5. Handle Form Submit for Add/Edit

```js
document.getElementById("expense-form-add").addEventListener("submit", function (event) {
  event.preventDefault();
```

- Prevents the form from reloading the page.

### Add Expense Mode:

```js
if (document.getElementById("submiter").innerText === "Add Expense") {
  ...
  const newExpense = {
    id: theExpenses.length + 1,
    title, category, date, amount
  };
  theExpenses.push(newExpense);
  renderExpenses(theExpenses);
  this.reset();
}
```

- Creates a new expense and adds it to the list.

### Edit Expense Mode: 
Add this part after handling edit event and putting current version of expense on the form

```js
} else {
  const expenseId = parseInt(document.getElementById("expense-id").value);
  const expenseToEdit = theExpenses.find(expense => expense.id === expenseId);
  ...
  renderExpenses(theExpenses);
}
```

- Finds and updates the selected expense.

---

## 6. Handle Search

```js
document.getElementById("searchbox").addEventListener("input", function (event) {
  const searchTerm = event.target.value.toLowerCase();
  const filteredExpenses = theExpenses.filter(expense =>
    expense.title.toLowerCase().includes(searchTerm)
  );
  renderExpenses(filteredExpenses);
});
```

- Filters the expenses based on the typed search term and updates the UI.

---

## 7. Handle Edit/Delete Button Clicks

```js
expenseContainer.addEventListener("click", function (event) {
  ...
});
```

### Delete Button:

```js
if (event.target.classList.contains("delete-btn")) {
  const expenseId = parseInt(event.target.id);
  theExpenses.splice(expenseIndex, 1);
  renderExpenses(theExpenses);
}
```

- Removes the expense and re-renders the list.

### Edit Button:

```js
else if (event.target.classList.contains("edit-btn")) {
  document.getElementById("title").value = expenseToEdit.title;
  ...
}
```

- Fills the form fields for editing the selected expense and switches to "Save" mode.

---
