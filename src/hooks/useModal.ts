import { useState } from "react";

type ModalState<T extends string> = Record<T, boolean>;

export function useModal<T extends string>(initialModals: ModalState<T>) {
  const [modal, setModal] = useState<ModalState<T>>(initialModals);

  const openModal = (modalName: T) => {
    setModal((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: T) => {
    setModal((prev) => ({ ...prev, [modalName]: false }));
  };

  return { modal, openModal, closeModal };
}
