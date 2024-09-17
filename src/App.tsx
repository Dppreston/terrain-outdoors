import "./App.css";
import "./search-components/Search.css";
import "./functional-components/Functional.css";
import "./nav-components/Nav.css";
import "./Ani.css";
import "./banner-components/Banner.css";
import "./account-components/Account.css";
import "./landing-pages/Page.css";
import "./product--components/Product.css";
import "./support-components/Support.css";
import "./Media.css";
import "./review-components/Review.css";
import "./account-components/Cart.css";
import "./checkout-components/Checkout.css";
import "./promo-components/Promo.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./landing-pages/Home";
import Navbar from "./nav-components/Navbar";
import React, { useEffect, useMemo, useState } from "react";
import Products from "./landing-pages/Products";
import LoginWidget from "./account-components/SideWidget";

import axios from "axios";
import ReviewPopup from "./review-components/ReviewPopup";
import EnlargedImg from "./support-components/EnlargedImg";
import CreateAccount from "./landing-pages/CreateAccount";
import Login from "./landing-pages/Login";
import Checkout from "./landing-pages/Checkout";

import Footer from "./nav-components/Footer";
export const UserContext: any = React.createContext(null);

declare global {
  interface Window {
    navigation: Function;
    login: Function;
    signup: Function;
    addToCart: Function;
    logout: Function;
    updateLocalCartQuan: Function;
    deleteLCI: Function;
    loginCheck: Function;
    popAni: Function;
    cacheImages: Function;
    handleInView: Function;
  }
}

export type GlobalContext = {
  loggedIn: boolean;
  setLoginWidgetActive: Function;
  setReviewPopupProps: Function;
  selectedRating: number;
  productId: string;
  productImg: string;
  productTitle: string;
  setEnlargedPI: Function;
  loading: number;
  setLoading: Function;
  err: number;
  userData: {
    _id: string;
    first: string;
    last: string;
    email: string;
    password: string;
    cart: { productId: string; quantity: number; creationDate: Date }[];
    wishlist: { productId: string; creationDate: Date }[];
  };
  cartPopup: boolean;
  setCartPopup: Function;
  navLink: string;
  setNavLink: Function;
  mediaOne: boolean;
  mediaTwo: boolean;
};

export type NavigationProps = {
  navProps: {
    master: string;
    category?: string;
    sub?: string;
    specific?: string;
    product?: string;
  };
  singlePath?: string;
};

export type LoginProps = {
  loginData: {
    email: string;
    password: string;
  };
};

export type SignupProps = {
  signupData: {
    first: string;
    last: string;
    email: string;
    password: string;
  };
};

