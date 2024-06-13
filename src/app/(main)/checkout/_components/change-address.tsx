import { useState } from "react";

import Address from "./address";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IAddressUser } from "../../user/account/address/UpdateAddress";
import { CreateNewAddress } from "../../user/account/address/CreateNewAddress";

const ChangeAddress = ({
  addressList,
  handleChangeAddress,
  addNewAddress,
  updateAddress,
}: {
  addressList: IAddressUser[];
  handleChangeAddress: (address: IAddressUser) => void;
  addNewAddress: (address: IAddressUser) => void;
  updateAddress: (address: IAddressUser) => void;
}) => {
  const [addressChoose, setAddressChoose] = useState<IAddressUser>(
    addressList.find((address) => address.isAddressDefault) || addressList?.[0]
  );

  const handleUpdateAddressChange = () => {
    handleChangeAddress(addressChoose);
  };

  const handleChange = (address: IAddressUser) => {
    setAddressChoose(address);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="w-max text-blue-500 hover:text-blue-600"
        >
          Thay đổi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Địa Chỉ Của Tôi</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
          {addressList?.map((address) => (
            <Address
              key={address?.id}
              address={address}
              handleChange={handleChange}
              addressChoose={addressChoose}
              updateAddress={updateAddress}
            />
          ))}
          <CreateNewAddress addNewAddress={addNewAddress} />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Hủy</Button>
          </DialogClose>
          <DialogClose>
            <Button
              type="submit"
              variant={"destructive"}
              onClick={handleUpdateAddressChange}
            >
              Xác nhận
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAddress;
