const signupform = document.querySelector("#signupform");
const signinform = document.querySelector("#signinform");
const status = document.querySelector("#status");
const signout = document.querySelector("#signOutUser");
const visibility = document.querySelector("#visibility");
const invisibility = document.querySelector("#invisibility");
const userName = document.querySelector("#userName");
const userUID = document.querySelector("#userUID");
auth.onAuthStateChanged(user => {
    if(user){
        status.innerHTML = "Currently Logged In As: " + user.uid;
        visibility.className = "d-block";
        invisibility.className = "d-none";
        userName.innerHTML = "Email: " + user.email;
        userUID.innerHTML = "UID: " + user.uid; 
        document.querySelector("#signoutbut").className = "d-block card col-sm-2 bg-dark text-light ml-2";
        document.querySelector('#accountinfobut').className = "d-block card col-sm-2 bg-dark text-light";
        status.className = "card col-sm-8 bg-dark text-light";      
        document.querySelector("#signinbut").className = "d-none card col-sm-2 bg-dark text-light ml-2";
        document.querySelector("#signupbut").className = "d-none card col-sm-2 bg-dark text-light";
 
    }else{ 
        status.innerHTML = "Currently Logged Out!";
        visibility.className = "d-none";
        invisibility.className = "d-block";
        userName.innerHTML = "NOT LOGGED IN!";
        document.querySelector("#signoutbut").className = "d-none card col-sm-2 bg-dark text-light ml-2";
        document.querySelector('#accountinfobut').className = "d-none card col-sm-2 bg-dark text-light";
        status.className = "card col-sm-8 bg-dark text-light";
        document.querySelector("#signinbut").className = "d-block card col-sm-2 bg-dark text-light ml-2";
        document.querySelector("#signupbut").className = "d-block card col-sm-2 bg-dark text-light";
    }
})
signupform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = signupform.querySelector("#email-signUp").value;
    const password = signupform.querySelector("#password-signUp").value;
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        signupform.reset();

        
    })
})
signout.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
    })
})

signinform.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailsignin = document.querySelector("#email-signIn").value;
    const passsignin = document.querySelector("#password-signIn").value;

    auth.signInWithEmailAndPassword(emailsignin,passsignin).then(cred => {
        console.log("SIGNED IN SUCCESSFULLY!")
        signinform.reset();
    })
})