import React, {FC} from "react";
import css from "./PillButton.module.scss";

export interface props {
  onClicked: () => void;
  text: string;
  background: boolean;
}

const PillButton: FC<props> = ({onClicked, text, background}: props) => {

  const bgStyle = background ? css.withBackground : css.noBackground;

  return (
    <button className={`${css.btn} ${bgStyle}`}
      onClick={onClicked}>
      {text}
    </button>
  );
};

export default PillButton;
