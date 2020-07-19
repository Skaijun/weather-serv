class WeatherApp {
  constructor() {
    this.selectElements();
    this.formSubmitEvent = this.formSubmitEvent.bind(this);
    this.handleEvents();
  }
  selectElements() {
    this.form = document.getElementById("weather-form");
    this.input = document.getElementById("weather-input");
    this.output = document.getElementById("weather-output");
  }
  handleEvents() {
    this.form.addEventListener("submit", this.formSubmitEvent);
  }
  formSubmitEvent(e) {
    e.preventDefault();
    let vm = this;
    this.output.textContent = "loading..";

    let location = this.input.value;

    fetch(`/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
        if (data.err) {
          vm.output.textContent = data.err;
        } else {
          vm.output.innerHTML = `<span>${data.location}</span><br><span>${data.temperature}</span>`;
        }
      });
    });

    this.input.value = "";
  }
}

const weatherApp = new WeatherApp();
