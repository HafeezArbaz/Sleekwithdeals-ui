import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#111", minHeight: "100vh", color: "white" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>🛍️ Product Showcase</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: "#222",
              padding: "1rem",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={`http://127.0.0.1:8000${product.images[0]}`}
              alt={product.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            />
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>{product.name}</h3>
            <p style={{ color: "#0f0" }}>₹{product.price}</p>
            <p style={{ fontSize: "0.85rem", color: "#aaa", marginTop: "0.5rem" }}>
              View More →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
