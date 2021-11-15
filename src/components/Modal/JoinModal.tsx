import {FC, useState} from "react";
import css from "./Modal.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setJoinModalState, setRoomId} from "../../redux/canvasSlice";
import {useNavigate} from "react-router-dom";
import socket from "../../config/socket";

const CreateModal: FC = () => {
  const [room, setRoom] = useState<string>("");
  const canvasState = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const handleJoinRoom = () => {
    dispatch(setJoinModalState(!canvasState.joinModalState));
    dispatch(setRoomId('123'));
    navigate(room);
    socket.emit("join room", room);
  }


  return (
    <div className={css.backdrop}>
      <div className={css.modalContainer}>
        <form onSubmit={handleJoinRoom}>
          <label>Room code
            <input
              type="text"
              name="Room code"
              onChange={e => setRoom(e.target.value)}
            />
          </label>

          <button type="submit">Join</button>
        </form>

      </div>

    </div>
  );
}
export default CreateModal;
