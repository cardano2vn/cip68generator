import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import ImagePicker from "../../_components/image-picker";
import { useUploadContext } from "@/contexts/storage";

export function UploadOneDialog() {
  const { uploadOneDialogOpen, setUploadOneDialogOpen } = useUploadContext();
  return (
    <Dialog open={uploadOneDialogOpen} onOpenChange={setUploadOneDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        {/* <ImagePicker setFiles={setListFileToUpload} /> */}
      </DialogContent>
    </Dialog>
  );
}
