import { ProductSearch } from "@/lib/interface";
import Image from "next/image";
import Link from "next/link";

const SearchResult = ({
  searchResults,
}: {
  searchResults: ProductSearch[];
}) => {
  return (
    <div className="absolute top-full hidden z-10 search-result group-active:flex flex-col left-0 w-full min-w-64 bg-background rounded-md shadow-login overflow-hidden">
      {searchResults?.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="flex items-center gap-2 p-2 hover:bg-gray-200"
        >
          <Image
            alt="thumb"
            src={"/login.png"}
            width={30}
            height={30}
            className="border"
          />
          <span>{product?.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;
