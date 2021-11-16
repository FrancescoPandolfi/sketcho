import css from "./Colorbar.module.scss";
import React, {useEffect, useState} from "react";
import ColorButton from "./ColorButton/ColorButton";
import {useDispatch, useSelector} from "react-redux";
import {changePenColor} from "../../redux/canvasSlice";
import {RootState} from "../../redux/store";
import socket from "../../config/socket";
import {colors} from "../../constants/constants"

const Colorbar = () => {
  const canvasState = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch()

  useEffect(() => {
    socket.emit('color changed', [canvasState.penColor, canvasState.roomId]);
  }, [canvasState.penColor, canvasState.roomId]);

  useEffect(() => {
    socket.on("changing color", ([indexColor]) => {
      dispatch(changePenColor(indexColor));
    });
  }, [dispatch]);

  return (
    <div className={css.colorbar}>
      {
        colors.map((color, i) => {
          return (
            <ColorButton
              key={i}
              color={colors[i]}
              index={i}
              selected={canvasState.penColor}
              onClick={() => dispatch(changePenColor(i))}
            />
          );
        })
      }
    </div>
  );
}

export default Colorbar;
