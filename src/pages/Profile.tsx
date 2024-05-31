//중앙정렬
//flex
//좌측에 프로필이미지
//우측에 프로필인포
import styled from "styled-components";
import ProfileImage from "../components/Profile/ProfileImage";
import ProfileInfo from "../components/Profile/ProfileInfo";

const ProfileContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vh;
  height: 80vh;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileImage/>
      <ProfileInfo/>
    </ProfileContainer>
  )
}

export default Profile