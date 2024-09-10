import ProductContainerRow from "@/components/Product/ProductContainerRow";
import React from "react";
import ProductLoader from ".";
import { Settings } from "react-slick";

interface ProductContainerRowLoaderProps {
  settings?: Settings;
}

function ProductContainerRowLoader({
  settings,
}: ProductContainerRowLoaderProps) {
  return (
    <ProductContainerRow settings={settings}>
      {new Array(10).fill("").map((_, index) => (
        <ProductLoader key={index} />
      ))}
    </ProductContainerRow>
  );
}

export default ProductContainerRowLoader;
