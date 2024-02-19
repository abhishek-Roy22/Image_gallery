import React from 'react';
import { useAuth } from '../hook/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseCofig';

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    signOut(auth);
    logout();
  };

  return (
    <div className="navbar bg-base-100 justify-between">
      <a className="font-bold normal-case underline text-xl">GalleryPro📸</a>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
