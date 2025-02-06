import React from 'react';

const WhatsAppButton = ({ phoneNumber = "9689941705", message = "Well Come to AgriConnect!" }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg z-50 flex items-center justify-center" // Fixed positioning, styling, z-index
      style={{ transform: 'translateY(-50%)' }} // Vertically center
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2048px-WhatsApp.svg.png" // WhatsApp icon
        alt="WhatsApp"
        className="w-8 h-8"
      />
      {/* Optional: Add text next to the icon */}
      <span className="ml-2 hidden md:inline">WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;