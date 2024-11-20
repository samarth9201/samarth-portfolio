import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-black h-8">
      <footer className="text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Samarth Bhadane. All rights reserved.
      </footer>
    </div>
  );
};

export default Footer;
