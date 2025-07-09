import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import Feed from "../components/Feed";
import QUERY_KEYS from "../queryKey";

const PAGE_LIMIT = 10;

export default function InfinitePage() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTS],
    staleTime: 60000,

    // 초기 페이지 번호
    initialPageParam: 0,

    // pageParam: 지금 가지고 오려는 페이지 번호
    queryFn: ({ pageParam }) => {
      console.log("queryFn: ", { pageParam });
      return getPosts(pageParam, PAGE_LIMIT);
    },

    // 다음 페이지 번호를 반환 (예: 현재페이지가 0이면, 1을 반환하면 됨)
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      // 만약 다음페이지가 없다면 (마지막 페이지라면) undefined를 반환해서 다음 페이지로 이동을 못하게 하면 됨
      if (!lastPage.hasMore) return undefined;

      // return lastPage.currentPage + 1; // 다음 페이지
      return lastPageParam + 1; // 다음 페이지
    },
  });

  return (
    <div>
      <h1>Hello React Query</h1>

      {data?.pages.map((page) =>
        // 여기서 page는 기존 react query에서 요청했던 하나의 응답과 1:1 매칭 된다
        page.results.map((post) => <Feed key={post.id} post={post} />)
      )}

      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        더 불러오기
      </button>
    </div>
  );
}
