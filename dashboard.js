const auth = firebase.auth();
const db = firebase.firestore();

function logout() {
  auth.signOut().then(() => {
    localStorage.removeItem("uid");
    window.location.href = "index.html";
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  const uid = localStorage.getItem("uid");
  if (!uid) {
    window.location.href = "index.html";
    return;
  }

  const userRef = db.collection("users").doc(uid);

  // Real-time listener
  userRef.onSnapshot(doc => {
    if (!doc.exists) return;
    const data = doc.data();
    const symbol = data.currencySymbol || "$";

    document.getElementById("welcomeUser").textContent = data.username || "User";

    document.getElementById("balanceAmount").textContent = symbol + (data.balance || 0);
    document.getElementById("bonusAmount").textContent = symbol + (data.bonus || 0);
    document.getElementById("withdrawalAmount").textContent = symbol + (data.withdrawal || 0);

    const now = new Date().toLocaleString();
    document.getElementById("balanceUpdated").textContent = "Last updated: " + now;
    document.getElementById("bonusUpdated").textContent = "Last updated: " + now;
    document.getElementById("withdrawalUpdated").textContent = "Last updated: " + now;

    const activityLog = document.getElementById("activityLog");
    activityLog.innerHTML = "";
    if (Array.isArray(data.recentActivity)) {
      data.recentActivity.slice().reverse().forEach(entry => {
        const li = document.createElement("li");
        li.textContent = entry;
        activityLog.appendChild(li);
      });
    }
  });
});
