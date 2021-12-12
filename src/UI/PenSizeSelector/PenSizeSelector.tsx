import React, {FC, useRef} from "react";
import css from "./RangeSlider.module.scss";

export interface props {
}

const RangeSlider: FC<props> = ({}: props) => {
  const penSizeSelector = useRef<HTMLInputElement>(null);

  return (
    <>
      <input type="range" min="0" max="100" ref={penSizeSelector} id={css.rangeSlider}/>
      <div className={css.penSize}></div>
    </>

  );
};

export default RangeSlider;
