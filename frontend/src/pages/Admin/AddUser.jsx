import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddNewUserMutation } from '../../slices/admin/adminApiSlice';
import { toast } from 'react-toastify';



const AddUser = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [addUser, { isLoading }] = useAddNewUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, password };
      await addUser(newUser).unwrap();
      toast.success('User added successfully');
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
     
     
        <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>
        <div className="fixed w-full px-4 py-4 z-30 flex justify-center items-center">
        <div className="max-w-[400px] w-full bg-black p-7 text-cyan-800 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4  text-white rounded-full p-2"
              aria-label="Close"
            >
              X
            </button>
            <h1 className="text-3xl font-bold mb-8">Add User</h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <input
                onChange={(e) => setName(e.target.value)}
                className="p-3 bg-transparent rounded border border-gray-600"
                type="text"
                placeholder="Name"
                value={name}
              />
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
              {isLoading && <h2>Loading...</h2>}
              <button type="submit" className="bg-gray-900 py-3 rounded font-bold text-white">Add User</button>
            </form>
          </div>
        </div>
      
    </>
  );
};

export default AddUser;
