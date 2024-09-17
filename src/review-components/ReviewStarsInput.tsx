import { useContext, useState } from "react";
import { GlobalContext, UserContext } from "../App";

const ReviewStarsInput = (props: {
  productId?: string;
  productImg?: string;
  productTitle?: string;
  existingRating?: number;
  rp?: boolean;
  updatedRating?: Function;
}) => {
  const { setReviewPopupProps, mediaTwo } =
    useContext<GlobalContext>(UserContext);
  const starLength = 5;
  const [hovered, setHovered] = useState<number>(
    props.existingRating! != 0 ? props.existingRating! : 0
  );

  const ratingData: { id: number; data: string }[] = [
    {
      id: 1,
      data: "POOR",
    },
    {
      id: 2,
      data: "OKAY",
    },
    {
      id: 3,
      data: "MODERATE",
    },
    {
      id: 4,
      data: "GOOD",
    },
    {
      id: 5,
      data: "EXCELLENT",
    },
  ];

  //review button

  let starButton = Array.from({ length: starLength }, (_, index) => (
    <button
      className="review__star--button"
      key={index}
      onMouseEnter={() => {
        setHovered(index + 1);
      }}
      style={index < hovered ? { background: "var(--accent-blue)" } : undefined}
      onClick={() => {
        if (!props.rp) {
          setReviewPopupProps({
            selectedRating: index + 1,
            productId: props!.productId,
            productImg: props!.productImg,
            productTitle: props!.productTitle,
          });
        } else {
          props.updatedRating!(index + 1);
        }
      }}
    >
      <i
        className={"fa-solid fa-star"}
        style={index < hovered ? { color: "var(--bg)" } : undefined}
      ></i>
    </button>
  ));

  return (
    <>
      <div
        className="lr__container"
        onMouseLeave={() => {
          if (!props.rp) {
            setHovered(0);
          } else {
            props.updatedRating!(hovered);
          }
        }}
      >
        {starButton}
        {props.rp && hovered != 0 && mediaTwo === false ? (
          <p className="rp__desc">
            Product is of{" "}
            <span>{ratingData.find((el) => el.id == hovered)?.data}</span>{" "}
            quality
          </p>
        ) : null}
      </div>
    </>
  );
};
export default ReviewStarsInput;
