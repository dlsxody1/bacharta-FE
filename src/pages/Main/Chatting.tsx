import styled from "styled-components";

const Chatting = () => {
  return <ChattingModal></ChattingModal>;
};
export default Chatting;

const ChattingModal = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  overflow: scroll;
`;
