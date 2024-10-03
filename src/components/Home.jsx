import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createPaste, updatePaste } from "../services/operations/pasteAPI"; // Import API functions
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // Manage search params

  const pasteId = searchParams.get("pasteId"); // Get pasteId from search params
  const pastes = useSelector((state) => state.paste.pastes); // Access pastes from Redux store
  console.log("🚀 ~ Home ~ pastes:", pastes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to create or update a paste
  const handlePasteSubmit = async () => {
    if (title.trim() === "") {
      alert("शीर्षक आवश्यक आहे ...!");
      return;
    }
    if (content.trim() === "") {
      alert("खालील परिच्छेदामध्ये काहीतरी लिहा ...!");
      return;
    }
    // Check if a paste with the same title already exists
    const existingPaste = pastes.find((paste) => paste.title === title);

    if (existingPaste) {
      toast.error("A paste with this title already exists!", {
        position: "top-right",
      });
      return;
    }

    try {
      if (pasteId) {
        // Update the paste in the database via API
        await dispatch(updatePaste(pasteId, title, content));
        await navigate("/pastes");
        // toast.success("Paste updated successfully!", { position: "top-right" });
      } else {
        // Create a new paste in the database via API
        await dispatch(createPaste(title, content));
        await navigate("/pastes");
        // toast.success("Paste created successfully!", { position: "top-right" });
      }
    } catch (error) {
      toast.error("An error occurred while saving the paste.");
    }

    setTitle("");
    setContent("");
    setSearchParams({}); // Clear pasteId from the URL
  };

  const resetPaste = () => {
    setTitle("");
    setContent("");
    setSearchParams({});
  };

  // Fetch and load the paste if pasteId exists
  useEffect(() => {
    if (pasteId) {
      const existingPaste = pastes.find((p) => p._id === pasteId);
      if (existingPaste) {
        setTitle(existingPaste.title);
        setContent(existingPaste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full mt-10 h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Enter Title Here ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-white border bg-gray-950 border-gray-500 rounded-md p-2`}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={handlePasteSubmit}
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>

          {pasteId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div className="w-full flex flex-col items-start relative rounded bg-opacity-10 bg-gray-950 border border-gray-500 backdrop-blur-2xl">
          <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 bg-gray-950 py-2 border-b border-gray-500">
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]" />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>

            <div className="w-fit rounded-t flex items-center justify-between gap-x-4 px-4">
              <button
                className="flex justify-center items-center transition-all duration-300 ease-in-out group"
                onClick={() => {
                  navigator.clipboard.writeText(content);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy
                  className="text-green-700 hover:text-green-400 group-hover:text-success-500"
                  size={20}
                />
              </button>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full border border-gray-500 p-3 bg-gray-950 text-white"
            // style={{ caretColor: "#000" }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
