import { motion } from 'framer-motion';
import React from 'react';

const Timeout = ({ timeLeft }) => {

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-white shadow-lg max-w-md mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Email Sent!</h2>


        <p className="text-gray-600 mb-4">
          We've sent a verification link to <span className="font-semibold"></span>
        </p>


        <p className="text-gray-600 mb-6">
          Please check your inbox and click the link to verify your account.
        </p>

        <div className="relative mt-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Link expires in</span>
          </div>
        </div>

        <motion.div
          className="mt-4 text-3xl font-bold text-blue-600"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {formatTime(timeLeft)}
        </motion.div>

        <motion.div
          className="w-full bg-gray-200 rounded-full h-2 mt-4"
          initial={{ width: "100%" }}
        >
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 300) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <p className="mt-6 text-sm text-gray-500">
          Didn't receive the email? <button className="text-blue-600 hover:underline font-medium">Resend</button>
        </p>
      </motion.div>
    </div>
  );
};

export default Timeout;