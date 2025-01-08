export const makeFriendlyShelfName = (shelfName) => {
  let friendlyName = shelfName.replace(/([A-Z])/g, " $1").trim();
  return friendlyName[0].toUpperCase() + friendlyName.slice(1);
};
