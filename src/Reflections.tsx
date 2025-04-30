import "./App.css";

import { Header } from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { AllReflection } from "./components/AllReflection";
import axios from "axios";
import { Link } from "react-router-dom";

export const Reflections = () => {
  const { isAuthenticated, user } = useAuth0();
  const [allcomments, setAllComments] = useState([]);
  const all_reflections_url = "http://localhost:4000/api/v1/all_reflections";
  useEffect(() => {
    if (user) {
      axios
        .post(`${all_reflections_url}`, {
          email: user.email,
        })
        .then((res) => {
          setAllComments(res.data);
        });
    }
  }, []);

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
