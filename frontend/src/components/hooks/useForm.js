import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  console.log(values);

  const handleChange = (event) => {
    console.log(event);
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    console.log(value);
  };

  return { values, handleChange, setValues };
}
