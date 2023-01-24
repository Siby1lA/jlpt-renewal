import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    wordColor: string;
    cardColor: string;
    rbColor: string;
  }
}
