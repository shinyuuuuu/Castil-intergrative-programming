// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = loginForm.querySelector("input[type='email']").value.trim();
    const password = loginForm.querySelector("input[type='password']").value.trim();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Save user role: admin or user
    let userRole = "user"; // default

    // Example: hardcoded admin account
    if (email === "admin@email.com" && password === "admin123") {
      userRole = "admin";
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userRole", userRole);

    // Redirect based on role
    if (userRole === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "profile.html";
    }
  });
}

// SIGNUP FORM
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = signupForm.querySelector("input[type='email']").value.trim();
    const password = signupForm.querySelector("input[type='password']").value.trim();
    const confirmPass = signupForm.querySelectorAll("input[type='password']")[1].value.trim();

    if (!email || !password || !confirmPass) {
      alert("All fields are required");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    window.location.href = "profile.html";
  });
}

// PROTECT PROFILE PAGE
if (document.title.includes("Profile")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  });
}

// DARK MODE
const toggle = document.getElementById("darkToggle");
if (toggle) {
  toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark");
  });
}

// ADMIN ACCESS PROTECTION
if (
  document.title.includes("Admin") ||
  document.title.includes("Manage Users")
) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  } else if (localStorage.getItem("userRole") !== "admin") {
    // Normal users cannot access admin pages
    alert("Access denied. Admins only.");
    window.location.href = "profile.html";
  }
}

function deleteRow(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

const addUserForm = document.getElementById("addUserForm");

if (addUserForm) {
  addUserForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("newName").value;
    const email = document.getElementById("newEmail").value;

    const table = document.getElementById("userTable");

    const row = table.insertRow();

    row.insertCell(0).innerText = table.rows.length - 1;
    row.insertCell(1).innerText = name;
    row.insertCell(2).innerText = email;

    const actionCell = row.insertCell(3);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function(){
      row.remove();
    };

    actionCell.appendChild(deleteBtn);

    addUserForm.reset();

  });
}

// DYNAMIC ADMIN LINK IN NAVIGATION
const adminLinkContainer = document.getElementById("adminLinkContainer");
const userRole = localStorage.getItem("userRole");

if (adminLinkContainer && userRole === "admin") {
  adminLinkContainer.innerHTML = '<a href="admin.html">Admin Dashboard</a>';
}