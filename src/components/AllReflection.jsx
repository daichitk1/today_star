export const AllReflection = (props) => {
  return (
    <div>
      <div className="border-2 border-gray-400 max-w-300 mx-auto p-3 rounded-xl">
        <div className="text-white bg-blue-600 w-50 text-center rounded-xl mb-3">
          これまでの振り返り
        </div>
        <div className="mx-5">
          {props.allcomments.length == 0 ? "まだ振り返りはありません" : null}

          {props.allcomments.map((one_comment, index) => (
            <div>
              <div className="max-w-290 border-2 bg-gray-100 border-gray-300 mx-auto rounded-xl mb-2 p-3">
                <div key={index}>
                  <div className="me-5 text-xs">
                    {new Date(one_comment.created_at).toLocaleString("ja-JP", {
                      timeZone: "Asia/Tokyo",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                  <div className="text-3xl flex">
                    <div className="me-3">
                      {"⭐️".repeat(Number(one_comment.rating))}
                    </div>
                    <div className="me-5">{one_comment.comment}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
