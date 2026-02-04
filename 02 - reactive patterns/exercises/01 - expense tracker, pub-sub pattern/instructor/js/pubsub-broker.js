// A very simple pub-sub messaging broker.
// We separate out the pub-sub system as its own logic layer in this file.

// Note how we don't need to hardcode for specific event types!
// We can just store keys for an event name, and its subscribers in an array.

// Step 1: a simple pub-sub broker
const PubSub = {
  _subscribers: {},  // store who is subscribed, and to what event, e.g. :
  // {
  //    "gets-hungry": [mouthCallback, brainCallback]  // presumably, a Stomach would be the emitter/publisher
  // }

  subscribe(event, callback) {
    // register a subscriber to a given event.
    if (!this._subscribers[event]) {
      this._subscribers[event] = [];
    }
    this._subscribers[event].push(callback);
  },

  publish(event, ...data) {
    // broadcast the event & provided payload data to the event's subscribers.
    if (this._subscribers[event]) {
      this._subscribers[event].forEach(callback => callback(...data));
    }
  }
};

// Step 2: Expenses Object Literal with Methods.
// We'll be 'borrowing' functionality from the generic PubSub handler in the next step -
// hence the use of e.g. this.publish(), which we don't have to redefine in this object.
const expenses = {
  list: [],

  addExpense(...exp) {
    this.list.push(...exp);
    this.publish("update", this.list);
  },

  filterExpense(input) {
    const result = this.list.filter(exp => {
        // [exp.title, exp.category, exp.date, exp.amount.toString()].join(" ").tolowercase().includes(input.toLowerCase()
        if(exp.title.toLowerCase().includes(input.toLowerCase()) ||
           exp.category.toLowerCase().includes(input.toLowerCase()) ||
           exp.date.toLowerCase().includes(input.toLowerCase()) ||
           exp.amount.toString().toLowerCase().includes(input.toLowerCase())) {
            return true;
        }
    });
    this.publish("update", result);
  },

  clear() {
    this.list = [];
    this.publish("update", this.list);
  }
};


// Step 3: Add PubSub functionality
// Object.assign copies properties and functionality
// to a target object (param1: expenses) from a source object (param2: PubSub).
// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
Object.assign(expenses, PubSub);

export default expenses;