import CreateMovie from "@/components/movie/create-movie";
import EditMovie from "@/components/movie/edit-movie";
import Title from "@/components/title";
import React from "react";

interface IParams {
  params: {
    movieId: string;
  };
}

const Page = ({ params: { movieId } }: IParams) => {
  return (
    <div className="container">
      <div className="py-16">
        <Title text="Edit" />
      </div>
      <EditMovie movieId={movieId} />
    </div>
  );
};

export default Page;
