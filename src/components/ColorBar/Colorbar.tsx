import css from "./Colorbar.module.scss";
import React from "react";
import ColorButton from "../../UI/ColorButton/ColorButton";
import {useDispatch, useSelector} from "react-redux";
import {changePenColor} from "../../redux/canvasSlice";
import {RootState} from "../../redux/store";
import {colors} from "../../utils/constants";

const Colorbar = () => {
  const canvasState = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();
  // Remove the last color from the array because it’s white
  const colorBarColors = colors.slice(0, colors.length - 1);

  return (
    <div className={css.colorbar}>
      {
        colorBarColors.map((color, i) => {
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
