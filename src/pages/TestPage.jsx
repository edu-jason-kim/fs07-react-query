import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { getPosts } from "../api";

export default function TestPage() {
  const result = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 10000,
  });

  console.log({
    fetchStatus: result.fetchStatus,
    queryStatus: result.status,
  });

  return (
    <div>
      <h1>Test Page!</h1>

      <NavLink to="/">홈 페이지로 이동</NavLink>
    </div>
  );
}
