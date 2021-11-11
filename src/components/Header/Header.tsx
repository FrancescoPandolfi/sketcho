import css from "./Header.module.scss";
import RoundButton from "./RoundButton/RoundButton";
import {CgErase, CgRedo, CgSoftwareDownload, CgUndo} from "react-icons/all";
import React from "react";
import PillButton from "./PillButton/PillButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setModalState} from "../../redux/canvasSlice";
import Logo from "../../img/risorsa-1.svg";

export interface props {
  downloadSketch: () => void;
  cleanCanvas: () => void;
  undo: () => void;
  redo: () => void;
}

const Header = ({downloadSketch, cleanCanvas, undo, redo}: props) => {
  const dispatch = useDispatch();
  const canvasState = useSelector((state: RootState) => state.canvas);

  return (
    <div className={css.toolbar}>
      <div className={css.logo}><img src={Logo} alt="Draw with me"/></div>
      <RoundButton disabled={canvasState.undoList.length === 0}  action={undo} icon={<CgUndo/>}/>
      <RoundButton disabled={canvasState.redoList.length === 0} action={redo} icon={<CgRedo/>}/>
      <RoundButton action={cleanCanvas} icon={<CgErase/>}/>
      <RoundButton action={downloadSketch} icon={<CgSoftwareDownload/>}/>
      <PillButton
        text="Create room"
        border={false}
        onClicked={() => dispatch(setModalState(!canvasState.modalState))}
      />
      <PillButton
        text="Join room"
        border={true}
        onClicked={() => dispatch(setModalState(!canvasState.modalState))}
      />
    </div>
  );
}

export default Header;
