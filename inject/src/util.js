function getElapseTimeByMs(ms) {
  const hours = Math.floor(ms / 1000 / 60 / 60);
  const days = Math.floor(hours / 24);
  const str = (days ? `${days}d` : `${hours}h`);

  return {
    days,
    hours,
    format: str,
  };
}

export default {
  getElapseTimeByMs,
};
