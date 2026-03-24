import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { __productapiurl } from "../API_URL";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewProduct.css";
import { toast, ToastContainer } from "react-toastify";

const ViewProduct = () => {
  const [productDetail, setProductDetail] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState("");
  const [isMyProduct, setIsMyProduct] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const mobile = localStorage.getItem("mobile");
  useEffect(() => {
    axios
      .get(__productapiurl + "fetch", {
        params: { _id: id }, // ✅ correct
      })
      .then((response) => {
        setProductDetail({
          ...response.data.info[0],
          price: response.data.info[0].price,
          //   oldPrice: 60.99,
          rating: 5.0,
          // TO_DO: Add Category name
          //   reviews: 1258,
          description: response.data.info[0].description,
          images: [response.data.info[0].caticonnm],
          status: [response.data.info[0].evaluationStatus],
        });
        setSelectedImage(response.data.info[0].caticonnm);
        setIsMyProduct(email === response.data.info[0].userId);
      });
  }, [id]);
  // 🔥 Evaluate Request
  const handleEvaluate = async () => {
    try {
      await axios.post("http://localhost:3001/api/evaluate", {
        productId: productDetail._id,
      });

      setMessage("✅ Evaluation request sent to experts!");
    } catch (err) {
      setMessage("❌ Failed to send request",err);
    }
  };
  const buyProduct = async () => {
    try {
      // Create order from backend
      const orderData = await fetch(
        "http://localhost:3001/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: productDetail.price,
          }),
        },
      ).then((res) => res.json());

      const options = {
        key: "rzp_test_RQJdSKL0BrIIkM",
        amount: orderData.amount,
        currency: "INR",
        name: "Pawn Store",
        description: "Test Transaction",
        order_id: orderData.id,

        handler: async function (response) {
          const verify = await fetch(
            "http://localhost:3001/api/payment/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            },
          );

          const result = await verify.json();

          if (result.success) {
            toast("Payment Successful");
            await axios.post("http://localhost:3001/api/order/save", {
              userId: email,
              name,
              email,
              mobile,

              productId: productDetail._id,
              productName: productDetail.catnm,
              price: productDetail.price,
              image: productDetail.caticonnm,

              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });

            // ✅ REDIRECT
            navigate("/orders");
          } else {
            alert("Payment Verification Failed");
          }
        },

        prefill: {
          name,
          email,
          contact: mobile,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="view-product min-h-screen  from-purple-600 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* LEFT - IMAGES */}
        <div>
          <i
            className="bi bi-arrow-left"
            onClick={() => navigate("/myProducts")}
          ></i>
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

          <p className="mt-2">
            ⭐ {productDetail.rating} ({productDetail.reviews} reviews)
          </p>

          <div className="mt-4">
            <span className="text-3xl font-bold">
              {"\u20B9"}
              {productDetail.price}
            </span>
          </div>

          {/* Features */}
          <div className="mt-6 space-y-2">
            <p>{productDetail.description}</p>
          </div>

          {/* 🔥 Buttons */}
          <div className="mt-6 flex gap-4">
            {!isMyProduct && (
              <button
                className="bg-orange-500 px-6 py-3 rounded-xl font-semibold"
                onClick={buyProduct}
              >
                Buy
              </button>
            )}

            {isMyProduct &&
              (productDetail.status != "approved" &&
              productDetail.status != "pending" ? (
                <button
                  onClick={handleEvaluate}
                  className="bg-blue-500 px-6 py-3 rounded-xl font-semibold"
                >
                  {productDetail.status === "rejected"
                    ? "Re-evaluate"
                    : "Evaluate"}
                </button>
              ) : (
                <p>Your Evaluation request is {productDetail.status}</p>
              ))}
          </div>

          {/* Message */}
          {message && (
            <div className="mt-4 bg-black/30 p-3 rounded-xl">{message}</div>
          )}

          {/* Extra */}
          <div className="mt-6 text-sm">
            ✔ In Stock <br />
            ⭐Genuine products <br />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewProduct;
