export function formatName(name: string | undefined): string | undefined {
  return (
    name &&
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function formatPrice(price: string | undefined): string | undefined {
  return price && price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDate(
  date: string | number | undefined,
  convertFrom: "timestamp" | "ISOdate",
  convertTo: "date&hour" | "date"
): string | undefined {
  if (!date) {
    return undefined;
  }

  let dateObject: Date;

  if (convertFrom === "timestamp") {
    dateObject = new Date(parseInt(date.toString()));
  } else if (convertFrom === "ISOdate") {
    dateObject = new Date(date.toString());
  } else {
    throw new Error('Invalid convertFrom value. Use "timestamp" or "ISOdate".');
  }

  if (convertTo === "date&hour") {
    return dateObject.toLocaleString();
  } else if (convertTo === "date") {
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  } else {
    throw new Error('Invalid convertTo value. Use "date&hour" or "date".');
  }
}
