import { useParams } from "react-router-dom";
import Breadcrumbs from "../support-components/Breadcrumbs";
import CategoryGrid from "../product--components/CategoryGrid";
import PEnvironment from "../product--components/PEnvironment";
import PFinal from "../product--components/PFinal";

const Products = () => {
  const { category, sub, product } = useParams();

  let params = [
    category ? category : null,
    sub ? sub : null,
    product ? product : null,
  ];

  return (
    <>
      <div className="product__page--wrapper">
        <div className="pp__upper">
          <Breadcrumbs params={params} />
        </div>
        <div className="pp__lower">
          {params[0] != null && params[1] == null && params[2] == null ? (
            <CategoryGrid category={category} />
          ) : null}
          {params[0] != null && params[1] != null && params[2] == null ? (
            <PEnvironment />
          ) : (
            <PFinal />
          )}
        </div>
      </div>
    </>
  );
};
export default Products;
