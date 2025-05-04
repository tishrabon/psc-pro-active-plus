import { useState } from "react";
import { FaLaughBeam } from "react-icons/fa";

import { useAppSelector } from "../../hooks/reduxHooks";
import Equalizer from "../../components/Equalizer";
import Clock from "../../components/Clock";

const Home = () => {
  const [holler, setHoller] = useState(false);
  const [whyHoller, setWhyHoller] = useState(false);

  const { occupied, completed } = useAppSelector(
    (state) => state.appData.clock,
  );

  return (
    <div className="homepage-container verticalS gap-5">
      <div className="verticalS gap-3">
        {/* equalizer */}
        <Equalizer />

        {!holler && occupied && !completed && (
          <div className="verticalS w-full sm:w-[500px] px-[30px]">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="horizontalC gap-5">
                <FaLaughBeam size={36} className="text-material" />
                <button
                  onClick={() => {
                    setTimeout(() => {
                      setHoller(true);
                    }, 700);
                  }}
                  className="text-[12px] text-gray-500 py-1 px-3 tapButton rounded-[5px] verticalC"
                >
                  Tap to Holler!
                </button>
              </div>

              <button
                onClick={() => {
                  setWhyHoller((prev) => !prev);
                }}
                className=" text-[10px] py-1 px-3 verticalC text-material"
              >
                {!whyHoller ? "why holler?" : "okay! close it."}
              </button>
            </div>
            {whyHoller && (
              <div className="text-[12px] p-2 text-gray-500">
                Why Holler?? Some browsers block sounds until you interact
                first, especially if the page is reloaded. It's like a little
                handshake with your browser to make sure session alerts play!
                Sorry for the little detour!
              </div>
            )}
          </div>
        )}

        <Clock />
      </div>
    </div>
  );
};

export default Home;
