window.addEventListener("message", function (event) {

  if (!event.data || event.data.type !== "crmLicensedStates") {
    return;
  }

  const licensedStates = event.data.states || [];

  // Remove licensed styling from all state paths
  document.querySelectorAll("g.state > path").forEach(function(state) {
    state.classList.remove("licensed");
  });

  // Also reset DC circle if needed
  const dc = document.querySelector(".dc");
  if (dc) {
    dc.classList.remove("licensed");
  }

  // Add licensed styling
  licensedStates.forEach(function(code) {

    const state = document.querySelector(
      "." + CSS.escape(code.toLowerCase())
    );

    if (state) {
      state.classList.add("licensed");
    }

  });

});