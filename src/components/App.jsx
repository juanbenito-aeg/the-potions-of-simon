import { AppState } from "../constants";
import { useState } from "react";
import MainMenu from "./MainMenu";
import GameScreen from "./GameScreen";

function App() {
  const [appState, setAppState] = useState(AppState.MAIN_MENU);

  function handleClickPlay() {
    setAppState(1 - appState);
  }

  return appState === AppState.MAIN_MENU ? (
    <MainMenu onClickPlay={handleClickPlay} />
  ) : (
    <GameScreen onClickReturn={handleClickPlay} />
  );
}

export default App;
