const PaymentButton = () => {
  const handlePayment = async () => {
    try {
      // Create order from backend
      const orderData = await fetch("https://my-pawn-store.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 500
        }),
      }).then((res) => res.json());

      const options = {
        key: "rzp_test_RQJdSKL0BrIIkM",
        amount: orderData.amount,
        currency: "INR",
        name: "Pawn Store",
        description: "Test Transaction",
        order_id: orderData.id,

        handler: async function (response) {

          const verify = await fetch("https://my-pawn-store.onrender.com/api/payment/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const result = await verify.json();

          if (result.success) {
            alert("Payment Successful");
          } else {
            alert("Payment Verification Failed");
          }
        },

        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
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
    <div style={{ textAlign: "center" }}>
      <h2 className="mb-4">Pay ₹500</h2>
      <button
        onClick={handlePayment}
        style={{
          padding: "12px 20px",
          fontSize: "18px",
          backgroundColor: "#3399cc",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentButton;