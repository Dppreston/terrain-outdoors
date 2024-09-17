import { useEffect, useState } from "react";
import Button from "../functional-components/Button";
import { buttonData, inputData } from "../functional-components/FuncStatic";
import Input from "../functional-components/Input";
import { CheckOutProps } from "../landing-pages/Checkout";

const ccOptions = [
  "fa-brands fa-cc-discover",
  "fa-brands fa-cc-visa",
  "fa-brands fa-cc-amex",
  "fa-brands fa-cc-mastercard",
];

let cardInfo = {
  name: "",
  card: "",
  m: "",
  y: "",
  cvc: "",
};

let infoArray = Object.entries(cardInfo);

const CPayment = ({ receive, enteredInfo }: CheckOutProps) => {
  const [active, setActive] = useState<boolean>(false);

  const handleInfo = (value: { label: string; value: string }) => {
    const checkValArray = new Array();

    for (let i = 0; i < infoArray.length; i++) {
      if (infoArray[i][0] == value.label.slice(0, 4).toLowerCase()) {
        infoArray[i][1] = value.value;
        infoArray.forEach((el) => checkValArray.push(el[1]));
      }
    }

    if (checkValArray.includes("")) {
      setActive(false);
    } else {
      setActive(!false);
    }
  };

  //handle next

  const handleNext = () => {
    const infoData = Object.fromEntries(infoArray);
    receive(3, infoData);
  };

  useEffect(() => {
    if (enteredInfo === undefined) {
      //reset array
      infoArray.forEach((el) => (el[1] = ""));
    }
  }, []);

  return (
    <>
      <div className="checkout__component--wrapper information payment">
        <div className="payment__upper">
          <h3>Payment Information</h3>
          <div className="cc__options--wrapper">
            {ccOptions.map((data) => (
              <i className={data} key={data}></i>
            ))}
          </div>
        </div>
        <div className="cc__info--wrapper">
          {inputData
            .filter((el) => el.identifier === "payment__name")
            .map((data) => (
              <Input
                inputProps={data}
                key={data.id}
                multipleValues={handleInfo}
              />
            ))}
        </div>
        <div className="card__info">
          {inputData
            .filter((el) => el.identifier === "payment__cc")
            .map((data) => (
              <Input
                inputProps={data}
                key={data.id}
                multipleValues={handleInfo}
              />
            ))}
        </div>
        <div className="payment__lower">
          {buttonData
            .filter((el) => el.identifier === "checkout__next")
            .map((data) => (
              <Button
                buttonProps={data}
                key={data.id}
                individualInactive={active}
                individualAction={handleNext}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default CPayment;
