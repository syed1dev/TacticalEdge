import CreateMovie from "@/components/movie/create-movie";
import Title from "@/components/title";
import React from "react";

const Page = () => {
  return (
    <div className="container">
      <div className="py-16">
        <Title text="Create New Movie" />
      </div>
      <CreateMovie />
    </div>
  );
};

export default Page;
