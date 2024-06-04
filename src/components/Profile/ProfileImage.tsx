import styled from "styled-components";
import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../hooks/useUser';
import { useAuth } from "../../hooks/useAuth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
`;

const EditButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileImage = () => {
  const { userInfo, fetch, update, loading, error } = useUser();
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${user.email}`);
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      update(user.email as string, { photoURL: downloadURL });
      setSelectedFile(null); // 파일 선택 초기화
    }
  };

  const handleEditButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userInfo) return <p>유저 정보를 불러오지 못했습니다.</p>;

  return (
    <ProfileImageContainer>
      <Image src={userInfo?.photoURL || '디폴트이미지'} alt="Profile" />
      <EditButton onClick={handleEditButtonClick}>이미지 수정</EditButton>
      <HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {selectedFile && <button onClick={handleUpdateProfileImage}>업로드</button>}
    </ProfileImageContainer>
  );
};

export default ProfileImage;
