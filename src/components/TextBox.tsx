export const TextBox = (props) => (
  <div className="h-300 w-300 bg-green-200 rounded-3xl my-5">
    <button
      onClick={() => {
        props.setTextbox(false);
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
        onChange={props.handleForm}
        placeholder="コメントを入力してください"
        className="m-5 rounded-xl bg-white w-100 h-10"
        value={props.form.comment}
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
