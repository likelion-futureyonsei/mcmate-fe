import type {ReactNode} from "react";
import {useNavigate} from "react-router-dom";

type BackButtonProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function BackButton({children, className, id}: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button id={id} className={className} type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
      {children}
    </button>
  );
}
