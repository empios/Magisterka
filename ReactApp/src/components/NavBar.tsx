import React, { FC, useState } from 'react';
import { Button, Navbar } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pathnames from '../consts/pathnames';
import LoginSignupModal from './LoginSignupModal';

interface Props {
  userToken: string | null
}
const NavBar: FC<Props> = ({ userToken }) => {
  const location = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const email = localStorage.getItem('user');
  const checkLocation = (locationString: string, pathname: string) => locationString === pathname;
  const logout = async () => {
    const response = await axios.post(`${import.meta.env.VITE_HOST}/logout`, { email }, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credential': true,
      },
    });
    if (response.status !== 200) {
      toast.error('Could not logout');
      return;
    }
    setRegistered(false);
    localStorage.removeItem('token');
    document.location.reload();
  };
  return (
    <>
      <Navbar
        fluid
        className="bg-gray-600"
      >
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white dark:text-white">
            MasterApp
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {userToken ? (
            <>
              <p className="m-auto text-white">{email}</p>
              <Button onClick={() => logout()} className="ml-2">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowModal(true)} className="mr-2">
              {registered ? 'Log in' : 'Sign In' }
            </Button>
          ) }
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            className="text-blue-50"
            href="/"
            active={checkLocation(location.pathname, Pathnames.HOME)}
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            className="text-blue-50"
            href="/second"
            active={checkLocation(location.pathname, Pathnames.SECOND)}
          >
            Panel
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <LoginSignupModal
        onClose={() => setShowModal(false)}
        show={showModal}
        registered={registered}
        onRegister={setRegistered}
      />
    </>
  );
};
export default NavBar;
