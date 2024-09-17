import { useContext, useRef, useState } from "react";
import { GlobalContext, UserContext } from "../App";

import LoginComponent from "./LoginComponent";
import AccountComponent from "./AccountNav";

const LoginWidget = () => {
  const [enter, setEnter] = useState<boolean>(false);
  const { setLoginWidgetActive, err, loggedIn } =
    useContext<GlobalContext>(UserContext);
  const widgetRef = useRef<any>(null);

  window.addEventListener("mousedown", (e) => {
    if (widgetRef.current != null) {
      if (enter && !widgetRef?.current.contains(e.target)) {
        setLoginWidgetActive(false);
      }
    }
  });

  return (
    <>
      <div className="blur__wrapper" onAnimationEnd={() => setEnter(!false)}>
        {enter == !false ? (
          <div className="side__widget--wrapper" ref={widgetRef}>
            {loggedIn == false ? (
              <div className="sw__login--wrapper">
                <h3>Login to your Terrain Outdoors account</h3>
                {err == 1 ? (
                  <p style={{ color: "maroon" }}>
                    Email/Password combination is incorrect. Please try again.
                  </p>
                ) : null}
                <LoginComponent />
              </div>
            ) : (
              <AccountComponent />
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};
export default LoginWidget;
