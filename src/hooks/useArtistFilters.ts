import { useState } from "react";
import type { Artist } from "../interfaces/Artist";
import { parseArtistPrice } from "../utils/artistHandlers";

export function useArtistFilters(artists: Artist[]) {
  const [filterName, setFilterName] = useState("");
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 5000]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [sortBy, setSortBy] = useState("populares");

  const [appliedFilters, setAppliedFilters] = useState({
    genres: [] as string[],
    priceRange: [0, 5000] as [number, number],
  });

  const handleApplyFilters = () => {
    setIsFilterActive(true);
    setAppliedFilters({
      genres: [...filterGenres],
      priceRange: filterPrice,
    });
  };

  const handleClearFilters = (callbackFetch: () => void) => {
    setFilterName("");
    setFilterGenres([]);
    setFilterPrice([0, 5000]);
    setIsFilterActive(false);
    setAppliedFilters({ genres: [], priceRange: [0, 5000] });
    callbackFetch();
  };

  const getProcessedArtists = () => {
    let result = artists.filter((artist) => {
      const artistName = artist.name ? artist.name.toLowerCase() : "";
      return artistName.includes(filterName.toLowerCase());
    });

    if (isFilterActive) {
      result = result.filter((artist) => {
        const artistGenre = artist.genres ? artist.genres.toLowerCase() : "";
        const matchesGenre =
          appliedFilters.genres.length === 0 ||
          appliedFilters.genres.some((g) =>
            artistGenre.includes(g.toLowerCase()),
          );

        const artistPrice = parseArtistPrice(artist.startPrice);
        const matchesPrice =
          artistPrice >= appliedFilters.priceRange[0] &&
          artistPrice <= appliedFilters.priceRange[1];

        return matchesGenre && matchesPrice;
      });
    }

    const resultCopy = [...result];
    if (sortBy === "preco_menor") {
      return resultCopy.sort(
        (a, b) =>
          parseArtistPrice(a.startPrice) - parseArtistPrice(b.startPrice),
      );
    }
    if (sortBy === "preco_maior") {
      return resultCopy.sort(
        (a, b) =>
          parseArtistPrice(b.startPrice) - parseArtistPrice(a.startPrice),
      );
    }
    return resultCopy;
  };

  return {
    filterName,
    setFilterName,
    filterGenres,
    setFilterGenres,
    filterPrice,
    setFilterPrice,
    sortBy,
    setSortBy,
    handleApplyFilters,
    handleClearFilters,
    processedArtists: getProcessedArtists(),
  };
}
