import React from 'react'
import { Route, Routes} from 'react-router-dom';
import NavBar from './Components/NavBar'
import SignIn from './pages/SignIn';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SignUp from './pages/SignUp';
import Home from './pages/home';
import store from './Store';
import { Provider } from 'react-redux';
import Profile from './pages/Profile';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  return (
    <>
    <Provider store={store}>
      <ToastContainer/>
      <NavBar/>
      <Routes>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      {/* private route */}
         <Route path='' element={<PrivateRoute/>}>
               <Route path='/profile' element={<Profile/>}/>
          </Route>
      </Routes>
      </Provider>
    </>
  )
}

export default App
