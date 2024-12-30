import { useState } from "react";
import {  Collection, SelectedConfig } from "@/types/watch";
import { watches } from "@/constants/watches/watches";

export function useWatchConfig(collection:string = 'series10') {
 
  const defaultCollection:Collection = watches.find(
    (watchCollection) => watchCollection.id === collection
  ) || watches[0];

  const defaultConfig = ():SelectedConfig => {

    const defaultSize = defaultCollection.caseSizes.find(
      (size) => size.size === "46mm"
    ) || defaultCollection.caseSizes[1];

    if (!defaultSize) {
      throw new Error("No sizes found for this collection.");
    }

    const getDefaultConfig = (
      defaultPreferredCaseType: string, 
      defaultPreferredCaseColor: string,
      defaultPreferredBandName: string,
      defaultPreferredBandStyle: string
    ): SelectedConfig => {
      const caseType = defaultSize.casesType.find(
        (ct) => ct.type === defaultPreferredCaseType
      ) || defaultSize.casesType[0];

     
      const caseColor = caseType.colors.find(
        (color) => color.name === defaultPreferredCaseColor
      ) || caseType.colors[0];

     
      const band = defaultSize.bands.find(
        (b) => b.name === defaultPreferredBandName
      ) || defaultSize.bands[0];

    
      const bandStyle = band.styles.find(
        (style) => style.name === defaultPreferredBandStyle
      ) || band.styles[0];

      return {
        size: defaultSize.size,
        caseType: caseType.type,
        caseColor: caseColor.name,
        band: band,
        bandStyle: bandStyle,
      };
    };

    switch (collection){
      case "series10":
        return getDefaultConfig(
          "Aluminum", 
          "Jet Black", 
          "Sport Band", 
          "Black Sport Band"
        );
      case "hermes":
        return getDefaultConfig(
          "Titanium", 
          "Silver", 
          "Hermès Grand H", 
          "Satiné Grand H"
        );
      default:
        // Fallback to first available options
        return getDefaultConfig(
          defaultSize.casesType[0]?.type || "", 
          defaultSize.casesType[0]?.colors[0]?.name || "", 
          defaultSize.bands[0]?.name || "", 
          defaultSize.bands[0]?.styles[0]?.name || ""
        );
    }
    }


  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>(defaultConfig());

  

  const handleSizeChange = (size: string) => {
    const newSize = defaultCollection.caseSizes.find((cs) => cs.size === size);
    if (newSize) {
      const currentBandStyle = selectedConfig.band.styles.find(
        style => style.name === selectedConfig.bandStyle.name
      );
      
  
      const matchingBand = newSize.bands.find(
        (b) => b.name === selectedConfig.band.name
      );
      const matchingStyle = matchingBand?.styles.find(
        (s) => s.name === selectedConfig.bandStyle.name
      );
  
      
      if (currentBandStyle?.specificCases) {
        setSelectedConfig({
          size: newSize.size,
          caseType: selectedConfig.caseType,
          caseColor: selectedConfig.caseColor,
          band: matchingBand || newSize.bands[0],
          bandStyle: matchingStyle || newSize.bands[0].styles[0]
        });
      } else {
        const matchingCaseType = newSize.casesType.find(
          (ct) => ct.type === selectedConfig.caseType
        );
        const matchingColor = matchingCaseType?.colors.find(
          (c) => c.name === selectedConfig.caseColor
        );
  
        setSelectedConfig({
          size: newSize.size,
          caseType: matchingCaseType?.type || newSize.casesType[0].type,
          caseColor: matchingColor?.name || newSize.casesType[0].colors[0].name,
          band: matchingBand || newSize.bands[0],
          bandStyle: matchingStyle || newSize.bands[0].styles[0]
        });
      }
    }
  };

  const handleCaseTypeChange = (caseType: string, color?: string) => {
    const currentSize = defaultCollection.caseSizes.find(
      (size) => size.size === selectedConfig.size
    );
    const newCaseType = currentSize?.casesType.find(
      (ct) => ct.type === caseType
    );
    if (newCaseType) {
      setSelectedConfig((prev) => ({
        ...prev,
        caseType: newCaseType.type,
        caseColor: color || newCaseType.colors[0].name, 
      }));
    }
  };
  
  const handleCaseColorChange = (caseColor: string) => {
    setSelectedConfig((prev) => ({ ...prev, caseColor }));
  };

  const handleBandTypeChange = (bandName: string) => {
    const currentBands = defaultCollection.caseSizes.find(
      (size) => size.size === selectedConfig.size
    )?.bands;

    const selectedBand = currentBands?.find((band) => band.name === bandName);

    if (selectedBand) {
     
      const firstStyle = selectedBand.styles[0];
      setSelectedConfig((prev) => ({
        ...prev,
        band: selectedBand,
        bandStyle: firstStyle,
      }));
    }
  };

  const handleBandStyleChange = (styleName: string) => {
    const currentBand = selectedConfig.band;
    const newStyle = currentBand.styles.find(style => style.name === styleName);

    if (newStyle) {
      setSelectedConfig((prev) => ({
        ...prev,
        bandStyle: newStyle,
      }));
    }
  };

  const calculatePrice = (): string => {
    console.log('Price Calculation Debug', {
      collection: collection,
      currentSize: selectedConfig.size,
      caseType: selectedConfig.caseType,
      bandName: selectedConfig.band.name,
      defaultCollection: defaultCollection
    });
  
    const currentSize = defaultCollection.caseSizes
      .find((size) => size.size === selectedConfig.size);
      
    const basePrice = currentSize?.casesType
      .find((type) => type.type === selectedConfig.caseType)?.basePrice;
  
    const bandPrice = currentSize?.bands
      .find((band) => band.name === selectedConfig.band.name)?.extraprice;

      const totalPrice = parseInt(basePrice || "0") + parseInt(bandPrice || "0");

      return totalPrice.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
  };

  return {
    defaultCollection,
    selectedConfig,
    handleSizeChange,
    handleCaseTypeChange,
    handleCaseColorChange,
    handleBandStyleChange,
    handleBandTypeChange,
    calculatePrice,
  };
}
