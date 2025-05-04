import { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { soundKey } from "../config/freesound";

const Ambience = () => {
  const clockData = useAppSelector((state) => state.appData.clock);
  const mn = useAppSelector((state) => state.appData.ambience.metronome);
  const se = useAppSelector((state) => state.appData.ambience.serenityElements);

  const [soundUrl, setSoundUrl] = useState<null | string>(null);

  const fetchElement = async () => {
    try {
      if (se.selected && clockData.occupied) {
        // first priority to fetch from localStorage to save api reqs
        const cachedUrl = localStorage.getItem(`element-${se.elementId}`);
        if (cachedUrl) {
          setSoundUrl(cachedUrl);
          // console.log("loaded from cache", cachedUrl);
          return;
        }

        if (
          !clockData.paused &&
          !clockData.completed &&
          (clockData.running === "work" || clockData.running === "break")
        ) {
          const response = await fetch(
            `https://freesound.org/apiv2/sounds/${se.elementId}/?token=${soundKey}`,
          );
          const data = await response.json();

          if (data) {
            setSoundUrl(data.previews["preview-hq-mp3"]);
            console.log("sound fetched from api");
            localStorage.setItem(
              `element-${se.elementId}`,
              data.previews["preview-hq-mp3"],
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchElement();
  }, [se.selected, se.element, clockData.occupied, clockData.resumed]);

  useEffect(() => {
    fetchElement();
  }, []);

  useEffect(() => {
    if (
      se.selected &&
      !clockData.paused &&
      !clockData.completed &&
      soundUrl &&
      (clockData.running === "work" || clockData.running === "break")
    ) {
      const sound = new Audio(soundUrl);
      sound.loop = true;
      sound.play();
      sound.volume = se.volume;

      return () => {
        sound.pause();
        sound.currentTime = 0;
      };
    }
  }, [
    se.selected,
    se.volume,
    clockData.running,
    clockData.paused,
    clockData.completed,
    soundUrl,
  ]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (
      mn.selected &&
      !clockData.paused &&
      !clockData.completed &&
      (clockData.running === "work" || clockData.running === "break")
    ) {
      const tick = new Audio(mn.sound);
      const playTick = () => {
        tick.currentTime = 0;
        tick.play();
        tick.volume = mn.volume;
      };
      interval = setInterval(playTick, (60 / mn.bpm) * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mn, clockData]);

  return null;
};

export default Ambience;
