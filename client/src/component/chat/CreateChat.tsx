import { useState } from "react";
// Icon
import { AddIcon } from "../icon";

const CreateChat = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <input
        type='search'
        placeholder='Search chats'
        className='bg-transparent border-transparent border border-b-primary w-full outline-none focus:border-2'
      />
      {showModal && <Modal setShowModal={setShowModal} />}
      <button
        className='bg-primary/45 p-1 rounded-lg'
        onClick={() => setShowModal(true)}
        title='create chat'
      >
        <AddIcon className='w-6 h-6' />
      </button>
    </>
  );
};

type ModalType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ setShowModal }: ModalType) => {
  return (
    <div
      className='fixed bg-secondary/35 top-0 left-0 right-0 bottom-0'
      onClick={() => setShowModal(false)}
    >
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-300 rounded-md w-11/12 sm:w-1/2 h-40'>
        Add Chat modal
      </div>
    </div>
  );
};

export default CreateChat;
