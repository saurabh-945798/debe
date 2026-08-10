import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({
  children,
}: ModalProps) {
  return (
    <div>
      {children}
    </div>
  );
}