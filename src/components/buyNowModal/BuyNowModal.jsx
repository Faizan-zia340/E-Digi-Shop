import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleBuy = () => {
    const { name, address, pincode, mobileNumber } = addressInfo;
    if (!name || !address || !pincode || !mobileNumber) {
      toast.error("Please fill all the fields");
      return;
    }
    handleOpen();
    buyNowFunction();
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-white bg-gradient-to-r from-violet-600 to-pink-500 rounded-xl hover:opacity-90 transition-all duration-300"
      >
        Buy Now
      </Button>

      {/* Modal */}
      <Dialog open={open} handler={handleOpen} className="bg-purple-50 rounded-2xl">
        <DialogBody className="p-6">
          <h2 className="text-2xl font-bold text-violet-700 mb-4 text-center">
            Shipping Details
          </h2>

          {/* Inputs */}
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={addressInfo.name}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, name: e.target.value })
              }
              placeholder="Enter your name"
              className="bg-purple-50 border border-purple-200 px-3 py-2 w-full rounded-md outline-none text-purple-700 placeholder-purple-400 focus:ring-2 focus:ring-violet-400"
            />

            <input
              type="text"
              name="address"
              value={addressInfo.address}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, address: e.target.value })
              }
              placeholder="Enter your address"
              className="bg-purple-50 border border-purple-200 px-3 py-2 w-full rounded-md outline-none text-purple-700 placeholder-purple-400 focus:ring-2 focus:ring-violet-400"
            />

            <input
              type="number"
              name="pincode"
              value={addressInfo.pincode}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, pincode: e.target.value })
              }
              placeholder="Enter your pincode"
              className="bg-purple-50 border border-purple-200 px-3 py-2 w-full rounded-md outline-none text-purple-700 placeholder-purple-400 focus:ring-2 focus:ring-violet-400"
            />

            <input
              type="text"
              name="mobileNumber"
              value={addressInfo.mobileNumber}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, mobileNumber: e.target.value })
              }
              placeholder="Enter your mobile number"
              className="bg-purple-50 border border-purple-200 px-3 py-2 w-full rounded-md outline-none text-purple-700 placeholder-purple-400 focus:ring-2 focus:ring-violet-400"
            />
          </div>

          {/* Confirm Button */}
          <div className="mt-5">
            <Button
              type="button"
              onClick={handleBuy}
              className="w-full px-4 py-3 text-white bg-gradient-to-r from-violet-600 to-pink-500 rounded-lg hover:opacity-90 transition-all duration-300"
            >
              Confirm Purchase
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
