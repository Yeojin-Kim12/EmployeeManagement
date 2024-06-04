//프로필 동그란 사진 -> 사진 불러와야지.. redux의 유저정보 땡겨와야지? 아니면 그냥 db에서 가져와야하나
//사진 아래 버튼(사진 변경) -> 사진 등록 요청 날려야지?
import styled from "styled-components";
import { BlueButton } from "../../GlobalStyles";

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
  border-radius: 50%;
`;

const ProfileImage = () => {
  return (
    <ProfileImageContainer>
      <Image
        src="data:image/jpeg;base64,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"
        alt="Profile"
      />
      <BlueButton>이미지 수정</BlueButton>
    </ProfileImageContainer>
  );
};

export default ProfileImage;
