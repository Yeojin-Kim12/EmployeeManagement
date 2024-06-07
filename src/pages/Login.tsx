import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #dcdcdc;
`;

const Select = styled.select`
  padding: 10px;
  margin: 10px;
  border: 1px solid #dcdcdc;
  background-color: white;
`;

const Button = styled.button`
  background-color: #3565f6;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const Login: React.FC = () => {
  const { signIn, register, signInWithGoogle, user } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startDay, setStartDay] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setShowModal(true);
      return;
    }
    try {
      await signIn(email, password);
      alert("로그인되었습니다");
    } catch (error) {
      alert("아이디나 비번이 틀립니다");
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    try {
      const additionalData = {
        displayName: name,
        position: position,
        department: department,
        joinDate: `${startYear}-${startMonth}-${startDay}`,
      };
      await register(email, password, additionalData, profileImage);
      alert("회원가입이 완료되었습니다");
    } catch (error) {
      console.error("회원가입에 실패했습니다:", error);
      alert("회원가입에 실패했습니다");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      alert("Google 로그인에 성공했습니다");
    } catch (error) {
      alert("Google 로그인에 실패했습니다");
    }
  };

  return (
    <Container>
      {isSignUp || isGoogleSignUp ? (
        <>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isGoogleSignUp}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isGoogleSignUp}
          />
          {!isGoogleSignUp && (
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="">직급 선택</option>
            <option value="사원">사원</option>
            <option value="대리">대리</option>
            <option value="팀장">팀장</option>
          </Select>
          <Input
            type="text"
            placeholder="부서"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <div>
            <Select
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            >
              <option value="">연도 선택</option>
              {Array.from({ length: 50 }, (_, i) => (
                <option key={i} value={2024 - i}>
                  {2024 - i}
                </option>
              ))}
            </Select>
            <Select
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
            >
              <option value="">월 선택</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
            <Select
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
            >
              <option value="">일 선택</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </div>
          <Input
            type="file"
            onChange={(e) =>
              setProfileImage(e.target.files ? e.target.files[0] : null)
            }
          />
          {isGoogleSignUp ? (
            <Button onClick={handleGoogleLogin}>추가 정보 저장</Button>
          ) : (
            <Button onClick={handleSignUp}>회원가입</Button>
          )}
          <Button
            onClick={() => {
              setIsSignUp(false);
              setIsGoogleSignUp(false);
            }}
          >
            취소
          </Button>
        </>
      ) : (
        <>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>로그인</Button>
          <Button onClick={handleGoogleLogin}>Google 로그인</Button>
          <Button onClick={() => setIsSignUp(true)}>회원가입</Button>
        </>
      )}
      {showModal && (
        <ModalBackground onClick={() => setShowModal(false)}>
          <Modal>
            <p>아이디와 비번을 입력하십시오</p>
            <Button onClick={() => setShowModal(false)}>확인</Button>
          </Modal>
        </ModalBackground>
      )}
    </Container>
  );
};

export default Login;