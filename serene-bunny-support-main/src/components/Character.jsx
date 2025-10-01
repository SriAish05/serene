import React, { useRef } from "react";
import Spline from "@splinetool/react-spline";

export default function Character() {
  const splineRef = useRef();

  const handleGHQSubmit = () => {
    const score = parseInt(document.getElementById("ghqScore").value);
    let animationName;

    if (score <= 4) animationName = "happy";
    else if (score <= 8) animationName = "moderate_stress";
    else animationName = "stressed";

    // Trigger animation on the Spline model
    if (splineRef.current) {
      splineRef.current.setAnimation(animationName);
    }
  };

  return (
    <div>
      {/* Spline 3D model */}
      <div style={{ width: "100%", height: "500px" }}>
        <Spline
          scene="https://prod.spline.design/ELb49vBBbneZhu2s/scene.splinecode"
          ref={splineRef}
        />
      </div>

      {/* GHQ input form */}
      <div style={{ marginTop: "20px" }}>
        <input type="number" id="ghqScore" placeholder="Enter your GHQ score" />
        <button onClick={handleGHQSubmit}>Submit</button>
      </div>
    </div>
  );
}

