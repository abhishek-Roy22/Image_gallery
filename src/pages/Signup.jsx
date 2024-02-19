import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseCofig';
import { useAuth } from '../hook/useAuth';
import React, { useState } from 'react';

const Signup = () => {
  const [signUpOrSignIn, setSignUpOrSignIn] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signUpOrSignIn === 'signup') {
      try {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        login(cred.user);
        setEmail('');
        setPassword('');
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          setError('Email is already in use');
        } else if (err === 'auth/invalid-credential') {
          setError('invalid-credential');
        } else {
          setError('Try after sometime!');
        }

        setEmail('');
        setPassword('');
      }
    } else {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        login(cred.user);
        setEmail('');
        setPassword('');
      } catch (err) {
        setError(err.message);
        setEmail('');
        setPassword('');
      }
    }
  };

  setTimeout(() => {
    setError(null);
  }, 3000);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Image Pro</h1>
          <p className="py-6 capitalize">
            {signUpOrSignIn} to share your photos to the world!
          </p>
        </div>
        <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className={`input input-bordered focus:invalid:ring-1 ring-red-600`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className={`input input-bordered ${
                  error && 'ring-1 ring-red-500'
                }`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-center text-rose-500">{error}</div>}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
            {signUpOrSignIn === 'signup' ? (
              <p className="text-center">
                Already have an account?{' '}
                <span
                  className="underline text-sky-500 cursor-pointer"
                  onClick={() => setSignUpOrSignIn('signin')}
                >
                  Sign In
                </span>
              </p>
            ) : (
              <p className="text-center">
                Don't have an account?{' '}
                <span
                  className="underline text-sky-500 cursor-pointer"
                  onClick={() => setSignUpOrSignIn('signup')}
                >
                  Sign Up
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
