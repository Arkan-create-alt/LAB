
const DEMO_USER = "admin";
const DEMO_PASS = "Password!";

const page = document.body.dataset.page;

if (page === "login") {
  if (sessionStorage.getItem("guardian_demo_login") === "yes") {
    location.href = "tujuan.html";
  }

  document.getElementById("loginForm")
    .addEventListener("submit", function(e) {
      e.preventDefault();

      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      const error = document.getElementById("loginError");

      if (user === DEMO_USER && pass === DEMO_PASS) {
        sessionStorage.setItem("guardian_demo_login", "yes");
        location.href = "tujuan.html";
      } else {
        error.textContent = "Username atau password salah.";
      }
    });
}

if (page === "dashboard") {
  if (sessionStorage.getItem("guardian_demo_login") !== "yes") {
    location.replace("index.html");
  }

  document.getElementById("logoutBtn")
    .addEventListener("click", function() {
      sessionStorage.removeItem("guardian_demo_login");
      location.href = "index.html";
    });

  const toast = document.getElementById("toast");
  const log = document.getElementById("activityLog");

  function notify(message) {
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);

    const item = document.createElement("div");
    item.className = "log-item";
    item.textContent = new Date().toLocaleTimeString() + " — " + message;

    if (log.querySelector(".muted")) {
      log.innerHTML = "";
    }

    log.prepend(item);
  }

  document.querySelectorAll(".demo-action")
    .forEach(button => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;

        const messages = {
          open: "Demo: permintaan Open App dibuat.",
          close: "Demo: permintaan Close App dibuat.",
          warning: "Demo: peringatan berhasil disiapkan.",
          permission: "Demo: panel izin belum terhubung."
        };

        notify(messages[action]);
      });
    });
    }

