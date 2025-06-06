import React from "react";
import * as contentful from "contentful";
import "./ProductCatalog.css";
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';

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

const useCompactFlag = () => {
  const client = useLDClient();
  const [compactGrid, setCompactGrid] = React.useState(false); //set the current state to false

  React.useEffect(() => {
    const key = 'Compact-grid';
    const initialValue = client.variation(key, false); //retrive the flag, default to false
    setCompactGrid(initialValue); //update the state

    const onSettingsChange = (settings) => {
      console.log(settings);
      const value = settings[key].current;

      setCompactGrid(value);
    };

    client.on('change', onSettingsChange); //any change we get the update
  }, [client]);

  return compactGrid;
};

const ProductList = ({ products }) => {

  //use manual listener
  //const compactGrid = useCompactFlag();

  //use LD Flag
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

const ProductItem = ({ product }) => {
 const { fields } = product;

 return (
   <div role="button" className="product-in-list" onClick={()=> console.log('product clicked!', fields.productName)}>
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
  const { useFlashSale } = useFlags();

  return (
    <>
    {
      useFlashSale
        ? <ProductHeaderAlmostGone fields={fields} />
        : <ProductHeader fields={fields} />
    }
      <p className="product-caƒtegories">
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
      {fields.productName}
    </h2>
    {" by "}
    {fields.brand.fields.companyName}
   </div>
 );
};

const ProductHeaderAlmostGone = ({ fields }) => {

  //id of the Norman Copenhagen brand
  const isAlmostGone = fields.brand.sys.id === '651CQ8rLoIYCeY6G0QG22q';

  return (
    <div className="product-header">
      <h2>
        {fields.productName}
      </h2>
      {isAlmostGone && 
      <h2>
        <span className="almost-gone">Almost Gone!</span>
      </h2> 
      }
      {" by "}
        {fields.brand.fields.companyName}
    </div>
  );
 };

const ProductImage = ({ image, slug }) => {
 if (image && image.fields.file) {
   return (
       <img
         src={image.fields.file.url}
         alt={image.fields.title || "Product image"}
       />
   );
 }
 return null;
};

export default ProductCatalog;