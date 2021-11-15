import {FC} from "react";
import css from "./Modal.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setCreateModalState} from "../../redux/canvasSlice";
import {useNavigate} from "react-router-dom";
import socket from "../../config/socket";

const CreateModal: FC = () => {
  const canvasState = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const handleCreateRoom = () => {
    dispatch(setCreateModalState(!canvasState.createModalState));
    navigate(canvasState.roomId);
    socket.emit("join room", canvasState.roomId);
  }


  return (
    <div className={css.backdrop}>
      <div className={css.modalContainer}>
        <p>{canvasState.roomId}</p>
        <button onClick={handleCreateRoom}>Create</button>
      </div>

    </div>
  );
}
export default CreateModal;
