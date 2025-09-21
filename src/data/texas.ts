import { StateData } from "../types";

export const texasData: StateData = {
  zipcodeToCounty: {
    "77001": "Harris County",
    "77002": "Harris County",
    "77003": "Harris County",
    "77004": "Harris County",
    "77005": "Harris County",
    "78701": "Travis County",
    "78702": "Travis County",
    "78703": "Travis County",
    "78704": "Travis County",
    "78705": "Travis County",
    "75201": "Dallas County",
    "75202": "Dallas County",
    "75203": "Dallas County",
    "75204": "Dallas County",
    "75205": "Dallas County",
  },
  countyToUrl: {
    "Harris County": {
      url: "https://example.com/tx-harris-permits",
      note: "Permit information for Harris County",
    },
    "Travis County": {
      url: "https://example.com/tx-travis-permits",
      note: "Permit information for Travis County",
    },
    "Dallas County": {
      url: "https://example.com/tx-dallas-permits",
      note: "Permit information for Dallas County",
    },
  },
};
