import { useContext, useEffect, useState } from "react";
import { GlobalContext, UserContext } from "../App";
import axios from "axios";
import CWItemTile from "./CWItemTile";

type WishlistData = {
  _id: string;
  previewImg: string;
  price: number;
  title: string;
}[];

const Wishlist = () => {
  const { userData, setLoading } = useContext<GlobalContext>(UserContext);

  const [wishlistData, setWishlistData] = useState<WishlistData>();

  //init wishlist

  const initWishlist = async () => {
    const productIds = userData.wishlist.flatMap((data) => data.productId);
    const res = await axios.get(
      `/products?initWishlist=true&productId=${productIds}`
    );

    if (res.data.length > 0) {
      setWishlistData(res.data);
    } else {
      setWishlistData(undefined);
    }
  };

  const removeWLItem = async (productId: string) => {
    setLoading(3);
    const res = await axios.put(
      `/users?removeWLItem=true&productId=${productId}&userId=${userData._id}`
    );
    if (res.data === !false) {
      window.loginCheck();
      setTimeout(() => {
        setLoading(0);
      }, 1000);
    }
  };

  useEffect(() => {
    initWishlist();
  }, [userData]);

  return (
    <>
      <div className="wishlist__wrapper">
        <h3 className="wl__upper">Your Wishlist</h3>

        <div className="wl__lower">
          {wishlistData != undefined ? (
            wishlistData.map((data) => (
              <CWItemTile
                key={data._id}
                itemData={data}
                actionFunction={removeWLItem}
              />
            ))
          ) : (
            <div className="empty__cart">
              <h2>Your wishlist is empty</h2>
              <i className="fa-solid fa-0"></i>
              <h4>Get out there and get shopping!</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Wishlist;
