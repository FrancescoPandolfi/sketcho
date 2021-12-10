import {FC} from "react";
import css from "./Modal.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setCreateModalState} from "../../redux/canvasSlice";
import PillButton from "../Header/PillButton/PillButton";

const CreateModal: FC = () => {
  const canvasState = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();


  const handleCreateRoom = () => {
    dispatch(setCreateModalState(!canvasState.createModalState));
  }

  return (
    <div className={css.backdrop}>
      <div className={css.modalContainer}>
        <p>{window.location.href}</p>
        <p>Send this link to your buddy and start to draw together</p>
        <PillButton background={true} text="🤙" onClicked={handleCreateRoom}/>
      </div>
    </div>
  );
}
export default CreateModal;
