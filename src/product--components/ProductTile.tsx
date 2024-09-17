import Sale from "../support-components/Sale";
import ReviewPreview from "../review-components/ReviewPreview";
import { Link } from "react-router-dom";
import emptyPI from "../assets/missingpi.png";

type TileData = {
  data: {
    _id: string;
    brand?: string;
    category: string;
    color?: string;
    desc?: string;
    previewImg: string;
    price: string;
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
  };
};

const ProductTile = ({ data }: TileData) => {
  return (
    <>
      <Link
        to="#"
        className="product__tile"
        key={data._id}
        onClick={() => {
          window.navigation({
            navProps: {
              master: "products",
              category: data.category,
              sub: data.sub,
              product: data.title,
            },
          });
        }}
      >
        <div className="product__tile--img--container">
          <img
            src={data.previewImg.length === 0 ? emptyPI : data.previewImg[0]}
            alt="product__img"
            id="product__img"
          />
        </div>
        <div className="product__tile--info--container">
          <h3 id="pt__name">{data.title}</h3>
          <div className="pit__lower">
            <div className="pti__left">
              <ReviewPreview reviewProps={data.reviews} />
              <div className="pt__price--container">
                <h3
                  id="pt__price"
                  style={
                    data.sale[0] == !false
                      ? { textDecoration: "line-through" }
                      : undefined
                  }
                >
                  ${data.price}
                </h3>
                {data.sale[0] == !false ? (
                  <h3 style={{ color: "var(--accent-orange)" }}>
                    {data.sale[1].$numberDecimal}
                  </h3>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {data.sale[0] == !false ? <Sale /> : null}
      </Link>
    </>
  );
};
export default ProductTile;
