const auth = firebase.auth();

// REGISTER FORM HANDLING
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      email: document.getElementById('email').value,
      fullName: document.getElementById('fullname').value,
      phone: document.getElementById('phone').value,
      currency: document.getElementById('currency').value
    };

    console.log('Registering user:', userData);

    // You can now call Firebase Auth to register the user
    // Example:
    // auth.createUserWithEmailAndPassword(userData.email, userData.password)
    // .then((userCredential) => { ... })
  });
}

// LOGIN FORM HANDLING
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const uid = userCredential.user.uid;
        console.log("Logged in as:", uid);

        localStorage.setItem("uid", uid);
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        alert("Login failed: " + error.message);
      });
  });
}
