const toggleDiv = e => {
  const currentDivOpened = document.querySelector(".customToggle.open");
  if (currentDivOpened) {
    if (e.target === currentDivOpened) {
      e.target.classList.remove("open");
      return false;
    } else if (
      currentDivOpened.contains(e.target) &&
      e.target !== currentDivOpened
    ) {
      return false;
    }
  }
  try {
    var lista = document.querySelectorAll(".customToggle");
    for (var i = 0; i < lista.length; i++) {
      lista[i].classList.remove("open");
    }
  } catch (err) {
    console.log(
      "error en foreach " +
        typeof document.querySelectorAll(".customToggle") +
        " err " +
        err
    );
  }

  e.target.classList.add("open");
  return true;
};

export default toggleDiv;
