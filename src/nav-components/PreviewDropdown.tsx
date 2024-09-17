import { useContext, useEffect, useRef } from "react";
import { GlobalContext, UserContext } from "../App";
import { buttonData } from "../functional-components/FuncStatic";
import Button from "../functional-components/Button";
import CartPreview from "../account-components/CartPreview";

type PreviewDropdownProps = {
  id?: number;
  activeState: boolean;
  activeAction: Function;
};

const PreviewDropdown = ({
  activeState,
  activeAction,
}: PreviewDropdownProps) => {
  const cartPreviewRef = useRef<any>();
  const { setCartPopup } = useContext<GlobalContext>(UserContext);

  //close menu if not selected

  window.addEventListener("mousedown", (e) => {
    if (cartPreviewRef.current != undefined) {
      if (
        activeState == !false &&
        !cartPreviewRef.current?.contains(e.target)
      ) {
        activeAction(false);
        setCartPopup(false);
      }
    }
  });

  return (
    <>
      <div
        className="preview__dropdown--wrapper cart__preview"
        ref={cartPreviewRef}
      >
        <CartPreview />
      </div>
    </>
  );
};
export default PreviewDropdown;
