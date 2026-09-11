export function toTitleCase(value: string | null | undefined) {
    return value?.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}