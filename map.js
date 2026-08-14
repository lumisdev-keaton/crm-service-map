document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const statesParam = params.get("states");

  if (!statesParam) {
    return;
  }

  const licensedStates = statesParam
    .split(",")
    .map(code => code.trim().toLowerCase())
    .filter(Boolean);

  licensedStates.forEach(function (code) {
    // Find only state shapes inside the main state group
    const state = document.querySelector("g.state > ." + code);

    if (state) {
      state.classList.add("licensed");
    }
  });

  // DC also has a separate circle
  if (licensedStates.includes("dc")) {
    const dcCircle = document.querySelector("circle.dc");

    if (dcCircle) {
      dcCircle.classList.add("licensed");
    }
  }
});