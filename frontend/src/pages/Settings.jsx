import { useState } from "react";

const Settings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        if (name === "currentPassword") setCurrentPassword(value);
        if (name === "newPassword") setNewPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // password change logic
    };

    return (
        <div className="flex align-middle justify-center">
        {/* <div className={`bg-${isDarkMode ? 'black' : 'yellow'} rounded-t-2xl flex flex-col items-center w-4 mt-5 py-14 h-screen px-40 shadow-lg border-none justify-center`}> */}
        <div className={"bg-yellow rounded-t-2xl bg-opacity-80 flex flex-col items-center w-4 mt-5 py-14 h-screen px-40 shadow-lg border-none justify-center"}>
            {/* <h2 className="text-center text-bright-orange">Settings</h2> */}
            
            {/* Light/Dark Mode Toggle */}
            <button
                className="text-white text-center bg-bright-orange hover:text-bright-orange hover:bg-white hover:shadow-md shadow-inner hover:shadow-inner-white font-thin text-sm rounded-2xl px-2.5 py-0.5"
                onClick={toggleTheme}
            >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Change Password Form */}
                <div className="bg-yellow shadow-sm rounded-3xl p-2 m-4">
                <form onSubmit={handlePasswordSubmit} className="mt-5 border-none font-normal text-white">
                    <label htmlFor="currentPassword">Current Password*</label>
                    <input
                        className="rounded-lg text-black font-normal p-1"
                        autoComplete="off"
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handlePasswordChange}
                    />

                    <label htmlFor="newPassword">New Password*</label>
                    <input
                        className="rounded-lg text-black font-normal p-1"
                        autoComplete="off"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handlePasswordChange}
                    />

                    <label htmlFor="confirmPassword">Confirm New Password*</label>
                    <input
                        className="rounded-lg text-black font-normal p-1"
                        autoComplete="off"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handlePasswordChange}
                    />

                    <button
                        className="text-white bg-bright-orange hover:text-bright-orange hover:bg-white hover:shadow-md shadow-inner hover:shadow-inner-white font-medium rounded-full px-2.5 py-0.5"
                    >
                        Change Password
                    </button>
                </form>
            </div>

            {/* Log Out Button */}
            <button
                className="mt-5 text-white bg-bright-orange hover:text-bright-orange hover:bg-white hover:shadow-md shadow-inner hover:shadow-inner-white font-medium rounded-lg px-2.5 py-0.5"
                onClick={() => {
                    // log out logic
                }}
            >
                Log Out
            </button>
        </div>
        </div>
    );
};

export default Settings;
