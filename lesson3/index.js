const fs = require('fs');
const streams = (...ips) => {
  const readStream = fs.createReadStream('./access.log', 'utf8');

  if (ips.length == 0) throw new Error('Ошибка передачи IP адресов');

  ips.forEach((ip) => {
    const writeStream = fs.createWriteStream(`./${ip}_requests.log`, {
      flag: 'a',
      encoding: 'utf8'
    });
    readStream.on('data', chunk => {
      const res = chunk
      .toString()
      .split('\n')
      .filter((el) => el.indexOf(`${ip}`) != -1)
      .join('\n');

      writeStream.write(res);
    });
  });
};

streams('89.123.1.41', '34.48.240.111');