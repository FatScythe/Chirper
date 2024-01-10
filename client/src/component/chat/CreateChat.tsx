import { useState } from "react";
// Icon
import { AddIcon } from "../icon";

const CreateChat = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='flex justify-start items-center gap-2 w-full relative'>
      <input
        type='search'
        placeholder='Search chats'
        className='bg-transparent border-transparent border border-b-primary w-full outline-none focus:border-2 basis-11/12'
      />
      {showModal && <Modal setShowModal={setShowModal} />}
      <button
        className='bg-primary/45 p-1 rounded-lg'
        onClick={() => setShowModal(true)}
        title='create chat'
      >
        <AddIcon className='w-6 h-6' />
      </button>
    </div>
  );
};

type ModalType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ setShowModal }: ModalType) => {
  return (
    <div className='relative'>
      <div
        className='fixed h-full w-full bg-transparent top-0 left-0 right-0 bottom-0'
        onClick={() => setShowModal(false)}
      ></div>
      <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-md w-11/12 sm:w-1/2 h-1/3 p-2'>
        <div>
          <h2>Chat type</h2>
        </div>
        <input
          type='search'
          placeholder='Search chats'
          className='bg-transparent border-transparent border border-b-primary w-full outline-none focus:border-2 basis-11/12'
        />
      </div>
    </div>
  );
};

export default CreateChat;
