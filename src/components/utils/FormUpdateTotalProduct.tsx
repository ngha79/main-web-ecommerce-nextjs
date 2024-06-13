import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import useDebounce from "@/helpers/useDebounce";
import { toast } from "sonner";

interface FormUpdate {
  value: number;
  handleOnChange: (total: number) => void;
  handleConfirmDeleteProductCart?: () => void;
}

const FormUpdateTotalProduct = ({
  value,
  handleOnChange,
  handleConfirmDeleteProductCart,
}: FormUpdate) => {
  const [total, setTotal] = useState<number>(value);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.valueAsNumber > 1000)
      return toast.error("Số lượng đặt hàng không quá 1000 sản phẩm.");
    setTotal(e.target.valueAsNumber);
  };

  const handleDecrement = () => {
    if (total <= 1 && handleConfirmDeleteProductCart) {
      return handleConfirmDeleteProductCart();
    }
    setTotal((total) => total - 1);
  };

  const handleIncrement = () => {
    if (total > 999) return null;
    setTotal((total) => total + 1);
  };

  const debounce = useDebounce(total, 500);

  const resetValue = () => {
    if (!total) setTotal(value);
  };

  useEffect(() => {
    if (value !== debounce && debounce !== null && debounce) {
      handleOnChange(debounce);
    }
  }, [debounce, handleOnChange, value]);
  return (
    <div className="border flex items-center w-40 text-center">
      <Button variant={"ghost"} className="px-2.5" onClick={handleDecrement}>
        <Minus size={16} />
      </Button>
      <Input
        className="border-y-0 rounded-none w-full text-center select"
        type="number"
        value={total}
        onChange={(e) => onChange(e)}
        onBlur={resetValue}
        min={1}
        max={1000}
      />
      <Button variant={"ghost"} className="px-2.5" onClick={handleIncrement}>
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default FormUpdateTotalProduct;
