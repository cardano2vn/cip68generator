import { Images } from "@/components/common/images";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Plus } from "lucide-react";
import { useMintOneContext } from "../../_context";

export default function TemplateStep() {
  const { stepper } = useMintOneContext();

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="flex-wrap gap-3 space-y-5">
        <div className="mt-2 grid  gap-4 grid-cols-4 max-md:grid-cols-2">
          <Card
            onClick={stepper.next}
            className="h-full relative overflow-hidden rounded-lg flex items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center p-6">
              <Plus className="w-8 h-8 text-gray-400 mb-2" />
              <h3 className="text-lg font-semibold">Start from Scratch</h3>
            </div>
          </Card>

          {Array.from({ length: 6 }, (_, index) => index).map((index) => (
            <Card key={index} className="relative overflow-hidden rounded-lg">
              <CardContent className="p-0">
                <AspectRatio ratio={5 / 3} className="bg-muted">
                  <Images.metadata className="h-full w-full rounded-t-lg object-cover" />
                </AspectRatio>

                <div className="p-6">
                  <div className="mb-4 text-2xl">Name</div>
                  <h3 className="text-lg font-semibold mb-2">description</h3>

                  {/* <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-muted-foreground">
                      Used by ...
                    </span>
                  </div> */}

                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <Button size="sm">Use</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
