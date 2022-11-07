import styled from "styled-components";
import { useState } from "react";

interface ChattingProps {
  chattingLog: string[];
}

const Modal = ({ chattingLog }: ChattingProps) => {
  const onChangeChatting = () => {};
  return (
    <ModalWrap>
      <ModalTitle>문의 사항이 있으면 채팅해주세요!😊</ModalTitle>

      <ChatttingLog>
        {chattingLog.length === 0
          ? "채팅 기록이 없습니다"
          : chattingLog.map((el) => el)}
      </ChatttingLog>
      <ChattingInputForm>
        <ChattingInput type="text" />
        <SendButton>전송</SendButton>
      </ChattingInputForm>
    </ModalWrap>
  );
};

export default Modal;

const ModalWrap = styled.div`
  position: fixed;
  background-color: red;
  width: 350px;
  height: 350px;
  top: 50%;
  left: 70%;
  z-index: 50;
  border-radius: 20px 20px;
  box-shadow: ${({ theme }) => theme.lowModalShadow};
`;

const ModalTitle = styled.div`
  ${({ theme }) => theme.flexMixin("center", "center")}
  height: 70px;
  background-color: ${({ theme }) => theme.sideColor};
  color: black;
`;

const ChatttingLog = styled.div`
  background-color: white;
  height: 70%;
`;

const ChattingInputForm = styled.form`
  z-index: 100;
  background-color: red;
  height: 20%;
`;

const ChattingInput = styled.input`
  z-index: 100;
  width: 80%;
  height: 100%;
`;

const SendButton = styled.button`
  z-index: 100;
  width: 20%;
  height: 100%;
`;
