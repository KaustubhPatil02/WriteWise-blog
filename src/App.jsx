import { Routes, Route, Navigate } from 'react-router-dom'
import First from './components/First/First'
import Home from './components/Home/Home'
import FirstHeader from './components/First/FirstHeader';
import { Blog } from './contextAPI/Context';
import { ToastContainer } from 'react-toastify';
import Profile from './components/Home/UserProfile/Profile';
import Write from './components/Home/WritePost/Write';
import SinglePostView from './components/common_components/Posts/SinglePostView';
import HomeHeader from './components/Home/Header-components/HomeHeader';
import Auth from './components/First/AuthModal/Auth';
import SignIn from './components/First/AuthModal/SignIn';
import Posts from './components/common_components/Posts/Posts';
import Edit from './components/common_components/Posts/PostActions/Edit';


function App() {
  const {currUser} = Blog();
  // const currUser = true;
  return (
    <>
    {currUser ? <HomeHeader /> : <FirstHeader />}
    <ToastContainer />
    <Routes>
     {currUser && <Route path="/" element={<Home />} />}
      {!currUser && <Route path="first" element={<First />} />}
      {/* to get userid for diff profiles dynamically */}
      <Route path='/profile/:userId' element={<Profile />}/>
      <Route path='/getstarted' element={<Write />} /> 
      <Route path='/write' element={<Write />} />
      <Route path='/post/:postId' element={<SinglePostView />} />
      <Route path='/edit/:postId' element={<Edit />} />

      <Route  path='*' element={<Navigate to={!currUser ? "/First" : "/"} />} />
    </Routes>
    
    </>
  )
}

export default App
