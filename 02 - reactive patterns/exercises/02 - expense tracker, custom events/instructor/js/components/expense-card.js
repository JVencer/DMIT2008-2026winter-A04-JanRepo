class ExpenseCard extends HTMLElement {
  constructor() {  // is called when an instance of this class/component is created
    super();
    this.attachShadow({ mode: "open" });

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

  connectedCallback() { // is called when component instance is attached to DOM
    // populating default values if any are missing
    this.shadowRoot.querySelector(".title").textContent =
      this.getAttribute("title") || "No title";
    this.shadowRoot.querySelector(".category").textContent =
      "Category: " + (this.getAttribute("category") || "");
    this.shadowRoot.querySelector(".date").textContent =
      this.getAttribute("date") || "";
    this.shadowRoot.querySelector(".amount").textContent =
      "$" + parseFloat(this.getAttribute("amount") || 0).toFixed(2);
    this.shadowRoot.querySelector(".card").setAttribute("id", Number(this.getAttribute("id")) || new Date().getTime());

    // We'll listen for .edit-btn and .delete-btn being clicked, and fire custom events.
    // I recommend adding event listeners only when the component attaches to the DOM, *rather than* in the constructor.

    // 1. delete button clicked event
    this.shadowRoot.querySelector('.delete-btn').addEventListener(
      "click",
      () => { // callback function is an anonymous arrow function
        const deleteEvent = new CustomEvent(
          "expense-delete",  // first term:  event's name
          {                  // second term: event info
            detail: { id: this.id },   // detail: the payload/data/message that is passed with the event
            bubbles: true,             // can propagate upwards through DOM, rather than direct sender/receiver info
            composed: true,             // event can cross shadow DOM boundary
          }
        );

        this.dispatchEvent(deleteEvent);
        // console.log(deleteEvent);
      }
    )

    // 2. edit button clicked event
    // You can also dispatch an event you're creating on the fly, but then you won't be able to inspect it from this end.
    this.shadowRoot.querySelector(".edit-btn").addEventListener(
      "click",
      () => {
        this.dispatchEvent(
          new CustomEvent(
            "expense-edit",
            {
              // I'm going to want to send more than just the ID in the payload for editing an existing item.
              // I *should* be identifying the actual data item from the data container, rather than extracting values from DOM,
              //   but this keep things simpler.
              detail: {
                id: this.id,
                title: this.getAttribute("title"),
                category: this.getAttribute("category").toLowerCase(), // see: index.html, select option values are lowercase
                date: this.getAttribute("date"),
                amount: this.getAttribute("amount"),
              },  
              bubbles: true,
              composed: true,
            }
          )
        );
      }
    );
  }
}

customElements.define("expense-card", ExpenseCard);
