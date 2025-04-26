import axios from "axios";
export const TextBox = (props: unknown) => {
  const postDiaryReflection = () => {
    console.log("nya--n");

    axios.post(
      "http://localhost:4000/api/v1/daily_reflections",
      {
        daily_reflection: {
          comment: props.form.comment,
        },
      },

      {
        headers: { "Content-Type": "application/json" },
      }
    );
    props.setForm({ comment: "" });
  };

  return (
    <div className="bg-green-100 rounded-3xl my-5 p-3">
      <form>
        <div className="bg-green-600 text-white w-30 text-center rounded-3xl">
          今日の一言
        </div>
        <br />
        <input
          name="comment"
          onChange={props.handleForm}
          placeholder="コメントを入力してください"
          className="m-5 rounded-xl bg-white w-100 h-10"
          value={props.form.comment}
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
