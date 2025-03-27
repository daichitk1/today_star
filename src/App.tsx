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
      {isAuthenticated && (
        <div>
          <div className="w-200 h-100 bg-blue-100 mx-auto rounded-3xl my-10 p-3">
            <div className="bg-blue-400 w-30 text-center rounded-3xl">
              1週間の結果
            </div>
          </div>
          <div className="w-200 h-100 bg-red-100 mx-auto rounded-3xl my-10 p-3">
            <div className="bg-red-400 w-30 text-center rounded-3xl">
              今日の結果
            </div>
          </div>
        </div>
      )}
      <footer className="max-w-300 h-20 mx-auto my-auto py-3 bg-gray-100">
        <div className="flex justify-between px-10"></div>
      </footer>
    </>
  );
}

export default App;
