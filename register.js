const auth = firebase.auth();
const db = firebase.firestore();

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const fullName = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const currencySymbol = document.getElementById('currency').value;

    // Create user in Firebase Auth
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;

        // Store extra data in Firestore
        return db.collection("users").doc(uid).set({
          email,
          username,
          fullName,
          phone,
          currencySymbol,
          balance: 0,
          bonus: 0,
          withdrawal: 0,
          recentActivity: []
        });
      })
      .then(() => {
        alert("Registration successful!");
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
        alert("Registration failed: " + error.message);
      });
  });
}
