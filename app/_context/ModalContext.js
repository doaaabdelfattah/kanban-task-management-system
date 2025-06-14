'use client'

import { useState, useContext, createContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {

  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    props: null //any optional data
  });


  const openModal = (type, props = null) => {
    setModal({ isOpen: true, type, props });
  };

  //hide modal and reset data
  const closeModal = () => {
    setModal({ isOpen: false, type: null, props: null });
  };


  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext);
