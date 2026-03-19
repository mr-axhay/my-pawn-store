import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { __productapiurl } from "../API_URL";
import { useNavigate, useParams } from "react-router-dom";
import './ViewProduct.css';

const ViewProduct = () => {
    const [productDetail, setProductDetail] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(__productapiurl + "fetch", {
            params: { _id: id }   // ✅ correct
        })
            .then((response) => {
                setProductDetail({
                    ...response.data.info[0],
                    price: 49.99,
                    oldPrice: 60.99,
                    rating: 4.8,
                    reviews: 1258,
                    features: [
                        "20,000mAh Capacity",
                        "Dual USB & USB-C",
                        "Waterproof & Shockproof"
                    ],
                    images: [response.data.info[0].caticonnm],
                });
                setSelectedImage(response.data.info[0].caticonnm);
            });
    }, [id]);
    // 🔥 Evaluate Request
    const handleEvaluate = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/evaluate", {
                productId: productDetail._id
            });

            setMessage("✅ Evaluation request sent to experts!");
        } catch (err) {
            setMessage("❌ Failed to send request");
        }
    };

    return (
        <div className="view-product min-h-screen  from-purple-600 to-blue-500 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 max-w-6xl w-full grid md:grid-cols-2 gap-8">

                {/* LEFT - IMAGES */}
                <div>
                    <i className="bi bi-arrow-left"
                        onClick={() => navigate('/product')}></i>
                    <img
                        src={`../../public/assets/uploads/caticons/${selectedImage}`}
                        className="rounded-2xl w-full h-[400px] object-cover"
                    />

                    <div className="flex gap-3 mt-4">
                        {productDetail.images?.map((img, i) => (
                            <img
                                key={i}
                                src={`../../public/assets/uploads/caticons/${img}`}
                                onClick={() => setSelectedImage(img)}
                                className="w-20 h-20 rounded-lg cursor-pointer"
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT - DETAILS */}
                <div className="text-white">
                    <h1 className="text-3xl font-bold">{productDetail.catnm}</h1>

                    <p className="mt-2">⭐ {productDetail.rating} ({productDetail.reviews} reviews)</p>

                    <div className="mt-4">
                        <span className="text-3xl font-bold">${productDetail.price}</span>
                        <span className="line-through ml-3">${productDetail.oldPrice}</span>
                    </div>

                    {/* Features */}
                    <div className="mt-6 space-y-2">
                        {productDetail.features?.map((f, i) => (
                            <p key={i}>✅ {f}</p>
                        ))}
                    </div>

                    {/* 🔥 Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button className="bg-orange-500 px-6 py-3 rounded-xl font-semibold">
                            Sell
                        </button>

                        <button
                            onClick={handleEvaluate}
                            className="bg-blue-500 px-6 py-3 rounded-xl font-semibold"
                        >
                            Evaluate
                        </button>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className="mt-4 bg-black/30 p-3 rounded-xl">
                            {message}
                        </div>
                    )}

                    {/* Extra */}
                    <div className="mt-6 text-sm">
                        ✔ In Stock <br />
                        🚚 Free Shipping <br />
                        ⭐ 30-Day Guarantee
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;