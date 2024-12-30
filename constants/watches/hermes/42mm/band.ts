import { Band } from "@/types/watch";

export const hermesband42mm:Band[]=[
  {
    name: "HERMÈS Toile H",
    extraprice: "0",
    styles: [
      {
        name: "Gold/Écru Toile H Single Tour",
        image:
          "/watches/hermes/42mm/band/toileh/gold.jpg",
        combinations: [
          {
            caseColor: "Silver",
            image:
              "/watches/hermes/42mm/combination/toileh/gold.jpg",
          },
        ],
        specificCases: [
          {
            caseColor: "Silver",
            image:
              "/watches/hermes/42mm/case/specialcase/toileh/silver.png",
          },]
      },
    ],
  },
      {
        name: "Hermès Twill",
        
        extraprice: "0",
        styles: [
          {
            name: "Noir/Gold Twill Jump Attelage Single Tour",
            special:'42mm only',
            image:
              "/watches/hermes/42mm/band/twill/noir.jpg",
            specificCases: [
              {
                caseColor: "Silver",
                image:
                  "/watches/hermes/42mm/case/specialcase/twill/silver.png",
              },
            ],
            combinations: [
              {
                caseColor: "Silver",
                image:
                  "/watches/hermes/42mm/combination/twill/noir.jpg",
              },
            ],
          },
        ],
      },
      {
        name: "Hermès Torsade",
        extraprice: "100",
        styles: [
          {
            name: "Vert Moyen Torsade Double Tour",
            image:
              "/watches/hermes/42mm/band/torsade/vert.jpg",
              specificCases: [
                {
                  caseColor: "Silver",
                  image:
                    "/watches/hermes/42mm/case/specialcase/torsade/silver.png",
                },
              ],
            combinations: [
              {
                caseColor: "Silver",
                image:
                  "/watches/hermes/42mm/combination/torsade/vert.jpg",
              },
            ],
          },
        ],
      },
      {
        name: "Hermès Grand H",
        extraprice: "650",
        styles: [
            {
              name: "Satiné Grand H",
              image:  "/watches/hermes/42mm/band/grandh/satinegrand.jpg",
              combinations: [
                {
                  caseColor: "Silver",
                  image: "/watches/hermes/42mm/combination/grandh/satinegrand.jpg",
                  },

              ]
            },
          ]
      }
]