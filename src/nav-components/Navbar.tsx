import { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/terrain-new.png";
import Button from "../functional-components/Button";
import { buttonData } from "../functional-components/FuncStatic";
import Searchbar from "../search-components/Searchbar";
import { options, subOptions } from "./NavStatic";
import PreviewDropdown from "./PreviewDropdown";
import NavDropdown from "./NavDropdown";
import { GlobalContext, UserContext } from "../App";
import CartPreview from "../account-components/CartPreview";

const NavbarUpperMobile = () => {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const { setLoginWidgetActive } = useContext<GlobalContext>(UserContext);
  const [mnSelected, setMNSelected] = useState<number>(0);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [cartActive, setCartActive] = useState<boolean>(false);

  const ddRef = useRef<any>(null);
  const cRef = useRef<any>(null);

  //close dropdown

  window.addEventListener("mousedown", (e) => {
    if (ddRef.current != null) {
      if (!ddRef.current?.contains(e.target)) {
        setMobileNav(false);
      }
    }

    if (cRef.current != null) {
      if (!cRef.current?.contains(e.target)) {
        setCartActive(false);
      }
    }
  });

  const handleAccountMenu = (data: { id: number }) => {
    if (data.id === 21) {
      setCartActive(!false);
    }
    if (data.id === 22) {
      setLoginWidgetActive(!false);
    }

    if (data.id === 23) {
      setMobileNav(!false);
    }
  };
  return (
    <>
      <div className="navbar__upper--mobile">
        <div className="num__left">
          {searchActive === false
            ? buttonData
                .filter((el) => el.identifier === "mobile__nav--left")
                .map((data) => (
                  <Button
                    buttonProps={data}
                    key={data.id}
                    individualAction={setSearchActive}
                    individualOptions={!false}
                  />
                ))
            : null}
        </div>
        {searchActive === !false ? (
          <Searchbar searchActive={setSearchActive} />
        ) : null}
        {searchActive === false ? (
          <div
            className="nav__logo--container"
            onClick={() =>
              window.navigation({
                singlePath: "home",
              })
            }
          >
            <img src={logo} id="nav__logo" />
          </div>
        ) : null}
        {searchActive === false ? (
          <div className="num__right">
            {buttonData
              .filter((el) => el.identifier === "mobile__nav--right")
              .map((data) => (
                <Button
                  buttonProps={data}
                  key={data.id}
                  individualAction={handleAccountMenu}
                  individualOptions={data}
                />
              ))}
            {mobileNav === !false ? (
              <div className="mobile__nav" ref={ddRef}>
                {subOptions.map((data) => (
                  <div className="mobile__nav--tile" key={data.id}>
                    <button
                      className="mnt__upper"
                      onClick={() => {
                        data.id !== 6
                          ? setMNSelected(data.id)
                          : window.navigation({
                              navProps: {
                                master: "products",
                                category: data.title,
                                sub: "sale",
                              },
                            });
                      }}
                    >
                      <h4>{data.title}</h4>
                    </button>
                    {mnSelected === data.id ? (
                      <div className="mnt__lower">
                        {data.block.map((el) => (
                          <button
                            id="mnt__lower--tile"
                            key={el.id}
                            onClick={() => {
                              if (el.subTitle !== "view all") {
                                window.navigation({
                                  navProps: {
                                    master: "products",
                                    category: data.title,
                                    sub: el.subTitle,
                                  },
                                });
                              } else {
                                window.navigation({
                                  navProps: {
                                    master: "products",
                                    category: data.title,
                                    sub: `all ${data.title}`,
                                  },
                                });
                              }
                            }}
                          >
                            {el.subTitle != "view all" ? (
                              <h6 className="mnt__title">{el.subTitle}</h6>
                            ) : null}

                            <img
                              src={el.img}
                              alt="nav__img"
                              className="mnt__lower--img"
                            />
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
            {cartActive === !false ? <CartPreview cRef={cRef} /> : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

const Navbar = () => {
  const [cartPreviewActive, setCartPreviewActive] = useState<boolean>(false);
  const [dropdownId, setDropdownId] = useState<number>();
  const [navDropdownActive, setNavDropdownActive] = useState<boolean>(false);
  const { setLoginWidgetActive, cartPopup, mediaTwo } =
    useContext<GlobalContext>(UserContext);

  const handleAccountMenu = (data: { id: number }) => {
    if (data.id == 1) {
      setLoginWidgetActive(!false);
    }

    if (data.id == 2) {
      setDropdownId(data.id);
      setCartPreviewActive(!false);
    }
  };

  useEffect(() => {
    if (cartPopup == !false) {
      setCartPreviewActive(!false);
    }
  }, [cartPopup]);

  //preload imgs for navbar

  useEffect(() => {
    const imgs = subOptions.map((data) => data.block.flatMap((el) => el.img));
    window.cacheImages(imgs[0]);
  }, []);

  return (
    <>
      <div className="navbar__wrapper">
        <div className="nav__inner">
          {mediaTwo === false ? (
            <div className="nav__upper">
              <div
                className="nav__logo--container"
                onClick={() =>
                  window.navigation({
                    singlePath: "home",
                  })
                }
              >
                <img src={logo} id="nav__logo" />
              </div>
              <div className="nav__search--container">
                <Searchbar />
              </div>
              <div className="nav__account--container">
                {buttonData
                  .filter((el) => el.identifier == "nav--account")
                  .map((data) => (
                    <Button
                      buttonProps={data}
                      individualAction={handleAccountMenu}
                      individualOptions={data}
                      key={data.id}
                    />
                  ))}
                {cartPreviewActive == !false ? (
                  <PreviewDropdown
                    id={dropdownId}
                    activeState={cartPreviewActive}
                    activeAction={setCartPreviewActive}
                  />
                ) : null}
              </div>
            </div>
          ) : (
            <NavbarUpperMobile />
          )}

          {mediaTwo === false ? (
            <div className="nav__lower">
              <div className="nav__options--container">
                {options.map((data) => (
                  <button
                    className="nav__option"
                    key={data.id}
                    onClick={() => {
                      if (data.id !== 6) {
                        setNavDropdownActive(!false);
                        setDropdownId(data.id);
                      } else {
                        window.navigation({
                          navProps: {
                            master: "products",
                            category: data.title.toLowerCase(),
                            sub: "sale",
                          },
                        });
                      }
                    }}
                  >
                    {data.title}
                  </button>
                ))}
              </div>
              {navDropdownActive == !false ? (
                <NavDropdown
                  id={dropdownId}
                  activeAction={setNavDropdownActive}
                  activeState={navDropdownActive}
                  subOptions={subOptions}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Navbar;
