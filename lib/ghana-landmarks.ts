export type GhanaLandmark = {
  id: string;
  name: string;
  aliases: string[];
  category:
    | "mall"
    | "airport"
    | "hospital"
    | "university"
    | "transport"
    | "area"
    | "market"
    | "landmark";
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  region: string;
};

export const ghanaLandmarks: GhanaLandmark[] = [
  {
    id: "accra-mall",
    name: "Accra Mall",
    aliases: [
      "accra shopping mall",
      "accra mall spintex",
      "accra mall airport city",
    ],
    category: "mall",
    address: "Spintex Road, Airport City, Accra",
    latitude: 5.623611,
    longitude: -0.171389,
    city: "Accra",
    region: "Greater Accra",
  },
  {
    id: "achimota-mall",
    name: "Achimota Mall",
    aliases: [
      "achimota shopping mall",
      "achimota retail centre",
      "achimota mall accra",
    ],
    category: "mall",
    address: "Alogboshie, Accra",
    latitude: 5.63764,
    longitude: -0.24075,
    city: "Accra",
    region: "Greater Accra",
  },
  {
    id: "west-hills-mall",
    name: "West Hills Mall",
    aliases: [
      "west hill mall",
      "weija mall",
      "west hills shopping mall",
    ],
    category: "mall",
    address: "Weija, Greater Accra",
    latitude: 5.54486,
    longitude: -0.34406,
    city: "Weija",
    region: "Greater Accra",
  },
  {
    id: "junction-mall",
    name: "Junction Mall",
    aliases: [
      "junction mall accra",
      "junction mall nungua",
      "nungua junction mall",
    ],
    category: "mall",
    address: "Nungua, Accra",
    latitude: 5.61332,
    longitude: -0.07206,
    city: "Accra",
    region: "Greater Accra",
  },
  {
    id: "kotoka-international-airport",
    name: "Kotoka International Airport",
    aliases: [
      "kotoka airport",
      "accra airport",
      "kia",
      "acc",
      "accra international airport",
    ],
    category: "airport",
    address: "Airport City, Accra",
    latitude: 5.60392,
    longitude: -0.16829,
    city: "Accra",
    region: "Greater Accra",
  },
  {
    id: "37-military-hospital",
    name: "37 Military Hospital",
    aliases: [
      "37 hospital",
      "military hospital",
      "37 military",
    ],
    category: "hospital",
    address: "37, Accra",
    latitude: 5.58691,
    longitude: -0.18471,
    city: "Accra",
    region: "Greater Accra",
  },
  {
    id: "university-of-ghana",
    name: "University of Ghana",
    aliases: [
      "university of ghana legon",
      "legon university",
      "ug legon",
      "legon campus",
    ],
    category: "university",
    address: "Legon, Accra",
    latitude: 5.65075,
    longitude: -0.18951,
    city: "Accra",
    region: "Greater Accra",
  },

  {
    id: "osu",
    name: "Osu",
    aliases: [
      "osu accra",
      "oxford street",
      "osu oxford street",
    ],
    category: "area",
    address: "Osu, Accra",
    latitude: 5.5567,
    longitude: -0.1827,
    city: "Accra",
    region: "Greater Accra",
  },
  {
    id: "madina",
    name: "Madina",
    aliases: [
      "madina accra",
      "madina station",
      "madina market",
    ],
    category: "area",
    address: "Madina, Greater Accra",
    latitude: 5.6836,
    longitude: -0.1707,
    city: "Madina",
    region: "Greater Accra",
  },
  {
    id: "mallam",
    name: "Mallam",
    aliases: [
      "mallam accra",
      "mallam junction",
    ],
    category: "area",
    address: "Mallam, Greater Accra",
    latitude: 5.5715,
    longitude: -0.3004,
    city: "Accra",
    region: "Greater Accra",
  },
  {
    id: "circle",
    name: "Kwame Nkrumah Circle",
    aliases: [
      "circle",
      "circle accra",
      "nkrumah circle",
      "kwame nkrumah circle",
    ],
    category: "transport",
    address: "Kwame Nkrumah Circle, Accra",
    latitude: 5.5577,
    longitude: -0.2074,
    city: "Accra",
    region: "Greater Accra",
  },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ");
}

export function searchGhanaLandmarks(
  query: string,
  limit = 6
): GhanaLandmark[] {
  const normalizedQuery = normalize(query);

  if (normalizedQuery.length < 2) {
    return [];
  }

  return ghanaLandmarks
    .map((landmark) => {
      const names = [
        landmark.name,
        landmark.address,
        landmark.city,
        ...landmark.aliases,
      ].map(normalize);

      let score = 0;

      for (const value of names) {
        if (value === normalizedQuery) {
          score = Math.max(score, 100);
        } else if (value.startsWith(normalizedQuery)) {
          score = Math.max(score, 80);
        } else if (value.includes(normalizedQuery)) {
          score = Math.max(score, 60);
        } else {
          const queryWords = normalizedQuery.split(" ");

          const matchingWords = queryWords.filter((word) =>
            value.includes(word)
          ).length;

          if (matchingWords > 0) {
            score = Math.max(
              score,
              Math.round(
                (matchingWords / queryWords.length) * 40
              )
            );
          }
        }
      }

      return {
        landmark,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.landmark);
}