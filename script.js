// DARK MODE — apply on every page load
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("All fields are required.");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    // Hardcoded admin account
    let userRole = "user";
    if (email === "admin@email.com" && password === "admin123") {
      userRole = "admin";
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userRole", userRole);

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
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPass = document.getElementById("signupConfirm").value.trim();

    if (!name || !email || !password || !confirmPass) {
      alert("All fields are required.");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPass) {
      alert("Passwords do not match.");
      return;
    }

    // Save user info to localStorage
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userRole", "user");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    window.location.href = "profile.html";
  });
}

// PROTECT PROFILE PAGE
if (document.title.includes("Profile")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

// PROTECT WEATHER PAGE
if (document.title.includes("Weather")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

// PROTECT ADMIN & MANAGE USERS PAGES
if (
  document.title.includes("Admin") ||
  document.title.includes("Manage Users")
) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  } else if (localStorage.getItem("userRole") !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "profile.html";
  }
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");   // FIX: was missing before
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
  });
}

// DARK MODE TOGGLE
const toggle = document.getElementById("darkToggle");
if (toggle) {
  // Set checkbox to match saved preference
  toggle.checked = localStorage.getItem("darkMode") === "true";

  toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark", this.checked);
    localStorage.setItem("darkMode", this.checked ? "true" : "false"); // FIX: now persisted
  });
}

// SETTINGS — Save button
const saveSettingsBtn = document.querySelector(".settings-form .cta-button");
if (saveSettingsBtn) {
  saveSettingsBtn.addEventListener("click", function () {
    const newEmail = document.querySelector(".settings-form input[type='email']").value.trim();
    const newAddress = document.querySelector(".settings-form input[type='text']").value.trim();
    const newPassword = document.querySelector(".settings-form input[type='password']").value.trim();

    if (newEmail && !newEmail.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (newEmail) localStorage.setItem("userEmail", newEmail);
    if (newAddress) localStorage.setItem("userAddress", newAddress);
    if (newPassword) localStorage.setItem("userPassword", newPassword);

    alert("Settings saved successfully!");
  });
}

// DYNAMIC ADMIN LINK IN NAVIGATION
const adminLinkContainer = document.getElementById("adminLinkContainer");
const userRole = localStorage.getItem("userRole");
if (adminLinkContainer && userRole === "admin") {
  adminLinkContainer.innerHTML = '<a href="admin.html">Admin Dashboard</a>';
}

// MANAGE USERS — Delete row
function deleteRow(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

// MANAGE USERS — Add user form
const addUserForm = document.getElementById("addUserForm");
if (addUserForm) {
  addUserForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("newName").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const role = document.getElementById("newRole").value.trim() || "user";

    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    const table = document.getElementById("userTable");
    const row = table.insertRow();

    row.insertCell(0).innerText = table.rows.length - 1;
    row.insertCell(1).innerText = name;
    row.insertCell(2).innerText = email;
    row.insertCell(3).innerText = role; // FIX: role column now added

    const actionCell = row.insertCell(4);
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function () { row.remove(); };
    actionCell.appendChild(deleteBtn);

    addUserForm.reset();
  });
}