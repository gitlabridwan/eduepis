const frame = document.querySelector("#edu-episians-frame");
const launchScreen = document.querySelector("#launch-screen");
const statusCard = document.querySelector("#status-card");
const statusTitle = document.querySelector("#status-title");
const statusCopy = document.querySelector("#status-copy");
const reloadButton = document.querySelector("#reload-button");
const installButton = document.querySelector("#install-button");

let installPrompt = null;
let frameReady = false;
let slowTimer;

function refreshStatus() {
  const online = navigator.onLine;
  const failed = statusCard.dataset.failed === "true";
  statusCard.hidden = online && !failed;
  reloadButton.disabled = !online;

  if (online) {
    statusTitle.textContent = "Aplikasi belum dapat dimuat";
    statusCopy.textContent = "Periksa koneksi atau muat ulang aplikasi.";
  } else {
    statusTitle.textContent = "Anda sedang luring";
    statusCopy.textContent = "Konten pembelajaran memerlukan koneksi internet.";
  }
}

function armSlowTimer() {
  window.clearTimeout(slowTimer);
  slowTimer = window.setTimeout(() => {
    if (!frameReady) {
      statusCard.dataset.failed = "true";
      refreshStatus();
    }
  }, 18000);
}

frame.addEventListener("load", () => {
  frameReady = true;
  statusCard.dataset.failed = "false";
  launchScreen.classList.add("launch-screen--hidden");
  refreshStatus();
});

frame.addEventListener("error", () => {
  statusCard.dataset.failed = "true";
  refreshStatus();
});

reloadButton.addEventListener("click", () => {
  if (!navigator.onLine) return;
  frameReady = false;
  statusCard.dataset.failed = "false";
  launchScreen.classList.remove("launch-screen--hidden");
  frame.src = frame.src;
  armSlowTimer();
});

window.addEventListener("online", refreshStatus);
window.addEventListener("offline", refreshStatus);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});

window.addEventListener("appinstalled", () => {
  installPrompt = null;
  installButton.hidden = true;
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) return;
  await installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installButton.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // Aplikasi daring tetap dapat digunakan apabila registrasi diblokir.
    });
  });
}

refreshStatus();
armSlowTimer();
