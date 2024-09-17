import { useContext, useEffect, useState } from "react";
import { GlobalContext, UserContext } from "../App";
import Button from "../functional-components/Button";
import {
  buttonData,
  inputData,
  textAreaData,
} from "../functional-components/FuncStatic";
import ReviewStarsInput from "./ReviewStarsInput";
import Input from "../functional-components/Input";
import TextArea from "../functional-components/TextArea";
import axios from "axios";
import Loader from "../support-components/Loader";
type ReviewPopupProps = {
  props?: {
    selectedRating: number;
    productId: string;
    productImg: string;
    productTitle: string;
  };
};

type ReviewData = {
  id: number;
  productId: string;
  rating: number;
  username: string;
  summary: string;
  review: string;
  userId: string;
};

let reviewData: ReviewData;

let username: string = "";
let summary: string = "";
let review: string = "";

const ReviewPopup = ({ props }: ReviewPopupProps) => {
  const { setReviewPopupProps, userData, setLoading, loading } =
    useContext<GlobalContext>(UserContext);
  const [updatedRating, setUpdatedRating] = useState<number>(
    props!?.selectedRating
  );
  const [active, setActive] = useState<boolean>(false);

  const handleReview = async () => {
    setLoading(4);
    const res = await axios.put(
      `/products?addReview=true&productId=${
        props?.productId
      }&reviewData=${JSON.stringify(reviewData)}`
    );
    if (res.data === !false) {
      setTimeout(() => {
        setLoading(0);
        window.location.reload();
      }, 1000);
    }
  };

  const recieveData = (value: { label: string; value: string }) => {
    value.label == "Username" ? (username = value.value) : "";
    value.label == "Summary" ? (summary = value.value) : "";
    value.label == "Review" ? (review = value.value) : "";

    reviewData = {
      id: 1,
      productId: props!.productId,
      rating: updatedRating,
      username: username,
      summary: summary,
      review: review,
      userId: userData._id,
    };
  };

  const check = () => {
    if (
      reviewData.rating != 0 &&
      reviewData.username != "" &&
      reviewData.summary != "" &&
      reviewData.review != ""
    ) {
      setActive(!false);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    username = "";
    summary = "";
    review = "";
  }, []);

  return (
    <>
      <div className="blur__wrapper">
        <div className="review__popup--wrapper" onChange={() => check()}>
          <div className="rp__upper">
            <h3>Your Review</h3>
            {buttonData
              .filter((el) => el.identifier == "cancel")
              .map((data) => (
                <Button
                  buttonProps={data}
                  key={data.id}
                  individualAction={setReviewPopupProps}
                  individualOptions={undefined}
                />
              ))}
          </div>
          <div className="rp__product--info">
            <img src={props?.productImg} alt="rp__product--img" id="rp__img" />
            <h3>{props?.productTitle}</h3>
          </div>
          <div className="rp__rating">
            <h3>Your Rating</h3>
            <ReviewStarsInput
              existingRating={props?.selectedRating}
              rp={!false}
              updatedRating={setUpdatedRating}
            />
          </div>
          <div
            className="rp__info"
            style={
              updatedRating === 0
                ? {
                    filter: "blur(3px)",
                    pointerEvents: "none",
                  }
                : undefined
            }
          >
            <h3>Information</h3>
            {inputData
              .filter((el) => el.identifier == "rp")
              .map((data) => (
                <Input
                  inputProps={data}
                  key={data.id}
                  multipleValues={recieveData}
                />
              ))}
            {textAreaData
              .filter((el) => el.identifier == "rp")
              .map((data) => (
                <TextArea
                  taProps={data}
                  key={data.id}
                  multipleValues={recieveData}
                />
              ))}
            {buttonData
              .filter((el) => el.identifier == "rp")
              .map((data) => (
                <Button
                  buttonProps={data}
                  key={data.id}
                  individualInactive={active}
                  individualAction={handleReview}
                />
              ))}
          </div>
          {loading === 4 ? <Loader /> : null}
        </div>
      </div>
    </>
  );
};
export default ReviewPopup;
