const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )


let myLeads = []


// STORE TO THE LOCAL STORAGE
if ( leadsFromLocalStorage ) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}



// SAVE THE CURRENT TAB WHEN CLICKED
tabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem( 'myLeads', JSON.stringify( myLeads ) )
    render(myLeads)
  })

})



// RENDER FUNCTION
function render(leads) {
  let listItems = ""
  for ( let i = 0; i < leads.length; i++ ) {
    listItems += `
      <li>
        <a href="${leads[i]}" target='_blank'> ${leads[i]} </a>
      </li>
    `
  }
  ulEl.innerHTML = listItems
}



// DELETE FROM THE INPUT WHEN DOUBLED CLICKED
deleteBtn.addEventListener( "dblclick", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})  



// ADD INPUT FROM THE INPUT TAB
inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem( "myLeads", JSON.stringify(myLeads) )
  render(myLeads)
})