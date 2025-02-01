import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button"; // Ensure you have this Button component imported

export function DownBox() {
  const [move, setMove] = useState({ x: 167 });
  const [valueArray, setValueArray] = useState("");
  const [rslt, setRslt] = useState(0);

  const operators = ["+", "-", "*", "/", "%"];

  const checkOperators = useCallback(() => {
    for (let i = 0; i < valueArray.length - 1; i++) {
      if (
        operators.includes(valueArray[i]) &&
        operators.includes(valueArray[i + 1])
      ) {
        return true;
      }
    }
    return false;
  }, [valueArray]);

  function equalClick() {
    if (checkOperators()) {
      setRslt("Error");
    } else {
      if (
        valueArray.includes("++") ||
        valueArray.includes("+*") ||
        valueArray.includes("++")
      ) {
        setRslt("Error");
      } else {
        try {
          setRslt(eval(valueArray));
        } catch (e) {
          setRslt("Error");
        }
      }
    }
  }

  function xPosition(e) {
    const box = e.currentTarget.getBoundingClientRect();
    setMove({ x: e.clientX - box.left });
  }

  function addValue(value) {
    setValueArray((prev) => prev + value);
  }

  return (
    <div className="relative">
      <div className="absolute left-5 top-5">
        <span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </span>
        </span>
      </div>
      <div className="bg-black flex-col whitespace-nowrap overflow-x-scroll rounded-t-3xl h-[255px] w-[350px] py-7 px-5 flex justify-end items-end text-4xl">
        <span className="text-[1.6rem] mb-2 text-gray-400">{valueArray}</span>
        <span className="text-[3rem]">{rslt}</span>
      </div>
      <motion.div
        className="grid grid-cols-4 grid-rows-5 gap-2 bg-[#072942] px-6 py-6 overflow-hidden w-[350px] relative h-[400px] rounded-b-3xl text-white"
        onMouseMove={xPosition}
      >
        <motion.div
          className="h-[3px] w-[900px] top-0 absolute"
          animate={{ left: `${move.x - 538}px` }}
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0) 40%, #556a7a 60%, rgba(0, 0, 0, 0) 78%)",
          }}
          transition={{
            duration: 0.4,
          }}
        ></motion.div>
        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => {
            setRslt(0);
            setValueArray("");
          }}
        >
          <span className="text-orange-500 text-2xl cursor-pointer">C</span>
        </Button>
        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => setValueArray(valueArray.slice(0, -1))}
        >
          <span className="text-2xl cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#f66"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
              />
            </svg>
          </span>
        </Button>
        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("%")}
        >
          <span className="text-[#33a9a5] text-2xl cursor-pointer">%</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("/")}
        >
          <span className="text-[#33a9a5] text-2xl cursor-pointer">/</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("1")}
        >
          <span className="text-2xl cursor-pointer">1</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("2")}
        >
          <span className="text-2xl cursor-pointer">2</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("3")}
        >
          <span className="text-2xl cursor-pointer">3</span>
        </Button>
        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("*")}
        >
          <span className="text-[#33a9a5] text-xl cursor-pointer">x</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("4")}
        >
          <span className="text-2xl cursor-pointer">4</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("5")}
        >
          <span className="text-2xl cursor-pointer">5</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("6")}
        >
          <span className="text-2xl cursor-pointer">6</span>
        </Button>
        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("+")}
        >
          <span className="text-[#33a9a5] text-2xl cursor-pointer">+</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("7")}
        >
          <span className="text-2xl cursor-pointer">7</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("8")}
        >
          <span className="text-2xl cursor-pointer">8</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("9")}
        >
          <span className="text-2xl cursor-pointer">9</span>
        </Button>
        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("-")}
        >
          <span className="text-[#33a9a5] text-4xl cursor-pointer">-</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("0")}
        >
          <span className="text-2xl cursor-pointer">0</span>
        </Button>

        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue("00")}
        >
          <span className="text-2xl cursor-pointer">00</span>
        </Button>
        <Button
          className="hover:text-[#33a9a5] hover:scale-110 transition-transform"
          onClick={() => addValue(".")}
        >
          <span className="text-[#33a9a5] text-3xl cursor-pointer">.</span>
        </Button>
        <Button
          className="hover:text-[#469c99] bg-[#33a9a5] hover:scale-110 transition-transform"
          onClick={equalClick}
        >
          <span className="text-xl">=</span>
        </Button>
      </motion.div>
    </div>
  );
}
