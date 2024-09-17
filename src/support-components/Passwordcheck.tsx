import { useEffect, useState } from "react";

const Passwordcheck = (props: {
  checkData: string[];
  checkRes: (passwordCheck: boolean) => void;
}) => {
  const specialCharRegex = /[/!@#$%^&*]/;
  const numbersRegex = /[1234567890]/;
  const [charCheck, setCharCheck] = useState<boolean>(false);
  const [specCheck, setSpecCheck] = useState<boolean>(false);
  const [numCheck, setNumCheck] = useState<boolean>(false);
  const [matchCheck, setMatchCheck] = useState<boolean>(false);
  const [upperCheck, setUpperCheck] = useState<boolean>(false);

  //password check

  const regexCheck = () => {
    let specialCheck = specialCharRegex.test(props.checkData[0]);
    let numberCheck = numbersRegex.test(props.checkData[0]);
    if (props.checkData[0].length >= 8) {
      setCharCheck(!false);
    } else {
      setCharCheck(false);
    }

    if (specialCheck === !false) {
      setSpecCheck(!false);
    } else {
      setSpecCheck(false);
    }

    if (numberCheck === !false) {
      setNumCheck(!false);
    } else {
      setNumCheck(false);
    }
    if (
      props.checkData[0] === props.checkData[1] &&
      props.checkData[0].length != 0 &&
      props.checkData[1].length != 0
    ) {
      setMatchCheck(!false);
    } else {
      setMatchCheck(false);
    }

    if (props.checkData[0] !== props.checkData[0].toLowerCase()) {
      setUpperCheck(!false);
    } else {
      setUpperCheck(false);
    }
  };

  useEffect(() => {
    regexCheck();
  }, [props]);

  //send true or false for check

  useEffect(() => {
    if (
      charCheck == !false &&
      specCheck == !false &&
      upperCheck == !false &&
      matchCheck == !false &&
      numCheck == !false
    ) {
      props.checkRes!(!false);
    } else {
      props.checkRes!(false);
    }
  }, [matchCheck]);

  return (
    <>
      <div className="password__check--wrapper">
        <p>
          includes one uppercase letter{" "}
          <i
            className={
              upperCheck == false ? "fa-solid fa-xmark" : "fa-solid fa-check"
            }
          ></i>
        </p>
        <p>
          includes one special character{" "}
          <i
            className={
              specCheck == false ? "fa-solid fa-xmark" : "fa-solid fa-check"
            }
          ></i>
        </p>
        <p>
          includes one number{" "}
          <i
            className={
              numCheck == false ? "fa-solid fa-xmark" : "fa-solid fa-check"
            }
          ></i>
        </p>
        <p>
          At least 8 characters{" "}
          <i
            className={
              charCheck == false ? "fa-solid fa-xmark" : "fa-solid fa-check"
            }
          ></i>
        </p>
        <p>
          passwords match{" "}
          <i
            className={
              matchCheck == false ? "fa-solid fa-xmark" : "fa-solid fa-check"
            }
          ></i>
        </p>
      </div>
    </>
  );
};
export default Passwordcheck;
