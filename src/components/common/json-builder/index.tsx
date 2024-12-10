"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/utils";
import { FilePick } from "./file-pick";
import { useJsonBuilderStore } from "./store";
import { isEmpty } from "lodash";
import { useEffect } from "react";

export default function JsonBuilder({ className }: { className?: string }) {
  const { fields, addField, removeField, updateField, error, template, setTemplate, getJsonResult } = useJsonBuilderStore();

  useEffect(() => {
    setTemplate("");
  }, [setTemplate]);

  return (
    <div className={cn(className, "flex h-full bg-section p-5")}>
      <div className="w-1/2 p-4 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2 mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Metadata Builder</h1>
          <Select value={template} onValueChange={setTemplate}>
            <SelectTrigger className="w-2/5 bg-section">
              <SelectValue placeholder="Select Asset Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Minimal">Minimal Asset Metadata</SelectItem>
              <SelectItem value="Image">Image Asset Metadata</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-4"> {error && <p className="text-red-500">{error}</p>}</div>
        <div>
          {!isEmpty(fields) &&
            fields.map((field, index) => (
              <div key={index} className="flex items-center space-x-2 mb-4">
                <div className="flex-1">
                  <Label htmlFor={`key-${index}`} className="sr-only">
                    Key
                  </Label>
                  <Input
                    id={`key-${index}`}
                    placeholder="Key"
                    value={field.key}
                    onChange={(e) => updateField && updateField(index, "key", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`value-${index}`} className="sr-only">
                    Value
                  </Label>
                  <Input
                    id={`value-${index}`}
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) => updateField && updateField(index, "value", e.target.value)}
                  />
                </div>
                <Button variant="destructive" className="text-white" onClick={() => removeField && removeField(index)}>
                  Remove
                </Button>
              </div>
            ))}
          <div className="flex items-center justify-start space-x-4">
            <Button onClick={addField}>Add Field</Button>
            <FilePick />
          </div>
        </div>
      </div>
      <div className="w-1/2 p-4 ">
        <Textarea className="w-full h-full resize-none font-mono" value={JSON.stringify(getJsonResult(), null, 2)} readOnly />
      </div>
    </div>
  );
}
