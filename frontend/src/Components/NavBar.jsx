import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice'; 
import { logout } from '../slices/authSlice';

const NavBar = () => {

const {userInfo} =  useSelector((state) => state.auth );
const dispatch = useDispatch();
const  navigate = useNavigate();

const [logoutApiCall] = useLogoutMutation(); 

const handleLogout = async () => {
  try {
     await logoutApiCall().unwrap();
     dispatch(logout());
     navigate('/')
  } catch (error) {
    console.log(error);
  }
}

return (
  <>
    <div className="flex items-center justify-between w-full p-2 z-[100] absolute top-0 bg-white">
      <Link to={'/'}>
        <h1 className='h-8 md:h-12 px-4 md:px-10 lg:px-20 font-bold color  text-3xl text-cyan-800'> User-Auth</h1>
      </Link>

      {userInfo ? (
        <div className='flex items-center space-x-4 mr-4 md:mr-10'>
          <div className='flex items-center space-x-2'>
          <Link to={'/profile'}>
            <img src={userInfo.profileImage} alt={userInfo.name} className='w-8 h-8 rounded-full' /> {/* Assuming profileImage is the URL to the user's profile image */}
            </Link>
            <p>{userInfo.name}</p>
          </div>
          <button onClick={handleLogout} className='bg-gray-950 text-white white rounded cursor-pointer px-2 py-1 md:px-4 md:py-2'>
            Logout
          </button>
        </div>
      ) : (
        <div className='flex items-center space-x-4 mr-4 md:mr-10'>
          <Link to={'/signup'}>
            <button className='bg-gray-950 text-white white rounded cursor-pointer px-2 py-1 md:px-4 md:py-2'>
              Sign Up
            </button>
          </Link>
          <Link to={'/login'}>
            <button className='bg-gray-950 text-white white rounded cursor-pointer px-2 py-1 md:px-4 md:py-2'>
              Sign In
            </button>
          </Link>
        </div>
      )}
    </div>
  </>
);
}

export default NavBar
