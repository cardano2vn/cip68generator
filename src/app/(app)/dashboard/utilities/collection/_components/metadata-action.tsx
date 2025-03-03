"use client";
import JsonBuilder from "@/components/common/json-builder";
import { useJsonBuilderStore } from "@/components/common/json-builder/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { routes } from "@/constants/routes";
import { useMetadataContext } from "@/contexts/metadata";
import { toast } from "@/hooks/use-toast";
import { updateMetadata } from "@/services/database/metadata";
import { PMetadata } from "@/types";
import { parseError } from "@/utils/error/parse-error";
import { isEmpty, isNil } from "lodash";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MetadataAction({ metadata }: { metadata: PMetadata }) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const { refetch } = useMetadataContext();
  const { init, getJsonResult, setErrors, error } = useJsonBuilderStore();

  const handleOpen = async () => {
    init(metadata.content);
    setOpenDialog(true);
  };

  const handleUpdate = async () => {
    try {
      const json = getJsonResult();

      if (isEmpty(json) || isNil(json) || Object.values(json).some((value) => isEmpty(value))) {
        setErrors("Please fill all fields");
        return;
      }

      const newMetadata = { ...metadata, content: getJsonResult() };
      const { result, message } = await updateMetadata({
        collectionId: metadata.collectionId,
        metadata: newMetadata,
      });
      if (!result) {
        throw new Error(message);
      }
      toast({ title: "Your metadata has been edited successfully!", description: message });
    } catch (e) {
      toast({
        title: "Failed to update metadata",
        description: parseError(e),
        variant: "destructive",
      });
    } finally {
      refetch();
      setOpenDialog(false);
    }
  };
  return (
    <>
      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <DialogContent className="max-w-full sm:max-w-[80vw] w-screen h-screen sm:h-[80vh] p-0 flex flex-col">
          <div className="flex-grow flex flex-col overflow-hidden">
            <div className="rounded-xl bg-section shadow-md flex flex-col gap-3 h-full overflow-auto">
              <JsonBuilder className="h-full w-full" />
            </div>
          </div>
          <DialogFooter className="p-4">
            <Button onClick={handleUpdate} disabled={!isEmpty(error)}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" hover:bg-white/10">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuItem onClick={() => router.push(routes.mint.children.mintOne.redirect + "?template=" + metadata.id)}>
            <span>Mint This</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpen}>
            <span>Edit Content</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
