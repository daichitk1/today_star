import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";

export const TextBox = (props: unknown) => {
  const { user } = useAuth0();
  const postDiaryReflection = async () => {
    console.log("nya--n");
    {
      props.form.comment.length <= 0
        ? alert("1文字以上文字を入力してください")
        : await axios.post(
            "http://localhost:4000/api/v1/daily_reflections",
            {
              daily_reflection: {
                comment: props.form.comment,
                rating: props.value,
                email: user.email,
              },
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
      props.setForm({ comment: "" });
      props.setValue(0);
      await props.getComment();
    }
  };

  return (
    <div className="bg-green-100 rounded-3xl my-5 p-3">
      <form>
        <div className="bg-green-600 text-white w-30 text-center rounded-3xl">
          今日の一言
        </div>
        <br />
        <Box sx={{ "& > legend": { mt: 2 } }}>
          <Typography component="legend">充実度</Typography>
          <Rating
            name="simple-controlled"
            value={props.value}
            onChange={(event, newValue) => {
              props.setValue(newValue);
            }}
          />
        </Box>

        <input
          name="comment"
          onChange={props.handleForm}
          placeholder="今日の一言を入力してください"
          className="m-5 rounded-xl bg-white w-100 h-10"
          value={props.form.comment}
          min="1"
        ></input>
        <button
          type="button"
          className="w-20 h-8 rounded-xl bg-white hover:bg-gray-300"
          onClick={postDiaryReflection}
        >
          決定
        </button>
      </form>
    </div>
  );
};
