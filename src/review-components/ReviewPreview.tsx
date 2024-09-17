import { useEffect } from "react";

type ReviewProps = {
  reviewProps?: {
    rating: number;
  }[];
  singleReview?: number;
};

const ReviewPreview = ({ reviewProps, singleReview }: ReviewProps) => {
  let i;
  const starCount = 5;

  //catlculate average

  let ratingLength =
    reviewProps != undefined
      ? reviewProps.flatMap((el) => el.rating).length
      : undefined;
  const ratingCalculation =
    reviewProps != undefined
      ? Math.floor(
          reviewProps!
            .flatMap((el) => el.rating)
            .reduce((part, a) => part + a, 0) / ratingLength!
        )
      : undefined;

  const stars: any = Array.from({ length: starCount }, (_, index) => (
    <i className="fa-regular fa-star" key={index}></i>
  ));

  //loop for the amount of stars

  if (!singleReview) {
    for (i = 0; i < ratingCalculation!; i++) {
      stars[i] = <i className="fa-solid fa-star" key={i}></i>;
    }
  } else {
    for (i = 0; i < singleReview; i++) {
      stars[i] = <i className="fa-solid fa-star" key={i}></i>;
    }
  }

  useEffect(() => {
    console.warn = () => {};
  }, []);

  return (
    <>
      <div className="review__preview--container">
        {stars}

        {reviewProps != undefined ? `(${reviewProps!.length})` : null}
      </div>
    </>
  );
};
export default ReviewPreview;
