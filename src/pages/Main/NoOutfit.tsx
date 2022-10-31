import styled from "styled-components";
import { NavLink } from "react-router-dom";
const NoOutfit = () => {
  return (
    <NoOutfitWrap>
      옷차림 추천을 받지 못하셨습니다! 로그인하시고 Outfit 추천을 받아보세요 !
      😃👉<OutfitLink to="/outfits">클릭!</OutfitLink>{" "}
    </NoOutfitWrap>
  );
};

export default NoOutfit;

const NoOutfitWrap = styled.div`
  ${({ theme }) => theme.flexMixin("center")}
  background-color: ${(props) => props.theme.white};
  padding: 40px 30px;
  width: 1080px;
  border-radius: ${(props) => props.theme.bordeRadius};
  box-shadow: ${(props) => props.theme.lowModalShadow};
`;

const OutfitLink = styled(NavLink)``;
