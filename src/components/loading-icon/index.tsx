import React from "react";
import { Rings } from "react-loader-spinner";

export const LoadingIcon = (props: any) => {
  const { color = "#4269AB", size = "50" } = props;
  return (
    <Rings
      height={size}
      width={size}
      color={color}
      radius="6"
      wrapperStyle={{}}
      wrapperClass="loading-icon "
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};
