import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={2000}
        className="mt-2 mb-2"
      >
        <div className="w-50">
          <img src="Images/pandol.webp" class="card-img-top" />
          <h5 className="text-center">OTC And Health Needs</h5>
        </div>
        <div className="w-50">
          <img src="Images/med.webp" class="card-img-top" />
          <h5 className="text-center">Medicines</h5>
        </div>
        <div className="w-50">
          <img src="Images/organic.jpeg" class="card-img-top" />
          <h5 className="text-center">Organic Remedies</h5>
        </div>
        <div className="w-50">
          <img src="Images/supliment.webp" class="card-img-top" />
          <h5 className="text-center">Supplements</h5>
        </div>
        <div className="w-50">
          <img src="Images/personal.jpeg" class="card-img-top" />
          <h5 className="text-center">Personal Care</h5>
        </div>
        <div className="w-50">
          <img src="Images/food.webp" class="card-img-top" />
          <h5 className="text-center">Food Yard</h5>
        </div>
        <div className="w-50">
          <img src="Images/Multivitamins.webp" class="card-img-top" />
          <h5 className="text-center">Multivitamins</h5>
        </div>
        <div className="w-50">
          <img src="Images/baby.webp" class="card-img-top" />
          <h5 className="text-center">Baby & Mother Care</h5>
        </div>
        <div className="w-50">
          <img src="Images/devices.webp" class="card-img-top" />
          <h5 className="text-center">Devices & Support</h5>
        </div>
        <div className="w-50">
          <img src="Images/az.webp" class="card-img-top" />
          <h5 className="text-center">A to Z Medicines</h5>
        </div>
      </Carousel>
    </>
  );
};

export default Slider;
