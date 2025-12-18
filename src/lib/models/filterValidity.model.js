export async function searchValidity(validDate, quantDays, codProduct, branchId, insertDate) {
  const validDate = validDate ?? {
    iniDate: 1,
    endDate: 2,
  };

  const insertDate = insertDate ?? {
    iniDate: 1,
    endDate: 2,
  };

  const quantDays = quantDays ?? quantDays;
  const codProduct = codProduct ?? codProduct;
  const branchId = branchId ?? branchId;
}

function buildUrl(params) {
  if (!params) {
    const url = "validities";
    return url;
  }
  const url = "validities?";
  const trueParams = params.map;
}

const test = buildUrl({ validDate, insertDate, quantDays, codProduct, branchId });
