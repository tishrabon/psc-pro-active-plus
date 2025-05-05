import { IoIosWarning } from "react-icons/io";

const Notice = () => {
  return (
    <div className="w-full max-w-[500px] bg-red-500 rounded-[5px] text-yellow-300 p-4 mx-5 text-[14px] verticalC gap-2">
      <IoIosWarning size={32} />
      <p>
        For now, logging in or registering won’t provide extra app features.
        This is an early demo, account features are coming in future releases.
      </p>
    </div>
  );
};

export default Notice;
