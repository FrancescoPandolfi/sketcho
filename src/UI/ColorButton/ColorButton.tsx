import css from "./ColorButton.module.scss"
import {FC} from "react";

export interface props {
  onClick: () => void;
  color: string;
  index: number;
  selectedBtn: number;
}

const ColorButton: FC<props> = ({onClick, color, index, selectedBtn}) => {
  return (
  <div className={selectedBtn === index ? `${css.buttonWrapper} ${css.selected}` : css.buttonWrapper}>
      <button
        style={{background: `${color}`}}
        className={selectedBtn === index ? `${css.btnColor} ${css.selected}` : css.btnColor}
        onClick={onClick}
      />
    </div>
  );
};

export default ColorButton;
