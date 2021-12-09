import css from "./Header.module.scss";
import RoundButton from "./RoundButton/RoundButton";
import {CgErase, CgRedo, CgSoftwareDownload, CgUndo} from "react-icons/all";
import React from "react";
import PillButton from "./PillButton/PillButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Logo from "../../img/risorsa-1.svg";
import {setCreateModalState, setJoinModalState} from "../../redux/canvasSlice";

type props = {
  downloadSketch: () => void;
  cleanCanvas: () => void;
  undo: () => void;
  redo: () => void;
}

const Header = ({downloadSketch, cleanCanvas, undo, redo}: props) => {
  const dispatch = useDispatch();
  const canvasState = useSelector((state: RootState) => state.canvas);

  return (
    <div className={css.header}>
      <div className={css.logo}><img src={Logo} alt="Drawo"/></div>
      <RoundButton disabled={canvasState.undoList.length === 0}  action={undo} icon={<CgUndo/>}/>
      <RoundButton disabled={canvasState.redoList.length === 0} action={redo} icon={<CgRedo/>}/>
      <RoundButton action={cleanCanvas} icon={<CgErase/>}/>
      <RoundButton action={downloadSketch} icon={<CgSoftwareDownload/>}/>
      <PillButton
        text="Create room"
        border={false}
        onClicked={() => dispatch(setCreateModalState(!canvasState.createModalState))}
      />
      <PillButton
        text="Join room"
        border={true}
        onClicked={() => dispatch(setJoinModalState(!canvasState.joinModalState))}
      />
    </div>
  );
}

export default Header;
