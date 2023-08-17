import image from "../../../../play-background/엄마는 카멜레온_11.gif";
import audio11 from "../../../../play-background/ske_11.mp3";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

function P11() {
  const navigate = useNavigate();  

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/play/story1/p12");
    }, 6000);

    const axiosTimer = setTimeout(() => {
      axios
      .post("/api/devices/mission", {
        flag: "1", // mission이 없으면 0 있으면 1
      })
      .then((res) => {
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
  
  return (
    <div>
      <img className="back-ground" src={image} alt="" />
      <audio autoPlay>
        <source src={audio11} type="audio/mp3" />
      </audio>
    </div>
  );
}

export default P11;
