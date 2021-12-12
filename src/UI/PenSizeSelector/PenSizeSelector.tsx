import React, {FC} from "react";
import css from "./PenSizeSelector.module.scss";
import ColorButton from "../ColorButton/ColorButton";
import {colors, penSize} from "../../utils/constants";
import {changeLineWidth} from "../../redux/canvasSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";


const PenSizeSelector: FC = () => {
  const dispatch = useDispatch();
  const canvasState = useSelector((state: RootState) => state.canvas);

  return (
    <div className={css.sizeSelector}>
      {
        penSize.map((size, i) => {
          return (
            <ColorButton
              key={i}
              size={size}
              color={colors[0]}
              index={i}
              selectedBtn={canvasState.lineWidth}
              onClick={() => dispatch(changeLineWidth(i))}
            />
          );
        })
      }
    </div>

  );
};

export default PenSizeSelector;
