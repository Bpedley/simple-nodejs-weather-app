const request = require("request");
const expect = require("chai").expect;

let weather,
  city = "",
  units = "imperial";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather",
  apiKey = "faa7c0fda620eff5d8e899e34c7f5224";


describe("Default arguments for API call", function() {
  it("Should return error 400", function(done) {
    request.get(baseUrl + `?q=${city}&units=${units}&appid=${apiKey}`, function(err, res, body) {
        weather = JSON.parse(body);
        expect(res.statusCode).to.equal(400);
        expect(weather.cod).to.equal("400");
        expect(weather.message).to.equal("Nothing to geocode");
      done();
    });
  });
});

describe("City - New York", function() {
  it("Should return weather data for New York", function(done) {
    city = "new york";
    request.get(baseUrl + `?q=${city}&units=${units}&appid=${apiKey}`, function(err, res, body) {
        weather = JSON.parse(body);
        expect(res.statusCode).to.equal(200);
        expect(weather.id).to.equal(5128581);
        expect(weather.name).to.equal("New York");
        expect(weather.sys.country).to.equal("US");
        expect(weather.coord.lon).to.equal(-73.99);
        expect(weather.coord.lat).to.equal(40.73);
      done();
    });
  });
});

describe("Change units to metric and city to Moscow", function() {
  it("Should return weather data for Moscow using metric units", function(done) {
    city = "moscow";
    units = "metric";
    request.get(baseUrl + `?q=${city}&units=${units}&appid=${apiKey}`, function(err, res, body) {
        weather = JSON.parse(body);
        expect(res.statusCode).to.equal(200);
        expect(weather.id).to.equal(524901);
        expect(weather.name).to.equal("Moscow");
        expect(weather.sys.country).to.equal("RU");
        expect(weather.coord.lon).to.equal(37.62);
        expect(weather.coord.lat).to.equal(55.75);
      done();
    });
  });
});

describe("City that does not exist", function() {
  it("Should return error 404", function(done) {
    city = "vadwacw";
    request.get(baseUrl + `?q=${city}&units=${units}&appid=${apiKey}`, function(err, res, body) {
        weather = JSON.parse(body);
        expect(res.statusCode).to.equal(404);
        expect(weather.cod).to.equal("404");
        expect(weather.message).to.equal("city not found");
      done();
    });
  });
});

describe("Do not specify api key", function() {
  it("Should return error 401", function(done) {
    request.get(baseUrl + `?q=${city}&units=${units}&appid=`, function(err, res, body) {
        weather = JSON.parse(body);
        expect(res.statusCode).to.equal(401);
        expect(weather.cod).to.equal(401);
        expect(weather.message).to.equal("Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.");
      done();
    });
  });
});
