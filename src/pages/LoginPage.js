import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Logo from "../assets/icons/Logo.svg";
import IdImg from "../assets/icons/IdSymbol.svg";
import PasswordImg from "../assets/icons/PasswordSymbol.svg";

const PageContainer = styled.div`
  font-family: "NanumSquareNeo";
  background-color: #132043;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; /* 세로 중앙 정렬을 위한 추가 설정 */
`;

const LogoImg = styled.img`
  width: 200px; /* 로고의 너비를 조절할 수 있습니다. */
  height: auto; /* 높이를 자동으로 조절하여 비율을 유지합니다. */
  margin-bottom: 35px;
  margin-top: 35px;
`;

const UserInformationWrapper = styled.div`
  width: 400px;
  color: #132043;
`;

const UserIdWrapper = styled.div`
  height: 50px;
  border-radius: 15px 15px 0px 0px;
  border-top: 5px solid #f1b4bb; /* top에만 border 적용 */
  border-left: 5px solid #f1b4bb; /* left에만 border 적용 */
  border-right: 5px solid #f1b4bb; /* right에만 border 적용 */
  background: #ffff;
  display: flex;
  align-items: center;
`;

const UserIdIcon = styled.img`
  margin-left: 10px;
  height: auto;
`;

const UserIdLabel = styled.div`
  margin-left: 10px; /* 아이콘과 레이블 사이 간격 조절 */
  font-weight: 600;
`;

const UserIdInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #132043;
  margin-left: 10px;
`;

const UserPasswordWrapper = styled.div`
  height: 50px;
  background: #ffff;
  display: flex;
  align-items: center;
  border-radius: 0px 0px 15px 15px;
  border: 5px solid #f1b4bb;
`;

const UserPasswordIcon = styled.img`
  margin-left: 10px;
  height: auto;
`;
const UserPasswordLabel = styled.div`
  margin-left: 10px; /* 아이콘과 레이블 사이 간격 조절 */
  font-weight: 600;
`;

const UserPasswordInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #132043;
  margin-left: 10px;
`;

const LoginWrapper = styled.div``;
const LoginButton = styled.div`
  width: 400px;
  height: 50px;
  margin-top: 30px;
  margin-bottom: 5px;
  border-radius: 15px;
  background: #f1b4bb;
  color: #132043;
  text-align: center;
  font-size: 25px;

  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬을 위해 추가 */
  justify-content: center; /* 가로 방향에서 중앙 정렬을 위해 추가 */
  cursor: pointer;
  font-family: "bitbit";
`;
const DivisionWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 400px;
  height: 5px;
  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬을 위해 추가 */
  flex-direction: row; /* 자식 요소들을 가로로 정렬 */
`;
const DivisionLiteral = styled.div`
  color: #f1b4bb;
  font-size: 15px;
  margin-left: 5px;
  margin-right: 5px;
  font-family: "bitbit";
`;
const DivisionLine = styled.div`
  width: 180px;
  height: 3px;
  background: #f1b4bb;
`;
const SignupButton = styled(Link)`
  text-decoration: none;
  width: 400px;
  height: 50px;
  margin-bottom: 30px;
  border-radius: 15px;
  background: #f1b4bb;
  color: #132043;
  text-align: center;
  font-size: 25px;
  display: flex;
  align-items: center; /* 세로 방향에서 중앙 정렬을 위해 추가 */
  justify-content: center; /* 가로 방향에서 중앙 정렬을 위해 추가 */
  cursor: pointer;
  font-family: "bitbit";
`;

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        loginInfo
      );
      console.log(response);
      if (response.data.message === "로그인을 성공했습니다.") {
        const userId = response.data.data.id;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loginId", loginInfo.loginId);
        localStorage.setItem("userId", userId); // 사용자 ID를 로컬 스토리지에 저장
        alert("로그인 성공!");
        window.location.href = `/`;
      } else {
        console.error("로그인 실패:", response.data.message);
        alert("아이디 혹은 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("아이디 혹은 비밀번호를 확인해주세요.");
    }
  };

  return (
    <PageContainer>
      <LogoImg src={Logo} alt="Logo" />
      <UserInformationWrapper onSubmit={handleSubmit}>
        <UserIdWrapper>
          <UserIdIcon src={IdImg} alt="IdImg" />
          <UserIdLabel>아이디</UserIdLabel>
          <UserIdInput
            type="text"
            placeholder=""
            name="loginId"
            onChange={handleChange}
          />
        </UserIdWrapper>
        <UserPasswordWrapper>
          <UserPasswordIcon src={PasswordImg} alt="PasswordImg" />
          <UserPasswordLabel>비밀번호</UserPasswordLabel>
          <UserPasswordInput
            type="password"
            name="password"
            placeholder=""
            onChange={handleChange}
          />
        </UserPasswordWrapper>
      </UserInformationWrapper>
      <LoginWrapper>
        <LoginButton onClick={handleSubmit}>로그인</LoginButton>
        <DivisionWrapper>
          <DivisionLine />
          <DivisionLiteral>또는</DivisionLiteral>
          <DivisionLine />
        </DivisionWrapper>
        <SignupButton to="/signup">회원가입</SignupButton>
      </LoginWrapper>
    </PageContainer>
  );
}
