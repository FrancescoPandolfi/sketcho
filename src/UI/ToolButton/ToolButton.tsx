import React, {FC, ReactElement} from "react";
import css from "./Toolbutton.module.scss"

export interface props {
  action: () => void;
  icon: ReactElement;
  disabled?: boolean;
}

const ToolButton: FC<props> = ({action, icon, disabled = false}: props) => {
  return (
    <button
      disabled={disabled}
      className={`${css.btn} ${css.btnColor}`}
      onClick={action}>{icon}
    </button>
  );
};

export default ToolButton;
