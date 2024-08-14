import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="absolute w-full h-20">
      <Image src="/images/vectors.png" fill alt="footer-image" />
    </div>
  );
};

export default Footer;
