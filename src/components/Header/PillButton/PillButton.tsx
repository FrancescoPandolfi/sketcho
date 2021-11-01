import React, {FC} from "react";
import css from "./PillButton.module.scss";

export interface props {
  onClicked: () => void;
  text: string;
  border: boolean;
}

const PillButton: FC<props> = ({onClicked, text, border}: props) => {

  const borderStyle = border ? css.border : css.noBorder;

  return (
    <button className={`${css.btn} ${borderStyle}`}
      onClick={onClicked}>
      {text}
    </button>
  );
};

export default PillButton;
