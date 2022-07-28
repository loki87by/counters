import React from "react";

function Header(): React.ReactElement {
  const [backgroundColor, setBackgroundColor] = React.useState("#ffffff");
  const [mainColor, setMainColor] = React.useState("#000000");

  function updateColors(e: React.ChangeEvent<HTMLInputElement>, arg: string) {
    const color = e.target.value;
    const html = document.querySelector("html");

    if (html && color) {
      if (arg === "back") {
        setBackgroundColor(color);
        html.style.setProperty("--background", color);
      }

      if (arg === "front") {
        setMainColor(color);
        html.style.setProperty("--color", color);
      }
    }
  }

  return (
    <header>
      <div className="Header__input-block">
        <label htmlFor="background-color-input">Сменить фон</label>
        <input
          type="color"
          id="background-color-input"
          className="Header__input"
          title="Сменить фон"
          value={backgroundColor}
          onInput={(e) => {
            updateColors(e as React.ChangeEvent<HTMLInputElement>, "back");
          }}
        />
      </div>
      <h1>Генератор счетчиков</h1>
      <div className="Header__input-block">
        <label htmlFor="main-color-input">Сменить основной цвет</label>
        <input
          type="color"
          id="main-color-input"
          className="Header__input"
          title="Сменить основной цвет"
          value={mainColor}
          onInput={(e) => {
            updateColors(e as React.ChangeEvent<HTMLInputElement>, "front");
          }}
        />
      </div>
    </header>
  );
}

export default Header;
