import useWindowDimensions from "./useWindowDimensions";

export const Colors = {
    background: '#000001', //#000001
    text: '#EFE9F4', //#DCCCA3
    primary: '#D56062', //#DCCCA3
    secondary: '#84BCDA',
    secondaryDark: '#067BC2',
    tertiary: '#D56062',
    green: "#28a850",
    darkerGreen: "#20a85a",
    red: "#e64640",
}

export const radius = 10;
export const padding = 10;
export const smallPadding = 7;

export const useFdim = () => {
    const window = useWindowDimensions();
    const fdim = (window.height && window.width ? Math.min(window.height * 0.5, window.width) : 650) * 1.5;
    return Math.min(Math.max(fdim, 800), 1000);
}
