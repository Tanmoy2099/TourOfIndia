
import Modal from './Modal';

const MessageModal = props => {

  // variables: header, message, onClear
  return (
    <Modal
      onCancel={props.onClear}
      header={props.header}
      show={!!props.message}
      footer={<button className='w-100 fs-4 btn btn-outline-success' onClick={props.onClear}>Okay</button>}
      className='d-flex flex-column '>
      <p >{props.message}</p>
    </Modal>
  );
};

export default MessageModal;
