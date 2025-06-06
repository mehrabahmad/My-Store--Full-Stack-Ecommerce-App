// import { useEffect, useState } from "react";
// import API from "../api/axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import ProductSlider from "../components/ProductSlicer";
import API from "../api/axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // axios.get("/api/products").then((res) => setProducts(res.data));
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Featured Products
        </h1>
        <ProductSlider products={products} />
      </div>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white text-center py-20 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to MyStore
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your one-stop shop for awesome products
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Features Section */}
        <div className="py-12 px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Shop With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p>We offer unbeatable prices on all our products.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p>Get your orders delivered quickly and reliably.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p>We only sell high-quality, authentic products.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 bg-white border-t">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
