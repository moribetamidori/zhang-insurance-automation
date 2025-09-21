import { StateData } from "../types";

export const georgiaData: StateData = {
  zipcodeToCounty: {
    "30301": "Fulton County",
    "30302": "Fulton County",
    "30303": "Fulton County",
    "30304": "Fulton County",
    "30305": "Fulton County",
    "31401": "Chatham County",
    "31402": "Chatham County",
    "31403": "Chatham County",
    "31404": "Chatham County",
    "31405": "Chatham County",
    "31201": "Bibb County",
    "31202": "Bibb County",
    "31203": "Bibb County",
    "31204": "Bibb County",
    "31205": "Bibb County",
  },
  countyToUrl: {
    "Fulton County": {
      url: "https://example.com/ga-fulton-permits",
      note: "Permit information for Fulton County",
    },
    "Chatham County": {
      url: "https://example.com/ga-chatham-permits",
      note: "Permit information for Chatham County",
    },
    "Bibb County": {
      url: "https://example.com/ga-bibb-permits",
      note: "Permit information for Bibb County",
    },
  },
};
