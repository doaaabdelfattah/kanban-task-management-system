'use client';

import { useModal } from '@/app/_context/ModalContext';

import ModalWrapper from './ModalWrapper';
import AddBoardForm from '../boards/AddBoardForm';
import ViewTaskModal from '../tasks/ViewTaskModal';
import AddTaskForm from '../tasks/AddTaskForm';
import DeleteModal from '../boards/DeleteModal';


function ModalManager() {
  const { modal, closeModal } = useModal();

  if (!modal.isOpen) return null;

  let ModalComponent = null;

  switch (modal.type) {
    case 'add-board':
      ModalComponent = <AddBoardForm {...modal.props} onClose={closeModal} />;
      break;

    case 'delete-modal':
      ModalComponent = <DeleteModal {...modal.props} onClose={closeModal} />;
      break;

    case 'add-task':
      ModalComponent = <AddTaskForm {...modal.props} onClose={closeModal} />;
      break;
    // case 'edit-task':
    //   ModalComponent = <EditTaskModal {...modal.props} onClose={closeModal} />;
    //   break;
    case 'view-task':
      ModalComponent = <ViewTaskModal {...modal.props} onClose={closeModal} />;
      break;

    default:
      return null;
  }

  return (
    <ModalWrapper>
      {ModalComponent}
    </ModalWrapper>

  );
}

export default ModalManager;
