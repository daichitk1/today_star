import "./App.css";

import { Header } from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { AllReflection } from "./components/AllReflection";
import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";

export const Reflections = () => {
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
        <Header isAuthenticated={isAuthenticated}></Header>
        <div className="my-5">
          <Link
            to="/"
            className="mx-5 rounded-2xl text-blue-500 hover:text-blue-900"
          >
            home
          </Link>
        </div>
        <AllReflection allcomments={allcomments}></AllReflection>
      </div>
    </>
  );
};

export default Reflections;
