import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserContext from './contexts/current-user-context';

import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import SignUpPage from './pages/SignUp';
import HomePage from './pages/Home';
import Profile from './pages/Profile';

import Settings from './pages/Settings';
import Gardens from './pages/Gardens';
import About from './pages/About';
import Garden from './components/GardenCard';
import Community from './pages/Community';
import PrivateRoutes from './components/PrivateRoutes';

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    const checkForUser = async () => {
      const user = await checkForLoggedInUser();
      setCurrentUser(user);
    };
    checkForUser();
  }, [setCurrentUser]);

  return (
    <div className="flex-col">
      <SiteHeadingAndNav />
      <main className="bg-white mt-[10vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/community" element={<Community />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
