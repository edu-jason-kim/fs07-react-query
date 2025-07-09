import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { getPostsByUsername } from "../api";
import Feed from "../components/Feed";

export default function TestPage() {
  const username = "";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", username],
    queryFn: ({ queryKey }) => {
      const [_, username] = queryKey;
      return getPostsByUsername(username);
    },
    staleTime: 60000,
  });

  return (
    <div>
      <h1>안녕하세요 "코드잇" 님!</h1>
      <p>내 피드 페이지</p>

      <NavLink to="/">홈 페이지로 이동</NavLink>

      {isError && (
        <div>
          에러가 발생했습니다: {error.message}
          <br />
          <button>재시도</button>
        </div>
      )}

      {isLoading && <div>로딩중입니다..</div>}

      {!isLoading &&
        data &&
        data.results.map((post) => <Feed key={post.id} post={post} />)}
    </div>
  );
}
