class ErrorsHanlder {
  location;
  setLocation = (location) => {
    this.location = location;
  };
  getLocation = () => {
    return this.location;
  };
  throw_500 = (error, location) => {
    throw {
      status: 500,
      error,
      location,
    };
  };
  throw_404 = (error, message = "not found") => {
    throw {
      status: 404,
      error,
      message,
    };
  };
  throw_400 = (error, message = "bad request") => {
    throw {
      status: 400,
      error,
      message,
    };
  };
}
module.exports = new ErrorsHanlder();
