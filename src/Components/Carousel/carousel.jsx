import "./carousel.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import RightIcon from "../icons/iconRight";
import LeftIcon from "../icons/iconLeft";
import NoImage from "../../Assets/noimage.png";
import { useNavigate } from "react-router-dom";

function Carousel() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://appreciate-b.onrender.com/profile")
      .then((res) => {
        const devData = res.data.filter((profile) => profile.user_type === 'dev');
        setData(devData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    carouselRef.current.scrollTo({
      left: currentIndex * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
  };
  return (
    <div className="carousel-wrap">
      <h1>FINALS</h1>
      <div className="carousel-container">
        <div className="carousel" ref={carouselRef}>
          <button onClick={prevSlide} className="button">
            <LeftIcon />
          </button>
          {data && data.map((dev, index) => {
            const active = index === currentIndex ? "active" : "";
            return (
              <div key={index} className={`carousel-slide ${active}`}>
                <div className="finals-header">
                  <div className="dev-info-wrapper">
                    <img
                      src={dev.image.length > 10 ? dev.image : NoImage}
                      alt={dev.name}
                      width="200"
                      height="200"
                    />
                    <div className="name-position">
                      <div className="part1-wrapper">
                        <h2>{dev.name}</h2>
                        <p>{dev.position}</p>
                      </div>
                      <button className="v-web" onClick={() => window.open(dev.website_link, "_blank")}>Visit website</button>
                    </div>
                  </div>
                  <div className="dev-desc-wrapper">
                    <div className="part2-wrapper">
                    <h2>Description:</h2>
                      <p>{dev.description}this website is blablabla, nananou, nanai, lolal</p>
                    </div>
                    <button className="v-cv" onClick={() => navigate("/cv", { state: { id: dev.user_id } })}>View Cv</button>
                    <div className="none none-wrapper">
                    <button className="v-cv none">View Cv</button>
                    {console.log(dev.user_id)}
                      <button className="v-web none" onClick={() => window.open(dev.website_link, "_blank")}>Visit website</button>
                    </div>
                  </div>
                </div>
                <div className="totry">
                  <iframe
                    src=""
                    title={`${dev.name}'s website`}
                  >
                  </iframe>
                    <div className="before"></div>
                </div>
              </div>
            );
          })}
          <button onClick={nextSlide} className="button">
            <RightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
