import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Icon
import { LockClosedIcon } from "../component/icon";
// Hook
import useTitle from "../hooks/useTitle";
// Context
import { useAuth } from "../context/AuthContext";

const Register = () => {
  useTitle("Register");
  const navigate = useNavigate();
  const { register, isLoading, user } = useAuth();

  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", email: "", password: "" });

  return (
    <section className='flex justify-center items-center flex-col h-screen w-screen'>
      <h1 className='text-2xl sm:text-3xl font-bold'>Chirper Chat App</h1>
      <div className='w-11/12 sm:w-1/2 p-2 sm:p-4 flex justify-center items-center gap-2 flex-col shadow-md rounded-2xl my-4 border border-secondary'>
        <h1 className='inline-flex items-center mb-2 flex-col'>
          <LockClosedIcon className='h-8 w-8' />
          <p className='text-2xl sm:font-semibold'>Register</p>
        </h1>

        <form
          className='w-full sm:w-3/4'
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            register(form);
            if (user) {
              navigate("/login");
            }
          }}
        >
          <div>
            <label className='font-semibold'>Name</label>
            <input
              type='text'
              placeholder='Enter your name'
              className='block w-full my-3 rounded-sm outline outline-[1px] outline-zinc-400 border-0 py-2 px-5 text-black font-medium placeholder:text-black/80 placeholder:text-xs placeholder:font-semibold'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, name: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label className='font-semibold'>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              className='block w-full my-3 rounded-sm outline outline-[1px] outline-zinc-400 border-0 py-2 px-5 text-black font-medium placeholder:text-black/80 placeholder:text-xs placeholder:font-semibold'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, email: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label className='font-semibold'>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              className='block w-full my-3 rounded-sm outline outline-[1px] outline-zinc-400 border-0 py-2 px-5 text-black font-medium placeholder:text-black/80 placeholder:text-xs placeholder:font-semibold'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, password: e.target.value });
              }}
              required
            />
          </div>
          <button
            className='bg-black px-1 py-2 text-white w-full my-3 hover:bg-black/70'
            type='submit'
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <small className='text-zinc-500'>
          Already have an account?
          <Link className='text-primary hover:underline' to='/login'>
            Login
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
