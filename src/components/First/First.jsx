// eslint-disable-next-line no-unused-vars
import React from "react";
import Banner from "./Banner";
import TrendingSection from "./TrendingSection";
import Posts from "../common_components/Posts/Posts";
import DiscoverFilters from "./DiscoverFilters";

const Demo = () => {
  return (
    <>
      <Banner />
      <div className="bg-header2">
      {/* <TrendingSection /> */}
      <div className="size flex flex-col-reverse py-7 md:flex-row gap-[7rem]">
        <div className="flex-[2]">
          <Posts  />
        </div>
        <div className="flex-[1] relative">

          <DiscoverFilters />
        </div>
      </div>
      </div>
      
    </>
  );
};

export default Demo;
