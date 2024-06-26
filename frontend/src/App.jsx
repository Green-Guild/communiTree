import { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import UserContext from "./contexts/current-user-context";

import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import Profile from "./pages/Profile";

import Settings from "./pages/Settings";
import Gardens from "./pages/Gardens";
import GardenProfile from "./pages/GardenProfile";
import Community from "./pages/Community";
import PrivateRoutes from "./components/PrivateRoutes";
import Events from "./pages/Events";
import EventsProfile from "./pages/EventsProfile";
import Notifications from "./components/Notifications";
import Post from "./components/Post";
import PostProfile from "./components/PostProfile";

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  const [userLoading, setUserLoading] = useState(true);

  const location = useLocation(); // Hook to access the current location.

  useEffect(() => {
    const checkForUser = async () => {
      const user = await checkForLoggedInUser();
      setCurrentUser(user);
      setUserLoading(false);
    };
    checkForUser();
  }, [setCurrentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // This useEffect will run every time the location changes

  return (
    <div className="w-screen flex-col">
      <SiteHeadingAndNav />
      <main className="bg-white w-screen dark:bg-black mt-[10vh]">
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={300} classNames="page">
            <Routes location={location}>
              <Route
                path="/"
                element={<HomePage userLoading={userLoading} />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserPage />} />

              <Route element={<PrivateRoutes userLoading={userLoading} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventsProfile />} />
              </Route>
              <Route path="/community" element={<Community />} />
              <Route path="/gardens" element={<Gardens />} />
              <Route path="/gardens/:id" element={<GardenProfile />} />

              <Route path="*" element={<NotFoundPage />} />

              <Route path="/post/:postId" element={<PostProfile />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </main>
    </div>
  );
}

// CSS for transitions
