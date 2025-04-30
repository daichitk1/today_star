import "./App.css";
import { NewTextBox } from "./components/NewTextBox";
import { EditTextBox } from "./components/EditTextBox";
import { Header } from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { AllReflection } from "./components/AllReflection";
import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";

function App() {
  const { isAuthenticated, user } = useAuth0();

  const [form, setForm] = useState({ comment: "" });
  const [todaycomments, setTodayComments] = useState([]);
  const [allcomments, setAllComments] = useState([]);
  const [editflag, setEditFlag] = useState(false);
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
      .post("http://localhost:4000/api/v1/today_reflection", {
        email: user.email,
      })
      .then((res) => {
        setTodayComments(res.data);
      });
  };
  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:4000/api/v1/today_reflection", {
          email: user.email,
        })
        .then((res) => {
          setTodayComments(res.data);
        });
    }
  }, [user]);
  const DeleteComment = async (today_comment) => {
    console.log(today_comment.id);
    await axios
      .delete(
        `http://localhost:4000/api/v1/daily_reflections/${today_comment.id}`
      )
      .then(() => {
        alert("削除しました");
        setTodayComments([]);
      });
  };
  return (
    <>
      <div className="max-w-300 mx-auto">
        <Header isAuthenticated={isAuthenticated}></Header>

        {isAuthenticated && (
          <div>
            <Link
              to="/Reflections"
              className="mx-5 rounded-2xl text-blue-500 hover:text-blue-900"
            >
              過去の振り返り
            </Link>
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
                  <div className="max-w-300 border-2 border-gray-400 mx-auto rounded-xl my-5 p-3">
                    <div className="flex">
                      <div className="text-white bg-red-600 w-50 text-center rounded-xl">
                        今日の振り返り
                      </div>
                    </div>
                    <div>
                      {todaycomments.map((today_comment, index) => (
                        <div>
                          <div key={index} className="text-3xl flex m-4">
                            <div className="me-5">
                              {" "}
                              {"⭐️".repeat(Number(today_comment.rating))}
                            </div>
                            <div className="me-5">{today_comment.comment}</div>
                          </div>
                          <div>
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold px-3 me-2 rounded-3xl"
                              onClick={() => setEditFlag(!editflag)}
                            >
                              編集
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold px-3 rounded-3xl"
                              onClick={() => DeleteComment(today_comment)}
                            >
                              削除
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      {editflag && (
                        <EditTextBox
                          form={form}
                          handleForm={handleForm}
                          setForm={setForm}
                          value={value}
                          setValue={setValue}
                          getComment={getComment}
                          todaycomments={todaycomments}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
