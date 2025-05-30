import React from "react";
import { useParams } from "react-router-dom";
import ProductDetailsContainer from "./ProductDetailsContainer";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  
  // Scroll to top when the page is loaded
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProductDetailsContainer productId={productId} />;
};

export default ProductDetailsPage;