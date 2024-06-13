"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { SetStateAction, Suspense, useEffect, useState } from "react";
import useDebounce from "@/helpers/useDebounce";
import { ProductSearch } from "@/lib/interface";
import SearchResult from "./SearchResult";
import { Button } from "../ui/button";
import productApiRequest from "@/apiRequests/product";
import { toast } from "sonner";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [searchResults, setSearchResults] = useState<ProductSearch[]>([]);
  const router = useRouter();

  const handleSearchChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm) router.replace(`/search?search=${searchTerm}`);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const handleKeyPress = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "Enter") {
      router.replace(`/search?search=${searchTerm}`);
    }
  };

  useEffect(() => {
    const getProductSearch = async () => {
      try {
        const response = await productApiRequest.handleSearchProduct({
          limit: 10,
          page: 1,
          search: debouncedSearchTerm,
        });
        setSearchResults(response.payload.data);
      } catch (error) {
        toast.error((error as any).payload.message);
      }
    };
    if (debouncedSearchTerm) {
      getProductSearch();
      if (pathname === "/search") {
        router.replace(`/search?search=${debouncedSearchTerm}`);
      }
    }
  }, [debouncedSearchTerm, router, pathname]);

  return (
    <div className="flex-1 bg-white rounded-md group flex items-center gap-2 p-1 relative z-10">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-white p-2 rounded-md text-sm search"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <Button
        className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
        onClick={handleSearchSubmit}
      >
        <Search />
      </Button>
      {debouncedSearchTerm && <SearchResult searchResults={searchResults} />}
    </div>
  );
};

export default SearchBar;
