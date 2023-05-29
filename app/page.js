"use client";
import Stepper from "../component/forms";
import axios from "axios";
import { useEffect, useState } from "react";

const Forms = () => {
  const [data, setData] = useState();
  const [example, setExample] = useState();

  const fetchData = async () => {
    try {
      return await axios.get(
        "https://notifier.gybcommerce.com/api/dynamic-form/"
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData().then((response) => {
      setData({
        ...response.data,
        steps: [
          ...response.data[0].steps,
          {
            id: 4,
            form: 4,
            step_number: 4,
            name: "Finshed",
            description: "This is Step 4",
            fields: [
              {
                id: 1,
                step: 1,
                field_type: "finshed",
              },
            ],
          },
        ],
      });
    });
  }, []);

  return <> {data ? <Stepper data={data} /> : " "}</>;
};

export default Forms;
