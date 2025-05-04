import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Switch,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersApi } from "../features/slicer/UsersSlicer";
import axios from "axios";
import { baseUrl, getConfig } from "../features/slicer/Slicer";
import { toast } from "react-hot-toast";
import BlockReasonModal from "../component/RejectionReasonModal";
import Loader from "../component/Loader";
import { ApproveUserApi, RejectUserApi } from "../features/slicer/ActionUserSlicer";
import { GetAllBooksApi, DeleteBookApi } from "../features/slicer/BookSlicer";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BookDetailModal } from "../component/BookDetailModal";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Approved",
    value: "Approved",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Rejected",
    value: "Rejected",
  },
];

const TABLE_HEAD = [
  "Book Title",
  "Genre",
  "User Name",
  "Email",
  "Status",
  "Actions",
];

function ApproveRejectModal({ isOpen, onClose, userId }) {
  const dispatch = useDispatch();
  const { getUserBooksList } = useSelector((state) => state.BookSlicer);
  const handleApprove = () => {
    console.log("Approved user with ID:", userId);
    dispatch(ApproveUserApi(userId));
    onClose();
  };

  const handleReject = () => {
    console.log("Rejected user with ID:", userId);
    dispatch(RejectUserApi(userId));
    onClose();
  };

  console.log(getUserBooksList, "getUserBooksList");

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" color="blue-gray">
              Approve or Reject User
            </Typography>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-4 space-y-4">
            <Button onClick={handleApprove} className="w-full bg-primary">
              Approve
            </Button>
            <Button onClick={handleReject} className="w-full" color="red">
              Reject
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

function Books() {
  const dispatch = useDispatch();
 
  const { getUserBooksList ,isLoading } = useSelector((state) => state.BookSlicer);

  const [isApproveRejectModalOpen, setIsApproveRejectModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const savedStatus = localStorage.getItem("tabStatus");
    if (savedStatus) setStatus(savedStatus);
  }, []);

  const handleTabChange = (value) => {
    setStatus(value);
    localStorage.setItem("tabStatus", value);
  };

  useEffect(() => {
    dispatch(GetAllBooksApi({ 
      page: currentPage, 
      limit, 
      status: status === 'all' ? undefined : status,
      query: searchQuery 
    }));
  }, [dispatch, currentPage, limit, status, searchQuery]);

  const { pagination } = useSelector((state) => state.BookSlicer);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    console.log("Current Status:", status);
    console.log("Search Query:", searchQuery);

   
  }, [status, searchQuery]);

  const [userIdToBlock, setUserIdToBlock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetailModal = (book) => {
    setSelectedBook(book);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (bookId) => {
    console.log(bookId)
    dispatch(DeleteBookApi(bookId));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="  h-screen overflow-y-auto flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full h-full mt-10 mb-20 ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Book List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Book
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value={status} onChange={handleTabChange} className="mb-4">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={() => setStatus(value)}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                className="outline-none"
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto h-[500px] px-0">
          <table className="mt-4 w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getUserBooksList?.map((book, i) => {
                const isLast = i === getUserBooksList.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={book._id}>
                    <td className={classes}>{book.title}</td>
                    <td className={classes}>{book.genre}</td>
                    <td className={classes}>{book.user?.firstname}</td>
                    <td className={classes}>{book.user?.email}</td>
                    <td className={classes}>
                      <Chip
                      className="flex items-center justify-center"
                        variant="ghost"
                        size="sm"
                        value={book.status}
                        color={
                          book.status === "Approved"
                            ? "green"
                            : book.status === "Pending"
                            ? "yellow"
                            : "red"
                        }
                      />
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        <IconButton
                          variant="text"
                          color="blue"
                          onClick={() => handleOpenDetailModal(book)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          variant="text"
                          color="red"
                          onClick={() => {setIsDeleteModalOpen(true)
                            handleOpenDetailModal(book)
                          }}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {pagination.currentPage} of {pagination.totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>

        <BookDetailModal
          open={isDetailModalOpen}
          handleOpen={() => setIsDetailModalOpen(false)}
          book={selectedBook}
        />

        <Dialog
          open={isDeleteModalOpen}
          handler={() => setIsDeleteModalOpen(false)}
          size="xs"
        >
          <DialogHeader>Confirm Delete</DialogHeader>
          <DialogBody>Are you sure you want to delete this book?</DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => handleDelete(selectedBook?._id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </Dialog>
      </Card>

      <BlockReasonModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userId={userIdToBlock}
      />
      <ApproveRejectModal
        isOpen={isApproveRejectModalOpen}
        onClose={() => setIsApproveRejectModalOpen(false)}
        userId={selectedUserId}
      />

      {isLoading && <Loader />}
      {loading && <Loader />}
    </div>
  );
}

export default Books;
