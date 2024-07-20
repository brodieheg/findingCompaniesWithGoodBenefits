const url = document.getElementById('url');
const keyword = document.getElementById('keyword');
const form = document.getElementById('form');
const button = document.getElementById('button');
const API = 'https://webscrapingproject2024.onrender.com'
const local = 'http://localhost:3000/'


const newURL = document.createElement('a');
const newContent = document.createTextNode(text);
const container = document.getElementById('text-container');
const br = document.createElement('br');
// Handle Spinner Function
const loadingDiv = document.getElementById('loading');

function showSpinner() {
  loadingDiv.style.visibility = 'visible';
}

function hideSpinner() {
  loadingDiv.style.visibility = 'hidden';
}
const addResultsDiv = (text) => {
  
   if(container.hasChildNodes()){
    console.log(container.childNodes);
    container.removeChild(newURL);
   container.removeChild(br)}
  newURL.appendChild(newContent);
  if (text !== "false") {
    newURL.innerHTML = text
   newContent.innerHTML = text
   newURL.href = ""
    newURL.target = "_blank"}
  if (text === "false") {
    newURL.innerHTML = "Sorry, this company does not care about its employees"
  }
  button.style.marginTop = '15px';
  container.appendChild(newURL);
  container.appendChild(br);
}

const handleSubmit = async (event) => {
  event.preventDefault();
  showSpinner();
  console.log(url.value);
  const body = {
    text: url.value,
    keyword: keyword.value
  }
  const response = await fetch(API, {
    headers:{
      'Content-Type': 'application/json'
    },
  method: "POST",
  body: JSON.stringify(body)
})
  const result = await response.text();
  console.log(result);
  addResultsDiv(result);
  hideSpinner();
}

form.addEventListener("submit", handleSubmit)
