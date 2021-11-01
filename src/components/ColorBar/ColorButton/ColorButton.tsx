import css from "./ColorButton.module.scss"
import {FC} from "react";

export interface props {
  onClick: () => void;
  color: string;
  index: number;
  selected: number;
}

const ColorButton: FC<props> = ({onClick, color, index, selected}) => {
  return (
    <div className={selected === index ? css.buttonWrapper : css.buttonWrapperWhite}>
      <button
        style={{background: `${color}`}}
        className={css.btnColor}
        onClick={onClick}
      />
    </div>
  );
};

export default ColorButton;
