const formatDate = rawDate => {
  const dateMili = new Date(Date.parse(rawDate));

  let date = "";
  const olderThan24Hours = Date.now() - 86400000;
  if (dateMili < olderThan24Hours) {
    date = dateMili.toLocaleDateString();
    //posts day without time
  } else {
    const now = new Date(Date.now());
    const hoursAgo = Math.floor(Math.abs(now - dateMili) / 36e5);
    //converts difference in milliseconds rounded down into hours
    date = hoursAgo === 1 ? `${hoursAgo} hour ago` : `${hoursAgo} hours ago`;
  }
  return date;
};

module.exports = formatDate;
