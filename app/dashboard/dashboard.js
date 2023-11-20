const jwt = localStorage.getItem("jwt");
if (!jwt) {
  window.location.href = "../login/login.html";
}

fetch("http://localhost:3000/user/list_all", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: jwt,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.getElementById("table-body");
    const headers = ["id", "name", "lastName", "age", "address", "email"];

    data.users.forEach((user) => {
      const row = document.createElement("tr");
      headers.forEach((key) => {
        const col = document.createElement("td");
        col.textContent = user[key];
        row.appendChild(col);
      });

      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error(error);
  });
