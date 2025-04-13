import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { app } from './firebaseConfig.js'; // Assuming you have a separate firebaseConfig.js

const auth = getAuth(app);
const db = getFirestore(app);

const registerForm = document.getElementById('registerForm');
const errorMessageElement = document.createElement('p'); // Create an element to display errors
errorMessageElement.classList.add('error-message'); // Add a class for styling

if (registerForm) {
  registerForm.insertBefore(errorMessageElement, registerForm.firstChild); // Insert error message at the top

  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Clear any previous error messages
    errorMessageElement.textContent = '';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const fullName = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const currencySymbol = document.getElementById('currency').value;

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Store extra data in Firestore
      await setDoc(doc(collection(db, "users"), uid), {
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

      alert("Registration successful!");
      window.location.href = "dashboard.html";

    } catch (error) {
      console.error("Registration error:", error.message);
      errorMessageElement.textContent = `Registration failed: ${error.message}`;
      // Optionally, you could inspect the error.code for specific error messages
      // if (error.code === 'auth/email-already-in-use') {
      //   errorMessageElement.textContent = 'Email address is already in use.';
      // } else {
      //   errorMessageElement.textContent = `Registration failed: ${error.message}`;
      // }
    }
  });
}
