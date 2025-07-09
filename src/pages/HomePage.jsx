import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router";
import { getPosts, uploadPost } from "../api";
import Feed from "../components/Feed";
import QUERY_KEYS from "../queryKey";

export default function HomePage() {
  const queryClient = useQueryClient();

  const username = "codeit";
  const [content, setContent] = useState("");

  const result = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts,
    staleTime: 60000,
  });

  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => uploadPost(newPost),
    onMutate: () => {
      console.log("mutationFn 함수가 실행하기 전!");
    },
    onError: () => {
      console.log("에러가 났어요");
    },
    onSuccess: () => {
      console.log("업로드 성공!!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
    onSettled: () => {
      console.log("함수 실행 후!! (실행결과와 무관하게 항상 실행)");
      setContent("");
    },
  });

  const onFormSubmit = (e) => {
    e.preventDefault();

    // Post upload 로직
    const payload = { username, content };
    uploadPostMutation.mutate(payload);
  };

  const onInputChange = (e) => {
    const content = e.target.value;
    setContent(content);
  };

  return (
    <div>
      <h1>Hello React Query</h1>
      <NavLink to="/test">내 피드 페이지로 이동</NavLink>

      <form onSubmit={onFormSubmit}>
        <input type="text" value={content} onChange={onInputChange} />
        <button disabled={uploadPostMutation.isPending}>업로드</button>
      </form>

      {result.data?.results.map((post) => (
        <Feed key={post.id} post={post} />
      ))}
    </div>
  );
}
