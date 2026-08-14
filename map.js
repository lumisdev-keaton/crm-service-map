document.addEventListener("DOMContentLoaded", function () {

  // Read licensed state codes from the iframe URL
  const params = new URLSearchParams(window.location.search);
  const statesParam = params.get("states");

  if (!statesParam) {
    console.log("No licensed states supplied.");
    return;
  }

  const licensedStates = statesParam
    .split(",")
    .map(code => code.trim().toLowerCase())
    .filter(Boolean);

  console.log("Licensed states:", licensedStates);

  // Clear any existing licensed classes
  document.querySelectorAll("g.state > path").forEach(function (state) {
    state.classList.remove("licensed");
  });

  document.querySelectorAll(".dc").forEach(function (dc) {
    dc.classList.remove("licensed");
  });

  // Highlight licensed states
  licensedStates.forEach(function (code) {

    const state = document.querySelector(
      "g.state > path." + CSS.escape(code)
    );

    if (state) {
      state.classList.add("licensed");
      console.log("Highlighted:", code);
    } else {
      console.warn("State not found:", code);
    }

  });

});