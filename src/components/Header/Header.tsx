import css from "./Header.module.scss";
import RoundButton from "./RoundButton/RoundButton";
import {CgErase, CgRedo, CgSoftwareDownload, CgUndo} from "react-icons/all";
import React from "react";
import PillButton from "./PillButton/PillButton";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export interface props {
  downloadSketch: () => void;
  cleanCanvas: () => void;
  undo: () => void;
  redo: () => void;
}

const c = () => {
};

const Header = ({downloadSketch, cleanCanvas, undo, redo}: props) => {
  const canvasState = useSelector((state: RootState) => state.canvas);

  return (
    <div className={css.toolbar}>
      <div className={css.icon}>✍️</div>
      <RoundButton disabled={canvasState.undoList.length === 0}  action={undo} icon={<CgUndo/>}/>
      <RoundButton disabled={canvasState.redoList.length === 0} action={redo} icon={<CgRedo/>}/>
      <RoundButton action={cleanCanvas} icon={<CgErase/>}/>
      <RoundButton action={downloadSketch} icon={<CgSoftwareDownload/>}/>
      <PillButton text="Create room" border={false} onClicked={c}/>
      <PillButton text="Join room" border={true} onClicked={c}/>
    </div>
  );
}

export default Header;
