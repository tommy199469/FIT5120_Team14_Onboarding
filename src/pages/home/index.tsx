import React from "react";
import { Container } from "../../components";
import "./index.css";
import { UVI } from "../uvi";
import { Graph } from "../graph";
import { Subscribe } from "../subscribe";
export const Home = (props: any) => {
  return (
    <Container>
      {/* problem statement */}
      <div id="home" className="flex flex-col items-center mb-[40px]">
        <h1 className="text-[24px] font-bold mb-5">Problem Statement</h1>
        <h5 className="text-grey w-[70%]">
          The rising melanoma cases in Victoria, especially with males facing a
          higher risk, spotlight a pressing health concern linked to Australia's
          intense UV exposure. This alarming trend not only emphasizes the
          urgent need for increased awareness and preventive measures but also
          invites you to explore our website. Here, you'll find vital
          information on skin cancer, its connection to UV levels, and how to
          protect yourself. Join us in our mission to combat this growing threat
          by educating yourself and others on the importance of sun safety and
          early detection. Let's make a difference together.
        </h5>
      </div>

      <Graph />

      <div className="mt-[40px]" id="map">
        <h1 className="text-[24px] font-bold mb-5 text-center">
          Indicate the UV index about your location
        </h1>
        <UVI />
      </div>

      <h1 id="subscribe" className="text-[24px] font-bold mt-10 text-center">
        Subscribe
      </h1>
      <Subscribe />
    </Container>
  );
};
