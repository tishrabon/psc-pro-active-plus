import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import {
  IoNotificationsOutline,
  IoNotificationsOffOutline,
} from "react-icons/io5";
import { increaseVOLUME, decreaseVOLUME } from "../redux/appDataSlice";

const Volume = ({ label }: { label: string }) => {
  const domain: string = label;
  const dispatch = useAppDispatch();
  const mnVol = useAppSelector(
    (state) => state.appData.ambience.metronome.volume,
  );
  const seVol = useAppSelector(
    (state) => state.appData.ambience.serenityElements.volume,
  );
  const alertVolume = useAppSelector((state) => state.appData.clock.volume);

  return (
    <div className="horizontalC text-[12px] gap-3 my-2">
      {label === "metronome" ? (
        mnVol === 0 ? (
          <CiVolumeMute size={14} />
        ) : (
          <CiVolumeHigh size={14} />
        )
      ) : null}
      {label === "serenity" ? (
        seVol === 0 ? (
          <CiVolumeMute size={14} />
        ) : (
          <CiVolumeHigh size={14} />
        )
      ) : null}
      {label === "clock" ? (
        alertVolume === 0 ? (
          <IoNotificationsOffOutline size={14} />
        ) : (
          <IoNotificationsOutline size={14} />
        )
      ) : null}

      <div className={`${label === "clock" ? "gap-2" : "gap-3"} horizontalC`}>
        <button
          onClick={() => {
            dispatch(decreaseVOLUME(domain));
          }}
        >
          <CiCircleMinus size={20} />
        </button>

        <div>
          {label === "metronome" ? mnVol * 10 : null}
          {label === "serenity" ? seVol * 10 : null}
          {label === "clock" ? alertVolume * 10 : null}
        </div>

        <button
          onClick={() => {
            dispatch(increaseVOLUME(domain));
          }}
        >
          <CiCirclePlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Volume;
