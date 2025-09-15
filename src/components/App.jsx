import { AppState } from "../constants";
import { useState } from "react";
import {
  IsSoundSwitchOnContext,
  HandleClickSoundSwitchContext,
} from "../SoundSwitchContext";
import MainMenu from "./MainMenu";
import GameScreen from "./GameScreen";

function App() {
  const [appState, setAppState] = useState(AppState.MAIN_MENU);
  const [isSoundSwitchOn, setIsSoundSwitchOn] = useState(false);

  function handleClickPlay() {
    setAppState(1 - appState);
  }

  function handleClickSoundSwitch() {
    setIsSoundSwitchOn(!isSoundSwitchOn);
  }

  return (
    <IsSoundSwitchOnContext value={isSoundSwitchOn}>
      <HandleClickSoundSwitchContext value={handleClickSoundSwitch}>
        {appState === AppState.MAIN_MENU ? (
          <MainMenu onClickPlay={handleClickPlay} />
        ) : (
          <GameScreen onClickReturn={handleClickPlay} />
        )}
      </HandleClickSoundSwitchContext>
    </IsSoundSwitchOnContext>
  );
}

export default App;
