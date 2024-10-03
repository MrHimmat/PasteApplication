import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPastes } from "../services/operations/pasteAPI"; // Adjust the import based on your folder structure

const ViewPaste = () => {
  const { id } = useParams(); // Destructure the id from params
  console.log("ViewPaste ID:", id);

  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes || []); // Safely access pastes array
  console.log("🚀 ~ ViewPaste ~ pastes:", pastes);

  // Fetch all pastes when the component mounts
  useEffect(() => {
    dispatch(fetchPastes()); // Fetch pastes on component mount
  }, [dispatch]);

  // Find paste based on the id from the URL
  const paste = pastes.find((paste) => paste._id === id); // Ensure correct type comparison
  console.log("Selected Paste->", paste);

  return (
    <div className="w-full h-full py-10 mt-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={paste?.title || ""}
          disabled
          className="w-full text-gray-600 bg-gray-950 border border-gray-500 rounded-md p-2"
        />
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border bg-gray-950 border-gray-500 backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b bg-gray-950 border-gray-500`}
          >
            <div className="w-full bg-gray-950 flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            {/* Copy Button */}
            <div
              className={`w-fit rounded-t  flex items-center justify-between gap-x-4 px-4`}
            >
              <button
                className={`flex justify-center items-center transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  if (paste?.content) {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to Clipboard");
                  } else {
                    toast.error("Nothing to copy!");
                  }
                }}
              >
                <Copy
                  className="group-hover:text-success-500 text-green-700 hover:text-green-400"
                  size={20}
                />
              </button>
            </div>
          </div>
          {/* TextArea */}
          <textarea
            value={paste?.content || ""}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full p-3 bg-gray-950 text-gray-600 focus-visible:ring-0"
            style={{ caretColor: "#000" }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
