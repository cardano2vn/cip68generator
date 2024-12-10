import { Media } from "@prisma/client";
import { isEmpty } from "lodash";
import { create } from "zustand";

interface IJsonBuilderStore {
  fields: {
    key: string;
    value: string;
  }[];
  template: string;
  error: string;
  init: (json: Record<string, string>) => void;
  getJsonResult: () => Record<string, string>;
  addField: () => void;
  addMediaField?: (file: Media) => void;
  updateField?: (index: number, field: "key" | "value", value: string) => void;
  removeField?: (index: number) => void;
  setTemplate: (template: string) => void;
  setErrors: (error: string) => void;
}

export const useJsonBuilderStore = create<IJsonBuilderStore>((set, get) => ({
  fields: [],
  template: "",
  error: null!,
  init: (json) => {
    if (isEmpty(json)) {
      return set({ fields: [] });
    }
    const fields = Object.entries(json).map(([key, value]) => ({
      key,
      value: value as string,
    }));
    set({ fields });
  },
  getJsonResult: () => {
    const fields = get().fields;
    const json = fields.reduce(
      (acc, { key, value }) => {
        if (key) {
          if (/^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(key)) {
            acc[key] = value;
          }
        }
        return acc;
      },
      {} as Record<string, string>,
    );
    return json;
  },
  addField: () => {
    set((state) => {
      const Newfields = [...state.fields, { key: "", value: "" }];
      const error = validateField(Newfields);
      return { fields: Newfields, error };
    });
  },
  removeField: (index) => {
    set((state) => {
      const newFields = state.fields.filter((_, i) => i !== index);
      const error = validateField(newFields);
      return { fields: newFields, error };
    });
  },
  updateField: (index, field, value) => {
    set((state) => {
      const newFields = [...state.fields];
      newFields[index][field] = value;
      const error = validateField(newFields);
      return { fields: newFields, error };
    });
  },
  setTemplate: (template) => {
    set(() => {
      switch (template) {
        case "Minimal":
          return {
            template: "Minimal",
            fields: [
              { key: "name", value: "Asset Name" },
              { key: "description", value: "Asset Description" },
            ],
          };
        case "Image":
          return {
            template: "Image",
            fields: [
              { key: "name", value: "Image NFT" },
              { key: "description", value: "Asset Description" },
              { key: "image", value: "ipfs://..." },
              { key: "mediaType", value: "image/png" },
            ],
          };
        default:
          return {
            template: "",
            fields: [],
          };
      }
    });
  },
  addMediaField: (file: Media) => {
    set((state) => {
      const updatedFields = state.fields.map((field) => {
        if (field.key === "image") {
          return { ...field, value: file.url };
        }
        if (field.key === "mediaType") {
          return { ...field, value: file.type };
        }
        return field;
      });

      if (!state.fields.some((field) => field.key === "image")) {
        updatedFields.push({ key: "image", value: file.url });
      }
      if (!state.fields.some((field) => field.key === "mediaType")) {
        updatedFields.push({ key: "mediaType", value: file.type });
      }

      return { fields: updatedFields };
    });
  },
  setErrors: (error) => {
    set({ error });
  },
}));

const validateField = (
  fields: {
    key: string;
    value: string;
  }[],
): string => {
  for (let i = 0; i < fields.length; i++) {
    const { key, value } = fields[i];

    if (!/^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(key)) {
      return `Invalid key format : ${key}`;
    }

    if (fields.filter((f) => f.key === key).length > 1) {
      return `Duplicate key : ${key}`;
    }

    if (isEmpty(value)) {
      return `Value cant be empty`;
    }

    if (typeof value !== "string") {
      return `Value must be a string. Received: ${typeof value}`;
    }
  }
  return "";
};
