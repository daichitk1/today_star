import "./App.css";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
function App() {
  const [tag, setTag] = useState("");
  const { isAuthenticated } = useAuth0();
  const [textbox, setTextbox] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/tags", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setTag(response.data[0].name);
      });
  }, []);

  const TextBox = () => (
    <div className="h-300 w-300 bg-gray-100 rounded-3xl">
      <button
        onClick={() => {
          setTextbox(false);
        }}
        className="h-15 w-15 rounded-full bg-gray-300 hover:bg-gray-500 text-center text-middle"
      >
        非表示
      </button>
      <div>日常</div>
      <div>フォーム</div>
    </div>
  );

  return (
    <>
      <div className="max-w-300 mx-auto">
        <header className="max-w-300 mx-auto my-auto py-3 rounded-3xl bg-gray-100">
          <div className="flex justify-between px-10">
            <h2 className="my-auto text-xl font-bold text-blue-500">
              日常振り返りアプリ
            </h2>
            <div className="flex">
              {tag}
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
            <button className="mx-1 my-auto max-w-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl">
              新規タグ
            </button>
            <button
              onClick={() => {
                setTextbox(true);
              }}
              className="mt-3 my-auto max-w-300 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl"
            >
              記録作成
            </button>
            {textbox && <TextBox />}

            <div>
              <div className="max-w-300 h-100 bg-blue-100 mx-auto rounded-3xl my-10 p-3">
                <div className="text-white bg-blue-600 w-30 text-center rounded-3xl">
                  1週間の結果
                </div>
              </div>
              <div className="max-w-300 h-100 bg-red-100 mx-auto rounded-3xl my-10 p-3">
                <div className="text-white bg-red-600 w-30 text-center rounded-3xl">
                  今日の結果
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
