import React from "react";

const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4"> Delete Karayach Ahe Ka ?</h2>
        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Ho Karayach Ahe
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onCancel}
          >
            Nahi Karayach
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
