import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full text-xs"
      onClick={() => loginWithRedirect()}
    >
      ログイン
    </button>
  );
};

export default LoginButton;
