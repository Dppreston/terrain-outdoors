import spinningRod from "../assets/product-grid-imgs/rods/spinningrod.jpg";
import castingRod from "../assets/product-grid-imgs/rods/castingrod.jpg";
import saltwaterRods from "../assets/product-grid-imgs/rods/saltrod.jpg";
import flyRods from "../assets/product-grid-imgs/rods/flyrod.jpg";
import iceRods from "../assets/product-grid-imgs/rods/icerod.jpg";

import spinningreel from "../assets/product-grid-imgs/reels/spinningreel.jpg";
import castingreel from "../assets/product-grid-imgs/reels/castingreel.jpg";
import icereel from "../assets/product-grid-imgs/reels/icereel.jpg";
import saltreel from "../assets/product-grid-imgs/reels/saltwaterreel.jpg";
import flyreel from "../assets/product-grid-imgs/reels/flyreel.jpg";

import line from "../assets/product-grid-imgs/linetackle/line.jpg";
import weight from "../assets/product-grid-imgs/linetackle/weight.jpg";
import hook from "../assets/product-grid-imgs/linetackle/hook.jpg";

import hardbait from "../assets/product-grid-imgs/bait/hardbait.jpg";
import softbait from "../assets/product-grid-imgs/bait/softbait.jpg";
import spoons from "../assets/product-grid-imgs/bait/spoons.jpg";
import jig from "../assets/product-grid-imgs/bait/jig.jpg";
import spinner from "../assets/product-grid-imgs/bait/spinnerbait.jpg";

import net from "../assets/product-grid-imgs/accessories/net.jpg";
import gloves from "../assets/product-grid-imgs/accessories/gloves.jpg";
import pliers from "../assets/product-grid-imgs/accessories/pliers.jpg";
import storage from "../assets/product-grid-imgs/accessories/tacklebox.jpg";

import va from "../assets/product-grid-imgs/View All(2).png";

export const options: { id: number; title: string }[] = [
  {
    id: 1,
    title: "Rods",
  },
  {
    id: 2,
    title: "Reels",
  },
  {
    id: 3,
    title: "Line & Tackle",
  },
  {
    id: 4,
    title: "Bait & Lures",
  },
  {
    id: 5,
    title: "Accessories",
  },

  {
    id: 6,
    title: "Terrain Finds",
  },
];

export const subOptions: {
  id: number;
  title: string;
  img?: string;
  block: { id: number; subTitle: string; img?: string }[];
}[] = [
  {
    id: 1,
    title: "rods",
    img: spinningRod,
    block: [
      {
        id: 1.1,
        subTitle: "spinning rods",
        img: spinningRod,
      },
      {
        id: 1.2,
        subTitle: "casting rods",
        img: castingRod,
      },
      {
        id: 1.3,
        subTitle: "saltwater rods",
        img: saltwaterRods,
      },
      {
        id: 1.4,
        subTitle: "fly rods",
        img: flyRods,
      },
      {
        id: 1.5,
        subTitle: "ice rods",
        img: iceRods,
      },
      {
        id: 999,
        subTitle: "view all",
        img: va,
      },
    ],
  },
  {
    id: 2,
    title: "reels",
    block: [
      {
        id: 2.1,
        subTitle: "spinning reels",
        img: spinningreel,
      },
      {
        id: 2.2,
        subTitle: "casting reels",
        img: castingreel,
      },
      {
        id: 2.3,
        subTitle: "fly reels",
        img: flyreel,
      },
      {
        id: 2.4,
        subTitle: "saltwater reels",
        img: saltreel,
      },
      {
        id: 2.5,
        subTitle: "ice reels",
        img: icereel,
      },
      {
        id: 999,
        subTitle: "view all",
        img: va,
      },
    ],
  },
  {
    id: 3,
    title: "line & tackle",
    block: [
      {
        id: 3.1,
        subTitle: "line",
        img: line,
      },
      {
        id: 3.2,
        subTitle: "hooks",
        img: hook,
      },
      {
        id: 3.3,
        subTitle: "weights",
        img: weight,
      },
      {
        id: 999,
        subTitle: "view all",
        img: va,
      },
    ],
  },
  {
    id: 4,
    title: "bait & lures",
    block: [
      {
        id: 4.1,
        subTitle: "hard baits",
        img: hardbait,
      },
      {
        id: 4.2,
        subTitle: "soft baits",
        img: softbait,
      },
      {
        id: 4.3,
        subTitle: "spoons",
        img: spoons,
      },
      {
        id: 4.4,
        subTitle: "jigs",
        img: jig,
      },
      {
        id: 4.5,
        subTitle: "spinnerbaits",
        img: spinner,
      },
      {
        id: 999,
        subTitle: "view all",
        img: va,
      },
    ],
  },
  {
    id: 5,
    title: "accessories",

    block: [
      {
        id: 5.1,
        subTitle: "nets",
        img: net,
      },
      {
        id: 5.2,
        subTitle: "storage",
        img: storage,
      },
      {
        id: 5.3,
        subTitle: "pliers",
        img: pliers,
      },
      {
        id: 5.4,
        subTitle: "gloves",
        img: gloves,
      },
      {
        id: 999,
        subTitle: "view all",
        img: va,
      },
    ],
  },

  {
    id: 6,
    title: "steals & good deals",

    block: [],
  },
];
