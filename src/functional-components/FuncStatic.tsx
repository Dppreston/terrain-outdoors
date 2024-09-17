import { NavigationProps } from "../App";

export const inputData: {
  id: number;
  placeholder?: string;
  type: string;
  identifier: string;
  label: string;
  additional?: string;
  required?: boolean;
  limit?: number;
  noCounter?: boolean;
  initialValue?: string | number | undefined;
  dropdown?: boolean;
  dropdownIdentifier?: string;
}[] = [
  {
    id: 1,
    identifier: "searchbar",
    type: "text",
    placeholder: "What would you like to find?",
    label: "",
  },
  {
    id: 2,
    identifier: "login",
    type: "email",
    label: "Email",
    required: !false,
  },
  {
    id: 3,
    identifier: "login",
    type: "password",
    label: "Password",
    required: !false,
  },
  {
    id: 4,
    identifier: "rp",
    type: "text",
    label: "Username",
    required: !false,
  },
  {
    id: 5,
    identifier: "rp",
    type: "text",
    label: "Summary",
    required: !false,
    limit: 75,
  },
  {
    id: 6,
    identifier: "create-name",
    type: "text",
    label: "First",
    required: !false,
  },
  {
    id: 7,
    identifier: "create-name",
    type: "text",
    label: "Last",
    required: !false,
  },
  {
    id: 8,
    identifier: "create",
    type: "email",
    label: "Email",
    required: !false,
  },
  {
    id: 9,
    identifier: "create",
    type: "password",
    label: "Password",
    required: !false,
  },
  {
    id: 10,
    identifier: "create",
    type: "password",
    label: "Confirm Password",
    required: !false,
  },
  {
    id: 11,
    identifier: "checkout",
    type: "text",
    label: "First",
    required: !false,
    initialValue: "",
  },
  {
    id: 12,
    identifier: "checkout",
    type: "text",
    label: "Last",
    required: !false,
    initialValue: "",
  },
  {
    id: 13,
    identifier: "checkout",
    type: "email",
    label: "Email",
    required: !false,
    initialValue: "",
  },
  {
    id: 14,
    identifier: "checkout__address",
    type: "text",
    label: "Address",
    required: !false,
    initialValue: "",
  },
  {
    id: 15,
    identifier: "checkout__address--support",
    type: "text",
    label: "Apt",
    initialValue: "",
  },
  {
    id: 16,
    identifier: "checkout__address--support",
    type: "text",
    label: "City",
    required: !false,
    initialValue: "",
  },
  {
    id: 17,
    identifier: "checkout__address--support",
    type: "text",
    label: "State",
    required: !false,
    initialValue: "",
    dropdown: !false,
    dropdownIdentifier: "states",
  },

  {
    id: 18,
    identifier: "checkout__address--support",
    type: "text",
    label: "Zip",
    limit: 5,
    required: !false,
    noCounter: !false,
    initialValue: "",
  },
  {
    id: 19,
    identifier: "payment__name",
    type: "text",
    label: "Name on card",
    required: !false,
    initialValue: "",
  },
  {
    id: 20,
    identifier: "payment__cc",
    type: "text",
    label: "Card Number",
    required: !false,
    initialValue: "",
    limit: 16,
    noCounter: !false,
    additional: "Enter number without spaces",
  },
  {
    id: 21,
    identifier: "payment__cc",
    type: "text",
    label: "M",
    required: !false,
    initialValue: "",
    dropdown: !false,
    dropdownIdentifier: "months",
  },
  {
    id: 22,
    identifier: "payment__cc",
    type: "text",
    label: "Y",
    required: !false,
    initialValue: "",
    limit: 2,
    noCounter: !false,
    dropdown: !false,
    dropdownIdentifier: "years",
  },
  {
    id: 23,
    identifier: "payment__cc",
    type: "text",
    label: "CVC",
    required: !false,
    initialValue: "",
    limit: 3,
    noCounter: !false,
  },
];

export const textAreaData: {
  id: number;
  identifier: string;
  label?: string;
  required?: boolean;
  limit?: number;
}[] = [
  {
    id: 1,
    identifier: "rp",
    label: "Review",
    required: !false,
    limit: 300,
  },
];

export let buttonData: {
  id: number;
  icon?: string;
  text?: string;
  identifier: string;
  navValue?: string | number | NavigationProps;
}[] = [
  {
    id: 1,
    icon: "fa-solid fa-user",
    identifier: "nav--account",
  },
  {
    id: 2,
    icon: "fa-solid fa-cart-shopping",
    identifier: "nav--account",
  },
  {
    id: 3,
    identifier: "nav--preview--login",
    text: "Login",
  },
  {
    id: 4,
    identifier: "nav--preview--create",
    text: "Create Account",
  },
  { id: 5, identifier: "login__widget", text: "Sign In" },
  {
    id: 6,
    identifier: "login__widget--signup",
    text: "Create Account",
  },
  {
    id: 7,
    identifier: "write__review",
    text: "Write a review",
  },
  {
    id: 8,
    identifier: "quantity-min",
    icon: "fa-solid fa-minus",
  },
  {
    id: 9,
    identifier: "quantity-max",
    icon: "fa-solid fa-plus",
  },
  {
    id: 10,
    identifier: "add__to--cart",
    text: "add to cart",
  },
  {
    id: 11,
    identifier: "cancel",
    icon: "fa-solid fa-xmark",
  },
  {
    id: 12,
    identifier: "rp",
    text: "Submit Review",
  },
  {
    id: 13,
    identifier: "create__account",
    text: "Create Account",
  },
  {
    id: 14,
    identifier: "logout",
    icon: "fa-solid fa-right-from-bracket",
  },
  {
    id: 15,
    identifier: "checkout",
    text: "Checkout",
  },
  {
    id: 16,
    identifier: "cart__preview--remove",
    icon: "fa-solid fa-xmark",
  },
  {
    id: 17,
    identifier: "load__more",
    text: "More Reviews",
  },
  {
    id: 18,
    identifier: "checkout__next",
    text: "Next",
  },
  {
    id: 19,
    identifier: "add__to--cart--tile",
    icon: "fa-solid fa-cart-shopping",
  },
  {
    id: 20,
    identifier: "mobile__nav--left",
    icon: "fa-solid fa-search",
  },
  {
    id: 21,
    identifier: "mobile__nav--right",
    icon: "fa-solid fa-shopping-cart",
  },
  {
    id: 22,
    identifier: "mobile__nav--right",
    icon: "fa-solid fa-user",
  },
  {
    id: 23,
    identifier: "mobile__nav--right",
    icon: "fa-solid fa-bars",
  },
];
