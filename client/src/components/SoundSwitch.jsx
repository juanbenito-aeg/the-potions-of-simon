import soundSwitchOn from "../assets/images/sound-switch-on.png";
import soundSwitchOff from "../assets/images/sound-switch-off.png";
import "../styles/SoundSwitch.css";
import useSound from "use-sound";
import { useContext, useEffect } from "react";
import {
  HandleClickSoundSwitchContext,
  IsSoundSwitchOnContext,
} from "../SoundSwitchContext";

function SoundSwitch({ soundURL, volume = 1 }) {
  const isOn = useContext(IsSoundSwitchOnContext);
  const handleClick = useContext(HandleClickSoundSwitchContext);

  const [play, { stop, pause }] = useSound(soundURL, {
    volume,
    loop: true,
    autoplay: isOn,
  });

  useEffect(() => {
    isOn ? play() : pause();
  }, [isOn]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const switchImgData = {
    src: isOn ? soundSwitchOn : soundSwitchOff,
    alt: (isOn ? "Mute" : "Unmute") + " background music/sound",
  };

  return (
    <button type="button" className="sound-switch" onClick={handleClick}>
      <img {...switchImgData} />
    </button>
  );
}

export default SoundSwitch;
