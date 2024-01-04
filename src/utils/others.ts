export function scrollTo(id: string) {
  const yOffset = -200;
  const element = document.getElementById(id)!;

  const y = element?.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}
