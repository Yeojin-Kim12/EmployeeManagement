import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

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

  return (
    <HeaderContainer>
      <TitleLink to="/">PLATFORM</TitleLink>
      <Nav>
        <ul>
          {items.map((item) => (
            <Navli key={item.name}>
              <NavLink to={item.url} $isActive={location.pathname === item.url}>
                {item.name}
              </NavLink>
            </Navli>
          ))}
        </ul>
      </Nav>
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
`;
