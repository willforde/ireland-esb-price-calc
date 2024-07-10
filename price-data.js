// All prices include vat unless otherwise stated
const PSO = 0.0;  // Price per year
const FREEUNITS = 1.150684932;  // Price per day
const ELECTRICPROVIDERS = [
  {
    details: {
      name: "Electric Ireland",
      startingDiscount: 0.30,
      standardDiscount: 0.055,
      url: "https://www.electricireland.ie/switch/new-customer/price-plans?priceType=E",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 302.92,
        dayRate: 0.3130,
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 380.46,
        dayRate: 0.3130,
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 396.89,
        dayRate: 0.3344,
        nightRate: 0.1650,
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 483.71,
        dayRate: 0.3344,
        nightRate: 0.1650,
      }
    ]
  },
  {
    details: {
      name: "Electric Ireland Oct",
      startingDiscount: 0.30,
      standardDiscount: 0.055,
      url: "https://www.electricireland.ie/switch/new-customer/price-plans?priceType=E",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 302.92,
        dayRate: 0.4327,
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 380.46,
        dayRate: 0.4327,
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 396.89,
        dayRate: 0.4623,
        nightRate: 0.2280,
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 483.71,
        dayRate: 0.4623,
        nightRate: 0.2280,
      }
    ]
  },
  {
    details: {
      name: "Electric Ireland PrePay",
      startingDiscount: 0.30,
      standardDiscount: 0.055,
      serviceCharge: 0.3601,
      url: "https://www.electricireland.ie/switch/new-customer/price-plans?priceType=P",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 302.92,
        dayRate: 0.3130,
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 380.46,
        dayRate: 0.3130,
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 396.89,
        dayRate: 0.3344,
        nightRate: 0.1650,
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 483.71,
        dayRate: 0.3344,
        nightRate: 0.1650,
      }
    ]
  },
  {
    details: {
      name: "Bord Gáis Energy",
      startingDiscount: 0.39,
      standardDiscount: 0.05,
      url: "https://www.bordgaisenergy.ie/home/our-plans/a0p4L000001OH10QAG",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 281.12,
        dayRate: 0.3307
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 352.9,
        dayRate: 0.3317
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 369.64,
        dayRate: 0.3557,
        nightRate: 0.176
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 457.96,
        dayRate: 0.3625,
        nightRate: 0.1792
      }
    ]
  },
  {
    details: {
      name: "Prepay Power",
      startingDiscount: 0.30,
      standardDiscount: 0.055,
      serviceCharge: 0.3597,
      url: "https://www.prepaypower.ie/",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 303.68,
        dayRate: 0.3020,
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 396.86,
        dayRate: 0.3020,
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 404.35,
        dayRate: 0.3298,
        nightRate: 0.1629,
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 478.53,
        dayRate: 0.3298,
        nightRate: 0.1629,
      }
    ]
  },
  {
    details: {
      name: "Community Power energy",
      startingDiscount: 0,
      standardDiscount: 0,
      url: "https://communitypower.ie/",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 240.35,
        dayRate: 0.4750
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 277.95,
        dayRate: 0.4750
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 240.35,
        dayRate: 0.5100,
        nightRate: 0.2520
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 277.95,
        dayRate: 0.5100,
        nightRate: 0.2520
      }
    ]
  },
  {
    details: {
      name: "Ecopower",
      startingDiscount: 0.25,
      standardDiscount: 0,
      url: "https://ecopower.ie/all-price-plans/",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 294.30,
        dayRate: 0.424
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 353.16,
        dayRate: 0.424
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 353.16,
        dayRate: 0.461,
        nightRate: 0.234
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 441.45,
        dayRate: 0.461,
        nightRate: 0.234
      }
    ]
  },
  {
    details: {
      name: "SSE Airtricity",
      startingDiscount: 0.33,
      standardDiscount: 0,
      url: "https://www.sseairtricity.com/ie/home/products/switch-to-sse-airtricity/?jump=true&filter=eleconly",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 223.12,
        dayRate: 0.3322
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 280.10,
        dayRate: 0.3322
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 286.63,
        dayRate: 0.3467,
        nightRate: 0.1884
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 349.09,
        dayRate: 0.3467,
        nightRate: 0.1884
      }
    ]
  },
  {
    details: {
      name: "Pinergy Prepay",
      startingDiscount: 0.33,
      standardDiscount: 0,
      serviceCharge: 0.3597,
      url: "https://pinergy.ie/terms-conditions/tariffs/",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 218.06,
        dayRate: 0.3673
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 251.88,
        dayRate: 0.3673
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 274.52,
        dayRate: 0.3772,
        nightRate: 0.2677
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 306.94,
        dayRate: 0.3772,
        nightRate: 0.2677
      }
    ]
  },
  {
    details: {
      name: "Panda Power",
      startingDiscount: 0.45,
      standardDiscount: 0,
      serviceCharge: 0.3597,
      url: "https://www.panda.ie/plan/electric-45/",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 285.49,
        dayRate: 0.501291
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 348.76,
        dayRate: 0.501291
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 347.15,
        dayRate: 0.539877,
        nightRate: 0.261818
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 451.52,
        dayRate: 0.539877,
        nightRate: 0.261818
      }
    ]
  },
  {
    details: {
      name: "Energia",
      startingDiscount: 0.27,
      standardDiscount: 0.12,
      url: "https://www.energia.ie/products/price-plans?fuelType=ElectricityOnly",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 236.62,
        dayRate: 0.3629
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 266.62,
        dayRate: 0.3629
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 296.40,
        dayRate: 0.3976,
        nightRate: 0.1908
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 326.40,
        dayRate: 0.3976,
        nightRate: 0.1908
      }
    ]
  },
  {
    details: {
      name: "Glow Power",
      startingDiscount: 0.35,
      standardDiscount: 0,
      url: "https://www.glowpower.ie/glowpower-standard/",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 399.091,
        dayRate: 0.6012
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 435.372,
        dayRate: 0.6292
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 477.274,
        dayRate: 0.6348,
        nightRate: 0.3300
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 572.4295,
        dayRate: 0.6348,
        nightRate: 0.3300
      }
    ]
  },
  {
    details: {
      name: "FloGas",
      startingDiscount: 0.40,
      standardDiscount: 0,
      url: "https://www.flogas.ie/residential/price-plans/?fuelType=electricity",
    },
    plans: [
      {
        region: "urban",
        meter: "day",
        standingCharge: 367.69,
        dayRate: 0.4726
      },
      {
        region: "rural",
        meter: "day",
        standingCharge: 448.42,
        dayRate: 0.4726
      },
      {
        region: "urban",
        meter: "night",
        standingCharge: 473.32,
        dayRate: 0.5260,
        nightRate: 0.2550
      },
      {
        region: "rural",
        meter: "night",
        standingCharge: 603.18,
        dayRate: 0.5260,
        nightRate: 0.2550
      }
    ]
  },
];
