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
      <Route path='/write' element={<Write />} />
      <Route path='/post/:postId' element={<SinglePostView />} />

      <Route  path='*' element={<Navigate to={!currUser ? "/First" : "/"} />} />
    </Routes>
    
    </>
  )
}

export default App
