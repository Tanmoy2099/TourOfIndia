
import Modal from './Modal';

const ErrorModal = props => {

  
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<button className='w-100 fs-4 btn btn-outline-success' onClick={props.onClear}>Okay</button>}
      className='d-flex flex-column '>
      <p >{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
