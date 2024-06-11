import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const SignIn = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  
  return (
    <div className="relative w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="/src/Images/background.png"
        alt="Background"
      />
      <div className="fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50 flex justify-center items-center">
        <div className="max-w-[400px] w-full bg-white/50 p-8 text-cyan-800">
          <h1 className="text-3xl font-bold mb-8">Sign In</h1>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 bg-transparent rounded border border-gray-600"
              type="email"
              placeholder="Email"
              value={email}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 bg-transparent rounded border border-gray-600"
              type="password"
              placeholder="Password"
              value={password}
            />
            { isLoading  && <h2>loading ...</h2>}
            <button type="submit" className="bg-gray-900 py-3 rounded font-bold text-white">Sign In</button>
            <div className="flex justify-between items-center text-md text-white">
              <p>
                <input type="checkbox" className="mr-2 mt-2 size-4 text-white" /> Remember me
              </p>
            </div>
            <p className="text-left text-gray-400 mt-3">
              New Member?{' '}
              <Link to="/signUp" className="text-white hover:text-black">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
