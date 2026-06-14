import axios from "axios";

axios.get("https://example.com/api/posts").then((response) => {
  console.log(response.data);
});
