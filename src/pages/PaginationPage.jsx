import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import Feed from "../components/Feed";
import QUERY_KEYS from "../queryKey";

const PAGE_LIMIT = 3;

export default function PaginationPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const {
    data,
    isLoading,
    // 현재 placeholder가 보여지고 있는지 여부
    isPlaceholderData,
  } = useQuery({
    // query key 의존성에 페이지 정보를 줘서, 페이지 정보가 바뀔 때 데이터를 새롭게 불러오도록 설정
    queryKey: [QUERY_KEYS.POSTS, { page, limit: PAGE_LIMIT }],
    queryFn: ({ queryKey }) => {
      const [_, { page, limit }] = queryKey;
      return getPosts(page, limit);
    },
    staleTime: 60000,
    // 페이지 전환 시 로딩화면 대신 placeholder로 기존 데이터 활용
    placeholderData: keepPreviousData,
  });

  // 데이터를 미리 불러와서 느린 인터넷 환경에서도 사용자 경험을 높이는 방법
  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.POSTS, { page: page + 1, limit: PAGE_LIMIT }],
        queryFn: ({ queryKey }) => {
          const [_, { page, limit }] = queryKey;
          return getPosts(page, limit);
        },
      });
    }
  }, [queryClient, data?.hasMore, page]);

  return (
    <div>
      <h1>Hello React Query</h1>

      {isLoading && <div>로딩중입니다...</div>}

      {!isLoading &&
        data &&
        data.results.map((post) => <Feed key={post.id} post={post} />)}

      <div>
        <button
          // placeholder가 보여지고 있다면 페이지 전환 금지
          disabled={page === 0 || isPlaceholderData}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          &lt;
        </button>
        <button
          // placeholder가 보여지고 있다면 페이지 전환 금지
          disabled={!data?.hasMore || isPlaceholderData}
          onClick={() => setPage((prev) => prev + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
