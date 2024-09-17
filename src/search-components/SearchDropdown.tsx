import { useContext, useRef } from "react";
import emptyPI from "../assets/missingpi.png";
import ReviewPreview from "../review-components/ReviewPreview";
import { GlobalContext, UserContext } from "../App";

type DropdownProps = {
  productData: {
    _id: string;
    brand: string;
    category: string;
    color: string;
    desc: string;
    previewImg: string[];
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
  }[];
  ddRef: React.MutableRefObject<any>;
  loadTrigger: (res: boolean) => void;
  setActive: Function;
};

const SearchDropdown = ({ productData, ddRef, setActive }: DropdownProps) => {
  const closeRef = useRef<any>(null);
  const { mediaOne } = useContext<GlobalContext>(UserContext);

  window.addEventListener("click", (e) => {
    if (closeRef && closeRef != null) {
      if (!closeRef.current?.contains(e.target)) {
        setActive(false);
      }
    }
  });
  return (
    <>
      <div className="search__dropdown--wrapper" ref={ddRef && closeRef}>
        <div className="sd__upper">
          <h3>search results</h3>
          <span>
            <h5>{productData.length} items</h5>
          </span>
        </div>
        <div className="sd__lower">
          {productData.map((data) => (
            <button
              className="search__tile"
              key={data._id}
              onClick={() =>
                window.navigation({
                  navProps: {
                    master: "products",
                    category: data.category,
                    sub: data.sub,
                    product: data.title,
                  },
                })
              }
            >
              <img
                src={
                  data.previewImg[0] != undefined ? data.previewImg[0] : emptyPI
                }
                alt="product__img"
                id="st__img"
              />
              <div className="sd__info">
                <div className="sd__info--top">
                  <h4>{data.title}</h4>
                  <div className="st__price--container">
                    <h3
                      id="st__price"
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
                {mediaOne === false ? (
                  <ReviewPreview reviewProps={data.reviews} />
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default SearchDropdown;
