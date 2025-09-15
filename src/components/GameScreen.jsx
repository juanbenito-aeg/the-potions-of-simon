import murmur from "../assets/sounds/murmur.mp3";
import simon from "../assets/sounds/sprite.mp3";
import defeatBackgroundMusic from "../assets/sounds/defeat-background-music.mp3";
import "../styles/GameScreen.css";
import useSound from "use-sound";
import {
  MIN_POTIONS_INDEX,
  MAX_POTIONS_INDEX,
  INITIAL_GAME_SPEED,
} from "../constants";
import { createParticles } from "../utils";
import { useState, useEffect, useRef } from "react";
import SoundSwitch from "./SoundSwitch";
import DefeatDialog from "./DefeatDialog";

function GameScreen({ onClickReturn }) {
  const defeatDialogRef = useRef(null);

  const [soundData, setSoundData] = useState({
    soundURL: murmur,
    volume: 0.25,
  });
  const [sequenceByGame, setSequenceByGame] = useState([]);
  const [sequenceByPlayer, setSequenceByPlayer] = useState([]);
  const [isAllowedToPressPotion, setIsAllowedToPressPotion] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED);
  const [turn, setTurn] = useState(0);

  const [play] = useSound(simon, {
    sprite: {
      redPotion: [0, 500],
      bluePotion: [1900, 500],
      greenPotion: [3800, 600],
      purplePotion: [5700, 500],
      incorrectPotion: [7700, 800],
    },
  });

  const potionsData = [
    {
      ref: useRef(null),
      sound: "redPotion",
    },
    {
      ref: useRef(null),
      sound: "bluePotion",
    },
    {
      ref: useRef(null),
      sound: "greenPotion",
    },
    {
      ref: useRef(null),
      sound: "purplePotion",
    },
  ];

  useEffect(() => {
    setTimeout(startNewTurn, 1000);
  }, []);

  function startNewTurn() {
    updateSequenceByGame();
    setSequenceByPlayer([]);
    setIsAllowedToPressPotion(false);
    setGameSpeed(gameSpeed - sequenceByGame.length * 2);
    setTurn(turn + 1);
  }

  function updateSequenceByGame() {
    const randomPotionsIndex = Math.floor(
      Math.random() * (MAX_POTIONS_INDEX - MIN_POTIONS_INDEX + 1) +
        MIN_POTIONS_INDEX
    );

    setSequenceByGame([...sequenceByGame, randomPotionsIndex]);
  }

  // |||||||||||||||| PLAY THE SEQUENCE EVERY TIME IT IS UPDATED
  useEffect(() => {
    sequenceByGame.forEach((item, index) => {
      setTimeout(() => {
        play({ id: potionsData[item].sound });

        potionsData[item].ref.current.style.backgroundColor = "transparent";

        setTimeout(() => {
          potionsData[item].ref.current.style.backgroundColor =
            "rgb(0 0 0 / 0.25)";

          if (index === sequenceByGame.length - 1) {
            setIsAllowedToPressPotion(true);
          }
        }, gameSpeed / 2);
      }, gameSpeed * index);
    });
  }, [sequenceByGame]);

  function handleClick(index) {
    if (isAllowedToPressPotion) {
      play({ id: potionsData[index].sound });

      potionsData[index].ref.current.style.backgroundColor = "transparent";

      // |||||||||||||||| GET THE POTION'S CENTER X & Y COORDINATES TO CREATE PARTICLES IN IT

      const potionSizeAndPosition =
        potionsData[index].ref.current.getBoundingClientRect();

      const potionCenterX =
        potionSizeAndPosition.x + potionSizeAndPosition.width / 2;
      const potionCenterY =
        potionSizeAndPosition.y + potionSizeAndPosition.height / 2;

      createParticles(potionCenterX, potionCenterY);

      setTimeout(() => {
        potionsData[index].ref.current.style.backgroundColor =
          "rgb(0 0 0 / 0.25)";

        setSequenceByPlayer([...sequenceByPlayer, index]);
      }, gameSpeed / 2);
    }
  }

  useEffect(() => {
    const currentPresses = sequenceByPlayer.length;

    if (currentPresses > 0) {
      const currentCorrectPotionIndex = sequenceByGame[currentPresses - 1];
      const currentPlayerPotionIndex = sequenceByPlayer[currentPresses - 1];

      // |||||||||||||||| CHECK WHETHER THE POTION PRESSED IS CORRECT OR NOT
      if (
        currentPlayerPotionIndex === currentCorrectPotionIndex &&
        currentPresses === sequenceByGame.length
      ) {
        // |||||||||||||||| IF THE SEQUENCE BY THE GAME HAS BEEN CORRECTLY REPLICATED, START A NEW TURN
        setTimeout(startNewTurn, 500);
      } else if (currentPlayerPotionIndex !== currentCorrectPotionIndex) {
        // |||||||||||||||| IF THE POTION PRESSED IS INCORRECT, END THE GAME

        play({ id: "incorrectPotion" });

        potionsData[
          currentCorrectPotionIndex
        ].ref.current.style.backgroundColor = "transparent";

        setTimeout(() => {
          potionsData[
            currentCorrectPotionIndex
          ].ref.current.style.backgroundColor = "rgb(0 0 0 / 0.25)";

          displayDefeatDialog();
        }, gameSpeed * 2);

        setIsAllowedToPressPotion(false);
      }
    }
  }, [sequenceByPlayer]);

  function displayDefeatDialog() {
    defeatDialogRef.current.showModal();

    setSoundData({
      soundURL: defeatBackgroundMusic,
      volume: 1,
    });
  }

  return (
    <div className="game-screen">
      <SoundSwitch {...soundData} />

      <h1 className="game-screen__turn-indicator">
        TURN
        <br />
        {turn}
      </h1>

      <div className="game-screen__potions-container">
        {potionsData.map((item, index) => {
          return (
            <div
              key={index}
              ref={item.ref}
              className={`game-screen__potion game-screen__potion-${index}`}
              onClick={() => {
                handleClick(index);
              }}
            ></div>
          );
        })}
      </div>

      <DefeatDialog ref={defeatDialogRef} onClickReturn={onClickReturn} />
    </div>
  );
}

export default GameScreen;
