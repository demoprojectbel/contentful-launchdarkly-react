import React from "react";
import * as contentful from "contentful";
import "./ProductCatalog.css";
import { useFlags } from 'launchdarkly-react-client-sdk';
import { useEffect} from 'react';
import { useState } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';

// ordinarily these should be saved in an .ENV file
// but these are demo credentials that are public!
const contentfulClient = contentful.createClient({
 accessToken:
   "0e3ec801b5af550c8a1257e8623b1c77ac9b3d8fcfc1b2b7494e3cb77878f92a",
 space: "wl1z0pal05vy",
});

const PRODUCT_CONTENT_TYPE_ID = "2PqfXUJwE8qSYKuM0U6w8M";

const ProductCatalog = () => {
 const [products, setProducts] = React.useState([]);

 React.useEffect(() => {
   contentfulClient
     .getEntries({
       content_type: PRODUCT_CONTENT_TYPE_ID,
     })
     .then((entries) => {
       setProducts(entries.items);
     });
 }, []);

 return <ProductList products={products} />;
};


const ProductList = ({ products }) => {

  const { compactGrid } = useFlags();
  console.log("compactGrid", compactGrid);

  const containerClass = compactGrid ? 'products-compact-grid' : 'products';

 return (
   <>
     <div className={containerClass}>
       {products.map((product) => (
         <ProductItem key={product.sys.id} product={product} />
       ))}
     </div>
   </>
 );
};

/*const [containerClass, setContainerClass] = useState('products');
const ldClient = useLDClient();

const ProductList = ({ products }) => {

  useEffect(() => {
    if (!ldClient) return;

    const flagKey = 'Compact-grid';

    // Function to update the container class based on flag value
    const updateContainerClass = (flagValue) => {
      setContainerClass(flagValue ? 'products-compact-grid' : 'products');
    };

    // Get the initial flag value
    const initialFlagValue = ldClient.variation(flagKey, false);
    updateContainerClass(initialFlagValue);

    // Listener for flag changes
    const handleFlagChange = (newValue) => {
      updateContainerClass(newValue);
    };

    // Register the listener
    ldClient.on(`change:${flagKey}`, handleFlagChange);

    // Cleanup the listener on component unmount
    return () => {
      ldClient.off(`change:${flagKey}`, handleFlagChange);
    };
  }, [ldClient]);
    return (
      <div className={containerClass}>
        {products.map((product) => (
          <ProductItem key={product.sys.id} product={product} />
        ))}
      </div>
    );
 }
*/
const ProductItem = ({ product }) => {
 const { fields } = product;

 return (
   <div className="product-in-list">
     <div className="product-image">
       <ProductImage image={fields.image[0]} slug={fields.slug} />
     </div>
     <div className="product-details">
       <ProductDetails fields={fields} />
     </div>
   </div>
 );
};

 const ProductDetails = ({ fields }) => {
  const { showProductTags } = useFlags();
  console.log("showProductTags", showProductTags);

  return (
    <>
      <ProductHeader fields={fields} />
      <p className="product-categories">
        {fields.categories.map((category) => category.fields.title).join(", ")}
      </p>
      <p>{fields.price} &euro;</p>
      {showProductTags ? (
       <p className="product-tags">
         <span>Tags:</span> {fields.tags.join(", ")}
       </p>
     ): null}
    </>
  );
 };

const ProductHeader = ({ fields }) => {
 return (
   <div className="product-header">
     <h2>
       <a href={`product/${fields.slug}`}>{fields.productName}</a>
     </h2>
     {" by "}
     <a href={`brand/${fields.brand.sys.id}`}>
       {fields.brand.fields.companyName}
     </a>
   </div>
 );
};

const ProductImage = ({ image, slug }) => {
 if (image && image.fields.file) {
   return (
     <a href={`product/${slug}`}>
       <img
         src={image.fields.file.url}
         alt={image.fields.title || "Product image"}
       />
     </a>
   );
 }
 return null;
};

export default ProductCatalog;