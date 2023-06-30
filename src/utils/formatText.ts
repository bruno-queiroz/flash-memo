export const formatText = (text: string | undefined) => {
  if (!text) return [""];
  const regex = /\n/g;
  const textSeparatedOnBreaklines = text.split(regex);
  return textSeparatedOnBreaklines;
};
