import ProductTile from "./ProductTile";

type GridProps = {
  gridProps:
    | {
        _id: string;
        brand: string;
        category: string;
        color: string;
        desc: string;
        previewImg: string;
        price: string;
        specific: string;
        sub: string;
        title: string;
        reviews: [
          {
            id: string;
            rating: number;
            content: string;
            user: string;
          }
        ];
        sale: [boolean, any];
      }[]
    | undefined;
};

const ProductGrid = ({ gridProps }: GridProps) => {
  return (
    <>
      {gridProps != undefined ? (
        <div className="pg__lower">
          {gridProps.map((data) => (
            <ProductTile data={data} key={data._id} />
          ))}
        </div>
      ) : (
        <div>No Products</div>
      )}
    </>
  );
};
export default ProductGrid;
