import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../api"

export default function HomePage () {
  const result = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  console.log(result.data)

  return <h1>Hello React Query</h1>
}