import {FC} from "react";
import css from "./Modal.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setModalState} from "../../redux/canvasSlice";

const Modal: FC = () => {
  const canvasState = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();

  return (
    <div className={css.backdrop}>
      <div className={css.modalContainer}>
        <button onClick={() => dispatch(setModalState(!canvasState.modalState))}>Chiudi</button>
      </div>

    </div>
  );
}
export default Modal;