const token: string | null = localStorage.getItem("token");

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [loggedIn, setLoggedIn] = useState<GlobalContext | boolean>(false);
  const [loginWidgetActive, setLoginWidgetActive] = useState<
    GlobalContext | boolean
  >(false);
  const [reviewPopupProps, setReviewPopupProps] = useState<GlobalContext>();
  const [englargedPI, setEnlargedPI] = useState<string[]>();
  const [err, setErr] = useState<number | GlobalContext>(0);
  const [loading, setLoading] = useState<number | GlobalContext>(0);
  const [userData, setUserData] = useState<GlobalContext>();
  const [cartPopup, setCartPopup] = useState<boolean | GlobalContext>(false);
  const [navLink] = useState<string | GlobalContext>();
  const [mediaOne, setMediaOne] = useState<boolean | GlobalContext>();
  const [mediaTwo, setMediaTwo] = useState<boolean | GlobalContext>();

  //is in view check

  window.handleInView = (ref: React.MutableRefObject<any>) => {
    const [isInt, setIsInt] = useState<boolean>(false);
    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) => setIsInt(entry.isIntersecting)),
      [ref]
    );

    useEffect(() => {
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return isInt;
  };

  //cache and preload imgs

  window.cacheImages = async (srcArray: string[]): Promise<void> => {
    const promises = srcArray.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });
    await Promise.all(promises);
  };

  //navigation

  window.navigation = ({ navProps, singlePath }: NavigationProps) => {
    if (singlePath == undefined) {
      if (navProps.master == "products") {
        if (navProps.sub == undefined && navProps.product == undefined) {
          if (navProps.category !== "terrain finds") {
            window.location.href = `${window.location.origin}/products/${navProps.category}/`;
          } else {
            window.location.href = `${window.location.origin}/products/${navProps.category}/sale`;
          }
        } else if (navProps.product == undefined) {
          window.location.href = `${window.location.origin}/products/${navProps.category}/${navProps.sub}/`;
        } else {
          window.location.href = `${window.location.origin}/products/${navProps.category}/${navProps.sub}/${navProps.product}`;
        }
      } else {
        window.location.href = `${window.location.origin}/${navProps.master}/`;
      }
    } else {
      window.location.href = `${window.location.origin}/${singlePath}`;
    }
  };

  //login request

  window.login = async ({ loginData }: LoginProps) => {
    setLoading(1);
    const res = await axios.get(
      `/users?loginRequest=true&email=${loginData.email}&password=${loginData.password}`
    );
    setTimeout(() => {
      setLoading(0);
      if (res.data != false) {
        window.localStorage.setItem("token", res.data);

        window.navigation({ singlePath: "home" });
      } else {
        setErr(1);
      }
    }, 3000);
  };

  //signup

  window.signup = async ({ signupData }: SignupProps) => {
    if (signupData) {
      setLoading(2);

      const res = await axios.post("/users?newUser=true", signupData);

      setTimeout(() => {
        if (res.data === !false) {
          setLoading(0);
          window.navigation({ singlePath: "login" });
        } else {
          setErr(2);
        }
      }, 3000);
    }
  };

  //signout

  window.logout = () => {
    localStorage.clear();
    window.navigation({ singlePath: "home" });
  };

  //add item to cart

  type T = {
    0: string;
    1: number;
  };

  window.addToCart = async (data: Array<T>) => {
    setLoading(4);
    if (loggedIn == !false) {
      try {
        const res = await axios.put(
          `/users?addToCart=true&userId=${token}&productId=${data[0]}&quantity=${data[1]}`
        );
        if (res.data === true) {
          setTimeout(() => {
            setLoading(0);
          }, 1000);
          setTimeout(() => {
            setCartPopup(!false);
          }, 1200);
        }
      } catch (err) {}
    } else {
      let localCart = localStorage.getItem("cart");
      if (localCart === null) {
        setTimeout(() => {
          setLoading(0);
          localStorage.setItem(
            "cart",
            JSON.stringify([{ productId: data[0], quan: data[1] }])
          );
        }, 1000);
      } else {
        handleLocalCart(data);
      }
    }
  };

  const handleLocalCart = (data: Array<T>) => {
    const initLocalCart = JSON.parse(localStorage.getItem("cart")!);
    const check = initLocalCart.find(
      (el: { productId: string | T }) => el.productId === data[0]
    );

    if (check === undefined) {
      initLocalCart.push({ productId: data[0], quan: data[1] });
      setTimeout(() => {
        setLoading(0);
        localStorage.setItem("cart", JSON.stringify(initLocalCart));
      }, 1000);
    } else {
      const updatedCart = initLocalCart.filter(
        (el: { productId: string }) => el.productId !== check.productId
      );
      updatedCart.push({ productId: data[0], quan: check.quan + data[1] });
      setTimeout(() => {
        setLoading(0);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }, 1000);
    }
  };

  window.loginCheck = async () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(!false);
      const res = await axios.get(`/users?initUser=true&userId=${token}`);
      setUserData(res.data[0]);
    }
  };

  //init local cart

  //update local cart quan

  window.updateLocalCartQuan = (data: Array<T>) => {
    setLoading(3);
    const cart = JSON.parse(localStorage.getItem("cart")!);
    const check = cart.find(
      (el: { productId: string | T }) => el.productId === data[1]
    );
    let updatedCart = cart.filter(
      (el: { productId: string }) => el.productId !== check.productId
    );
    updatedCart.push({ productId: data[1], quan: data[0] });
    setTimeout(() => {
      setLoading(0);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }, 1000);
  };

  //delete local cart item

  window.deleteLCI = (productId: string) => {
    setLoading(3);
    const cart = JSON.parse(localStorage.getItem("cart")!);
    let updatedCart = cart.filter(
      (el: { productId: string }) => el.productId !== productId
    );
    setTimeout(() => {
      setLoading(0);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }, 1000);
  };

  //animation

  //pop

  window.popAni = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.setAttribute(
      "style",
      "animation: pop .3s forwards ease; color: initial"
    );
  };

  // media

  const handleResize = () => {
    let matchOne = window.matchMedia("(max-width: 1250px)");
    let matchTwo = window.matchMedia("(max-width: 1050px)");
    setMediaOne(matchOne.matches);
    setMediaTwo(matchTwo.matches);
  };

  window.addEventListener("resize", handleResize);

  //login check on load && init cart

  useEffect(() => {
    window.loginCheck();
  }, [[] && loading]);

  //err  handle

  useEffect(() => {
    if (err != 0) {
      setTimeout(() => {
        setErr(0);
      }, 3000);
    }
  }, [err]);

  useEffect(() => {
    handleResize();
  }, []);

  //cart

  return (
    <>
      {loggedIn === false || loggedIn === !false ? (
        <UserContext.Provider
          value={{
            loggedIn: loggedIn,
            setLoginWidgetActive: setLoginWidgetActive,
            setReviewPopupProps: setReviewPopupProps,
            setEnlargedPI: setEnlargedPI,
            setLoading: setLoading,
            loading: loading,
            err: err,
            userData: userData,
            cartPopup: cartPopup,
            setCartPopup: setCartPopup,
            navLink: navLink,
            mediaOne: mediaOne,
            mediaTwo: mediaTwo,
          }}
        >
          <Navbar />
          <div className="page__wrapper">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Home />} />
                <Route
                  path="/products/:category?/:sub?/:product?"
                  element={<Products />}
                />

                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </BrowserRouter>
          </div>
          <Footer />
          {loginWidgetActive == !false ? <LoginWidget /> : null}
          {reviewPopupProps != undefined ? (
            <ReviewPopup props={reviewPopupProps} />
          ) : null}
          {englargedPI != undefined ? <EnlargedImg imgs={englargedPI} /> : null}
        </UserContext.Provider>
      ) : null}
    </>
  );
}

export default App;
