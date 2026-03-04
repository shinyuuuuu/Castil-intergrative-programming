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

    localStorage.setItem("loggedIn", "true");
    window.location.href = "profile.html";
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