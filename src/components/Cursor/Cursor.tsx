import {FC, useEffect, useRef} from "react";
import css from "./Cursor.module.scss";



const Cursor: FC = () => {
  const circle = useRef<HTMLSpanElement>(null)

useEffect(() => {
  window.addEventListener('mousemove', mouseMoveHandler);
  window.addEventListener('mousedown', mouseDownHandler);
  window.addEventListener('mouseup', mouseUpHandler);
}, [])


  function mouseMoveHandler(e: MouseEvent) {
    if(circle.current) {
      circle.current.style.left = e.clientX - circle.current.offsetWidth / 2 + "px";
      circle.current.style.top = e.clientY - circle.current.offsetHeight / 2 + "px";
      circle.current.style.opacity = "1";
    }

  }

  function mouseUpHandler(e: MouseEvent) {
    if(circle.current) {
      circle.current.style.transform = "scale(1)";
    }
  }

  function mouseDownHandler() {
    if(circle.current) {
      circle.current.style.transform = "scale(1.5)";
    }
  }
  return <span className={css.circle} ref={circle}></span>
};

export default Cursor;

