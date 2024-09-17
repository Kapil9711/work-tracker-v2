import Explore from "../components/landingPage/explore/Explore";
import Header from "../components/landingPage/header/Header";
import { useEffect, useRef, useState } from "react";

const LandingPage = () => {
  const [height, setHeight] = useState(0);
  const authRef = useRef(null);
  useEffect(() => {
    setHeight(Number(window.innerHeight));
  }, []);
  return (
    <div
      ref={authRef}
      className="light min-h-screen px-4 bg-black text-white overflow-hidden sm:px-0  b  "
    >
      <Header height={height} />
      <Explore />
    </div>
  );
};
export default LandingPage;
