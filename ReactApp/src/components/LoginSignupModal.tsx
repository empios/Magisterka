import { Modal } from 'flowbite-react';
import React, { FC } from 'react';
import SignUpOrLogin from './SignUpOrLogin';

interface Props {
  onClose: () => void;
  show: boolean;
  onRegister: React.Dispatch<React.SetStateAction<boolean>>;
  registered: boolean;
}
const LoginSignupModal: FC<Props> = ({
  onClose, show, registered, onRegister,
}) => (
  <Modal
    show={show}
    onClose={onClose}
  >
    <Modal.Header>
      <p className="mb-2">{registered ? 'Log In' : 'Sign up'}</p>
      {registered
        ? <button className="text-xs" onClick={() => onRegister(false)}>Choose to Sign Up</button>
        : <button className="text-xs" onClick={() => onRegister(true)}>Choose to Log In</button>}
    </Modal.Header>
    <Modal.Body>
      <SignUpOrLogin onSubmit={onRegister} registered={registered} onClose={onClose} />
    </Modal.Body>
  </Modal>
);

export default LoginSignupModal;
