export const getRndInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export const getRndChars = (length: number): string => {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
