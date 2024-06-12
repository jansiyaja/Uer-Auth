import React, { useState, useEffect } from 'react';
import { useUpdateUserDetailsMutation } from '../../slices/admin/adminApiSlice';
import { toast } from 'react-toastify';


const EditUser = ({ userData, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [updateUser, { isLoading }] = useUpdateUserDetailsMutation();

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
    setProfileImage(userData.profileImage);
    setImagePreview(userData.profileImage);
  }, [userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setProfileImage(file);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kih91uwt');
    formData.append('cloud_name', 'djfhotv8n'); 
    formData.append('folder', 'profileImages');
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/djfhotv8n/image/upload', { 
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      toast.error('Image upload failed');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      let imageUrl = userData.profileImage;
      if (profileImage && profileImage !== userData.profileImage) {
        imageUrl = await uploadImageToCloudinary(profileImage);
        if (!imageUrl) {
          return;
        }
      }

      const updatedUser = { ...userData, name, email, password, profileImage: imageUrl };
      await updateUser(updatedUser).unwrap();
      toast.success('User updated successfully');
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
   
        
        <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>
      <div className="fixed w-full z-10 flex justify-center items-center">
        <div className="max-w-[400px] w-full bg-black p-7 text-cyan-800 relative">
          <button
            onClick={onClose}
            className="absolute right-4 text-white rounded-full "
            aria-label="Close"
          >
            X
          </button>
          <h1 className="text-3xl font-bold mb-5">Edit User</h1>
          <div className='flex items-center space-x-2'>
            <img
              src={imagePreview}
              alt={name}
              className='w-20 h-20 ml-6 mb-4 rounded-full'
            />
          </div>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
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
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 bg-transparent rounded border border-gray-600"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="p-3 bg-transparent rounded border border-gray-600"
            />
            {isLoading && <h2>Loading ...</h2>}
            <button className="bg-gray-900 py-3 rounded font-bold text-white">Update</button>
          </form>
        </div>
      </div>
        
      
    </>
  );
};

export default EditUser;
