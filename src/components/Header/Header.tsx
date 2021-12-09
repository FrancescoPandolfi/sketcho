import css from "./Header.module.scss";
import RoundButton from "./RoundButton/RoundButton";
import {CgErase, CgRedo, CgSoftwareDownload, CgUndo} from "react-icons/all";
import React from "react";
import PillButton from "./PillButton/PillButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setCreateModalState} from "../../redux/canvasSlice";
import socket from "../../config/socket";
import {useNavigate} from "react-router-dom";

type props = {
  downloadSketch: () => void;
  cleanCanvas: () => void;
  undo: () => void;
  redo: () => void;
}

const Header = ({downloadSketch, cleanCanvas, undo, redo}: props) => {
  const dispatch = useDispatch();
  const canvasState = useSelector((state: RootState) => state.canvas);
  const navigate = useNavigate();

  const handleInviteBuddy = () => {
    dispatch(setCreateModalState(!canvasState.createModalState));
    console.log(canvasState)
    if (canvasState.roomId) {
      navigate(canvasState.roomId);
      socket.emit("join room", canvasState.roomId);
    }
  };


  return (
    <div className={css.header}>
      <div className={css.logo}>Sketcho</div>
      <RoundButton disabled={canvasState.undoList.length === 0} action={undo} icon={<CgUndo/>}/>
      <RoundButton disabled={canvasState.redoList.length === 0} action={redo} icon={<CgRedo/>}/>
      <RoundButton action={cleanCanvas} icon={<CgErase/>}/>
      <RoundButton action={downloadSketch} icon={<CgSoftwareDownload/>}/>
      <PillButton
        text="Invite buddy"
        border={false}
        onClicked={handleInviteBuddy}
      />
    </div>
  );
}

export default Header;
