import React from "react";
import { useRouterStore } from "../../stores";

const videoScreenHeader = ["os"];

export const Container = (props: any) => {
  const { children, from } = props;

  const { history } = useRouterStore();

  const scroll = (elementId: string) => {
    const section = document.querySelector("#" + elementId);

    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getPageBg = (from: string) => {
    return (
      <div
        className={`h-[100px] w-full max-w-[100%] sm:max-w-[100%] bg-gradient-to-r from-cyan-500 to-blue-500
         mx-auto p-[20px] flex flex-row items-center`}
      >
        <h3
          onClick={() => scroll("home")}
          className="text-white cursor-pointer"
        >
          Smart UV
        </h3>

        <h3
          onClick={() => scroll("map")}
          className="text-white cursor-pointer ml-10"
        >
          UV Index Map
        </h3>
        <h3
          onClick={() => scroll("subscribe")}
          className="text-white cursor-pointer ml-5 "
        >
          Subscribe
        </h3>
      </div>
    );
  };

  return (
    <div className={`min-h-screen min-w-screen bg-white overflow-y-auto`}>
      {videoScreenHeader.indexOf(from) < 0 && getPageBg(from)}

      {/* Children */}
      <div
        className={` max-w-[100%] sm:max-w-[100%] flex flex-col p-[20px] bg-white
        overflow-hidden overflow-y-scroll h-[1200px]`}
        id="home-container"
      >
        {children}
      </div>
    </div>
  );
};
