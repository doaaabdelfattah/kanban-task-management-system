'use client';

import { useModal } from '@/app/_context/ModalContext';
// import AddBoardModal from './AddBoardModal';
// import EditBoardModal from './EditBoardModal';
// import AddTaskModal from './AddTaskModal';
// import EditTaskModal from './EditTaskModal';
// import ViewTaskModal from './ViewTaskModal';
// import AddBoard from '../boards/AddBoard';
import ModalWrapper from './ModalWrapper';
import AddBoardForm from './AddBoardForm';
import ViewTaskModal from '../tasks/ViewTaskModal';

function ModalManager() {
  const { modal, closeModal } = useModal();

  if (!modal.isOpen) return null;

  let ModalComponent = null;

  switch (modal.type) {
    case 'add-board':
      ModalComponent = <AddBoardForm {...modal.props} onClose={closeModal} />;
      break;
    // case 'edit-board':
    //   ModalComponent = <EditBoardModal {...modal.props} onClose={closeModal} />;
    //   break;
    // case 'add-task':
    //   ModalComponent = <AddTaskModal {...modal.props} onClose={closeModal} />;
    //   break;
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
