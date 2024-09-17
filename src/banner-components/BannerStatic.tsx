import { NavigationProps } from "../App";
import logo from "../assets/terrain-new.png";

//home banner images

import mbFlyFishing from "../assets/mb-1/mb-fly-fishing.jpg";

//product page banner img

import sbFishing from "../assets/product-page-imgs/pbfishing.jpg";
import sbFishing2 from "../assets/mb-1/mb-fishing.jpg";

/// home banner

export const homeBannerData: {
  id: number;
  imgs: { id: number; identifier: string; link: string }[];
  title?: { id: number; identifier: string; text: string }[];
  subTitle?: string;
  subImgs?: string;
}[] = [
  {
    id: 1,
    imgs: [
      {
        id: 1,
        identifier: "mbFlyFishing",
        link: mbFlyFishing,
      },
    ],

    title: [
      {
        id: 1,
        identifier: "mbFlyFishing",
        text: "Welcome to Terrain Fishing Co.",
      },
    ],
    subTitle: "We love to fish and we know you do too!",
    subImgs: logo,
  },
];

export const standardBannerData: {
  id: number;
  title: string;
  sub?: string;
  p?: string;
  identifier: string;
  img?: string;
  link: {
    navProps: {
      master: string;
      category?: string;
      sub?: string;
      product?: string;
    };
  };
  linkText: string;
  format: number;
  // format
  // 1 - button on right
  // 2 - button middle
  // 3 - button on left
  height: number;
  //height
  //1 - 250px
  //2 - 350px;
  width: number;
  //width
  //1 - mw - 1200px
  //2 - none
}[] = [
  {
    id: 1,
    identifier: "ss__rods",
    title: "Save on big brand fishing rods",
    sub: "Shop end of season sale on your favorite fishing rod brands",
    img: sbFishing,
    link: {
      navProps: { master: "products", category: "rods", sub: "all rods" },
    },
    linkText: "shop rods",
    format: 1,
    height: 1,
    width: 1,
  },
  {
    id: 2,
    identifier: "ss__baits",
    title: "bait and lures for every encounter on the water",
    img: sbFishing2,
    linkText: "shop baits & lures",
    link: {
      navProps: {
        master: "products",
        category: "bait & lures",
        sub: "all bait & lures",
      },
    },
    format: 2,
    height: 2,
    width: 2,
  },
  {
    id: 3,
    identifier: "create__account",
    title: "Create a free account today",
    sub: "Experience everything terrain outdoors has to offer with a free account!",
    linkText: "create account",
    link: {
      navProps: {
        master: "create-account",
      },
    },
    format: 1,
    height: 1,
    width: 1,
  },
];
