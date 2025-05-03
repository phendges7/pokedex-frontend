import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PropTypes from "prop-types";

const Evolution = ({ evolutionChain, onEvolutionClick }) => {
  const slidesPerView = Math.min(3, evolutionChain.length);

  return (
    <div className="evolution">
      <h3 className="evolution__title">Evolução</h3>
      <Swiper
        modules={[Pagination]} // Só paginação agora
        spaceBetween={15}
        slidesPerView={slidesPerView}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: Math.min(1, evolutionChain.length) },
          640: { slidesPerView: Math.min(2, evolutionChain.length) },
          1024: { slidesPerView: Math.min(3, evolutionChain.length) },
        }}
      >
        {evolutionChain.map((evo) => (
          <SwiperSlide key={evo.name}>
            <div
              className="evolution__card"
              onClick={() => onEvolutionClick(evo.name)}
            >
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
};

Evolution.propTypes = {
  evolutionChain: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  onEvolutionClick: PropTypes.func.isRequired,
};

export default Evolution;
