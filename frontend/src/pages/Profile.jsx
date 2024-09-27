import React, { useState, useEffect } from 'react';
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
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setProfileImage(userInfo.profileImage);
  }, [userInfo]);

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
   
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/djfhotv8n/image/upload', { 
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Cloudinary API response:', data); 
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
      let imageUrl = userInfo.profileImage;
      if (profileImage && profileImage !== userInfo.profileImage) {
        imageUrl = await uploadImageToCloudinary(profileImage);
        if (!imageUrl) {
          return;
        }
      }

      const res = await updateProfile({ name, email, password, profileImage: imageUrl }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile Updated');
      navigate('/profile');
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
        <div className="max-w-[400px] w-full bg-white/50 p-7 text-cyan-800">
          <h1 className="text-3xl font-bold mb-5">Update Profile</h1>
          <div className='flex items-center space-x-2'>
            <img
              src={imagePreview || userInfo.profileImage}
              alt={userInfo.name}
              className='w-25 h-24 ml-6 mb-7 rounded-full'
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
    </div>
  );
};

export default Profile;
