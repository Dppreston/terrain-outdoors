import { useEffect, useState } from "react";
import Button from "../functional-components/Button";
import { NavigationProps } from "../App";

type BannerFullProps = {
  bannerFullProps: {
    id: number;
    imgs: { id: number; identifier: string; link: string }[];
    buttons?: {
      id: number;
      icon?: string;
      text?: string;
      identifier: string;
      active?: boolean;
      inactive?: boolean;
      action?: Function;
      optionalValue?: NavigationProps;
    }[];
    title?: { id: number; identifier: string; text: string }[];
    subTitle?: string;
    subImgs?: string;
  };
};

const BannerFull = ({ bannerFullProps }: BannerFullProps) => {
  return (
    <>
      <div className="banner__full--wrapper">
        <div className="banner__full--img--container">
          <img
            id="banner__full--img"
            src={bannerFullProps.imgs[0].link}
            loading="eager"
          />

          {bannerFullProps.title != undefined ? (
            <div className="banner__full--info--container">
              {bannerFullProps.subImgs ? (
                <div className="banner__img--inner--wrapper">
                  <img src={bannerFullProps.subImgs} />
                </div>
              ) : null}
              <h6 className="banner__full--title">
                {bannerFullProps.title.find((el) => el.id == 1)?.text}
              </h6>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default BannerFull;
