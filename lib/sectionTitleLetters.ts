export type MagneticTitlePiece = {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
};

export type MagneticTitleLetter = {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pieces: MagneticTitlePiece[];
};

export type MagneticTitleConfig = {
  viewBoxWidth: number;
  viewBoxHeight: number;
  /** Full-title SVG used to slice letter pieces (replaces expired remote asset URLs). */
  svgSrc?: string;
  letters: MagneticTitleLetter[];
};

function svgToDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const creativeProjectsIUpper = svgToDataUri(`<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 0V23" stroke="#E63DC2" stroke-width="6"/>
<path d="M1.5 6L21.4186 17.5" stroke="#E63DC2" stroke-width="6"/>
<path d="M21.5 6.10547L1.58142 17.6055" stroke="#E63DC2" stroke-width="6"/>
</svg>`);

const creativeProjectsILower = svgToDataUri(`<svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.00195 28.8184V0.682617H10.2243V28.8184H1.00195Z" fill="black"/>
<path d="M1 0.682705V28.8183H10.2227V0.682705H1ZM11.2227 29.501H0V0H11.2227V29.501Z" fill="black"/>
</svg>`);

const moreWorksMSmall = svgToDataUri(`<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.377 0V20.7573" stroke="#5A00F4" stroke-width="5.41494"/>
<path d="M1.35352 5.41504L19.3298 15.7937" stroke="#5A00F4" stroke-width="5.41494"/>
<path d="M19.4023 5.50977L1.42603 15.8884" stroke="#5A00F4" stroke-width="5.41494"/>
</svg>`);

const moreWorksMLarge = svgToDataUri(`<svg width="56" height="44" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 42.2103V0.998047H8.7237L27.8024 14.3704H28.0906L47.1693 0.998047H54.893V42.2103H45.6706V12.526L32.5865 21.2872V42.2103H23.3641V21.2872L10.2223 12.526V42.2103H1Z" fill="black"/>
<path d="M47.1689 1L28.0898 14.3721H27.8018L8.72363 1H1V42.2119H10.2217V12.5273L23.3633 21.2891V42.2119H32.5859V21.2891L45.6699 12.5273V42.2119H54.8926V1H47.1689ZM55.8926 43.2119H44.6699V14.4004L33.5859 21.8223V43.2119H22.3633V21.8232L11.2217 14.3955V43.2119H0V0H9.03906L27.9453 13.251L46.5947 0.180664L46.8535 0H55.8926V43.2119Z" fill="black"/>
</svg>`);

