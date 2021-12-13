import css from "./Header.module.scss";
import ToolButton from "../../UI/ToolButton/ToolButton";
import {BsPencil, CgErase, CgSoftwareDownload, CgTrash} from "react-icons/all";
import React, {useCallback} from "react";
import PillButton from "../../UI/PillButton/PillButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setCreateModalState} from "../../redux/canvasSlice";
import socket from "../../config/socket";
import {useNavigate} from "react-router-dom";

type props = {
  downloadSketch: () => void;
  setPencil: () => void;
  setErase: () => void;
  cleanCanvas: () => void;
}

const Header = ({downloadSketch, setPencil, setErase, cleanCanvas}: props) => {
  const dispatch = useDispatch();
  const canvasState = useSelector((state: RootState) => state.canvas);
  const navigate = useNavigate();

  const handleInviteBuddy = useCallback(() => {
    dispatch(setCreateModalState(!canvasState.createModalState));
    if (canvasState.roomId) {
      navigate(canvasState.roomId);
      socket.emit("join room", canvasState.roomId);
    }
  }, [canvasState.createModalState, canvasState.roomId, dispatch, navigate]);


  return (
    <div className={css.header}>
      <div className={css.logo}>Sketcho</div>
      <div>
        <ToolButton index={1} clickAction={setPencil} selectable={true} icon={<BsPencil/>}/>
        <ToolButton index={2} clickAction={setErase} selectable={true} icon={<CgErase/>}/>
        <ToolButton index={3} clickAction={cleanCanvas} icon={<CgTrash/>}/>
        <ToolButton index={4} clickAction={downloadSketch} icon={<CgSoftwareDownload/>}/>
      </div>
      <PillButton
        text="‍👨🏻‍ Invite buddy 👩🏾‍"
        background={false}
        onClicked={handleInviteBuddy}
      />
    </div>
  );
}

export default Header;
