const testService = () => {
  return {
    status: "OK",
    message: "Service layer working fine",
    timestamp: new Date(),
  };
};

module.exports = testService;
