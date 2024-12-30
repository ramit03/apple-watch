export type CaseColor = {
    name: string;
    image: string;
  };
  
  export type Combination = {
    caseColor: string;
    image: string;
  };
  
  export type SpecificCase = {
    caseColor: string;
    image: string;
  };
  
  export type BandStyle = {
    name: string;
    image: string;
    combinations: Combination[];
    specificCases?: SpecificCase[];
    special?: string;
  };
  
  export type Band = {
    name: string;
    extraprice: string;
    styles: BandStyle[];
  };
  
  export type CaseType = {
    type: string;
    basePrice: string;
    colors: CaseColor[];
  };
  
  export type CaseSize = {
    size: string;
    casesType: CaseType[];
    bands: Band[];
  };
  
  export type Collection = {
    id: string;
    collectionName: string;
    caseSizes: CaseSize[];
  };
  
  export type SelectedConfig = {
    size: string;
    caseType: string;
    caseColor: string;
    band: Band;
    bandStyle: BandStyle;
  };
  