import axios from "axios";

axios
  .post("https://example.com/api/posts", {
    title: "Axios 게시글",
    content: "Axios를 사용해 작성한 게시글입니다.",
  })
  .then((response) => {
    console.log(response.data);
  });
