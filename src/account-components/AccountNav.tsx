import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext, UserContext } from "../App";
import CartPreview from "./CartPreview";
import Button from "../functional-components/Button";
import { buttonData } from "../functional-components/FuncStatic";
import Wishlist from "./WishlistSide";
import Account from "./AccountSide";
let acNavOptions: {
  id: number;
  title: string;
  icon: string;
  selected: boolean;
}[] = [
  {
    id: 1,
    title: "cart",
    icon: "fa-solid fa-cart-shopping",
    selected: !false,
  },
  {
    id: 2,
    title: "wishlist",
    icon: "fa-solid fa-list-check",
    selected: false,
  },
  {
    id: 3,
    title: "account",
    icon: "fa-regular fa-user",
    selected: false,
  },
];
const AccountComponent = () => {
  const { userData } = useContext<GlobalContext>(UserContext);
  const [selected, setSelected] = useState<number>(1);
  const test = useRef<any>(null);

  const handleSelectedStyle = (e: Element) => {
    const list = document
      .querySelector(".ac__nav")
      ?.getElementsByTagName("button");
    for (let i = 0; i < list!.length; i++) {
      list![i].firstElementChild?.setAttribute("style", "color: inherit");
      list![i].lastElementChild?.setAttribute("style", "color: inherit");
      list![i].setAttribute("style", "inherit");
    }
    e.setAttribute("style", "background: var(--accent-blue)");
    e.firstElementChild?.setAttribute("style", "color: var(--bg)");
    e.lastElementChild?.setAttribute("style", "color: var(--bg)");
  };

  //initial option selected

  useEffect(() => {
    test.current.setAttribute("style", "background: var(--accent-blue)");
    test.current.firstElementChild?.setAttribute("style", "color: var(--bg)");
    test.current.lastElementChild?.setAttribute("style", "color: var(--bg)");
  }, []);

  return (
    <>
      <div className="account__component--wrapper">
        <div className="ac__upper">
          <h6>Hi, {userData != undefined ? userData.first : null}</h6>
          {buttonData
            .filter((el) => el.identifier == "logout")
            .map((data) => (
              <Button
                buttonProps={data}
                key={data.id}
                individualAction={window.logout}
              />
            ))}
        </div>

        <div className="ac__nav">
          {acNavOptions.map((data) => (
            <button
              className="ac__nav--option"
              key={data.id}
              ref={data.id == 1 ? test : null}
              onClick={(e) => {
                handleSelectedStyle(e.currentTarget);
                setSelected(data.id);
              }}
            >
              <i className={data.icon}></i>
              <p>{data.title}</p>
            </button>
          ))}
        </div>
        <div className="ac__content">
          {selected === 1 ? (
            <CartPreview />
          ) : selected === 2 ? (
            <Wishlist />
          ) : (
            <Account />
          )}
        </div>
      </div>
    </>
  );
};
export default AccountComponent;
