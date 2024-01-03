import dayjs from "dayjs";

export function formatName(name: string | undefined): string | undefined {
  return (
    name &&
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function formatDate(
  date: string | number | undefined,
  convertFrom: "timestamp" | "ISOdate",
  convertTo: "date&hour" | "date"
): string | undefined {
  if (!date) {
    return undefined;
  }

  const dateObject: Date =
    convertFrom === "timestamp"
      ? new Date(parseInt(date.toString()))
      : new Date(date.toString());

  return convertTo === "date&hour"
    ? dayjs(dateObject).format("DD/MM/YYYY HH:mm:ss")
    : dayjs(dateObject).format("DD/MM/YYYY");
}
