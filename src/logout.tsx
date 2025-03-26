import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full text-xs"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      ログアウト
    </button>
  );
};

export default LogoutButton;
