export function formatName(name: string | undefined): string | undefined {
  return (
    name &&
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function formatDay(timestamp: string | undefined): string | undefined {
  return timestamp && new Date(parseInt(timestamp.toString())).toLocaleString();
}

export function formatDate(dateString: string | undefined): string | undefined {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  return (
    dateString && new Date(dateString).toLocaleDateString("en-GB", options)
  );
}
