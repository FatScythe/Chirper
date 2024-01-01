import image from "../../assets/react.svg";

const SingleChat = () => {
  return (
    <div className='flex justify-start items-center gap-4 my-2 p-2 rounded-md hover:bg-white/5'>
      <img src={image} className='h-8 w-8 rounded-full' />
      <main className='w-4/5 text-ellipsis overflow-hidden'>
        <h3 className='whitespace-nowrap text-sm font-bold'>
          Chat name Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quos debitis dolorem sapiente saepe officia possimus fuga repellendus
          placeat enim laborum provident molestiae accusantium veniam,
          voluptatum totam beatae iure culpa vero?
        </h3>
        <small className='font-thin text-slate-300'>last message</small>
      </main>
    </div>
  );
};

export default SingleChat;