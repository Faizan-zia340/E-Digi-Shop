import {
  Button,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-gray-100 bg-purple-600 border border-transparent hover:border-purple-500 hover:text-purple-700 hover:bg-purple-100 rounded-xl"
      >
        Buy now
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        className="backdrop-blur-md bg-transparent flex items-center justify-center"
      >
        <DialogBody className="bg-purple-50 max-w-lg w-full mx-auto rounded-xl shadow-lg p-6">
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="bg-purple-50 border border-purple-200 px-3 py-2 w-full rounded-md outline-none text-purple-600 placeholder-purple-300"
            />
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              className="bg-purple-50 border border-purple-200 px-3 py-2 w-full rounded-md outline-none text-purple-600 placeholder-purple-300"
            />
            <input
              type="number"
              name="pincode"
              placeholder="Enter your pincode"
              className="bg-purple-50 border border-purple-200 px-3 py-2 w-full rounded-md outline-none text-purple-600 placeholder-purple-300"
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              className="bg-purple-50 border border-purple-200 px-3 py-2 w-full rounded-md outline-none text-purple-600 placeholder-purple-300"
            />

            <Button
              type="submit"
              onClick={handleOpen}
              className="w-full px-4 py-3 text-center text-white bg-violet-500 hover:bg-purple-600 rounded-lg"
            >
              Buy now
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
