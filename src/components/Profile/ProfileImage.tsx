import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { LoadingSpinner } from "./LoadingSpinner";

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 100%;
  border-radius: 50%;
  overflow: hidden;
  background-color: black;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const EditButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;  
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 15px;
  opacity: ${(props) =>
    props.disabled ? "0.5" : "1"}; // 비활성화 시 투명도 조절
  pointer-events: ${(props) =>
    props.disabled ? "none" : "auto"}; // 비활성화 시 클릭 이벤트 제거
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileImage = () => {
  const { userInfo, fetch, update, loading, error } = useUser();
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false); // 업로드 상태 관리
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user && user.email) {
      fetch(user.email);
    }
  }, [user, fetch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpdateProfileImage = async () => {
    if (selectedFile && user) {
      setUploading(true); // 업로드 시작
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${user.email}`);
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);

        update(user.email as string, { photoURL: downloadURL });
        setSelectedFile(null); // 파일 선택 초기화
        alert("업로드가 완료되었습니다.");
      } catch (error) {
        console.error(error);
        alert("업로드에 실패했습니다.");
      } finally {
        setUploading(false); // 업로드 종료
      }
    }
  };

  const handleEditButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (loading)
    return (
      <ProfileImageContainer>
        <LoadingSpinner />
      </ProfileImageContainer>
    );
  if (error) return <p>Error: {error}</p>;
  if (!userInfo) return <p>유저 정보를 불러오지 못했습니다.</p>;

  return (
    <ProfileImageContainer>
      <ImageWrapper>
        <Image src={userInfo?.photoURL || "디폴트이미지"} alt="Profile" />
      </ImageWrapper>
      <EditButton
        onClick={handleEditButtonClick}
        disabled={uploading} // 업로드 중일 때 버튼 비활성화
      >
        이미지 수정
      </EditButton>
      <HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <button onClick={handleUpdateProfileImage} disabled={uploading}>
          업로드
        </button>
      )}
    </ProfileImageContainer>
  );
};

export default ProfileImage;
