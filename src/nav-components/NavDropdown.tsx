import { useEffect, useRef, useState } from "react";
import { subOptions } from "./NavStatic";

type NavDropdownProps = {
  id?: number;
  activeState: boolean;
  activeAction: Function;
  subOptions: any;
};

const NavDropdown = ({ id, activeAction, activeState }: NavDropdownProps) => {
  const navDropdownRef = useRef<any>();

  //handle closing the dropdown

  window.addEventListener("mousedown", (e) => {
    if (navDropdownRef.current != undefined) {
      if (activeState && !navDropdownRef.current.contains(e.target)) {
        activeAction(false);
      }
    }
  });

  return (
    <>
      <div className="nav__dropdown--wrapper" ref={navDropdownRef}>
        {subOptions
          .filter((el) => el.id == id)
          .map((main) => (
            <div className="nav__dropdown--inner" key={main.id}>
              {main.block.map((data) => (
                <button
                  className="nav__block"
                  key={data.id}
                  onClick={(e) => {
                    e.preventDefault();
                    window.navigation({
                      navProps: {
                        master: "products",
                        category: main.title,
                        sub:
                          data.subTitle === "view all"
                            ? `all ${main.title}`
                            : data.subTitle,
                      },
                    });
                  }}
                >
                  <img src={data.img} alt="sub__category--img" />
                  <h6>{data.subTitle}</h6>
                </button>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};
export default NavDropdown;
