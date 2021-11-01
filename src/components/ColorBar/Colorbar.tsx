import css from "./Colorbar.module.scss";
import React, {useState} from "react";
import ColorButton from "./ColorButton/ColorButton";
import {useDispatch} from "react-redux";
import {changePenColor} from "../../redux/canvasSlice";

const Colorbar = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const dispatch = useDispatch()
  const colors = [
    '#001622',
    '#FB393E',
    '#F5672F',
    '#FA8C2C',
    '#FAC151',
    '#83B667',
    '#339F80',
    '#B27DF2',
    '#6D4031',
    '#FFFFFF'
  ];
  
  return (
    <div className={css.colorbar}>
      {
        colors.map((color, i) => {
           return (
               <ColorButton
                 key={i}
                 color={color}
                 index={i}
                 selected={selectedColor}
                 onClick={() => {
                   setSelectedColor(i);
                   dispatch(changePenColor(color))
                 }}
               />
           );
        })
      }
    </div>
  );
}

export default Colorbar;
