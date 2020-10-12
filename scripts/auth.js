
//auth status changes listener
auth.onAuthStateChanged(user => {
    if(user){
        //database data
        db.collection('messages').onSnapshot(snapshot => { //realtime listener
            setupMessages(snapshot.docs); //shows messages
            setupUI(user); //shows log in links
        }, err => {
            console.log(err.message)
        });
    }
    else {  
        setupUI(); //passes null so log out links show
        setupMessages([]); //passes null so no messages show
    }
});
//new meesage
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents refresh 
    db.collection('messages').add({
        title: createForm.title.value, //can use square brackets for hyphenated ones
        content: createForm.content.value
    }).then(() => {
        //close modal and empty form values
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset() 
    }).catch(err => {
        console.log(err.message)
    })

});
//sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //user info 
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    //const username = signupForm['signup-username'].value;
    //const phoneNumber = signupForm['signup-phone'].value;
    //sign up user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({//set database values for user
            username: signupForm['signup-username'].value,
            phoneNumber: signupForm['signup-phone'].value,
            email: signupForm['signup-email'].value
        });
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => { //catches error in sign up such as password too short
       signupForm.querySelector('.error').innerHTML = err.message;
    });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});
//login 
//this is where the MFA should be attached
//not sure where inside this should go yet
/*//mfa verification
        const verifyForm = document.querySelector('#verify-form');
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const modalV = doc.querySelector('#modal-verify');
        })*/
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //getuser info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //close login modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => { //catcches error in login such as password incorrect 
        loginForm.querySelector('.error').innerHTML = err.message;
    })
});