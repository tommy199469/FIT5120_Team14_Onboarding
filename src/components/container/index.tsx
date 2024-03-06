import React from "react";
import { useRouterStore } from "../../stores";

const videoScreenHeader = ["os"];

export const Container = (props: any) => {
  const { children, from } = props;

  const { history } = useRouterStore();

  const getPageBg = (from: string) => {
    return (
      <div
        className={`h-[100px] w-full max-w-[100%] sm:max-w-[100%] bg-gradient-to-r from-cyan-500 to-blue-500
         mx-auto p-[20px] flex flex-row items-center`}
      >
        <h3
          onClick={() => history.push("/")}
          className="text-white cursor-pointer"
        >
          UV System
        </h3>
        <div className="flex-1" />
        <p
          onClick={() => history.push("/subscribe")}
          className="text-white border-2 border-white p-2 rounded-md cursor-pointer 
        hover:bg-[#012F4F] hover:text-white hover:border-[#012F4F] text-[16px] shadow-md"
        >
          {"Subscribe".toUpperCase()}
        </p>
      </div>
    );
  };

  return (
    <div className={`min-h-screen min-w-screen bg-white`}>
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
