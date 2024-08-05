import React from "react";
import { Button } from "@mui/material";

export const Hero = () => {
  return (
    <>
      <div className="relative overflow-hidden py-24 lg:py-32 select-none min-h-screen bg-green-700 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
        </div>
        <div className="z-10">
          <div className="container py-8 lg:py-12">
            <div className="max-w-2xl mx-auto drop-shadow-lg flex flex-col justify-center items-center text-center">
              <p className="font-bold text-pretty text-sm tracking-[1em] uppercase text-white drop-shadow-sm">
                Elevate your pantry
              </p>
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white drop-shadow-md">
                  Your <span className="text-green-300">Pantry</span> Organizer
                </h1>
              </div>
              <div className="mt-5 max-w-3xl">
                <p className="text-sm text-muted-foreground text-white font-serif">
                  easily keep track of your pantry items and never run out of
                  your essentials.
                </p>
              </div>
              <div className="mt-5 max-w-2xl flex flex-1 flex-row gap-x-9">
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#e5600d", // Match the green shade with some transparency
                    borderColor: "#001f10",
                    color: "#001f10",
                    borderRadius: "999px", // Fully rounded corners
                    padding: "0.5rem 1.5rem", // Additional padding for a better look
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    transition: "all 0.3s ease-in-out", // Smooth transition for hover effect
                    "&:hover": {
                      backgroundColor: "#e5600d", // Solid green on hover
                      color: "#f3ebeb",
                      borderColor: "#893900",
                      boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)", // Larger shadow on hover
                      transform: "scale(1.05)", // Slightly enlarge the button on hover
                    },
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    const pantry = document.querySelector<HTMLElement>("#pantry");
                    if (pantry) {
                      pantry.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                                  >
                  View Pantry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
