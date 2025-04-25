import "./App.css";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

function App() {
  const { isAuthenticated } = useAuth0();
  const [textbox, setTextbox] = useState(false);
  const [form, setForm] = useState({ comment: "コメント" });

  const handleForm = (e) => {
    console.log(form.comment);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const TextBox = () => (
    <div className="h-300 w-300 bg-green-200 rounded-3xl my-5">
      <button
        onClick={() => {
          setTextbox(false);
        }}
        className="p-3 m-3 rounded-3xl bg-gray-100 hover:bg-gray-300 text-center text-middle"
      >
        非表示
      </button>

      <form>
        <label htmlFor="comment">今日の一言</label>
        <br />
        <input
          name="comment"
          onChange={handleForm}
          placeholder="コメントを入力してください"
          className="m-5 rounded-xl bg-white w-100 h-10"
          value={form.comment}
        ></input>
        <button
          type="button"
          className="w-20 h-8 rounded-xl bg-white hover:bg-gray-300"
        >
          決定
        </button>
      </form>
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
            {form.comment}
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
