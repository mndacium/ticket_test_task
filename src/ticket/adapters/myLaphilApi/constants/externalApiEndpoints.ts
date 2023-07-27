export const getSeatsEndpoint = (eventId: number) => {
  return `https://my.laphil.com/en/rest-proxy/TXN/Packages/${eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId=${eventId}`;
};

export const getPricesEndpoint = (eventId: number) => {
  return `https://my.laphil.com/en/rest-proxy/TXN/Packages/${eventId}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`;
};

export const getSectionsEndpoint = () => {
  return 'https://my.laphil.com/en/rest-proxy/ReferenceData/Sections?seatMapId=12';
};
