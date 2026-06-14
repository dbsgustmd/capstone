// 최종실습

import { useEffect, useState } from "react";

function PostApp() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = () => {
    setLoading(true);

    fetch("https://example.com/api/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("게시글 목록을 불러오지 못했습니다.");
        }

        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createPost = () => {
    fetch("https://example.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("게시글 작성에 실패했습니다.");
        }

        return response.json();
      })
      .then(() => {
        setTitle("");
        setContent("");
        fetchPosts();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>에러 발생: {error}</p>;
  }

  return (
    <div>
      <h1>게시글</h1>

      <section>
        <h2>게시글 작성</h2>

        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={createPost}>작성하기</button>
      </section>

      <section>
        <h2>게시글 목록</h2>

        {posts.map((post) => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default PostApp;
