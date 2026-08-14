document.addEventListener("DOMContentLoaded", function () {

  // Read licensed states from the iframe URL
  const params = new URLSearchParams(window.location.search);
  const statesParam = params.get("states");

  // Clear any existing licensed classes
  document.querySelectorAll("g.state > path").forEach(function (state) {
    state.classList.remove("licensed");
  });

  document.querySelectorAll(".dc").forEach(function (dc) {
    dc.classList.remove("licensed");
  });

  if (!statesParam) {
    return;
  }

  // Example:
  // ?states=id,ut,az
  const licensedStates = statesParam
    .split(",")
    .map(function (code) {
      return code.trim().toLowerCase();
    })
    .filter(Boolean);

  licensedStates.forEach(function (code) {

    document
      .querySelectorAll(
        "g.state > path." + CSS.escape(code) +
        ", .dc." + CSS.escape(code)
      )
      .forEach(function (state) {
        state.classList.add("licensed");
      });

  });

});