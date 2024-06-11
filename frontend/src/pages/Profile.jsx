import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';


const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
  
    const { userInfo } = useSelector((state) => state.auth);

    const [UpdateProfile,{isLoading}] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);
    

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          const res = await UpdateProfile({ _id: userInfo._id, name, email, password }).unwrap();
          console.log( name, email, password);
          dispatch(setCredentials({ ...res }));
          toast.success('Profile Updated');
          navigate('/profile');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
  return (
    <div className="relative w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="/src/Images/background.png"
        alt="Background"
      />
      <div className=" fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50 flex justify-center items-center">
        <div className="max-w-[400px] w-full  bg-white/50 p-8 text-cyan-800">
          <h1 className="text-3xl font-bold mb-8">Update Profile</h1>
          <form className="flex flex-col space-y-4  " onSubmit={handleSubmit}>
          <input
            onChange={(e)=>setName(e.target.value)}
              className="p-3 bg-transparent rounded border border-gray-600 "
              type="string"
              placeholder="Name "
              value={name}
            />
            <input
            onChange={(e)=>setEmail(e.target.value)}
              className="p-3 bg-transparent rounded border border-gray-600 "
              type="email"
              placeholder="Email "
              value={email}
            />
            <input
            onChange={(e)=>setPassword(e.target.value)}
              className="p-3 bg-transparent rounded border border-gray-600"
              type="password"
              placeholder="Password"
              value={password}
            />
             <input
            onChange={(e)=>setConfirmPassword(e.target.value)}
              className="p-3 bg-transparent rounded border border-gray-600"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
            />

             { isLoading  && <h2>loading ...</h2>}
            <button className="bg-gray-900 py-3 rounded font-bold text-white"> Update</button>
            <div className="flex justify-between items-center text-md text-white">
             
            </div>
           
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
