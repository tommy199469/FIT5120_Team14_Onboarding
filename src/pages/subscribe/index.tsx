import React, { useRef, useEffect, useState } from "react";
import { Container, LoadingIcon } from "../../components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Subscribe = (props: any) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (event: any) => {
    const { value } = event.target;
    setEmail(value);
  };
  const handleSubmit = async () => {
    try {
      if (!emailPattern.test(email) || email === "") {
        toast.error("Email format is not correct");
      }
      setLoading(true);

      await axios.post("http://localhost:8001/api/subscribe", {
        email,
        lat: localStorage.getItem("lat"),
        lng: localStorage.getItem("lng"),
      });

      setLoading(false);
      setEmail("");
      toast.success("Successfully subscribed reminder");
    } catch (e) {
      toast.error("Failed to subscribe");
      setEmail("");
    }
  };

  const isButtonDisabled = () => {
    if (email === "") {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <div className="flex flex-col items-center h-[100%]">
        <div className="mt-52">
          <p className="text-[14px] text-center">
            Please enter your email to subscribe to our Sunscreen Refill
            Reminder Service.
          </p>
        </div>
        {/* input email or phone */}
        <div className="flex flex-col mt-10 items-center w-[300px]">
          <div className="flex flex-col">
            <div className="flex flex-col w-[200px] mt-5">
              <p className="mb-1">Email</p>
              <input
                type="text"
                className="border-[1px] border-black rounded-md p-2"
                value={email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {!loading && (
          <button
            style={{
              marginTop: "40px",
              width: "200px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...(isButtonDisabled() && { backgroundColor: "grey" }),
            }}
            onClick={handleSubmit}
            disabled={isButtonDisabled()}
          >
            Confirm
          </button>
        )}

        {loading && (
          <div
            style={{
              marginTop: "40px",
            }}
          >
            <LoadingIcon />
          </div>
        )}
      </div>
      <ToastContainer />
    </Container>
  );
};
