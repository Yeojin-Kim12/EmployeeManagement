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

// 페이지 진입시에 login페이지 표시
// login되어있으면 내 인사정보(profile)
// 중첩라우팅 // 조건걸어서

// 헤더에 로그아웃버튼 만들기
// 조건문 달아서 로그인정보 있으면 우측 상단에 버튼 만들기

// 각자 개발한 컴포넌트에 훅/리덕스 붙일것 붙이기

// 레이아웃만지기

// 직급에 따라 dp하기 (직급 간소화.. 사원 / 대리 / 팀장) useUser?
// 