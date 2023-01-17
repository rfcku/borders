export const querys = {
  Canada: [
    "Canada",
    "Canadian",
    "Canadien",
    "Canadienne",
    "CAD",
    "CAN",
    "Can",
    "Cana",
    "Cdn",
    "CDN",
    "CDA",
    "Cda",
    "can",
    "cana",
    "cdn",
    "cda",
    "canada",
    "canadian",
    "canadien",
    "canadienne",
  ],
  Mexico: [
    "Mexico",
    "Mexican",
    "Mexicain",
    "Mexicaine",
    "MX",
    "MEX",
    "Mex",
    "Mexi",
    "mx",
    "mex",
    "mexi",
    "mexico",
    "mexican",
    "mexicain",
    "mexicaine",
  ],
};

export const validQuery = (query) => {
  //remove spaces and quotes from query
  query = query.replace(/['"]+/g, "");
  //for each country in querys object check if query is valid for that country and return country name if valid or false if not valid
  for (const country in querys) {
    if (querys[country].includes(query)) {
      return country;
    }
  }
  return false;
};
