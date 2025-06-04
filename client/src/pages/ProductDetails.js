import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { getUser } from "../utils/auth";

const ProductDetail = () => {
  const { id } = useParams(); // get product ID from route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();
  const user = getUser();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Login First");
      return;
    }
    addToCart(product._id, 1);
    setMessage("✅ Added to cart!");
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded shadow"
        />

        <div>
          <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-500 mb-4 capitalize">{product.category}</p>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            ${product.price}
          </p>

          <button
            onClick={() => handleAddToCart()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          >
            Add to Cart
          </button>
          {message && (
            <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import API from "../api/axios";
// import { addToCart } from "../utils/cartUtils";

// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     API.get(`/products/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error("Error loading product:", err));
//   }, [id]);

//   const handleAddToCart = () => {
//     addToCart(product);
//     setMessage("✅ Added to cart!");
//     setTimeout(() => setMessage(""), 2000);
//   };

//   if (!product) return <p style={{ padding: "20px" }}>Loading...</p>;

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
//       <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
//         ← Back to Products
//       </Link>

//       <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
//         <img
//           src={product.image}
//           alt={product.title}
//           style={{
//             width: "300px",
//             height: "300px",
//             objectFit: "cover",
//             borderRadius: "8px",
//           }}
//         />

//         <div>
//           <h2>{product.title}</h2>
//           <p>
//             <strong>Price:</strong> ${product.price}
//           </p>
//           <p>
//             <strong>Category:</strong> {product.category}
//           </p>
//           <p>
//             <strong>Description:</strong> {product.description}
//           </p>

//           <button
//             onClick={handleAddToCart}
//             style={{
//               marginTop: "20px",
//               padding: "10px 15px",
//               backgroundColor: "#28a745",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Add to Cart
//           </button>

//           {message && (
//             <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
