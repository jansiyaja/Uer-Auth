import React from 'react'
import { Route, Routes} from 'react-router-dom';

import SignIn from './pages/SignIn';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SignUp from './pages/SignUp';
import Home from './pages/home';
import store from './Store';
import { Provider } from 'react-redux';
import Profile from './pages/Profile';
import PrivateRoute from './Components/PrivateRoute';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminHome from './pages/Admin/AdminHome';
import UsersList from './pages/Admin/UsersList';
import AdminPrivateRoute from './Components/AdminPrivateRoute';

const App = () => {
  return (
    <>
    <Provider store={store}>
      <ToastContainer/>
      
      <Routes>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      {/* private route */}
         <Route path='' element={<PrivateRoute/>}>
               <Route path='/profile' element={<Profile/>}/>
          </Route>

          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/admin' element={<AdminHome/>}/>
          <Route path='' element={<AdminPrivateRoute/>}>
          <Route path='/admin/usersList' element={<UsersList/>}/>
          </Route>
         

      </Routes>
      


      </Provider>
    </>
  )
}

export default App
