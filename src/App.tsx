import "./App.css";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <header className="max-w-300 mx-auto my-auto py-3 rounded-3xl bg-gray-100">
        <div className="flex justify-between px-10">
          <h2 className="my-auto text-xl font-bold text-blue-500">
            日常振り返りアプリ
          </h2>
          <div className="flex">
            {!isAuthenticated ? (
              <div className="my-auto">
                <LoginButton></LoginButton>
              </div>
            ) : (
              <div className="flex">
                <div className="bg-blue-100 rounded-3xl mx-3 py-3 px-2">
                  <Profile></Profile>
                </div>
                <div className="my-auto">
                  <LogoutButton></LogoutButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default App;
