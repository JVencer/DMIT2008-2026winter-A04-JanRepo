// 0. This is a component for *one* of the expense cards.
//    We're making a custom HTML element that we can use natively in e.g. index.html
//    Notice how this component has no behavioural logic -- that's separated out.
//    It just has structure/definition. It's basically a template to be hydrated with data by outside logic.

class ExpenseCard extends HTMLElement {
  constructor() { // things we want to happen when creating an instance of this element
    super(); // first, call the constructor from the parent class
    this.attachShadow({ mode: "open" }); // then, create a shadow DOM root (to encapsulate CSS styling)
    // "open" means the element can be accessible/mutable from outside code behaviour in the DOM,
    // "closed" would mean outside javascript behaviour cannot affect this component at all.

    // if we want, we can apply custom styling to our component,
    // guaranteed to behave as we expect because we're now in a shadow root (global DOM styling cannot pierce through.)
    const style = document.createElement("style");
    style.textContent = `
    .card {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex:1 1 300px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-weight: bold;
  font-size: 1.1rem;
}
.amount {
  color: green;
  font-weight: bold;
}
.meta {
  font-size: 0.9rem;
  color: #666;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 10px;
}
.actions button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}
.edit-btn {
  background-color: #3b82f6;
  color: white;
}
.delete-btn {
  background-color: #ef4444;
  color: white;
}`;

    // notice how there are no values inline here, just identifiable classes/IDs.
    this.shadowRoot.innerHTML = `
      <div class="card" id="">
        <div class="header">
          <div>
            <div class="title"></div>
            <div class="meta category"></div>
          </div>
          <div class="amount"></div>
        </div>
        <div class="meta date"></div>
        <div class="actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;
        this.shadowRoot.appendChild(style);
  }

  // the constructor will fire first.
  // then, connectedCallback() fires anytime an instance of this component is attached to the DOM.
  // -> even reordering a list, or removing and readding the instance, triggers this method.
  connectedCallback() { 
    this.shadowRoot.querySelector(".title").textContent =
      // x || y -> "x if x resolves truthy, else y"
      this.getAttribute("title") || "No title";
    this.shadowRoot.querySelector(".category").textContent =
      "Category: " + (this.getAttribute("category") || "");
    this.shadowRoot.querySelector(".date").textContent =
      this.getAttribute("date") || "";
    this.shadowRoot.querySelector(".amount").textContent =
      "$" + parseFloat(this.getAttribute("amount") || 0).toFixed(2);
    this.shadowRoot.querySelector(".card").setAttribute("id", Number(this.getAttribute("id")) || new Date().getTime());
  }
}

// finally, 'export' the custom element so it can be accessed natively.
customElements.define("expense-card", ExpenseCard);
