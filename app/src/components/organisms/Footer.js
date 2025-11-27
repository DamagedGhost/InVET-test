import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-center p-4 mt-auto border-top shadow-sm">
      <div className="container">
        <p className="mb-0 text-muted fw-medium">
            &copy; {new Date().getFullYear()} <strong>InVET</strong>. 
            Cuidando a quienes más amas.
        </p>
      </div>
    </footer>
  );
};

export default Footer;