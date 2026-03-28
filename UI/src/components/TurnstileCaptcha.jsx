import { useEffect, useRef } from "react";

const TurnstileCaptcha = ({ onVerify }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (window.turnstile) {
      window.turnstile.render(ref.current, {
        sitekey: "0x4AAAAAACw4CE9Fn8WNOQBg",
        callback: function (token) {
          onVerify(token); // send token to parent
        },
      });
    }
  }, []);

  return <div ref={ref}></div>;
};

export default TurnstileCaptcha;