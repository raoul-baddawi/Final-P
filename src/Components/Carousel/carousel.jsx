import "./carousel.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import RightIcon from "../icons/iconRight";
import LeftIcon from "../icons/iconLeft";
import NoImage from "../../Assets/noimage.png";

function Carousel() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      axios
      .get("https://appreciate-b.onrender.com/profile")
      .then((res) => {
        const devData = res.data.filter((profile) => profile.user_type === 'dev');
        setData(devData);
      })
      .catch((err) => console.log(err));
    }, 3000);
   
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

  const navigateToCV = (itemId) => {
    window.location.href=`/cv/${itemId}`;
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
                      src={dev && dev.image.length > 3 ? dev.image  : NoImage}
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
                      <p>{dev.description}</p>
                    </div>
                    <button className="v-cv" onClick={() => navigateToCV(dev.user_id)}>View CV</button>
                    <div className="none none-wrapper">
                    <button className="v-cv none" onClick={() => navigateToCV(dev.user_id)}>View Cv</button>
                      <button className="v-web none" onClick={() => window.open(dev.website_link, "_blank")}>Visit website</button>
                    </div>
                  </div>
                </div>
                <div className="totry">
                  <iframe
                    src={dev.website_link}
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
