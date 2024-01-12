import { useState } from "react";
// Icon
import { AddIcon } from "../icon";
import { chatType } from "../../model/chat";
import { IUser } from "../../model/user";

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
  const [type, setType] = useState<chatType>("private");
  const [name, setName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const createChat = async () => {
    try {
      if (type === "group" && name === "") {
        alert("Please provide group name");
        return;
      }

      if (selectedUsers.length == 0) {
        alert("Please provide chat member(s)");
        return;
      }
      let memberIDs: number[] = [];

      for (const user of selectedUsers) {
        memberIDs.push(user.id);
      }

      const response = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, chatType: type, memberIDs }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.msg || "Couldn't create chat");
        return;
      }

      alert(data.msg);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='relative'>
      <div
        className='fixed h-full w-full bg-transparent top-0 left-0 right-0 bottom-0'
        onClick={() => setShowModal(false)}
      ></div>
      <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-md w-11/12 sm:w-1/2 h-fit p-2 flex flex-col justify-between gap-4'>
        <header>
          <h1 className='font-semibold text-lg mb-2'>Create Chat</h1>

          <div className='flex justify-start items-center gap-2'>
            <p
              className={`${
                type === "private" ? "font-semibold text-primary" : ""
              } text-xs transition-all duration-300`}
            >
              Private
            </p>
            <h2
              className='w-8 h-4 rounded-xl border relative'
              onClick={() => setType(type === "private" ? "group" : "private")}
            >
              <span
                className={`h-full w-4 block  absolute ${
                  type === "private"
                    ? "left-0 bg-primary/70"
                    : "right-0 bg-emerald-400"
                } rounded-full`}
              ></span>
            </h2>
            <p
              className={`${
                type === "group" ? "font-semibold text-emerald-400" : ""
              } text-xs transition-all duration-300`}
            >
              Group
            </p>
          </div>
          {type === "group" && (
            <input
              type='text'
              placeholder='Enter a group name...'
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className='w-full bg-transparent border outline-none p-2 rounded-xl my-3'
            />
          )}
        </header>

        <SearchUser
          type={type}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />

        <div className='flex justify-between items-center gap-2'>
          <button
            className='bg-dark border w-full p-2 rounded-3xl'
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button
            className='w-full p-2 rounded-3xl bg-primary/85'
            onClick={createChat}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

type SearchUserProps = {
  type: chatType;
  selectedUsers: IUser[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
};

const SearchUser = ({
  type,
  selectedUsers,
  setSelectedUsers,
}: SearchUserProps) => {
  const [result, setResult] = useState<IUser[] | null>(null);

  const handleFindUsers = async (username: string) => {
    try {
      if (username == "") {
        return;
      }
      const response = await fetch("/api/v1/user/users/" + username);
      const data = await response.json();

      if (!response.ok) {
        alert(data?.msg || "Couldn't get users");
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className=''>
      <input
        type='search'
        placeholder='Search users'
        className='bg-transparent border-transparent border border-b-primary w-full outline-none focus:border-2'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value === "") {
            setResult(null);
            return;
          }
          handleFindUsers(e.target.value);
        }}
      />

      <div className='flex justify-start items-center gap-2 my-2'>
        {selectedUsers.length > 0 &&
          selectedUsers.map((user) => (
            <div
              key={user.id}
              className='bg-primary rounded-xl flex justify-between items-center gap-2 py-1 pl-2 pr-1 text-xs'
            >
              <span className='text-ellipsis'>{user.name}</span>
              <button
                className='text-black rounded-full text-sm'
                onClick={() => {
                  const newList = selectedUsers.filter(
                    (selectedUser) => user !== selectedUser
                  );
                  setSelectedUsers(newList);
                }}
              >
                x
              </button>
            </div>
          ))}
      </div>

      <div
        className={`w-11/12 bg-dark/55 border h-fit absolute ${
          result && result.length > 0 ? "flex" : "hidden"
        } flex-col justify-start items-start gap-2 py-1 rounded-lg`}
      >
        {result &&
          result.length > 0 &&
          result.map((user) => (
            <p
              key={user.id}
              className='border border-transparent border-b-primary cursor-pointer w-full'
              onClick={() => {
                if (type == "private") {
                  if (selectedUsers && selectedUsers.length > 1) {
                    alert("Private users can only allow at most two members");
                    return;
                  }
                }

                if (!selectedUsers.includes(user)) {
                  setSelectedUsers([...selectedUsers, user]);
                }
              }}
            >
              {user.name}
            </p>
          ))}
      </div>
    </main>
  );
};

export default CreateChat;
