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
  
  export interface WatchComponentProps {
    selectedCollection: "series10" | "hermes" | string; }

    export interface WatchConfig {
      seriesName: string;
      watchName: string;
      color:string;
      band:string;
      case:string;
      price: string;
      frontFaceSrc: string;
      bandSrc: string;
      sideViewSrc: string;
    }

    export interface WatchCustomizationCarouselProps {
      activeFilter: string | null;
      defaultCollection: Collection;
      selectedConfig: {
        size: string;
        caseType: string;
        caseColor: string;
        band: Band;
        bandStyle: BandStyle;
      };
      isSideView: boolean;
      collection: string;
      handleSizeChange: (size: string) => void;
      handleCaseTypeChange: (caseType: string, color?: string) => void;
      handleBandTypeChange: (bandName: string) => void;
      handleBandStyleChange: (styleName: string) => void;
    }
    
export type CarouselItem =
  | {
      type: "size";
      size: string;
      caseImage: string;
      bandImage: string;
      alt: string;
    }
  | {
      type: "case";
      image: string;
      alt: string;
      caseType: string;
      color: string;
    }
  | {
      type: "band";
      image: string;
      alt: string;
      bandName: string;
      styleName: string;
    };
