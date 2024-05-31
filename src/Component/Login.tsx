// src/Login.tsx
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import styled from "styled-components";
import { auth, provider } from "../firebase";

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

const Button = styled.button`
  background-color: #3565f6;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
`;

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입이 완료되었습니다");
    } catch (error) {
      alert("회원가입에 실패했습니다");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("로그인되었습니다");
    } catch (error) {
      alert("Google 로그인에 실패했습니다");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("로그아웃되었습니다");
    } catch (error) {
      alert("로그아웃에 실패했습니다");
    }
  };

  return (
    <Container>
      {user ? (
        <Button onClick={handleLogout}>로그아웃</Button>
      ) : isSignUp ? (
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
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleSignUp}>회원가입</Button>
          <Button onClick={() => setIsSignUp(false)}>
            이미 계정이 있으신가요? 로그인
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
    </Container>
  );
};

export default Login;
