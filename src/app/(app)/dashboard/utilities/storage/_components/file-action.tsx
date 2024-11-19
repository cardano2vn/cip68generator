import { Button } from "@/components/ui/button";
import { useUploadContext } from "@/contexts/storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FileAction() {
  const { listMedia, listSelected, setListSelected, deleteMediaSelected } =
    useUploadContext();
  return (
    <>
      {listSelected.length > 0 && (
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {listSelected.length != listMedia.length ? (
            <Button
              onClick={() => setListSelected(listMedia)}
              variant="secondary"
              className="rounded-r-none w-24"
            >
              Select All
            </Button>
          ) : (
            <Button
              onClick={() => setListSelected([])}
              variant="secondary"
              className="rounded-r-none w-24 "
            >
              Unselect All
            </Button>
          )}
          {/* <Button
            variant="secondary"
            className="rounded-none border-x border-gray-600"
          >
            Format
          </Button>
          <Button
            variant="secondary"
            className="rounded-none border-r border-gray-600"
          >
            Download
          </Button> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="rounded-l-none border-l border-gray-600"
                variant="secondary"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your media and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteMediaSelected}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* <Button
            variant="secondary"
            className="rounded-l-none border-l border-gray-600"
          >
            Delete
          </Button> */}
        </div>
      )}
    </>
  );
}
