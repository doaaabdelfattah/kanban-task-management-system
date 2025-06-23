'use client'

import { useState, useContext, createContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {

  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    props: null //any optional data
  });


  const openModal = (type, props = {}) => {
    setModal(prev => {
      // If same modal is open, force re-open
      if (prev.isOpen) {
        return { isOpen: false, type: null, props: {} };
      }
      return { isOpen: true, type, props };
    });

    // Delay to ensure React unmounts the current modal
    setTimeout(() => {
      setModal({ isOpen: true, type, props });
    }, 0);
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
