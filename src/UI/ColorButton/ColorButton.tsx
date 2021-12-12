import css from "./ColorButton.module.scss"
import {FC} from "react";

export interface props {
  onClick: () => void;
  color: string;
  size?: number
  index: number;
  selectedBtn: number;
}

const ColorButton: FC<props> = ({onClick, color, size = 20, index, selectedBtn}) => {
  return (
  <div className={selectedBtn === index ? `${css.buttonWrapper} ${css.selected}` : css.buttonWrapper}>
      <button
        style={{background: `${color}`, width: `${size}px`, height: `${size}px`}}
        className={selectedBtn === index ? `${css.btnColor} ${css.selected}` : css.btnColor}
        onClick={onClick}
      />
    </div>
  );
};

export default ColorButton;
