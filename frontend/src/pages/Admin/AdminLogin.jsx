import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/admin/adminApiSlice';
import { setCredentials } from '../../slices/admin/adminAuthSlice';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate('/admin');
    }
  }, [navigate, adminInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/admin');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  
  return (
    <div className="relative w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="/src/Images/adminbackground.jpg"
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
           
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
