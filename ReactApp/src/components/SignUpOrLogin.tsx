import React, { FC, useState } from 'react';
import {
  Button, Label, TextInput,
} from 'flowbite-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import UserSchema from '../types/user';

interface Props {
  onSubmit: React.Dispatch<React.SetStateAction<boolean>>,
  registered: boolean,
  onClose: () => void
}
const SignUpOrLogin: FC<Props> = ({ onSubmit, registered, onClose }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleRegister = async () => {
    if (email && password) {
      const postData: UserSchema = {
        email, password,
      };
      const response = await axios.post(`${import.meta.env.VITE_HOST}/signup`, postData, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Credential': true,
        },
      });
      if (response.status !== 201) {
        toast.error('Could not register user');
      } else {
        toast.success('User registered!');
      }
      onSubmit(true);
    } else {
      toast.error('Register form is not filled');
    }
  };

  const handleLogin = async () => {
    if (email && password) {
      const postData: UserSchema = {
        email, password,
      };
      const response = await axios.post(`${import.meta.env.VITE_HOST}/login`, postData, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Credential': true,
        },
      });
      if (response.status !== 200) {
        toast.error('Could not login user');
        return;
      }
      const emailResponse = response.data.data.email;
      localStorage.setItem('user', emailResponse);
      localStorage.setItem('token', response.data.token);
      document.location.reload();
      onClose();
    } else {
      toast.error('Register form is not filled');
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email1"
            value="Your email"
          />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@name.com"
          value={email}
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password1"
            value="Your password"
          />
        </div>
        <TextInput
          id="password1"
          type="password"
          value={password}
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
          required
        />
      </div>
      <Button onClick={registered ? handleLogin : handleRegister}>
        Submit
      </Button>
    </form>
  );
};

export default SignUpOrLogin;
