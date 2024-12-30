import { Collection } from "@/types/watch";
import {  case46mm } from "./series10/46mm/case";
import { bands42mm } from "./series10/42mm/band";
import { bands46mm } from "./series10/46mm/band";
import { case42mm } from "./series10/42mm/case";
import { hermesband42mm } from "./hermes/42mm/band";

import { hermescase42mm } from "./hermes/42mm/case";
import { hermescase46mm } from "./hermes/46mm/case";
import { hermesband46mm } from "./hermes/46mm/band";


export const watches: Collection[] = [
  {
    id: "series10",
    collectionName: "Apple Watch Series 10",
    caseSizes: [
      {
        size: "42mm",
        casesType: case42mm,
        bands: bands42mm,
      },
      {
        size: "46mm",
        casesType: case46mm,
        bands: bands46mm,
      },
    ],
  },
  {
    id: "hermes",
    collectionName: "Apple Watch Hermès Series 10",
    caseSizes: [
      {
        size: "42mm",
        casesType: hermescase42mm,
        bands: hermesband42mm,
      },
      {
        size: "46mm",
        casesType: hermescase46mm,
        bands: hermesband46mm,
      },
    ],
  },
];