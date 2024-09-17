import { useContext, useEffect, useState } from "react";
import { GlobalContext, UserContext } from "../App";
import Button from "../functional-components/Button";
import { buttonData, inputData } from "../functional-components/FuncStatic";
import Input from "../functional-components/Input";
import { CheckOutProps } from "../landing-pages/Checkout";

let infoData = {
  first: "",
  last: "",
  email: "",
  address: "",
  apt: "null",
  city: "",
  state: "",
  zip: "",
};
let infoArray = Object.entries(infoData);

const CInformation = ({ receive, enteredInfo }: CheckOutProps) => {
  const { loggedIn, userData } = useContext<GlobalContext>(UserContext);
  const [active, setActive] = useState<boolean>(false);

  //initialize values if logged in

  const userDataArray =
    userData != undefined ? Object.entries(userData) : undefined;

  if (userData != undefined) {
    infoArray[0][1] = userData.first;
    infoArray[1][1] = userData.last;
    infoArray[2][1] = userData.email;
  }

  //handle info from inputs

  const handleInfo = (value: { label: string; value: string }) => {
    const checkValArray = new Array();
    for (let i = 0; i < infoArray.length; i++) {
      if (infoArray[i][0] == value.label.toLowerCase()) {
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

  //handle next field

  const handleNext = () => {
    const infoData = Object.fromEntries(infoArray);
    receive(1, infoData);
  };

  useEffect(() => {
    if (enteredInfo === undefined) {
      //reset array
      infoArray.forEach((el) => (el[1] = ""));
      infoArray[4][1] = "null";
    }
  }, []);

  return (
    <>
      <div className="checkout__component--wrapper information">
        <div className="logged__out--cinfo--wrapper">
          {loggedIn === false ? (
            <div className="locinfo__upper">
              {buttonData
                .filter((el) => el.identifier === "login__widget")
                .map((data) => (
                  <Button buttonProps={data} key={data.id} />
                ))}
              to retrieve your account information.
            </div>
          ) : null}
          {loggedIn === false ? (
            <div className="locinfo__middle">
              <div className=""></div>
              <h5>or</h5>
              <div className=""></div>
            </div>
          ) : null}

          <div className="locinfo__bottom">
            {loggedIn === false ? <h4>Checkout as a guest</h4> : null}

            <div className="locinfo__bottom--container">
              {inputData
                .filter((el) => el.identifier === "checkout")
                .map((data) => (
                  <Input
                    inputProps={data}
                    key={data.id}
                    multipleValues={handleInfo}
                    initialValue={
                      enteredInfo != undefined
                        ? enteredInfo[data.label.toLowerCase()]
                        : loggedIn == !false
                        ? userDataArray != undefined &&
                          userDataArray.filter(
                            (el) => el[0] === data.label.toLowerCase()
                          )[0][1]
                        : undefined
                    }
                  />
                ))}
            </div>
            <div className="locinfo__bottom--container">
              {inputData
                .filter((el) => el.identifier === "checkout__address")
                .map((data) => (
                  <Input
                    inputProps={data}
                    key={data.id}
                    multipleValues={handleInfo}
                    initialValue={
                      enteredInfo != undefined
                        ? enteredInfo[data.label.toLowerCase()]
                        : undefined
                    }
                  />
                ))}
            </div>
            <div className="locinfo__bottom--container">
              {inputData
                .filter((el) => el.identifier === "checkout__address--support")
                .map((data) => (
                  <Input
                    inputProps={data}
                    key={data.id}
                    multipleValues={handleInfo}
                    initialValue={
                      enteredInfo != undefined
                        ? enteredInfo[data.label.toLowerCase()]
                        : undefined
                    }
                  />
                ))}
            </div>
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
      </div>
    </>
  );
};
export default CInformation;
