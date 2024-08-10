const removeBoldTags = (content: string): string => {
  return content.replace(/<\/?b>/g, "");
};

export default removeBoldTags;
