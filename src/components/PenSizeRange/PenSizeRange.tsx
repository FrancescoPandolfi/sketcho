import {FC} from "react";
import css from "./PenSizeRange.module.scss";



const PenSizeRange: FC = () => {
  return (
    <div className={css.penSizeRange}>
      <input type="range" min="1" max="100" className={css.slider} id="myRange"/>
    </div>
  );
};

export default PenSizeRange;

