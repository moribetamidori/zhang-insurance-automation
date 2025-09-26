export interface CountyInfo {
  url: string;
  note?: string;
  difficulty?: string;
  offlineOnly?: boolean;
  taxBillUrl?: string;
}

export interface StateData {
  zipcodeToCounty: Record<string, string>;
  countyToUrl: Record<string, CountyInfo>;
}

export interface CountyData {
  zipcode: string;
  county: string;
  permitUrl: string;
  note?: string;
  difficulty?: string;
  offlineOnly?: boolean;
  taxBillUrl?: string;
}

export type State = "FL" | "TX" | "GA" | null;
