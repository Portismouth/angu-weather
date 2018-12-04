'use strict';

angular.module('currentWeather').component('currentWeather', {
  templateUrl: 'current-weather/current-weather.template.html',
  controller: [
    '$http',
    '$filter',
    '$scope',
    'directionService',
    function CurrentWeatherController(
      $http,
      $filter,
      $scope,
      directionService
    ) {
      var self = this;
      // I know this should be hidden...
      self.weatherApiKey = '6b34e22a9232515d101279d760ce8799';
      self.defaultLocation = 60661;
      self.date = new Date();
      self.storedLocation = localStorage.getItem('city');
      // This works if you manually change it to true, just didn't get around to implementing front-end functionality
      self.celcius = false;

      $scope.changeCity = false;

      self.$onInit = function() {
        if (self.storedLocation === null) {
          self.getCurrentWeather(`q=${self.defaultLocation}`);
          self.getForecast(`q=${self.defaultLocation}`);
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              function(position) {
                self.getCurrentWeather(
                  `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
                );
                self.getForecast(
                  `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
                );
              },
              function(error) {
                self.forecast = [{ error: 'Something went wrong.' }];
              }
            );
          }
        } else {
          self.getCurrentWeather(`q=${self.storedLocation}`);
          self.getForecast(`q=${self.storedLocation}`);
        }
      };

      $scope.options = {
        types: ['(cities)']
      };

      $scope.updateCity = function(result) {
        console.log(result);
        localStorage.setItem('city', result.formatted_address);
        self.getCurrentWeather(`q=${result.formatted_address}`);
        self.getForecast(`q=${result.formatted_address}`);
        $scope.changeCity = false;
        $scope.result = '';
      };

      $scope.switchToCelcius = function() {
        !!self.celcius;
        self.getCurrentWeather(`q=${self.defaultLocation}`);
        self.getForecast(`q=${self.defaultLocation}`);
      };

      self.getCurrentWeather = function(query) {
        self.forecast = [];
        $http
          .get(
            `https://api.openweathermap.org/data/2.5/weather?${query}&type=accurate&units=imperial&appid=${self.weatherApiKey}`
          )
          .then(
            function(response) {
              var data = response['data'];
              $scope.timeOfForecast = data.dt;
              $scope.tempF = self.celcius
                ? Math.round(((data.main.temp - 32) * 5) / 9)
                : Math.round(data.main.temp);
              $scope.city = data.name;
              $scope.windSpeed = Math.round(data.wind.speed);
              $scope.windDirection = directionService.degToCompass(data.wind.deg);
              $scope.conditions = data.weather[0]['main'];
              self.getBackgroundImage(data.name).then(function(res) {
                $scope.image = res;
              });
            },
            function(error) {
              self.forecast = [{ error: 'Something went wrong.' }];
            }
          );
      };

      self.getForecast = function(query) {
        $http
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?${query}&units=imperial&appid=${self.weatherApiKey}`
          )
          .then(
            function(response) {
              self.forecast = [];

              let forecastRes = response.data.list;
              let currentDay, nextDay, conditions;
              var weather = {};
              let count = 1;

              for (let i = 0; i < forecastRes.length - 1; i++) {
                if (
                  $filter('date')(forecastRes[i].dt * 1000, 'shortDate') !==
                  $filter('date')(Date.now(), 'shortDate')
                ) {
                  currentDay = $filter('date')(
                    forecastRes[i].dt * 1000,
                    'fullDate'
                  );
                  nextDay = $filter('date')(
                    forecastRes[i + 1].dt * 1000,
                    'fullDate'
                  );

                  if (currentDay !== nextDay) {
                    count++;
                    weather['temp'] =
                      (weather['temp'] += forecastRes[i].main.temp) ||
                      forecastRes[i].main.temp;
                    weather['temp'] = self.celcius
                      ? Math.round(((weather['temp'] / count - 32) * 5) / 9)
                      : Math.round(weather['temp'] / count);
                    weather['dt'] = currentDay.split(',')[0];
                    conditions = forecastRes[i].weather[0].main;
                    weather['weather'] = conditions;
                    self.forecast.push(weather);
                    count = 0;
                    weather = {};
                  } else {
                    count++;
                    weather['temp'] =
                      (weather['temp'] += forecastRes[i].main.temp) ||
                      forecastRes[i].main.temp;
                  }
                }
              }
              weather['temp'] = self.celcius
                ? Math.round(((weather['temp'] / count - 32) * 5) / 9)
                : Math.round(weather['temp'] / count);
              weather['dt'] = currentDay.split(',')[0];
              weather['weather'] = conditions;
              self.forecast.push(weather);
            },
            function(error) {
              self.forecast = [{ error: 'Something went wrong.' }];
            }
          );
      };

      self.getBackgroundImage = function(query) {
        return $http
          .get(
            `https://api.unsplash.com/search/photos/?query=${query}&orientation=landscape&per_page=30&client_id=02b6081bb7a6222afa385e89309046c798c0a1c7ae9e05dbef125de31ff0050e`
          )
          .then(function(response) {
            return response
              .data.results[Math.floor(Math.random() * response.data.results.length)].urls.raw;
          });
      };
    }
  ]
});
