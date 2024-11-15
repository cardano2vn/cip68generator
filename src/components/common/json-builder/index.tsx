"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { JsonValue } from "@/types";
import { useJsonBuilderStore } from "./store";

function JsonField({
  parentType,
  keyName,
  value,
  path,
  updateField,
  removeField,
  addField,
}: {
  parentType: string;
  keyName: string;
  value: JsonValue;
  path: string[];
  updateField: (path: string[], value: JsonValue) => void;
  removeField: (path: string[]) => void;
  addField: (path: string[]) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const currentPath = [...path, keyName];
  const addChildField = () => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        updateField(currentPath, [...value, ""]);
      } else {
        const newKey = `newField${Object.keys(value).length}`;
        updateField(currentPath, { ...value, [newKey]: "" });
      }
    }
  };

  const renderValueInput = () => {
    switch (typeof value) {
      case "string":
      case "number":
        return (
          <Input
            value={String(value)}
            type={typeof value == "number" ? "number" : "text"}
            onChange={(e) => {
              let newValue: JsonValue = e.target.value;
              if (typeof value === "number") newValue = Number(e.target.value);
              updateField(currentPath, newValue);
            }}
            placeholder="null"
            className="w-1/3 bg-section"
          />
        );
      case "boolean":
        return (
          <Select
            value={value ? "true" : "false"}
            onValueChange={(newValue) =>
              updateField(currentPath, newValue === "true")
            }
          >
            <SelectTrigger className="w-1/3 bg-section">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ml-8 mt-2">
      <div className="flex items-center space-x-2">
        {typeof value === "object" && value !== null && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        <Select
          value={Array.isArray(value) ? "array" : typeof value}
          onValueChange={(newType) => {
            let newValue: JsonValue = "";
            if (newType === "number") newValue = 0;
            if (newType === "boolean") newValue = false;
            if (newType === "object") newValue = {};
            if (newType === "array") newValue = [];
            updateField(currentPath, newValue);
          }}
        >
          <SelectTrigger className="w-[120px] bg-section">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
            <SelectItem value="object">Object</SelectItem>
            <SelectItem value="array">Array</SelectItem>
          </SelectContent>
        </Select>
        <Label className="w-1/4">
          <Input
            value={keyName}
            disabled={parentType == "array"}
            onChange={(e) => {
              const newPath = [...path, e.target.value];
              removeField(currentPath);
              updateField(newPath, value);
            }}
            className="w-full bg-section"
          />
        </Label>

        {renderValueInput()}
        {typeof value === "object" && value !== null && (
          <Button onClick={addChildField} aria-label="Add child field">
            <PlusCircle className="mr-2 h-4 w-4" />
            {`Add Child`}
          </Button>
        )}
        <Button
          variant="destructive"
          size="icon"
          onClick={() => removeField(currentPath)}
          aria-label="Remove field"
        >
          <Trash2 className="h-4 w-4 text-white" />
        </Button>
      </div>
      {isExpanded && typeof value === "object" && value !== null && (
        <div className="ml-4 mt-2">
          {Array.isArray(value)
            ? value.map((item, index) => (
                <JsonField
                  parentType={"array"}
                  key={index}
                  keyName={String(index)}
                  value={item}
                  path={currentPath}
                  updateField={updateField}
                  removeField={removeField}
                  addField={addField}
                />
              ))
            : Object.entries(value).map(([subKey, subValue]) => (
                <JsonField
                  parentType="object"
                  key={subKey}
                  keyName={subKey}
                  value={subValue}
                  path={currentPath}
                  updateField={updateField}
                  removeField={removeField}
                  addField={addField}
                />
              ))}
        </div>
      )}
    </div>
  );
}

export default function JsonBuilder() {
  const { jsonContent, setJsonContent, addField, updateField, removeField } =
    useJsonBuilderStore();
  const [template, setTemplate] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>(
    JSON.stringify(jsonContent, null, 2),
  );
  const [err, setErr] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputValue(value);
    try {
      const parsedJson = JSON.parse(value);
      setJsonContent(parsedJson);
      setErr("");
    } catch (error) {
      if (error instanceof Error) {
        setErr(error.message);
      } else {
        setErr(String(error));
      }
    }
  };

  useEffect(() => {
    setInputValue(JSON.stringify(jsonContent, null, 2));
  }, [jsonContent]);

  return (
    <div className="bg-section h-full rounded-lg p-5 flex flex-col">
      <Tabs defaultValue="basic" className="flex-grow overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2 mb-4">
          <TabsList>
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-green-800 data-[state=active]:text-white p-2"
            >
              Basic
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="data-[state=active]:bg-green-800 data-[state=active]:text-white p-2"
            >
              Advanced
            </TabsTrigger>
          </TabsList>

          <Select
            value={template}
            onValueChange={(newValue) => {
              switch (newValue) {
                case "Minimal":
                  setTemplate("Minimal");
                  setJsonContent({
                    name: "Asset Name",
                    description: "Asset Description",
                    image: "ipfs://QmZ4t3...",
                  });
                  break;
                case "Fungible":
                  setTemplate("Fungible");
                  setJsonContent({
                    ticker: "SYMBOL",
                    decimals: 6,
                    version: "1.0",
                    name: "Fungible Token",
                    description: "Demo fungible token",
                    image: "ipfs://QmZ4t3...",
                    external_url: "https://example.com",
                    attributes: [
                      {
                        trait_type: "Rarity",
                        value: "Common",
                      },
                      {
                        trait_type: "Type",
                        value: "Weapon",
                      },
                    ],
                  });
                  break;
                case "Audio":
                  setTemplate("Audio");
                  setJsonContent({
                    name: "Audio NFT",
                    description: "Demo audio NFT",
                    files: [
                      {
                        name: "Audio File",
                        src: "ipfs://audio_file_location",
                        mediaType: "audio/mpeg",
                      },
                    ],
                    image: "",
                    external_url: "",
                    animation_url: "",
                    attributes: [],
                  });
                  break;
                case "Image":
                  setTemplate("Image");
                  setJsonContent({
                    name: "Image NFT",
                    description: "",
                    files: [
                      {
                        name: "Image File",
                        src: "ipfs://image_file_location",
                        mediaType: "image/png",
                      },
                    ],
                    image: "",
                    external_url: "",
                    attributes: [],
                  });
                  break;
                case "Smart":
                  setTemplate("Smart");
                  setJsonContent({
                    name: "Smart Asset",
                    description: "",
                    files: [
                      {
                        name: "Smart File",
                        src: "ipfs://smart_file_location",
                        mediaType: "application/jsonContent",
                      },
                    ],
                    image: "",
                    external_url: "",
                    animation_url: "",
                    attributes: [],
                  });
                  break;
                case "Video":
                  setTemplate("Video");
                  setJsonContent({
                    name: "Video NFT",
                    description: "",
                    files: [
                      {
                        name: "Video File",
                        src: "ipfs://video_file_location",
                        mediaType: "video/mp4",
                      },
                    ],
                    image: "",
                    external_url: "",
                    animation_url: "",
                    attributes: [],
                  });
                  break;
                default:
                  setTemplate("");
                  setJsonContent({});
                  break;
              }
            }}
          >
            <SelectTrigger className="w-1/3 bg-section">
              <SelectValue placeholder="Select Asset Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Minimal">Minimal Asset Metadata</SelectItem>
              <SelectItem value="Audio">Audio Asset Metadata</SelectItem>
              <SelectItem value="Image">Image Asset Metadata</SelectItem>
              <SelectItem value="Smart">Smart Asset Metadata</SelectItem>
              <SelectItem value="Video">Video Asset Metadata</SelectItem>
              <SelectItem value="Fungible">Fungible Asset Metadata</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-red-500 text-sm">{err}</p>

        <TabsContent value="basic">
          <div className="space-y-4">
            {Object.entries(jsonContent).map(([key, value]) => (
              <JsonField
                parentType="object"
                key={key}
                keyName={key}
                value={value}
                path={[]}
                updateField={updateField}
                removeField={removeField}
                addField={addField}
              />
            ))}
            <Button onClick={() => addField([])} className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Root Field
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="flex-grow">
          <Textarea
            className="w-full h-80 overflow-auto rounded-md p-4 border border-dashed border-[#6272a4] bg-[#282a36]"
            value={inputValue}
            onChange={handleInputChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
