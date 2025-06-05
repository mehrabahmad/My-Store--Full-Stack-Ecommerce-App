// src/components/ProductSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const ProductSlider = ({ products }) => {
  // Only show first 5 products
  const limitedProducts = products.slice(0, 5);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {limitedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-60 w-full object-contain mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
              </Link>
              <br />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
