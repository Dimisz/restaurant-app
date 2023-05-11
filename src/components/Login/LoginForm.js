import { useState } from "react";

import Modal from "../UI/Modal/Modal";
import Login from "./Login";

export default function LoginForm(){
  const [showLoginForm, setShowLoginForm] = useState('');

  return(
    <Modal>
      <Login />
    </Modal>
  );
}