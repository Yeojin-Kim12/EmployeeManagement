import styled from "styled-components";
import ProfileImage from "../components/Profile/ProfileImage";
import ProfileInfo from "../components/Profile/ProfileInfo";
import { useEffect

 } from "react";
const ProfileContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vh;
  height: 80vh;
`;

const Profile = () => {
  useEffect(() => {
    console.log('open profile page')
  }, []);

  return (
    <ProfileContainer>
      <ProfileImage />
      <ProfileInfo />
    </ProfileContainer>
  );
}

export default Profile;
