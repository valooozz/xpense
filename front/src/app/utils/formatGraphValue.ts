export const formatGraphValue = (value: number): string => {
    const factor = 100;
    const truncated = Math.floor(value * factor) / factor;
    return truncated.toString();
}