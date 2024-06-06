import React, { useState } from 'react';

const ForgotPasswordModal = ({ openModal, setOpenModal }) => {
  const [email, setEmail] = useState('');

  const handleSendResetLink = () => {
    console.log(email); // Log the email to the console
    // Add your code here to handle the password reset logic
    setOpenModal(false);
  };

  return (
    <div className="mx-auto w-fit">
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center bg-[black] justify-center ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div onClick={(e_) => e_.stopPropagation()} className={`bg-[white] !z-[9000] absolute max-w-md rounded-lg p-6 drop-shadow-lg ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
          <h1 className="mb-2 text-2xl font-semibold">Forgot Password?</h1>
          <p className="mb-5 text-sm opacity-80">Enter your email address below and we'll send you instructions on how to reset your password.</p>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="mb-4 w-full rounded-md border border-gray-300 p-2"
          />
          <div className="flex justify-between">
            <button type='button' onClick={handleSendResetLink} className="me-2 rounded-md bg-[blue] px-6 py-[6px] text-[white]">
              Send Reset Link
            </button>
            <button onClick={() => setOpenModal(false)} className="rounded-md border border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
