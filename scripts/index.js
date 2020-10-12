const messageList = document.querySelector('.guides');
const logOutLinks = document.querySelectorAll('.logged-out');
const logInLinks = document.querySelectorAll('.logged-in');
const accoundDetails = document.querySelector('.account-details');
const setupUI = (user) => {
  if(user){
    //acc info
    //grabs document
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <div>Logged in as ${user.email}</div>
      <div>Phone Number: ${doc.data().phoneNumber}</div>
      <div>User Name: ${doc.data().username}</div>
      `;
      accoundDetails.innerHTML = html;
    })
    //toggle ui display show log in links
    logInLinks.forEach(item => item.style.display = 'block');
    logOutLinks.forEach(item => item.style.display = 'none');
  }
  else {//show log out links and hide all other info
    logOutLinks.forEach(item => { item.style.display = 'block'});
    logInLinks.forEach(item => item.style.display = 'none');
    accoundDetails.innerHTML = '';
  }
};
//setup messages
const setupMessages = (data) => {
  if(data.length){
    let html = '';
    data.forEach(doc => {
      const message = doc.data();
      //backticks for template string
      const li = `
      <li>
        <div class="collapsible-header grey lighten-3">${message.title}</div>
        <div class="collapsible-body white">${message.content}</div>
      </li>
      `;
      html += li
    });
    
    messageList.innerHTML = html;
  }
  else{
    messageList.innerHTML = '<h3 class ="center-align"> Currently not logged in.</h3>'
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
