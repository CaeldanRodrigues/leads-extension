const saveBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('delete-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ulEl')

let myLeads = [];

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = '';
    for(let lead of leads) {
        listItems += `
        <li>
            <a href="https://${lead}" target="_blank">${lead}</a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

saveBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value)
    inputEl.value = ''

    localStorage.setItem( "myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


