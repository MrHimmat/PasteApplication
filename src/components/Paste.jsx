import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FormatDate } from "../utlis/formatDate";
import { deletePaste, fetchPastes } from "../services/operations/pasteAPI";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedPasteId, setSelectedPasteId] = useState(null); // Track paste to delete

  const handleDeleteClick = (pasteId) => {
    setSelectedPasteId(pasteId); // Set the paste to be deleted
    setShowModal(true); // Open the modal
  };

  const handleConfirmDelete = () => {
    dispatch(deletePaste(selectedPasteId)); // Dispatch the delete action
    setShowModal(false); // Close the modal
    // toast.success("Paste deleted successfully!");
  };

  useEffect(() => {
    dispatch(fetchPastes());
  }, [dispatch]);

  const handleEdit = (pasteId) => {
    navigate(`/?pasteId=${pasteId}`);
  };

  const filteredPastes = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full mt-5 py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex p-1 gap-3 rounded-lg border border-[rgb(198,188,188)]  mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none p-1 w-full bg-gray-950 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border bg-gray-950 border-[rgb(255,255,255)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-white text-5xl font-bold border-b border-[rgb(255,255,255)] pb-4">
            All Pastes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-[rgb(255,255,255)] w-full gap-y-6 justify-between bg-gray-900 flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                >
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-4xl font-bold font-inter text-[#debf52] ">
                      {paste?.title}
                    </p>
                    <p className="text-sm font-normal line-clamp-9 max-w-[80%] text-[#ffffff]">
                      {paste?.content}
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500"
                        onClick={() => handleEdit(paste?._id)}
                      >
                        <PencilLine
                          className="text-black group-hover:text-blue-500 transition-all duration-300"
                          size={20}
                        />
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDeleteClick(paste?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500 transition-all duration-300"
                          size={20}
                        />
                      </button>
                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500">
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye
                            className="text-black group-hover:text-orange-500 transition-all duration-300"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500 transition-all duration-300"
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="gap-x-2 flex text-[#c0b7b7]">
                      <Calendar className="text-[#a99f9f]" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showModal && (
        <DeleteModal
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Paste;
