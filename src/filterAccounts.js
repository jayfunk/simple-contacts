import get from 'lodash/get';

export default function filterAccounts(filters, accounts) {
  return accounts
    .filter(filterByName.bind(null, filters))
    .filter(filterBySelectOption.bind(null, filters, 'industry'))
    .filter(filterBySelectOption.bind(null, filters, 'rating'))
    .filter(filterBySelectOption.bind(null, filters, 'state'))
    .filter(filterByGreaterAnnualRevenue.bind(null, filters))
    .filter(filterByLessAnnualRevenue.bind(null, filters))
    .filter(filterByAfterEstablishedDate.bind(null, filters))
    .filter(filterByBeforeEstablishedDate.bind(null, filters));
}

function filterByName(filters, account) {
  if (get(filters, 'name')) {
    return account.name.toLowerCase().includes(get(filters, 'name').toLowerCase());
  }
  return true;
}

function filterBySelectOption(filters, fieldKey, account) {
  const filter = get(filters, fieldKey);

  if (!filter) {
    return true;
  }

  if (fieldKey === 'state') {
    return account.address.state === filter;
  }

  return account[fieldKey] === filter;
}

function filterByGreaterAnnualRevenue(filters, account) {
  const greaterAnnualRevenue = Number.parseFloat(
    get(filters, 'annualRevenue.greaterAnnualRevenue')
  );

  if (Number.isNaN(greaterAnnualRevenue) === false) {
    return account.annualRevenue >= greaterAnnualRevenue;
  }
  return true;
}

function filterByLessAnnualRevenue(filters, account) {
  const lessAnnualRevenue = Number.parseFloat(get(filters, 'annualRevenue.lessAnnualRevenue'));

  if (Number.isNaN(lessAnnualRevenue) === false) {
    return account.annualRevenue <= lessAnnualRevenue;
  }
  return true;
}

function convertDateStringToDate(dateString) {
  const [year, month, date] = dateString.split('-');
  return new Date(year, Number.parseInt(month) - 1, date);
}

function filterByAfterEstablishedDate(filters, account) {
  if (get(filters, 'establishedDate.afterEstablishedDate')) {
    return (
      convertDateStringToDate(account.establishedDate).getTime() >=
      convertDateStringToDate(get(filters, 'establishedDate.afterEstablishedDate')).getTime()
    );
  }
  return true;
}

function filterByBeforeEstablishedDate(filters, account) {
  if (get(filters, 'establishedDate.beforeEstablishedDate')) {
    return (
      convertDateStringToDate(account.establishedDate).getTime() <=
      convertDateStringToDate(get(filters, 'establishedDate.beforeEstablishedDate')).getTime()
    );
  }
  return true;
}
