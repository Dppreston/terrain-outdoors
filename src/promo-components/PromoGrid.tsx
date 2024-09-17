import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductTile from "../product--components/ProductTile";
import { GlobalContext, UserContext } from "../App";

type PGProps = {
  type?: number;
  title?: string;
  format: number;
};

type PGData = {
  _id: string;
  previewImg: string;
  title: string;
  sub: string;
  category: string;
  price: string;
  sale: [boolean, any];
  reviews: [
    {
      id: string;
      rating: number;
      content: string;
      user: string;
    }
  ];
}[];

const PromoGrid = ({ type, title, format }: PGProps) => {
  const [promoData, setPromoData] = useState<PGData>();
  const { mediaOne, mediaTwo } = useContext<GlobalContext>(UserContext);

  let formatFinal = mediaOne === false ? format : 1;

  const handlePromo = async () => {
    //top sellers ids
    if (type === 1) {
      const res = await axios.get(`/orders?promo=true&promoType=${type}`);
      if (res.data.length > 0) {
        const topIdsArr = res.data.flatMap((data: { _id: string }) => data._id);

        console.log(res.data);
        // top sellers product fetch
        const topSellerData = await axios.get(
          `/products?topSellers=true&topSellerIds=${JSON.stringify(topIdsArr)}`
        );

        setPromoData(topSellerData.data);
      }
    }
    if (type === 2 || type === 3) {
      const res = await axios.get(`/products?promo=true&promoType=${type}`);
      if (res.data) {
        if (type === 2) {
          const iteratedItems = res.data.map((data: PGData) => [...data][0]);
          setPromoData(iteratedItems);
        } else {
          setPromoData(res.data);
        }
      }
    }
  };

  useEffect(() => {
    handlePromo();
  }, [type]);

  return (
    <>
      <div className="promo__grid--wrapper">
        <div
          className="promo__grid--inner"
          style={{
            flexDirection:
              formatFinal === 2 && mediaTwo === false
                ? "row"
                : formatFinal === 3 && mediaTwo === false
                ? "row-reverse"
                : undefined,
            height: formatFinal !== 1 ? "fit-content" : undefined,
          }}
        >
          <div
            className="promo__grid--top"
            style={
              formatFinal !== 1 && mediaTwo === false
                ? {
                    display: "flex",
                    alignItems: "center",
                    width: "300px",
                    fontSize: "3rem",
                    padding: mediaOne === !false ? "15px" : undefined,
                  }
                : undefined
            }
          >
            <h6
              style={
                formatFinal !== 1
                  ? {
                      fontSize: mediaOne === false ? "4rem" : "2rem",
                      textAlign: "center",
                    }
                  : undefined
              }
            >
              {title}
            </h6>
          </div>
          <div
            className="promo__grid--lower"
            style={
              formatFinal !== 1 && mediaTwo === false
                ? {
                    flex: "auto",
                    overflow: "auto",
                    display: "flex",
                    borderRight: "var(--border)",
                    maxWidth: "950px",
                  }
                : undefined
            }
          >
            {promoData != undefined
              ? promoData.map((data) => (
                  <ProductTile data={data} key={data._id} />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default PromoGrid;
