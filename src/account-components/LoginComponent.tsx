import { buttonData, inputData } from "../functional-components/FuncStatic";
import Input from "../functional-components/Input";
import Loader from "../support-components/Loader";
import Button from "../functional-components/Button";
import { useState, useEffect, useContext } from "react";
import { GlobalContext, UserContext } from "../App";

const LoginComponent = () => {
  const { loading } = useContext<GlobalContext>(UserContext);
  const [wEmail, setWEmail] = useState<string>("");
  const [wPassword, setWPassword] = useState<string>("");
  const [inputActive, setInputActive] = useState<boolean>(false);

  const receiveLoginData = (value: { label: string; value: string }) => {
    if (value.label == "Email") {
      setWEmail(value.value);
    }
    if (value.label == "Password") {
      setWPassword(value.value);
    }
  };

  //check for inputs

  useEffect(() => {
    if (wEmail != "" && wPassword != "") {
      setInputActive(!false);
    } else {
      setInputActive(false);
    }
  }, [wEmail, wPassword]);
  return (
    <>
      <div
        className="login__widget"
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputActive === !false) {
            window.login({ loginData: { email: wEmail, password: wPassword } });
          }
        }}
      >
        {inputData
          .filter((el) => el.identifier == "login")
          .map((data) => (
            <Input
              inputProps={data}
              key={data.id}
              multipleValues={receiveLoginData}
            />
          ))}
        {buttonData
          .filter((el) => el.identifier == "login__widget")
          .map((data) => (
            <Button
              buttonProps={data}
              key={data.id}
              individualInactive={inputActive}
              individualAction={window.login}
              individualOptions={{
                loginData: { email: wEmail, password: wPassword },
              }}
            />
          ))}
        <h4>Dont have a account?</h4>
        {buttonData
          .filter((el) => el.identifier == "login__widget--signup")
          .map((data) => (
            <Button
              buttonProps={data}
              key={data.id}
              individualAction={window.navigation}
              individualOptions={{
                singlePath: "create-account",
              }}
            />
          ))}
        {loading == 1 ? <Loader /> : null}
      </div>
    </>
  );
};
export default LoginComponent;
