import outsideClick from "./outside-click.js";

export default function dropdown(params) {
  const dropdownMenus = document.querySelectorAll("[data-dropdown]");

  dropdownMenus.forEach((menu) => {
    ["click", "touchstart"].forEach((eachEvent) => {
      menu.addEventListener(eachEvent, handleClick);
    });
  });

  function handleClick(event) {
    event.preventDefault();
    this.classList.add("active");
    outsideClick(this, ["click", "touchstart"], () => {
      this.classList.remove("active");
    });
  }
}
