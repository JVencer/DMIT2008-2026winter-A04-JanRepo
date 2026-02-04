// pre-existing: generic pub/sub handler object
const PubSub = {
  _subscribers: {},

  subscribe(event, callback) {
    if (!this._subscribers[event]) {
      this._subscribers[event] = [];
    }
    this._subscribers[event].push(callback);
  },

  publish(event, ...data) {
    if (this._subscribers[event]) {
      this._subscribers[event].forEach(callback => callback(...data));
    }
  }
};


// pre-existing: specific handler for expenses; uses Object.assign() to borrow 
//               functionality from generic pub/sub handler above 
const expenses = {
  list: [],

  addExpense(...exp) {
    this.list.push(...exp);
    this.publish("update", this.list);
  },

  filterExpense(input) {
    const result = this.list.filter(exp => {
        if(exp.title.toLowerCase().includes(input.toLowerCase()) ||
           exp.category.toLowerCase().includes(input.toLowerCase()) ||
           exp.date.toLowerCase().includes(input.toLowerCase()) ||
           exp.amount.toString().toLowerCase().includes(input.toLowerCase())) {
            return true;
        }
    });
    this.publish("update", result);
  },

  // When working with logic in multiple places, you can just make a skeleton first
  // and implement details later!
  removeExpense(id) {
    // One option for removing a specific item is getting its index and splicing the array.
    // But if I'm rebuilding the array anyway, I may as well just use array.filter() :
    this.list = this.list.filter(expense => expense.id !== id)  // rebuild the array, excluding the matching expense
    this.publish("update", this.list); // I changed the data, so fire the update event to subscribers, with the new list.
    // ^ the expenses container is subscribed to all update events (see: main.js), so it receives the new data (and is written to re-render).
  },

  editExpense(id, updatedExpense) {
    const index = this.list.findIndex(expense => expense.id === id); // find the element we want to edit in the expense list
    if (index !== -1 ) { // someArray.findIndex returns -1 if no matching element
      this.list[index] = {id, ...updatedExpense};
      // ^ expands out into: {id, title, amount, date, category}
      // I've modified my data, so trigger an update/re-render:
      this.publish("update", this.list);
    } else {
      console.error(`No expense with ID ${id} found`);
    }
  },

  clear() {
    this.list = [];
    this.publish("update", this.list);
  }
};

Object.assign(expenses, PubSub);

export default expenses;