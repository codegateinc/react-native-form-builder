export const colors = {
    red: '#d40134',
    midnightBlue: '#2d3142',
    lightPrimary: '#fdf8f9',
    white: '#ffffff',
    gray: '#abadb4',
    customBlackTransparent: (opacity: number) => `rgba(0,0,0,${opacity})`,
    hexToRGBA: (hex: string, opacity: number) => hex
        .replace('#', '')
        .split(/(?=(?:..)*$)/)
        .map(x => parseInt(x, 16))
        .filter(num => !isNaN(num))
        .reduce((acc, color) => `${acc}${color},`, 'rgba(')
        .concat(`${opacity})`)
}
