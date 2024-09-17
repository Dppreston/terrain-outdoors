import { useContext, useEffect, useState } from "react";
import Button from "../functional-components/Button";
import { buttonData, inputData } from "../functional-components/FuncStatic";
import Input from "../functional-components/Input";
import Passwordcheck from "../support-components/Passwordcheck";
import { GlobalContext, UserContext } from "../App";
import Loader from "../support-components/Loader";

let first: string = "";
let last: string = "";
let email: string = "";
let password: string = "";
let confirm: string = "";
let signupData = new Object();
const CreateAccount = () => {
  const [active, setActive] = useState<boolean>(false);
  const [checkData, setCheckData] = useState<string[]>([password, confirm]);
  const { loading, loggedIn } = useContext<GlobalContext>(UserContext);

  const recieveData = (pair: { label: string; value: string }) => {
    pair.label == "First" ? (first = pair.value) : null;
    pair.label == "Last" ? (last = pair.value) : null;
    pair.label == "Email" ? (email = pair.value) : null;
    pair.label == "Password" ? (password = pair.value) : null;
    pair.label == "Confirm Password" ? (confirm = pair.value) : null;

    signupData = {
      first: first,
      last: last,
      email: email,
      password: password,
      confirm: confirm,
    };

    setCheckData([password, confirm]);
  };

  const inactiveCheck = (passwordCheck?: boolean) => {
    if (
      first != "" &&
      last != "" &&
      email != "" &&
      password != "" &&
      password === confirm &&
      passwordCheck == !false
    ) {
      setActive(!false);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    if (loggedIn === true) {
      window.navigation({ singlePath: "home" });
    }
  }, []);

  return (
    <>
      <div
        className="single__page--wrapper"
        onChange={() => {
          inactiveCheck();
        }}
      >
        <div className="ca__header">
          <h6>Get Started</h6>
          <h4>Create an account to obtain the complete shopping experience</h4>
          <ul>
            <li>Get exclusive deals and savings</li>
            <li>Create wishlists and save items</li>
            <li>Return to items in your cart</li>
          </ul>
        </div>

        <div className="ca__upper">
          {inputData
            .filter((el) => el.identifier === "create-name")
            .map((data) => (
              <Input
                inputProps={data}
                key={data.id}
                multipleValues={recieveData}
              />
            ))}
        </div>
        <div className="ca__lower">
          {inputData
            .filter((el) => el.identifier === "create")
            .map((data) => (
              <Input
                inputProps={data}
                key={data.id}
                multipleValues={recieveData}
              />
            ))}
          <Passwordcheck checkData={checkData} checkRes={inactiveCheck} />
          {buttonData
            .filter((el) => el.identifier === "create__account")
            .map((data) => (
              <Button
                buttonProps={data}
                key={data.id}
                individualInactive={active}
                individualAction={window.signup}
                individualOptions={{ signupData: signupData }}
              />
            ))}
        </div>
        {loading == 2 ? <Loader /> : null}
      </div>
    </>
  );
};
export default CreateAccount;
