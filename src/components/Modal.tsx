import ReactDOM from "react-dom";

type ModalProps = {
  open: boolean;
  exeClose: () =>  void;
  children: React.ReactNode;
}

const Modal = ({open, exeClose, children} : ModalProps) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="bg-white fixed z-[500] w-[300px] h-[400px] flex flex-col justify-between items-center py-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box-shadow rounded-[10px] overflow-y-scroll">  
      <div>
        {children}
      </div>          
      <button onClick={exeClose} className="px-5 py-2 bg-second rounded-[5px] mt-[50px] ">Done</button>
    </div>,
    document.body
  );
};

export default Modal;