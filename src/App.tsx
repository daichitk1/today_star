import "./App.css";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <header className="my-auto">
        <div>
          {!isAuthenticated ? (
            <LoginButton></LoginButton>
          ) : (
            <LogoutButton></LogoutButton>
          )}
          <Profile></Profile>
        </div>
      </header>
    </>
  );
}

export default App;
