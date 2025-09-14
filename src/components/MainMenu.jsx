import "../styles/MainMenu.css";

function MainMenu({ onClickPlay }) {
  return (
    <div className="main-menu">
      <div className="main-menu__elems-container">
        <h1 className="main-menu__title">THE POTIONS OF SIMON</h1>

        <button
          className="main-menu__play-btn"
          type="button"
          onClick={onClickPlay}
        >
          PLAY
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
