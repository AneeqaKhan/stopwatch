class Stopwatch {
  constructor(display, results) {
    this.running = false;
    this.display = display;
    this.results = results;
    this.laps = [];
    this.reset();
    this.print(this.times);
    this.toggleBtn = document.getElementById("toggle");
    this.splitBtn = document.getElementById("split");
    this.resetBtn = document.getElementById("reset");
    this.splitTime = document.getElementById("splitTime");
  }

  reset() {
    this.times = [0, 0, 0];
  }

  toggle() {
    if (this.running) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    this.toggleBtn.value = "Pause";
    this.splitBtn.disabled = false;
    this.resetBtn.disabled = true;
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
    this.toggleBtn.style =
      "background-color: #FB657F; color: white; border-color: #FB657F";
    this.resetBtn.style = "background-color: inherit;";
    this.splitBtn.style =
      "background-color: #F29E26; color: white; border-color: #F29E26";
  }

  lap() {
    let times = this.times;
    let li = document.createElement("li");
    let t = this.format(times);
    this.splitTime.innerText = t;
    li.innerText = t + "\tSplit";
    this.results.appendChild(li);
  }

  stop() {
    this.toggleBtn.value = "Start";
    this.splitBtn.disabled = true;
    this.resetBtn.disabled = false;
    this.running = false;
    this.time = null;
    let times = this.times;
    let li = document.createElement("li");
    let t = this.format(times);
    li.innerText = t + "\tPause";
    this.results.appendChild(li);
    this.toggleBtn.style =
      "background-color: #18A69D; color: white; border-color: #18A69D;";
    this.splitBtn.style = "background-color: inherit;";
    this.resetBtn.style =
      "background-color: #4487D0; color: white; border-color: #4487D0";
  }

  restart() {
    this.toggleBtn.value = "Pause";
    this.splitBtn.disabled = false;
    this.resetBtn.disabled = true;
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
    this.reset();
    this.toggleBtn.style =
      "background-color: #FB657F; color: white; border-color: #FB657F";
    this.resetBtn.style = "background-color: inherit;";
    this.splitBtn.style =
      "background-color: #F29E26; color: white; border-color: #F29E26";
  }

  step(timestamp) {
    if (!this.running) return;
    this.calculate(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  calculate(timestamp) {
    var diff = timestamp - this.time;
    this.times[2] += diff / 10;
    if (this.times[2] >= 100) {
      this.times[1] += 1;
      this.times[2] -= 100;
    }
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `\
        ${pad0(times[0], 2)}:\
        ${pad0(times[1], 2)}:\
        ${pad0(Math.floor(times[2]), 3)}`;
  }
}

function pad0(value, count) {
  var result = value.toString();
  for (; result.length < count; --count) result = "0" + result;
  return result;
}

let stopwatch = new Stopwatch(
  document.querySelector(".stopwatch"),
  document.querySelector(".results")
);
