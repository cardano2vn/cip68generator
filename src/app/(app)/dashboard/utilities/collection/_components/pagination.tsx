import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMetadataContext } from "@/contexts/metadata";

export default function Pagination() {
  const { totalPages, currentPage, setCurrentPage } = useMetadataContext();
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="flex items-center space-x-2 rounded-lg p-1">
      <Button
        variant="ghost"
        size="icon"
        className="hover: h-8 w-8"
        onClick={handlePreviousPage} // Handle previous page
        disabled={currentPage === 1} // Disable if on the first page
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="hover: h-8 w-8"
        onClick={handleNextPage} // Handle next page
        disabled={currentPage === totalPages} // Disable if on the last page
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
