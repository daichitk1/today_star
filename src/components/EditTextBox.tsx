import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";

export const EditTextBox = (props: unknown) => {
  const { user } = useAuth0();
  const postDiaryReflection = async () => {
    {
      props.form.comment.length <= 0
        ? alert("1文字以上文字を入力してください")
        : await axios.put(
            `http://localhost:4000/api/v1/daily_reflections/${props.todaycomments[0].id}`,
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
    <div className="border-2 bg-gray-100 border-gray-300 pt-5 px-1 rounded-xl mt-10">
      <form>
        <div className="bg-green-500 text-white w-50 text-center rounded-xl">
          今日の振り返りの編集
        </div>

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
          placeholder={props.todaycomments[0].comment}
          className="m-5 rounded-xl bg-white w-100 h-10 border-2 border-gray-500"
          value={props.form.comment}
          min="1"
        ></input>
        <button
          type="button"
          className="w-20 h-8 rounded-xl bg-white hover:bg-gray-300 border-2 border-gray-500"
          onClick={postDiaryReflection}
        >
          決定
        </button>
      </form>
    </div>
  );
};
