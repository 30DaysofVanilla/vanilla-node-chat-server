document.addEventListener('DOMContentLoaded', function() {
  const username = 'dnaiel laoss';
  const chatbox = document.getElementById('chatBox');
  const inputForm = document.getElementById('inputForm');

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('mysweetinput').value;
    postMessage(JSON.stringify({ username: username, message: message }));
  })

  function render(messageData){
    JSON.parse(messageData).forEach(message => {
      const messagez = document.createElement('p');
      messagez.innerHTML = `${message.user} : ${message.message}`;
      chatbox.appendChild(messagez);
    })
  }

  function getInitialMessages(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/getMessages');
    xhr.send();

    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          console.log('GET SUCCESS', xhr.response);
          render(xhr.response);
        }
      } else {
        console.log('SHIT DON WORK');
      }
    }
  }

  function postMessage(messageObject){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/postMessage');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(messageObject);

    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
        if(xhr.status === 200){
          console.log('POST SUCCESS', xhr.response);
        }
      } else {
        console.log('lolnopost');
      }
    }
  }

  console.log('about to ask for some data mane')
  getInitialMessages();




});