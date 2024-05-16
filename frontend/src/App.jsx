// import { useContext, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import SignUpPage from './pages/SignUp';
// import LoginPage from './pages/Login';
// import SiteHeadingAndNav from './components/SiteHeadingAndNav';
// import NotFoundPage from './pages/NotFound';
// import UserContext from './contexts/current-user-context';
// import { checkForLoggedInUser } from './adapters/auth-adapter';
// import UsersPage from './pages/Users';
// import UserPage from './pages/User';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';

// import Gardens from './pages/Gardens';
// import GardenProfile from './pages/GardenProfile';
// import Community from './pages/Community';
// import HomePage from './pages/Home';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';


// export default function App() {
//   const { setCurrentUser } = useContext(UserContext);
//   useEffect(() => {
//     checkForLoggedInUser().then(setCurrentUser);
//   }, [setCurrentUser]);

//   return (
//     <div className='flex-col'>
//       <SiteHeadingAndNav />
//       <main className="bg-white mt-[10vh]">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/sign-up" element={<SignUpPage />} />
//           <Route path="/users" element={<UsersPage />} />
//           <Route path="/users/:id" element={<UserPage />} />
//           <Route path="*" element={<NotFoundPage />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/community" element={<Community />} />
//           <Route path="/gardens" element={<Gardens />} />
//           <Route path="/gardens/:id" element={<GardenProfile />} />
          
//         </Routes>
//       </main>
//     </div>
//   );
// }


import { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Gardens from './pages/Gardens';
import GardenProfile from './pages/GardenProfile';
import Community from './pages/Community';
import HomePage from './pages/Home';

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  const location = useLocation(); // Hook to access the current location.

  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return (
    <div className='flex-col'>
      <SiteHeadingAndNav />
      <main className="bg-white mt-[10vh]">
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="page"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/community" element={<Community />} />
              <Route path="/gardens" element={<Gardens />} />
              <Route path="/gardens/:id" element={<GardenProfile />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </main>
    </div>
  );
}

// CSS for transitions

