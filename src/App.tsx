import "./App.css";
import { NewTextBox } from "./components/NewTextBox";
import { EditTextBox } from "./components/EditTextBox";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { AllReflection } from "./components/AllReflection";
import axios from "axios";
import * as React from "react";

function App() {
  const { isAuthenticated, user } = useAuth0();

  const [form, setForm] = useState({ comment: "" });
  const [todaycomments, setTodayComments] = useState([]);
  const [allcomments, setAllComments] = useState([]);
  const [value, setValue] = React.useState<number | null>(2);
  const handleForm = (e: unknown) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    getComment();
  };

  const getComment = async () => {
    await axios
      .get("http://localhost:4000/api/v1/today_reflection?email=" + user.email)
      .then((res) => {
        setTodayComments(res.data);
      });
  };
  useEffect(() => {
    if (user) {
      axios
        .get(
          "http://localhost:4000/api/v1/today_reflection?email=" + user.email
        )
        .then((res) => {
          setTodayComments(res.data);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          "http://localhost:4000/api/v1/daily_reflections?email=" + user.email
        )
        .then((res) => {
          setAllComments(res.data);
        });
    }
  }, [user, todaycomments]);

  return (
    <>
      <div className="max-w-300 mx-auto">
        <header className="max-w-300 mx-auto my-auto py-3 rounded-xl bg-gray-100">
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
                  <div className="bg-blue-100 rounded-xl mx-3 py-3 px-2">
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
            {todaycomments.length == 0 ? (
              <NewTextBox
                form={form}
                handleForm={handleForm}
                setForm={setForm}
                value={value}
                setValue={setValue}
                getComment={getComment}
              />
            ) : (
              <>
                <div>
                  <div className="max-w-300 border-2 border-gray-400 mx-auto rounded-xl my-10 p-3">
                    <div className="text-white bg-red-600 w-30 text-center rounded-xl">
                      今日の振り返り
                    </div>
                    <div>
                      {todaycomments.map((today_comment, index) => (
                        <div key={index} className="flex m-2">
                          <div className="me-5">{today_comment.comment}</div>
                          <div>
                            {" "}
                            {"⭐️".repeat(Number(today_comment.rating))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <EditTextBox
                  form={form}
                  handleForm={handleForm}
                  setForm={setForm}
                  value={value}
                  setValue={setValue}
                  getComment={getComment}
                  todaycomments={todaycomments}
                />
              </>
            )}
          </div>
        )}
      </div>
      <AllReflection allcomments={allcomments}></AllReflection>
    </>
  );
}

export default App;
