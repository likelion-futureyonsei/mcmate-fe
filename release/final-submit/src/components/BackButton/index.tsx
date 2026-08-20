import type {ReactNode} from "react";
import {useNavigate} from "react-router-dom";

type BackButtonProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
};

export function BackButton({children, className, id, onClick}: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button id={id} className={className} type="button" aria-label="뒤로가기" onClick={onClick ?? (() => navigate(-1))}>
      {children}
    </button>
  );
}
