//redux에 있는 정보 긁어와도 되나?
//프로필 정보 표시
//이름
//이메일
//포지션
//직위
//입사일
import styled from "styled-components"

interface User{
  name : String,
  email : String,
  position: String,
  department: String,
  joiningDate: String
}

const dump:User = {
  name : '예시',
  email: 'ex@example.com',
  position: '리더',
  department: 'FE',
  joiningDate: '20240531'
}

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2rem; /* 프로필 이미지와 간격 */
`;

const InfoItem = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const ProfileInfo = () => {
  return (
    <ProfileInfoContainer>
      <InfoItem>이름: {dump.name}</InfoItem>
      <InfoItem>이메일: {dump.email}</InfoItem>
      <InfoItem>직급: {dump.position}</InfoItem>
      <InfoItem>부서: {dump.department}</InfoItem>
      <InfoItem>입사일: {dump.joiningDate}</InfoItem>
    </ProfileInfoContainer>
  )
}

export default ProfileInfo