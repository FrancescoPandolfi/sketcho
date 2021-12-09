import css from "./Colorbar.module.scss";
import React from "react";
import ColorButton from "./ColorButton/ColorButton";
import {useDispatch, useSelector} from "react-redux";
import {changePenColor} from "../../redux/canvasSlice";
import {RootState} from "../../redux/store";
import {colors} from "../../constants/constants"

const Colorbar = () => {
  const canvasState = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch()

  return (
    <div className={css.colorbar}>
      {
        colors.map((color, i) => {
          return (
            <ColorButton
              key={i}
              color={colors[i]}
              index={i}
              selectedBtn={canvasState.penColor}
              onClick={() => dispatch(changePenColor(i))}
            />
          );
        })
      }
    </div>
  );
}

export default Colorbar;
