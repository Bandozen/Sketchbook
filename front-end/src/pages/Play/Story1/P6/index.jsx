import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_6.gif";
import audio6 from "../../../../play-background/ske_6.mp3";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function P6() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/play/story1/p7");
    }, 17000);

    const axiosTimer = setTimeout(() => {
      axios
      .post("/api/devices/mission", {
        flag: "1", // mission이 없으면 0 있으면 1
      })
      .then((res) => {
        // console.log(res.data.mission);
      })
      .catch((err) => {
        console.log(err);
      });
    }, 6000)

    return () => {
      clearTimeout(timer);
      clearTimeout(axiosTimer);
    }
  }, [navigate])
  

  const mission = (e) => {
    axios
      .post("/api/devices/mission", {
        flag: "0", // mission이 없으면 0 있으면 1
      })
      .then((res) => {
        // console.log(res.data.mission);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <img className="back-ground" src={image1} alt="" onLoad={mission} />

      <audio autoPlay>
        <source src={audio6} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P6;
