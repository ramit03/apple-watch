import { useState } from "react";
import { Band, BandStyle, Collection, SelectedConfig } from "@/types/watch";
import { watches } from "@/constants/watches/watches";


export function useWatchConfig(collection:string = 'series10') {
 
  const defaultCollection:Collection = watches.find(
    (watchCollection) => watchCollection.id === collection
  ) || watches[0];

  const defaultConfig = ():SelectedConfig => {

     const defaultSize = (() => {
      switch (collection) {
        case "series10":
          return defaultCollection.caseSizes.find(
            (size) => size.size === "46mm"
          );
        case "hermes":
          return defaultCollection.caseSizes.find(
            (size) => size.size === "46mm"
          );
        default:
          return defaultCollection.caseSizes[1];
      }
    })();
    if (!defaultSize) {
      throw new Error("Default size not found in caseSizes.");
    }
    switch (collection) {
      case "series10": {
        const series10CaseType = defaultSize.casesType.find(
          (caseType) => caseType.type === "Aluminum"
        );
        const series10Color = series10CaseType?.colors.find(
          (color) => color.name === "Jet Black"
        );
        const series10Band = defaultSize.bands.find(
          (band) => band.name === "Sport Band"
        );
        const series10Style = series10Band?.styles.find(
          (style) => style.name === "Black Sport Band"
        );

        return {
          size: defaultSize.size,
          caseType: series10CaseType?.type || "",
          caseColor: series10Color?.name || "",
          band: series10Band || defaultSize.bands[0],
          bandStyle: series10Style || series10Band?.styles[0] || defaultSize.bands[0].styles[0],
        };
      }

      case "hermes": {
        const hermesCaseType = defaultSize.casesType.find(
          (caseType) => caseType.type === "Stainless Steel"
        );
        const hermesColor = hermesCaseType?.colors.find(
          (color) => color.name === "Silver"
        );
        const hermesBand = defaultSize.bands.find(
          (band) => band.name === "Leather"
        );
        const hermesStyle = hermesBand?.styles.find(
          (style) => style.name === "Classic Leather"
        );

        return {
          size: defaultSize.size,
          caseType: hermesCaseType?.type || "",
          caseColor: hermesColor?.name || "",
          band: hermesBand || defaultSize.bands[0],
          bandStyle: hermesStyle || hermesBand?.styles[0] || defaultSize.bands[0].styles[0],
        };
      }

      default:
        return {
          size: defaultSize.size,
          caseType: defaultSize.casesType[0]?.type || "",
          caseColor: defaultSize.casesType[0]?.colors[0]?.name || "",
          band: defaultSize.bands[0],
          bandStyle: defaultSize.bands[0]?.styles[0],
        };
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
