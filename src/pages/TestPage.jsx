import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { getUserByUsername } from "../api/users";
import { getPostsByUsername } from "../api/posts";
import Feed from "../components/Feed";
import QUERY_KEYS from "../queryKey";

export default function TestPage() {
  const username = "codeit";

  // 가정:
  // 1. 사용자 정보를 먼저 가지고 온 뒤
  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.USERS, username],
    queryFn: ({ queryKey }) => {
      const [_, username] = queryKey;
      return getUserByUsername(username);
    },
  });

  // 2. 가지고 온 사용자 정보로, 해당 사용자의 피드 리스트를 불러온다
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, username],
    queryFn: ({ queryKey }) => {
      const [_, username] = queryKey;
      return getPostsByUsername(username);
    },
    staleTime: 60000,
    enabled: !!userData?.id,
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
