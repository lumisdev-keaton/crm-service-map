function highlightLicensedStates(stateCodes) {
  // Remove previous highlights
  document.querySelectorAll("g.state > path").forEach((state) => {
    state.classList.remove("licensed");
  });

  // Reset DC separately
  document.querySelectorAll(".dc").forEach((dc) => {
    dc.classList.remove("licensed");
  });

  if (!Array.isArray(stateCodes)) return;

  stateCodes.forEach((code) => {
    const normalizedCode = String(code).trim().toLowerCase();

    if (!normalizedCode) return;

    document
      .querySelectorAll(`g.state > path.${CSS.escape(normalizedCode)}, .dc.${CSS.escape(normalizedCode)}`)
      .forEach((state) => {
        state.classList.add("licensed");
      });
  });
}


// Receive licensed states from Webflow
window.addEventListener("message", function (event) {
  if (!event.data) return;

  if (event.data.type !== "crmLicensedStates") return;

  highlightLicensedStates(event.data.states);
});


// Tell the parent Webflow page that the map is ready
window.addEventListener("DOMContentLoaded", function () {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: "crmMapReady"
      },
      "*"
    );
  }
});