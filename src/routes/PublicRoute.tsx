import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  console.log('public');
  const user = useSelector((state: RootState) => state.auth.user);
  const { loading } = useAuth(); // 로딩 상태 가져오기
  console.log('public user before loading', user)
  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }
  console.log('public user after loading', user)
  return user ? <Navigate to="/profile" /> : children;
};

export default PublicRoute;
