import axios from "axios";
import ReviewPreview from "./ReviewPreview";
import ReviewStarsInput from "./ReviewStarsInput";
import { useEffect, useState } from "react";
import { buttonData } from "../functional-components/FuncStatic";
import Button from "../functional-components/Button";

type ReviewProps = {
  productId: string;
  productImg: string;
  productTitle: string;
};

type Review = {
  _id: string;
  rating: number;
  content: string;
  summary: string;
  username: string;
  creationDate: Date;
}[];

type BarData = {
  rating: number;
}[];
const filterArr = new Array<number>();
const Review = ({ productId, productImg, productTitle }: ReviewProps) => {
  const [reviewData, setReviewData] = useState<Review>();
  const [reviewMasterLength, setReviewMasterLength] = useState<number>(0);
  const [fitleredLength, setFilteredLength] = useState<number>(0);
  const [reviewBarData, setReviewBarData] = useState<BarData>();
  const [filterState, setFilterState] = useState<Array<number>>();
  const [trigger, setTrigger] = useState<number>(0);
  const barLength = 5;

  //init reviews

  const initReviews = async (filters?: number[]) => {
    const res = await axios.get(
      `/products?initReviews=true&productId=${productId}&filters=${filters}`
    );
    if (res.data) {
      setReviewData(res.data[0]);
      if (filters == undefined) {
        setReviewBarData(res.data[2]);
        setReviewMasterLength(res.data[1]);
      } else {
        setFilteredLength(res.data[1]);
      }
    }
  };

  //load more reviews

  const loadMoreReviews = async () => {
    const res = await axios.get(
      `products?loadMoreReviews=true&existingLength=${reviewData?.length}&productId=${productId}&filters=${filterState}`
    );
    if (res.data) {
      setReviewData(res.data);
    }
  };

  //handle filter

  const handleFilter = (value: number) => {
    const check = filterArr.find((el) => el === value);

    if (check === undefined) {
      filterArr.push(value);
      setFilterState(filterArr);
      initReviews(filterArr);
    } else {
      let index = filterArr.indexOf(value);
      filterArr.splice(index, 1);
      setFilterState(filterArr);
      initReviews(filterArr);
    }
  };

  //catlculate average

  const ratingCalculation = Math.floor(
    reviewBarData!
      ?.flatMap((el) => el.rating)
      .reduce((part, a) => part + a, 0) / reviewMasterLength
  );

  //summary bar

  let bar = Array.from({ length: barLength }, (_, index) => (
    <div className="bar__container" key={index}>
      <h4>{index + 1} Star</h4>
      <div
        className="review__bar"
        onClick={() => {
          handleFilter(index + 1), setTrigger(trigger + 1);
        }}
        style={{ cursor: "pointer" }}
      >
        <div
          className="bar__inner"
          style={{
            transform: `scaleX(${
              reviewBarData!?.filter((el) => el.rating == index + 1).length
            })`,
          }}
        ></div>
      </div>
      <h4>{reviewBarData!?.filter((el) => el.rating == index + 1).length}</h4>
    </div>
  ));

  useEffect(() => {
    initReviews();
  }, [productId]);

  return reviewData != undefined ? (
    <>
      <div className="review__top">
        <div className="review__bars--wrapper">
          <h3>Rating Summary</h3>
          {bar}
          <h5>Select a bar to filter reviews</h5>
        </div>
        <div className="overall__rating--wrapper">
          <h3>Overall Rating</h3>
          <div className="or__container">
            <h1>{ratingCalculation > 0 ? ratingCalculation : 0}.0</h1>
            <ReviewPreview reviewProps={reviewBarData} />
          </div>
        </div>
        <div className="leave__review--wrapper">
          <h3>Review this Product</h3>
          <ReviewStarsInput
            productId={productId}
            productImg={productImg}
            productTitle={productTitle}
          />
          <p>You must be logged in to leave a review</p>
        </div>
      </div>
      <div className="review__bottom">
        <div className="rb__top">
          <div className="rb__filter--tile--wrapper">
            {trigger && filterState!?.length > 0 ? (
              filterState!?.map((data) => (
                <div className="filter__tile" key={data}>
                  <button
                    className="fa-solid fa-xmark"
                    onClick={() => {
                      handleFilter(data);
                      setTrigger(trigger + 1);
                    }}
                  ></button>
                  <h5>{data} Stars</h5>
                </div>
              ))
            ) : (
              <h3> No filters selected</h3>
            )}
          </div>

          <h3>
            Showing {reviewData.length} out of{" "}
            {fitleredLength === 0 ? reviewMasterLength : fitleredLength} reviews
          </h3>
        </div>

        {reviewData != undefined
          ? reviewData.map((data) => (
              <div className="review__tile" key={data._id}>
                <div className="review__tile--top">
                  <div className="rt__star--wrapper">
                    <ReviewPreview singleReview={data.rating} />
                    <h4>By: {data.username}</h4>
                  </div>
                  <h3>{data.summary}</h3>
                </div>
                <p className="review__content">{data.content}</p>
              </div>
            ))
          : null}
        {reviewMasterLength != reviewData.length &&
        fitleredLength != reviewData.length
          ? buttonData
              .filter((el) => el.identifier === "load__more")
              .map((data) => (
                <Button
                  key={data.id}
                  buttonProps={data}
                  individualAction={loadMoreReviews}
                />
              ))
          : null}
      </div>
    </>
  ) : null;
};
export default Review;
