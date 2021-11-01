import React, {FC, ReactElement} from "react";
import css from "./Roundbutton.module.scss"

export interface props {
  action: () => void;
  icon: ReactElement;
  disabled?: boolean;
}

const RoundButton: FC<props> = ({action, icon, disabled = false}: props) => {
  return (
      <button
        disabled={disabled}
        className={`${css.btn}
        ${css.btnColor}`}
        onClick={action}>{icon}
      </button>
  );
};

export default RoundButton;
