export default function prettyFormatStringNode (text, disableTrailingFullStop=false) { // We are civilised after all
    if (text.endsWith(".") === false && disableTrailingFullStop === false)
    {
        text += ".";
    }
    if (text.charAt(0) !== text.charAt(0).toUpperCase())
    {
        text = text.charAt(0).toUpperCase() + text.substring(1);
    }
    return text;
}