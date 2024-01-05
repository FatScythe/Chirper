import { SendIcon } from "../icon";

const MessageInput = () => {
  return (
    <div className='flex justify-between items-center w-full'>
      <textarea
        rows={1}
        className='basis-11/12 p-2 rounded-3xl bg-transparent outline-none border border-primary resize-none'
        placeholder='Message...'
      />
      <button className='basis-1/12  mx-auto'>
        <SendIcon className='w-10 h-10 bg-dark p-2 rounded-full' />
      </button>
    </div>
  );
};

export default MessageInput;
