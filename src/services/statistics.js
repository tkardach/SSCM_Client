
export const Filter = {
  HOUR: 0,
  DAY: 1,
  MONTH: 2,
  YEAR: 3
}

const MAX_DATE = new Date(8640000000000000);
const MIN_DATE = new Date(-8640000000000000);
const monthFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "2-digit" }).format;
const yearFormat = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format;

async function getSignins() {
  return fetch(
    process.env.REACT_APP_SSCM_STATISTICS_API + '/signins')
    .then(async data => await data.json())
    .catch(err => console.log(err));
}

function getFilterKey(date, filter) {
  switch (filter) {
    case Filter.HOUR:
      return date.toString();
    case Filter.DAY:
      return date.toLocaleDateString('en-US');
    case Filter.YEAR:
      return yearFormat(date);
    case Filter.MONTH:
    default:
      return monthFormat(date);
  }
}

export async function getMemberSigninsByFilter(filter, memberId=null, start=MIN_DATE, end=MAX_DATE) {
  const results = await getSignins();
  
  // Group by filter values
  const filtered = {};
  const memberFiltered = {};
  let memberTotal = 0;
  let total = 0;

  for (let signin of results) {
    const ts = new Date(signin.ts);
    if (ts < start || ts > end) continue;

    const key = getFilterKey(ts, filter);

    if (!memberFiltered[key])
      memberFiltered[key] = 0;
    if (!filtered[key])
      filtered[key] =0;

    if (memberId && signin.id === memberId) {
      memberTotal++;
      memberFiltered[key]++;
    } else {
      total++;
      filtered[key]++;
    }
  }

  return { memberFiltered, filtered, memberTotal, total };
}