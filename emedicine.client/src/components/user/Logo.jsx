import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Logo = () => {
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
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/Abena.png"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/Aftech%20Pharma.png"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/AGP.jpeg"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/Allianze%20Med%20Pharma.png"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/Alshifa.jpeg"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/Ambrosia%20Pharmaceuticals.jpeg"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/Aptab%20Pharma.png"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/ARaf%20Pharma.jpeg"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/gsk.png"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/Hamdard.png"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/PharmEvo.jpg"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/Mothercare.jpg"
            class="card-img-top"
          />
        </div>
        <div className="w-50">
          <img
            src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Brands%20Logo/Saeed%20Ghani.png"
            class="card-img-top"
          />
        </div>
      </Carousel>
    </>
  );
};

export default Logo;
