import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Evolution.css";

const Evolution = ({ evolutionChain }) => (
  <div className="evolution">
    <h3 className="evolution__title">Evolução</h3>
    <Swiper
      className="evolution__swiper"
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 15 },
        1024: { slidesPerView: 3, spaceBetween: 15 },
      }}
    >
      {evolutionChain.map((evo) => (
        <SwiperSlide key={evo.name} className="evolution__slide">
          <div className="evolution__card">
            {evo.image ? (
              <img
                src={evo.image}
                alt={evo.name}
                className="evolution__image"
              />
            ) : (
              <div className="evolution__placeholder">
                Imagem não disponível
              </div>
            )}
            <p className="evolution__name">{evo.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

Evolution.propTypes = {
  evolutionChain: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default Evolution;
