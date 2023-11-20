document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.success) {
        console.log("login failed");
        alert(data.message);
        return;
      }

      localStorage.setItem("jwt", data.jwt);
      window.location.href = "../dashboard/dashboard.html";
    });
});
