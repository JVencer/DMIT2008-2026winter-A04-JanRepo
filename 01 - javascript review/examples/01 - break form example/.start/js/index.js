// 1. select new topic & new
let topicList = document.querySelector(".topics-list")
let newTopicForm = document.querySelector(".new-topic-form")

// 5. create a function addTopicToPage that will take the topic name and the topic list element as a parameter.
const addTopicToPage = (topicName, topicListElement) => {
    // 6. create a new inner list element
    let newTopicElement = `<li class="list-group-item">
    ${topicName}
    </li>`
    topicListElement.innerHTML += newTopicElement
}
// 2. add event listener stop default form submit 
newTopicForm.addEventListener(
    "submit",
    (event) => {
        event.preventDefault()
        let topicInput = event.target.elements["new-topic"]
        let newTopic = topicInput.value
        console.log(newTopic)

        // 4. validation - check for empty, use bootstrap
        if(newTopic === "") {
            topicInput.classList.add("is-invalid")
        }
        else
        {
            topicInput.classList.remove("is-invalid")
        }
        // 6.b don't forget to  call the 
        addTopicToPage(newTopic, topicList)
     }

    
)