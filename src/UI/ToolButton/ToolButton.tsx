import React, {FC, ReactElement, useCallback} from "react";
import css from "./Toolbutton.module.scss"
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setActiveButton} from "../../redux/canvasSlice";

export interface props {
  clickAction: () => void;
  icon: ReactElement;
  index: number;
  disabled?: boolean;
  selectable?: boolean;
}

const ToolButton: FC<props> = ({clickAction, icon, disabled = false, index, selectable = false}: props) => {
  const dispatch = useDispatch();
  const canvasState = useSelector((state: RootState) => state.canvas);

  const handleClick = useCallback(() => {
    if (selectable) {
      dispatch(setActiveButton(index));
    }
    clickAction();
  }, [clickAction, selectable, dispatch, index]);

  return (
    <button
      disabled={disabled}
      className={cn(css.btn, {[css.btnSelected]: canvasState.activeButton === index && selectable})}
      onClick={handleClick}>{icon}
    </button>
  );
};

export default React.memo(ToolButton);
