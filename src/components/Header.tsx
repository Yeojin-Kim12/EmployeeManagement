import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";

const items = [
  { name: "내 인사정보", url: "/profile" },
  { name: "급여 내역", url: "/payroll-details" },
  { name: "정정 신청", url: "/correction-request" },
  { name: "정정 내역", url: "/request-list" },
  { name: "정정 관리", url: "/request-management" },
  { name: "업무 관리", url: "/calendar" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();

  const handleLogout = () => {
    signOutUser();
    navigate("/login");
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!user) {
      e.preventDefault();
      alert("권한이 없습니다. 로그인 해주세요.");
    }
  };

  return (
    <HeaderContainer>
      <TitleLink to="/">PLATFORM</TitleLink>
      <Nav>
        <ul>
          {items.map((item) => (
            <Navli key={item.name}>
              <NavLink
                to={user ? item.url : "#"}
                $isActive={location.pathname === item.url}
                onClick={handleClick}
              >
                {item.name}
              </NavLink>
            </Navli>
          ))}
        </ul>
      </Nav>
      {user && <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  border-bottom: 1px solid #dcdcdc;
  font-size: 20px;
  padding: 10px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 10px;
  }
`;
const TitleLink = styled(Link)`
  color: #3565f6;
  font-size: 27px;
  font-weight: 600;
  text-decoration: none;
`;
const Navli = styled.li`
  margin-left: 10px;
`;
const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${(props) => (props.$isActive ? "#161616" : "#8b8b8b")};
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;

  &:hover {
    background-color: #d32f2f;
  }
`;
