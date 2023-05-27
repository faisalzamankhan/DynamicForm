import { Input, Select, Checkbox, Button, Form, Card } from "antd";
import axios from "axios";

const { Meta } = Card;
import { useState } from "react";

const countries = [
  { label: "Pakistan", value: "Pakistan" },
  { label: "India", value: "India" },
  { label: "USA", value: "USA" },
];

const DynamicForm = ({ steps, length, next, current, prev }) => {
  const [formData, setFormData] = useState([]);

  const onFinish = (values) => {
    setFormData((data) => [...data, values]);

    if (current !== length - 1) next();
    if (current == length - 2) {
      postData([...formData, values]);
    }
  };

  const postData = async (data) => {
    const dataObject = {};
    data.map((item) => {
      Object.entries(item).map(([key, value]) => {
        dataObject[key] = value;
      });
    });
    console.log(dataObject);
    try {
      const response = await axios.post(
        "https://webhook.site/f75a76cd-d422-4b54-aa80-64be653b2d64",
        dataObject
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onFinish={onFinish} layout="vertical" style={{ padding: "1rem" }}>
        {steps.fields.map((field, index) => (
          <div key={index}>
            {field.field_type == "finshed" ? (
              <Card
                hoverable
                style={{
                  padding: "1rem",
                  width: "30%",

                  margin: "auto",
                }}
                // cover={
                //   <img
                //     alt="example"
                //     src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                //   />
                // }
              >
                <Meta
                  title="Your data has been submitted"
                  description="www.GYB commerce.com"
                />
              </Card>
            ) : (
              <>
                {field.field_type == "select" ? (
                  <Form.Item
                    rules={[
                      {
                        required: true,

                        message: `Please select any  ${field.name}`,
                      },
                    ]}
                    name={field.name}
                    label={field.label}
                  >
                    <Select
                      style={{ display: "block" }}
                      options={countries}
                      placeholder={field.placeholder}
                    />
                  </Form.Item>
                ) : (
                  <>
                    {field.field_type == "checkbox" ? (
                      <Form.Item
                        rules={[
                          {
                            required: true,

                            message: `Please select  ${field.name}`,
                          },
                        ]}
                        name={field.name}
                        label={field.label}
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>
                    ) : (
                      <Form.Item
                        rules={[
                          {
                            required: true,

                            message: `Please enter your ${field.name}`,
                          },
                        ]}
                        name={field.name}
                        label={field.label}
                      >
                        <Input
                          placeholder={field.placeholder}
                          name={field.name}
                          type={field.field_type}
                        />
                      </Form.Item>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ))}
        {current < length - 1 && (
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        )}

        {current > 0 && current < length - 1 ? (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={prev}
          >
            Previous
          </Button>
        ) : (
          " "
        )}
      </Form>
    </>
  );
};

export default DynamicForm;
