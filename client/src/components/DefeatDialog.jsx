import defeatDialogImage from "../assets/images/defeat-dialog.png";
import "../styles/DefeatDialog.css";

function DefeatDialog({ ref, onClickReturn }) {
  return (
    <dialog closedby="none" ref={ref} className="defeat-dialog">
      <img src={defeatDialogImage} alt="" className="defeat-dialog__img" />

      <div className="defeat-dialog__elems-container">
        <p className="defeat-dialog__txt">
          One misstep is all it takes. The potions flicker out of order, their
          glow faltering before dissolving into nothingness. The sequence is
          broken, and with it, the challenge ends. You have been defeated.
        </p>

        <button
          type="button"
          className="defeat-dialog__btn"
          onClick={onClickReturn}
        >
          Return to the main menu
        </button>
      </div>
    </dialog>
  );
}

export default DefeatDialog;
