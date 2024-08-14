import React from "react";

interface ITitle {
  text: string;
}

const Title = ({ text }: ITitle) => {
  return <h1 className="text-xl lg:text-3xl font-semibold">{text}</h1>;
};

export default Title;
