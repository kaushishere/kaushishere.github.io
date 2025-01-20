function myMenuFunction() {
  var i = document.getElementById("navMenu");

  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
}

async function handleLogin(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Send login request to the backend
    const response = await fetch("https://myfamilytree.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();

      // Store the token securely (avoid localStorage for sensitive data)
      sessionStorage.setItem("authToken", token);

      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to main page
    } else {
      alert("Invalid username or password. Please try again.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again later.");
  }
}

// Example of making an authenticated request
async function fetchProtectedResource() {
  const token = sessionStorage.getItem("authToken");
  const response = await fetch("https://myfamilytree.onrender.com/protected", {
    headers: { Authorization: token },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Protected resource data:", data);
  } else {
    console.log("Access denied");
  }
}


var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
  x.style.left = "4px";
  y.style.right = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  x.style.opacity = 1;
  y.style.opacity = 0;
}

function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
}
