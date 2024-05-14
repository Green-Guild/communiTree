import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";

let acc = (
  <img
    width="22"
    height="22"
    src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/guest-male.png"
    alt="guest-male"
  />
);

const tabs = ["Community", "Gardens", "Events", "Account"];
const map = {
  Community: "/community",
  Gardens: "/gardens",
  Events: "/events",
};

const accountOptions = [
  { label: "Profile", path: "/profile" },
  { label: "Settings", path: "/settings" },
  { label: "Log In", path: "/login", color: "text-bright-orange" },
];

const SiteHeadingAndNav = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  return (
    <div className="z-50 fixed px-4 w-full top-0 py-2 flex justify-between items-center bg-white">
      <a className="pulse" id="logo" href="/">
        <img
          src="https://i.ibb.co/7vhXpqq/new-logo.png"
          alt="logo"
          style={{ width: "3.5vw", height: "3.5vw" }}
        />
      </a>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-5 ml-auto">
        {tabs.map((tab) =>
          tab === "Account" ? (
            <div
              key={tab}
              className="relative"
              onMouseEnter={() => setAccountDropdownOpen(true)}
            >
              <Chip
                text={tab}
                selected={selected === tab}
                setSelected={setSelected}
              />
              {accountDropdownOpen && (
                <ul
                  className="absolute top-full mt-2 bg-white shadow-lg rounded-lg font-ubuntu flex flex-col"
                  onMouseLeave={() => setAccountDropdownOpen(false)}
                >
                  {accountOptions.map((option) => {
                    console.log(option);

                    return (
                      <li key={option.label}>
                        <NavLink
                          to={option.path}
                          className="block px-4 py-2 hover:bg-gray-200 font-ubuntu text-black"
                        >
                          {option.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ) : (
            <NavLink to={map[tab]} key={tab}>
              {
                <Chip
                  text={tab}
                  selected={selected === tab}
                  setSelected={setSelected}
                />
              }
            </NavLink>
          )
        )}
      </div>
    </div>
  );
};

const Chip = ({ text, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`relative px-2.5 py-0.5 rounded-md transition-colors text-sm ${
        selected
          ? "text-white font-medium"
          : "text-bright-orange hover:bg-slate-700 font-medium"
      }`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-bright-orange to-bright-orange rounded-full"
        ></motion.span>
      )}
    </button>
  );
};

export default SiteHeadingAndNav;
