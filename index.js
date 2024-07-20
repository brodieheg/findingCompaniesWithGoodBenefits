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
   newURL.href = text
    newURL.target = "_blank"}
  if (text === "false") {
    newContent.innerHTML = "Sorry, this company does not care about its employees"
    newURL.innerHTML = "Sorry, this company does not care about its employees"
    newURL.href = ""
    
  }
  button.style.marginTop = '15px';
  container.appendChild(newURL);
  container.appendChild(br);
}

const handleSubmit = async (event) => {
  event.preventDefault();
  showSpinner();
  try {
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
    if(response.status !== 200) {
      newURL.innerHTML = "Error loading website. Slack Brodie and tell him he is a failure."
    container.appendChild(newURL);
    container.appendChild(br);
    }
    else {const result = await response.text();
    addResultsDiv(result);}
  }
  catch{
    newURL.innerHTML = "Error loading website. Slack Brodie and tell him he is a failure."
    container.appendChild(newURL);
    container.appendChild(br);
  }
  finally
    {hideSpinner();}
}

form.addEventListener("submit", handleSubmit)
