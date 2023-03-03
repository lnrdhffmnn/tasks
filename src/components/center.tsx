import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Center({ children }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
}
