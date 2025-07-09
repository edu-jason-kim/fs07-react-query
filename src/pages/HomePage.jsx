import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { getPosts } from "../api";
import Feed from "../components/Feed";

export default function HomePage() {
  const result = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 60000,
  });

  return (
    <div>
      <h1>Hello React Query</h1>
      <NavLink to="/test">내 피드 페이지로 이동</NavLink>

      {result.data?.results.map((post) => (
        <Feed key={post.id} post={post} />
      ))}
    </div>
  );
}
