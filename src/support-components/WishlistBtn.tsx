import { useContext, useEffect, useState } from "react";
import { GlobalContext, UserContext } from "../App";
import axios from "axios";

const WishlistBtn = (props: { productId: string }) => {
  const { userData } = useContext<GlobalContext>(UserContext);
  const [active, setActive] = useState<boolean>(false);

  const wishlistCheck = () => {
    const check = userData.wishlist.find(
      (el) => el.productId === props.productId
    );
    if (check === undefined) {
      setActive(false);
    } else {
      setActive(!false);
    }
  };

  const handleWishlist = async () => {
    const res = await axios.put(
      `/users?handleWishlist=true&productId=${props.productId}&userId=${userData._id}`
    );
    if (res.data) {
      window.loginCheck();
    }
  };

  useEffect(() => {
    if (userData != undefined) {
      wishlistCheck();
    }
  }, [userData]);
  return (
    <>
      <div className="wishlist__button--wrapper">
        <button
          onClick={(e) => {
            handleWishlist(), window.popAni(e);
          }}
          onAnimationEnd={(e) => {
            e.currentTarget.setAttribute("style", "animation: none");
          }}
          className={
            active === !false ? "fa-solid fa-heart" : "fa-regular fa-heart"
          }
        ></button>
      </div>
    </>
  );
};
export default WishlistBtn;
