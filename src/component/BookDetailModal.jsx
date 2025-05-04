import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Carousel,
  Button,
} from "@material-tailwind/react";
import { baseUrl } from "../features/slicer/Slicer";
import { useDispatch } from "react-redux";
import { UpdateBookApi } from "../features/slicer/BookSlicer";

export function BookDetailModal({ open, handleOpen, book }) {
  const dispatch = useDispatch();

  const handleBookStatus = (status) => {
console.log({ bookId: book?._id, status },'status')
    dispatch(UpdateBookApi({ bookId: book?._id, status }));
    handleOpen();
  };

  return (
    <Dialog open={open} handler={handleOpen} size="xl">
      <DialogHeader className="flex items-center justify-between">
        <Typography variant="h6">Book Details</Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
            x
          {/* <XMarkIcon strokeWidth={2} className="h-5 w-5" /> */}
        </IconButton>
      </DialogHeader>
      <DialogBody divider className="h-[40rem] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full h-96">
            <Carousel
              className="rounded-xl"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              {book?.images?.map((image, index) => (
                <img
                  key={index}
                  src={`${baseUrl+image}`}
                  alt={`book-${index}`}
                  className="h-full w-full object-cover"
                />
              ))}
            </Carousel>
          </div>
          <div className="space-y-4">
            <Typography variant="h4">{book?.title}</Typography>
            <Typography variant="paragraph">
              <span className="font-bold">Author:</span> {book?.author}
            </Typography>
            <Typography variant="paragraph">
              <span className="font-bold">Genre:</span> {book?.genre}
            </Typography>
            <Typography variant="paragraph">
              <span className="font-bold">Condition:</span> {book?.condition}
            </Typography>
            <Typography variant="paragraph">
              <span className="font-bold">Price:</span> ${book?.price}
            </Typography>
            <Typography variant="paragraph">
              <span className="font-bold">Year:</span> {book?.year}
            </Typography>
            <Typography variant="paragraph">
              <span className="font-bold">Description:</span>{" "}
              {book?.description}
            </Typography>
            <div className="mt-4">
              <Typography variant="h6">Seller Information</Typography>
              <Typography variant="paragraph">
                Name: {book?.user?.firstname} {book?.user?.lastname}
              </Typography>
              <Typography variant="paragraph">
                Email: {book?.user?.email}
              </Typography>
              <Typography variant="paragraph">
                Phone: {book?.user?.phoneno}
              </Typography>
            </div>
            
            {/* Add the buttons */}
            <div className="mt-6 flex gap-4">
              <Button
                color="green"
                onClick={() => handleBookStatus("Approved")}
                disabled={book?.status === "Approved"}
              >
                Approve Ad
              </Button>
              <Button
                color="red"
                onClick={() => handleBookStatus("Rejected")}
                disabled={book?.status === "Rejected"}
              >
                Reject Ad
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
