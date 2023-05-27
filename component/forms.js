"use client";
import { Steps, theme } from "antd";
import { useState } from "react";
import DynamicForm from "./dynamic-form";

const Stepper = ({ data }) => {
  const [current, setCurrent] = useState(0);
  const next = async () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = data.steps.map((step) => {
    return {
      title: step.name,
      content: (
        <DynamicForm
          length={data.steps.length}
          steps={step}
          next={next}
          current={current}
          prev={prev}
        />
      ),
    };
  });

  const { token } = theme.useToken();

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      ></div>
    </>
  );
};
export default Stepper;