export const sectionTitleLetters = {
  creativeProjects: {
    viewBoxWidth: 494,
    viewBoxHeight: 108,
    svgSrc: "/icon/headings/creative-projects-title.svg",
    letters: [
      {
        key: "C",
        x: 1,
        y: 12,
        width: 46.8427734375,
        height: 43.78871536254883,
        pieces: [
          {
            x: 1,
            y: 12,
            width: 46.8427734375,
            height: 43.78871536254883,
            src: "https://www.figma.com/api/mcp/asset/f903ec9a-4bee-4d45-ba8e-32900f123831",
          },
        ],
      },
      {
        key: "R",
        x: 51.599609375,
        y: 12.2890625,
        width: 50.3427734375,
        height: 43.2119140625,
        pieces: [
          {
            x: 51.599609375,
            y: 12.2890625,
            width: 50.3427734375,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/76b683e9-49d4-4a4c-98a9-8e8eb05bfde2",
          },
        ],
      },
      {
        key: "E",
        x: 106.537109375,
        y: 12.2890625,
        width: 47.189453125,
        height: 43.2119140625,
        pieces: [
          {
            x: 106.537109375,
            y: 12.2890625,
            width: 47.189453125,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/5bd0e6e9-ff68-4cc2-a623-5b861fb24f77",
          },
        ],
      },
      {
        key: "A",
        x: 154.03515625,
        y: 12.2890625,
        width: 54.451171875,
        height: 43.2119140625,
        pieces: [
          {
            x: 154.03515625,
            y: 12.2890625,
            width: 54.451171875,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/2482bf5c-11b4-446f-8b73-5680fa01b8b1",
          },
        ],
      },
      {
        key: "T",
        x: 203.376953125,
        y: 12.2890625,
        width: 52.72265625,
        height: 43.2119140625,
        pieces: [
          {
            x: 203.376953125,
            y: 12.2890625,
            width: 52.72265625,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/a7620961-a85f-4979-8251-c5c83fd69772",
          },
        ],
      },
      {
        key: "I",
        x: 260,
        y: 0,
        width: 20,
        height: 55.5009765625,
        pieces: [
          {
            x: 260,
            y: 0,
            width: 20,
            height: 23,
            src: creativeProjectsIUpper,
          },
          {
            x: 264.71,
            y: 26,
            width: 11.223,
            height: 29.5009765625,
            src: creativeProjectsILower,
          },
        ],
      },
      {
        key: "V",
        x: 284,
        y: 12,
        width: 54.451171875,
        height: 43.2119140625,
        pieces: [
          {
            x: 284,
            y: 12,
            width: 54.451171875,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/14821a3d-9774-47a3-968c-913dcbb02801",
          },
        ],
      },
      {
        key: "E2",
        x: 342.451171875,
        y: 12,
        width: 71.548828125,
        height: 43.2119140625,
        pieces: [
          {
            x: 342.451171875,
            y: 12,
            width: 71.548828125,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/c47af663-01c6-4b3d-8544-1df005ae22e4",
          },
        ],
      },
      {
        key: "P",
        x: 68,
        y: 63,
        width: 50.013671875,
        height: 43.2119140625,
        pieces: [
          {
            x: 68,
            y: 63,
            width: 50.013671875,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/97e71a1d-d120-4203-9bf1-5bea3767cd4f",
          },
        ],
      },
      {
        key: "R2",
        x: 123,
        y: 63,
        width: 50.3427734375,
        height: 43.2119140625,
        pieces: [
          {
            x: 123,
            y: 63,
            width: 50.3427734375,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/1c495a70-4753-4f5e-bd6f-d2a57e469fbb",
          },
        ],
      },
      {
        key: "O",
        x: 177.6953125,
        y: 63.7109375,
        width: 50.6171875,
        height: 44,
        pieces: [
          {
            x: 177.6953125,
            y: 63.7109375,
            width: 50.6171875,
            height: 44,
            src: "https://www.figma.com/api/mcp/asset/fac09671-fe89-45be-ba57-4687539e0bbf",
          },
        ],
      },
      {
        key: "J",
        x: 234.078125,
        y: 62.2890625,
        width: 41.9443359375,
        height: 43.5,
        pieces: [
          {
            x: 234.078125,
            y: 62.2890625,
            width: 41.9443359375,
            height: 43.5,
            src: "https://www.figma.com/api/mcp/asset/dd1ff257-5f58-41a6-8996-42f58b3152f2",
          },
        ],
      },
      {
        key: "E3",
        x: 282.1015625,
        y: 62.2890625,
        width: 47.189453125,
        height: 43.2119140625,
        pieces: [
          {
            x: 282.1015625,
            y: 62.2890625,
            width: 47.189453125,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/537bd53c-d265-4979-9c9a-921b7335d4bb",
          },
        ],
      },
      {
        key: "C2",
        x: 331.30078125,
        y: 62,
        width: 46.84375,
        height: 43.788719177246094,
        pieces: [
          {
            x: 331.30078125,
            y: 62,
            width: 46.84375,
            height: 43.788719177246094,
            src: "https://www.figma.com/api/mcp/asset/03a60b7c-eeba-4ad3-8861-7831f263521b",
          },
        ],
      },
      {
        key: "T2",
        x: 383.4609375,
        y: 62.2890625,
        width: 52.7236328125,
        height: 43.2119140625,
        pieces: [
          {
            x: 383.4609375,
            y: 62.2890625,
            width: 52.7236328125,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/507f0a3b-d179-4722-a49f-9c7267bdd675",
          },
        ],
      },
      {
        key: "S",
        x: 441.490234375,
        y: 62.0009765625,
        width: 50.58984375,
        height: 43.7880859375,
        pieces: [
          {
            x: 441.490234375,
            y: 62.0009765625,
            width: 50.58984375,
            height: 43.7880859375,
            src: "https://www.figma.com/api/mcp/asset/67d051a6-f753-444f-bb17-929035eaf71e",
          },
        ],
      },
    ],
  } satisfies MagneticTitleConfig,
  moreWorks: {
    viewBoxWidth: 564,
    viewBoxHeight: 59,
    svgSrc: "/icon/headings/more-work-title.svg",
    letters: [
      {
        key: "M",
        x: 2,
        y: 0,
        width: 78.892578125,
        height: 53.2119140625,
        pieces: [
          {
            x: 2,
            y: 0,
            width: 18.049,
            height: 20.757,
            src: moreWorksMSmall,
          },
          {
            x: 25,
            y: 10,
            width: 55.892578125,
            height: 43.2119140625,
            src: moreWorksMLarge,
          },
        ],
      },
      {
        key: "O",
        x: 86.96484375,
        y: 10.2109375,
        width: 49.466796875,
        height: 43,
        pieces: [
          {
            x: 86.96484375,
            y: 10.2109375,
            width: 49.466796875,
            height: 43,
            src: "https://www.figma.com/api/mcp/asset/dc756f25-98a9-46f7-97e4-107133199a6a",
          },
        ],
      },
      {
        key: "R",
        x: 141.85546875,
        y: 9.7890625,
        width: 50.3427734375,
        height: 43.2119140625,
        pieces: [
          {
            x: 141.85546875,
            y: 9.7890625,
            width: 50.3427734375,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/af75e87b-68d0-42f9-b7ec-64d03d4cd943",
          },
        ],
      },
      {
        key: "E",
        x: 197.79296875,
        y: 9.7890625,
        width: 47.189453125,
        height: 43.2119140625,
        pieces: [
          {
            x: 197.79296875,
            y: 9.7890625,
            width: 47.189453125,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/98f275e6-dfe6-4ed7-9e5a-b503f38b6bdc",
          },
        ],
      },
      {
        key: "W",
        x: 277.763671875,
        y: 9.7890625,
        width: 59.587890625,
        height: 43.2119140625,
        pieces: [
          {
            x: 277.763671875,
            y: 9.7890625,
            width: 59.587890625,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/3aba0b8a-1792-454c-bf95-1d980753b0c5",
          },
        ],
      },
      {
        key: "O2",
        x: 339,
        y: 3,
        width: 56,
        height: 56,
        pieces: [
          {
            x: 339,
            y: 3,
            width: 56,
            height: 56,
            src: "https://www.figma.com/api/mcp/asset/47f6d6ff-a067-4003-aca0-397a2725417e",
          },
        ],
      },
      {
        key: "R2",
        x: 399.41796875,
        y: 9.7890625,
        width: 50.3427734375,
        height: 43.2119140625,
        pieces: [
          {
            x: 399.41796875,
            y: 9.7890625,
            width: 50.3427734375,
            height: 43.2119140625,
            src: "https://www.figma.com/api/mcp/asset/d5ed746d-dbf3-448c-b921-f2449410825e",
          },
        ],
      },
      {
        key: "K",
        x: 456.357421875,
        y: 9.90234375,
        width: 51.078125,
        height: 43.0966796875,
        pieces: [
          {
            x: 456.357421875,
            y: 9.90234375,
            width: 51.078125,
            height: 43.0966796875,
            src: "https://www.figma.com/api/mcp/asset/491e2b06-336f-4ca8-a8c5-d69faed1e957",
          },
        ],
      },
      {
        key: "S",
        x: 509.625,
        y: 9.5,
        width: 50.58984375,
        height: 43.7880859375,
        pieces: [
          {
            x: 509.625,
            y: 9.5,
            width: 50.58984375,
            height: 43.7880859375,
            src: "https://www.figma.com/api/mcp/asset/36625bf4-494c-4ff3-ab67-3701d0c6fd1d",
          },
        ],
      },
    ],
  } satisfies MagneticTitleConfig,
} as const;
