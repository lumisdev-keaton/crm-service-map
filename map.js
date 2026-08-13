function highlightStates(stateCodes) {
  // Remove existing licensed styling
  document.querySelectorAll("g.state > path").forEach(function (state) {
    state.classList.remove("licensed");
  });

  // Reset DC separately
  document.querySelectorAll(".dc").forEach(function (dc) {
    dc.classList.remove("licensed");
  });

  // Apply licensed styling
  stateCodes.forEach(function (code) {
    const cleanCode = String(code).trim().toLowerCase();

    if (!cleanCode) return;

    const state = document.querySelector(
      "g.state > path." + CSS.escape(cleanCode)
    );

    if (state) {
      state.classList.add("licensed");
    }

    // Handle DC circle/path
    if (cleanCode === "dc") {
      document.querySelectorAll(".dc").forEach(function (dc) {
        dc.classList.add("licensed");
      });
    }
  });
}


/* ---------------------------------
   1. Read states from URL
---------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const statesParam = params.get("states");

  if (!statesParam) return;

  const states = statesParam
    .split(",")
    .map(function (code) {
      return code.trim().toLowerCase();
    })
    .filter(Boolean);

  highlightStates(states);
});


/* ---------------------------------
   2. Also support postMessage later
---------------------------------- */

window.addEventListener("message", function (event) {
  if (!event.data || event.data.type !== "crmLicensedStates") {
    return;
  }

  const licensedStates = event.data.states || [];

  highlightStates(licensedStates);
});