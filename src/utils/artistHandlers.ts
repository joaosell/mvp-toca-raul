const DEFAULT_ARTIST_IMAGE =
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop";

export const sanitizeArtistObject = (item: any): any => ({
  ...item,
  name: item?.name ? item.name.toString().trim() : "Artista sem nome",
  genres: item?.genres ? item.genres.toString().trim() : "Gênero Geral",
  photoUrl: item?.photoUrl
    ? item.photoUrl
        .toString()
        .replace(/[\r\n\t]/g, "")
        .trim()
    : DEFAULT_ARTIST_IMAGE,
  startPrice: item?.startPrice ? item.startPrice.toString().trim() : "0",
});

export const parseArtistPrice = (priceStr: string | number): number => {
  if (typeof priceStr === "number") return priceStr;
  if (!priceStr || priceStr.toString().trim() === "") return 0;

  let cleaned = priceStr.toString().replace(/\s/g, "");
  if (cleaned.includes(".") && cleaned.includes(",")) {
    cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
  } else if (cleaned.includes(".") && cleaned.split(".")[1]?.length === 3) {
    cleaned = cleaned.replace(/\./g, "");
  }
  return Number(cleaned) || 0;
};
