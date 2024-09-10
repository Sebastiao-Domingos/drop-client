import ProductContainerColumn from "@/components/Product/ProductContainerColumn";
import React from "react";
import ProductLoader from ".";

function ProductContainerColumnLoader() {
  return (
    <ProductContainerColumn>
      {new Array(8).fill("").map((_, index) => (
        <ProductLoader key={index} />
      ))}
    </ProductContainerColumn>
  );
}

export default ProductContainerColumnLoader;
