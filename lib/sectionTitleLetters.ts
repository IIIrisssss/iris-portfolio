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

const creativeProjectsA = svgToDataUri(`<svg width="55" height="44" viewBox="0 0 55 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.54883 42.2123L20.1087 1H34.3457L52.9056 42.2123H42.8764L38.9569 33.5087H15.4976L11.5781 42.2123H1.54883ZM18.8407 26.0156H35.6138L27.6019 8.20494H26.8526L18.8407 26.0156Z" fill="black"/>
<path d="M34.9902 0L54.4512 43.2119H42.2285L38.3086 34.5088H16.1426L12.2227 43.2119H0L19.4609 0H34.9902ZM20.1074 1L1.54688 42.2119H11.5762L15.4961 33.5088H38.9551L42.875 42.2119H52.9043L34.3438 1H20.1074ZM27.6006 8.2041L35.6123 26.0156H18.8389L26.8506 8.2041H27.6006ZM20.3857 25.0156H34.0654L27.2256 9.80859L20.3857 25.0156Z" fill="black"/>
</svg>`);

const creativeProjectsT = svgToDataUri(`<svg width="53" height="44" viewBox="0 0 53 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 21.8655V1H51.7228V21.8655H42.3852V8.49314H29.8198V42.2123H20.5974V8.49314H10.3376V21.8655H1Z" fill="#00C4E7"/>
<path d="M1 1V21.8652H10.3369V8.49316H20.5967V42.2119H29.8193V8.49316H42.3848V21.8652H51.7227V1H1ZM52.7227 22.8652H41.3848V9.49316H30.8193V43.2119H19.5967V9.49316H11.3369V22.8652H0V0H52.7227V22.8652Z" fill="#00C4E7"/>
</svg>`);

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
    viewBoxWidth: 492,
    viewBoxHeight: 108,
    svgSrc: "/icon/headings/creative-projects-title.svg",
    letters: [
      {
        key: "C",
        x: 0,
        y: 11.9615,
        width: 46.843,
        height: 43.827,
        pieces: [
          {
            x: 0,
            y: 11.9615,
            width: 46.843,
            height: 43.827,
            src: "https://www.figma.com/api/mcp/asset/f903ec9a-4bee-4d45-ba8e-32900f123831",
          },
        ],
      },
      {
        key: "R",
        x: 50.5996,
        y: 12.2891,
        width: 50.342,
        height: 43.212,
        pieces: [
          {
            x: 50.5996,
            y: 12.2891,
            width: 50.342,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/76b683e9-49d4-4a4c-98a9-8e8eb05bfde2",
          },
        ],
      },
      {
        key: "E",
        x: 105.537,
        y: 12.2891,
        width: 47.19,
        height: 43.212,
        pieces: [
          {
            x: 105.537,
            y: 12.2891,
            width: 47.19,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/5bd0e6e9-ff68-4cc2-a623-5b861fb24f77",
          },
        ],
      },
      {
        key: "A",
        x: 153.035,
        y: 12.2890625,
        width: 55,
        height: 44,
        pieces: [
          {
            x: 153.035,
            y: 12.2890625,
            width: 55,
            height: 44,
            src: creativeProjectsA,
          },
        ],
      },
      {
        key: "T",
        x: 203.377,
        y: 12.2890625,
        width: 53,
        height: 44,
        pieces: [
          {
            x: 203.377,
            y: 12.2890625,
            width: 53,
            height: 44,
            src: creativeProjectsT,
          },
        ],
      },
      {
        key: "I",
        x: 259,
        y: 0,
        width: 20,
        height: 55.501,
        pieces: [
          {
            x: 259,
            y: 0,
            width: 20,
            height: 23,
            src: creativeProjectsIUpper,
          },
          {
            x: 264.711,
            y: 26,
            width: 11.223,
            height: 29.501,
            src: creativeProjectsILower,
          },
        ],
      },
      {
        key: "V",
        x: 283,
        y: 12,
        width: 54.451,
        height: 43.212,
        pieces: [
          {
            x: 283,
            y: 12,
            width: 54.451,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/14821a3d-9774-47a3-968c-913dcbb02801",
          },
        ],
      },
      {
        key: "E2",
        x: 341.451,
        y: 12,
        width: 71.549,
        height: 43.212,
        pieces: [
          {
            x: 341.451,
            y: 12,
            width: 71.549,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/c47af663-01c6-4b3d-8544-1df005ae22e4",
          },
        ],
      },
      {
        key: "P",
        x: 67,
        y: 63,
        width: 50.014,
        height: 43.212,
        pieces: [
          {
            x: 67,
            y: 63,
            width: 50.014,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/97e71a1d-d120-4203-9bf1-5bea3767cd4f",
          },
        ],
      },
      {
        key: "R2",
        x: 122,
        y: 63,
        width: 50.343,
        height: 43.212,
        pieces: [
          {
            x: 122,
            y: 63,
            width: 50.343,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/1c495a70-4753-4f5e-bd6f-d2a57e469fbb",
          },
        ],
      },
      {
        key: "O",
        x: 177.414,
        y: 63.7109,
        width: 49.898,
        height: 44,
        pieces: [
          {
            x: 177.414,
            y: 63.7109,
            width: 49.898,
            height: 44,
            src: "https://www.figma.com/api/mcp/asset/fac09671-fe89-45be-ba57-4687539e0bbf",
          },
        ],
      },
      {
        key: "J",
        x: 233.078,
        y: 62.2891,
        width: 41.944,
        height: 43.5,
        pieces: [
          {
            x: 233.078,
            y: 62.2891,
            width: 41.944,
            height: 43.5,
            src: "https://www.figma.com/api/mcp/asset/dd1ff257-5f58-41a6-8996-42f58b3152f2",
          },
        ],
      },
      {
        key: "E3",
        x: 281.102,
        y: 62.2891,
        width: 47.189,
        height: 43.212,
        pieces: [
          {
            x: 281.102,
            y: 62.2891,
            width: 47.189,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/537bd53c-d265-4979-9c9a-921b7335d4bb",
          },
        ],
      },
      {
        key: "C2",
        x: 330.301,
        y: 61.9615,
        width: 46.844,
        height: 43.828,
        pieces: [
          {
            x: 330.301,
            y: 61.9615,
            width: 46.844,
            height: 43.828,
            src: "https://www.figma.com/api/mcp/asset/03a60b7c-eeba-4ad3-8861-7831f263521b",
          },
        ],
      },
      {
        key: "T2",
        x: 382.461,
        y: 62.2891,
        width: 52.724,
        height: 43.212,
        pieces: [
          {
            x: 382.461,
            y: 62.2891,
            width: 52.724,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/507f0a3b-d179-4722-a49f-9c7267bdd675",
          },
        ],
      },
      {
        key: "S",
        x: 440.49,
        y: 62.001,
        width: 50.59,
        height: 43.788,
        pieces: [
          {
            x: 440.49,
            y: 62.001,
            width: 50.59,
            height: 43.788,
            src: "https://www.figma.com/api/mcp/asset/67d051a6-f753-444f-bb17-929035eaf71e",
          },
        ],
      },
    ],
  } satisfies MagneticTitleConfig,
  moreWorks: {
    viewBoxWidth: 560,
    viewBoxHeight: 57,
    svgSrc: "/icon/headings/more-work-title.svg",
    letters: [
      {
        key: "M",
        x: 1.35352,
        y: 0,
        width: 78.893,
        height: 53.212,
        pieces: [
          {
            x: 1.35352,
            y: 0,
            width: 18.049,
            height: 20.757,
            src: moreWorksMSmall,
          },
          {
            x: 24.3535,
            y: 10,
            width: 55.893,
            height: 43.212,
            src: moreWorksMLarge,
          },
        ],
      },
      {
        key: "O",
        x: 86.3184,
        y: 10.2109,
        width: 49.467,
        height: 43,
        pieces: [
          {
            x: 86.3184,
            y: 10.2109,
            width: 49.467,
            height: 43,
            src: "https://www.figma.com/api/mcp/asset/dc756f25-98a9-46f7-97e4-107133199a6a",
          },
        ],
      },
      {
        key: "R",
        x: 141.209,
        y: 9.78906,
        width: 50.343,
        height: 43.212,
        pieces: [
          {
            x: 141.209,
            y: 9.78906,
            width: 50.343,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/af75e87b-68d0-42f9-b7ec-64d03d4cd943",
          },
        ],
      },
      {
        key: "E",
        x: 197.146,
        y: 9.78906,
        width: 47.19,
        height: 43.212,
        pieces: [
          {
            x: 197.146,
            y: 9.78906,
            width: 47.19,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/98f275e6-dfe6-4ed7-9e5a-b503f38b6bdc",
          },
        ],
      },
      {
        key: "W",
        x: 277.117,
        y: 9.78906,
        width: 59.588,
        height: 43.212,
        pieces: [
          {
            x: 277.117,
            y: 9.78906,
            width: 59.588,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/3aba0b8a-1792-454c-bf95-1d980753b0c5",
          },
        ],
      },
      {
        key: "O2",
        x: 339.49,
        y: 3.95453,
        width: 53.727,
        height: 53.18,
        pieces: [
          {
            x: 339.49,
            y: 3.95453,
            width: 53.727,
            height: 53.18,
            src: "https://www.figma.com/api/mcp/asset/47f6d6ff-a067-4003-aca0-397a2725417e",
          },
        ],
      },
      {
        key: "R2",
        x: 398.771,
        y: 9.78906,
        width: 50.343,
        height: 43.212,
        pieces: [
          {
            x: 398.771,
            y: 9.78906,
            width: 50.343,
            height: 43.212,
            src: "https://www.figma.com/api/mcp/asset/d5ed746d-dbf3-448c-b921-f2449410825e",
          },
        ],
      },
      {
        key: "K",
        x: 455.711,
        y: 9.90234,
        width: 51.078,
        height: 43.097,
        pieces: [
          {
            x: 455.711,
            y: 9.90234,
            width: 51.078,
            height: 43.097,
            src: "https://www.figma.com/api/mcp/asset/491e2b06-336f-4ca8-a8c5-d69faed1e957",
          },
        ],
      },
      {
        key: "S",
        x: 508.979,
        y: 9.5,
        width: 50.589,
        height: 43.788,
        pieces: [
          {
            x: 508.979,
            y: 9.5,
            width: 50.589,
            height: 43.788,
            src: "https://www.figma.com/api/mcp/asset/36625bf4-494c-4ff3-ab67-3701d0c6fd1d",
          },
        ],
      },
    ],
  } satisfies MagneticTitleConfig,
} as const;
