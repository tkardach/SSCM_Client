
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
  return fetch(process.env.REACT_APP_SSCM_STATISTICS_API + '/signins')
    .then(async data => await data.json())
    .catch(err => console.log(err));
}

async function getMemberSignIns(id) {
  const results = await getSignins();

  return results.filter(signin => {
    return signin.id === id;
  });
}

async function getMemberAndTotalSignins(id) {
  const results = await getSignins();

  const member = results.filter(signin => {
    return signin.id === id;
  });

  const remaining = results.filter(signin => {
    return signin.id !== id;
  });

  return {member, remaining}
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

  for (let signin of results) {
    const ts = new Date(signin.ts);
    if (ts < start || ts > end) continue;

    const key = getFilterKey(ts, filter);
    
    if (!memberFiltered[key])
      memberFiltered[key] = 0;
    if (!filtered[key])
      filtered[key] =0;

    if (memberId && signin.id === memberId)
      memberFiltered[key]++;
    else
      filtered[key]++;
  }

  return { memberFiltered, filtered };
}