import { NavigationProps } from "../App";

type ButtonProps = {
  buttonProps: {
    id: number;
    icon?: string | undefined;
    text?: string;
    identifier: string;
    navValue?: string | number | NavigationProps;
  };
  individualAction?: Function;
  individualInactive?: boolean;
  individualOptions?: object | [] | string | number | boolean;
};

const Button = ({
  buttonProps,
  individualAction,
  individualInactive,
  individualOptions,
}: ButtonProps) => {
  return (
    <>
      <button
        key={buttonProps.id}
        className={
          buttonProps.icon != undefined
            ? `button__main ${buttonProps.icon}`
            : undefined
        }
        style={
          buttonProps.icon != undefined
            ? {
                width: "fit-content",
                height: "fit-content",
                padding: "var(--standard--padding",
                borderRadius: "var(--button-br)",
              }
            : {
                padding: "7px 13px 7px 13px",
                pointerEvents: individualInactive == false ? "none" : "all",
                opacity: individualInactive == false ? ".6" : "1",
              }
        }
        onClick={(e) => {
          e.preventDefault();

          if (buttonProps.navValue != undefined) {
            window.navigation(buttonProps.navValue);
          } else {
            individualAction!(individualOptions);
          }
        }}
      >
        {buttonProps.text != undefined ? <p>{buttonProps.text}</p> : null}
      </button>
    </>
  );
};
export default Button;
