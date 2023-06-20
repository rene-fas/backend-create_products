import { useState } from "react";
import { StyledForm, StyledHeading, StyledLabel } from "./ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";
import { mutate } from "swr";

export default function ProductForm() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "EUR",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        setProductData({
          name: "",
          description: "",
          price: "",
          currency: "EUR",
        });
        console.log(mutate("/api/products"));
        mutate("/api/products");
      } else {
        throw new Error("Failed to create product.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeading>Add a new Fish</StyledHeading>
      <StyledLabel htmlFor="name">
        Name:
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleChange}
        />
      </StyledLabel>
      <StyledLabel htmlFor="description">
        Description:
        <input
          type="text"
          id="description"
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
      </StyledLabel>
      <StyledLabel htmlFor="price">
        Price:
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          value={productData.price}
          onChange={handleChange}
        />
      </StyledLabel>
      <StyledLabel htmlFor="currency">
        Currency:
        <select
          id="currency"
          name="currency"
          value={productData.currency}
          onChange={handleChange}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </StyledLabel>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}
