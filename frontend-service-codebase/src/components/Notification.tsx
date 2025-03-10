import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}   // Start off-screen
        animate={{ x: 0, opacity: 1 }}    // Slide in
        exit={{ x: 100, opacity: 0 }}     // Slide out
        transition={{ duration: 0.5 }}    // Smooth animation
        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
      >
        {message}
        <button onClick={onClose} className="ml-2 text-lg font-bold">×</button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;
