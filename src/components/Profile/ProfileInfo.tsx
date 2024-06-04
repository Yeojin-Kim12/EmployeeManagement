import styled from "styled-components";
import { useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { useAuth } from "../../hooks/useAuth";

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const ProfileInfo = () => {
  const { userInfo, fetch, loading, error } = useUser();
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (user && user.email) {
      fetch(user.email);
    }
  }, [user, fetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userInfo) return <p>유저 정보를 불러오지 못했습니다.</p>;

  return (
    <ProfileInfoContainer>
      <InfoItem>이름: {userInfo?.displayName}</InfoItem>
      <InfoItem>이메일: {userInfo?.email}</InfoItem>
      <InfoItem>직급: {userInfo?.position}</InfoItem>
      <InfoItem>부서: {userInfo?.department}</InfoItem>
      <InfoItem>입사일: {userInfo?.joinDate}</InfoItem>
    </ProfileInfoContainer>
  );
}

export default ProfileInfo;
