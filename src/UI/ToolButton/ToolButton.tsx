import React, {FC, ReactElement} from "react";
import css from "./Toolbutton.module.scss"
import cn from "classnames";

export interface props {
  clickAction: () => void;
  icon: ReactElement;
  disabled?: boolean;
  selectable?: boolean
}

const ToolButton: FC<props> = ({clickAction, icon, disabled = false, selectable = false}: props) => {
  return (
    <button
      disabled={disabled}
      className={cn(css.btn, css.btnColor)}
      onClick={clickAction}>{icon}
    </button>
  );
};

export default ToolButton;


// classNames('foo', 'bar'); // => 'foo bar'
// classNames('foo', { bar: true }); // => 'foo bar'
// classNames({ 'foo-bar': true }); // => 'foo-bar'
// classNames({ 'foo-bar': false }); // => ''
// classNames({ foo: true }, { bar: true }); // => 'foo bar'
// classNames({ foo: true, bar: true }); // => 'foo bar'
