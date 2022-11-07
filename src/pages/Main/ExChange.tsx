import styled from "styled-components";
import ExchangeCard from "./ExchangeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { ExchageProps } from './MainTypes';
import { ExchangeProps } from "./ChartData/ChartData";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import { getExchange } from "../../api/mainAPI";

const ExChange = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const { status, data } = useQuery(["exchaData"], getExchange, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      console.log(data, "useQuery 통신 성공");
    },
    onError: (e) => {
      console.log(e, "에러가 생겼어요");
    },
  });

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "error") {
    return <Loading />;
  }
  return (
    <ExchageContainer>
      <StyleSlider {...settings}>
        {data.data.map((el: ExchangeProps) => {
          return (
            <ExchangeCard
              key={el.ten_dd_efee_r}
              unit={el.cur_nm}
              nation={el.cur_unit}
              price={el.bkpr}
            />
          );
        })}
      </StyleSlider>
    </ExchageContainer>
  );
};

export default ExChange;

const ExchageContainer = styled.div`
  background-color: ${({ theme }) => theme.sideColor};
  padding: 0 50px;
  height: 450px;
`;

const StyleSlider = styled(Slider)`
  .slick-prev:before,
  .slick-next:before {
    font-family: "slick";
    font-size: 30px;
    line-height: 1;
    opacity: 0.75;
    color: #3b55e6;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slick-prev,
  .slick-next {
    background: transparent;
  }
  .slick-slide {
    padding: 10px;
  }
`;
