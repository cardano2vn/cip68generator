export function convertObject(
  data: string[][],
): { [key: string]: string | number | boolean | null }[] {
  return data.slice(1).map((row) =>
    row.reduce(
      (acc, curr, index) => {
        const key = data[0][index];
        if (curr === "") {
          acc[key] = null;
        } else if (!isNaN(Number(curr))) {
          acc[key] = Number(curr);
        } else if (
          curr.toLowerCase() === "true" ||
          curr.toLowerCase() === "false"
        ) {
          acc[key] = curr.toLowerCase() === "true";
        } else if (curr.toLowerCase() === "null") {
          acc[key] = null;
        } else {
          acc[key] = curr;
        }
        return acc;
      },
      {} as { [key: string]: string | number | boolean | null },
    ),
  );
}
