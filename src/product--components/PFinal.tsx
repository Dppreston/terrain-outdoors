import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewPreview from "../review-components/ReviewPreview";
import Button from "../functional-components/Button";
import { buttonData } from "../functional-components/FuncStatic";
import Sale from "../support-components/Sale";
import Quantity from "../support-components/Quantity";
import Review from "../review-components/Review";
import { GlobalContext, UserContext } from "../App";
import Loader from "../support-components/Loader";
import WishlistBtn from "../support-components/WishlistBtn";
import emptyPI from "../assets/missingpi.png";

type Product = {
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
      _id: string;
      rating: number;
      content: string;
      summary: string;
      user: string;
      creationDate: Date;
    }
  ];
  sale: [boolean, any];
};

const PFinal = () => {
  const { product } = useParams();
  const { setReviewPopupProps, setEnlargedPI, loading, userData, mediaTwo } =
    useContext<GlobalContext>(UserContext);
  const [productData, setProductData] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);

  //fetch product

  const initProduct = async () => {
    try {
      const res = await axios.get(
        `/products?initProduct=true&product=${product}`
      );
      setProductData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  //quantity recieve

  const recieveQuantity = (value: number) => {
    setQuantity(value);
  };

  useEffect(() => {
    initProduct();
  }, [product]);

  return (
    <>
      {productData != undefined ? (
        <div className="pfinal__wrapper">
          <div className="pfinal__upper">
            <div className="pfinal__img--env">
              {mediaTwo === false ? (
                <button
                  id="view__all--imgs"
                  onClick={() => setEnlargedPI(productData.previewImg)}
                >
                  <i className="fa-regular fa-images"></i>
                  <p>View All</p>
                </button>
              ) : null}

              <div className="pfinal__img--wrapper">
                <img
                  src={
                    productData?.previewImg.length === 0
                      ? emptyPI
                      : productData.previewImg[0]
                  }
                  alt="product__img"
                  id="pfinal__img"
                />
              </div>
            </div>
            <div className="pfinal__product__details--wrapper">
              <h6>{productData.title}</h6>
              <div className="pfinal__pdw--lower">
                <div className="pfinal__review--container">
                  <ReviewPreview reviewProps={productData.reviews} />
                  {buttonData
                    .filter((el) => el.identifier == "write__review")
                    .map((data) => (
                      <Button
                        buttonProps={data}
                        key={data.id}
                        individualAction={setReviewPopupProps}
                        individualOptions={{
                          selectedRating: 0,
                          productId: productData._id,
                          productImg: productData.previewImg[0],
                          productTitle: productData.title,
                        }}
                      />
                    ))}
                  {userData != undefined ? (
                    <WishlistBtn productId={productData._id} />
                  ) : null}
                </div>
                {productData.sale[0] == true ? (
                  <Sale pfinal={productData.sale} />
                ) : null}
                <div className="pfinal__price--container">
                  <div className="pfinal__sale--container">
                    <h1
                      style={
                        productData.sale[0] == !false
                          ? { textDecoration: "line-through" }
                          : undefined
                      }
                    >
                      ${productData.price}
                    </h1>
                    {productData.sale[0] == !false ? (
                      <h1 style={{ color: "var(--accent-orange)" }}>
                        {productData.sale[1].$numberDecimal}
                      </h1>
                    ) : null}
                  </div>

                  <Quantity value={recieveQuantity} />
                </div>

                <div className="pfinal__atc--wrapper">
                  {buttonData
                    .filter((el) => el.identifier == "add__to--cart")
                    .map((data) => (
                      <Button
                        buttonProps={data}
                        key={data.id}
                        individualAction={window.addToCart}
                        individualOptions={[productData._id, quantity]}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="pfinal__lower">
            <h6>Product Details</h6>
            <div className="pfl__details--wrapper">
              <h3>
                Brand: <span>{productData.brand}</span>
              </h3>
              <h3>
                Color: <span>{productData.color}</span>
              </h3>
              <h3>
                SKU: <span>#{productData._id.substring(17, 24)}</span>
              </h3>
              <h5>Product #: {productData._id}</h5>
            </div>
            <p className="product__desc">{productData.desc}</p>
            <div className="pfl__reviews--container">
              <h6>Reviews</h6>
              <Review
                productId={productData._id}
                productImg={productData.previewImg[0]}
                productTitle={productData.title}
              />
            </div>
          </div>
          {loading === 4 ? <Loader /> : null}
        </div>
      ) : null}
    </>
  );
};
export default PFinal;
