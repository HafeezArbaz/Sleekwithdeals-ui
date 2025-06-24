import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("https://sleekwithdeals.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((item) => item.id.toString() === id);
        setProduct(selected);
      });
  }, [id]);

  if (!product) {
    return <p style={{ color: "white", padding: "2rem" }}>Loading...</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        padding: "2rem",
        color: "white",
        backgroundColor: "#111",
        minHeight: "100vh",
      }}
    >
      {/* Left side: Swiper images */}
      <div style={{ flex: "1", minWidth: "320px", maxWidth: "400px" }}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {product.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={`https://sleekwithdeals.onrender.com${img}`}
                alt={`Product ${idx + 1}`}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  height: "320px",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right side: Product Info */}
      <div style={{ flex: "1", minWidth: "300px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{product.name}</h2>
        <h3 style={{ color: "#00ff88", fontSize: "1.5rem", marginBottom: "1rem" }}>
          ₹{product.price}
        </h3>
        <div
          style={{
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
            backgroundColor: "#222",
            padding: "1rem",
            borderRadius: "10px",
          }}
        >
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
