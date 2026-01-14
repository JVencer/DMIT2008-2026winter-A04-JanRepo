// 1. select topic & new topic form
let topicList = document.querySelector(".topics-list")
let newTopicForm = document.querySelector(".new-topic-form")

// 5. create a function addTopicToPage that will take a name & list element as its params
const addTopicToPage = (topicName, topicListElement) => {
    // 6a. create a new inner list element and update the HTML
    let newTopicElement = `<li class="list-group-item">
        ${topicName}
    </li>`
    topicListElement.innerHTML += newTopicElement
}

// 2. add event listener, stop default form submit event (would reload page)
newTopicForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault()

        // 3. grab input element & extract/store value
        let topicInput = event.target.elements["new-topic"]
        let newTopic = topicInput.value
        console.log(newTopic)

        // 4. validation - check for empty, use bootstrap classes for user feedback
        if (newTopic === "") {
            topicInput.classList.add("is-invalid")
        } else {
            topicInput.classList.remove("is-invalid")
        }
        // 6b. don't forget to call the function inside the event listener
        addTopicToPage(newTopic, topicList)
    })


