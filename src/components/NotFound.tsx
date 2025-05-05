import { TbMoodSadFilled } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className="w-full verticalS gap-1 mt-[80px]">
      <TbMoodSadFilled size={50} className="text-material" />
      <p className="text-[30px]">404</p>
      <p>Lost? Time to refocus!</p>
    </div>
  );
};

export default NotFound;
