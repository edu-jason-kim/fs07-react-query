export default function Feed({ post }) {
  return (
    <li>
      <div>
        <img width="40" height="40" src={post.user.photo} alt="프로필" />
        <span>{post.user.name}</span>
      </div>
      <div>{post.content}</div>
    </li>
  );
}
