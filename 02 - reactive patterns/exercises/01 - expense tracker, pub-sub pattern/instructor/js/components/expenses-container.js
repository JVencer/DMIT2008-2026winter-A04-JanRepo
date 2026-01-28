// 0. This is a component for the container that lays out individual cards.

//    Notice how the *card* component has no rendering logic, but
//    this container component is what's responsible for taking unit cards, populating them with data,
//    and rendering out the grid of cards.

//    We can call our component in the index with attributes (e.g. "expenses"), and use that to receive data/messages.
//    Notice how, at no point, are we baking in "expenses" as a functional parameter.

//    The callbacks for when the component loads (connectedCallback) & when specific attributes monitored (observedAttributes) are changed (attributeChangedCallback),
//    manually fire the re-render function, but respond automatically to user interaction.

class ExpenseContainer extends HTMLElement {
  constructor() {
    // define the styling, divs, class identifiers, etc., building an element of nested HTML
    super();
    this.attachShadow({ mode: "open" });
    this.container = document.createElement("div");
    this.container.classList.add('expense-container');
    this.shadowRoot.appendChild(this.container);
    const style = document.createElement("style");
    style.textContent = `
    .expense-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
  box-sizing: border-box;
    }`;

    this.shadowRoot.appendChild(style);
  }

  static get observedAttributes() {
    // You've seen connectedCallback(); this static method defines which data to watch for changes in.
    // Returns an array of named attributes to watch for changes in.
    // attributeChangedCallback() will fire when any of these attributes change in value.
    return ['expenses'];
  }

  connectedCallback() {
    this.renderExpenses();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // This callback function fires whenever an observedAttribute changes in value.
    if (name === 'expenses' && oldValue !== newValue) {
      this.renderExpenses();
    }
  }

  renderExpenses(){
    // initialise values
    this.container.innerHTML='';
    const expensesAttr = this.getAttribute("expenses");
    let expenses = [];

    try { // parse data from the expenses attribute
      expenses = JSON.parse(expensesAttr);
    } catch (e) {
      console.warn("Invalid expenses attribute:", e);
    }

    // if data parses to a valid array, render out a card
    if (Array.isArray(expenses)) {
      expenses.forEach((exp) => {
        // notice how we don't need to import a card into this file!
        // we can just create a new HTML element for each card,
        // because we've defined that element and made it available to the index.html
        const card = document.createElement("expense-card");
        // then, create cards for each data item, and add card.
        card.setAttribute("title", exp.title);
        card.setAttribute("category", exp.category);
        card.setAttribute("date", exp.date);
        card.setAttribute("amount", exp.amount);
        card.setAttribute("id", exp.id);
        this.container.appendChild(card);
      });
    }
  }
}

customElements.define("expense-container", ExpenseContainer);
