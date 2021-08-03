const color = require('colors');
const EventEmitter = require('events');
const emitter = new EventEmitter();
let timerId;

let timer = [...process.argv].slice(2).map((item) => {
  let date = item.split('-');
  return {
    value: new Date(`${date[3]}-${date[2]}-${date[1]}T${date[0]}:00:00`),
    active: true
  };
});

const updateTimer = () => {
  console.clear()
  timer.forEach((item) => {
    if (item.active) {
      let timeLeft = item.value.getTime() - new Date().getTime();
      if (timeLeft > 0) {
        console.log(`До ${color.blue(item.value.toString())} осталось: ${color.green(parseInt(timeLeft/1000))} секунд`);
      } else {
        console.log(color.green(`Время вышло`));
        item.active = false;
      }
    }
  });
};

emitter.on('tick', updateTimer);
timerId = setInterval(() => emitter.emit('tick'), 1000);