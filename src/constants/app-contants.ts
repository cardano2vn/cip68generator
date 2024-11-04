import { FilterType } from "@/types";

export const appConfig = {
  title: "CIP68 Generator",
  description: "",
};
export const uploadConfig = {
  maxFiles: 50,
  maxSize: 5,
};

export const filterDefault: FilterType = {
  range: {
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31),
  },
  query: "",
};
