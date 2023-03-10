const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😢');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};

const getDogPiic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed:${data}`);

    const res1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const responses = await Promise.all([res1, res2, res3]);
    const imgs = responses.map((item) => item.body.message);
    console.log(imgs);
    // console.log(responses);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2:ready';
};

(async () => {
  try {
    console.log('1 get dog pics');
    const x = await getDogPiic();
    console.log(x);
    console.log('3 done dog pics');
  } catch (err) {
    console.log('errrrrrrrrrr');
  }
})();

/*
console.log('1 get dog pics');
getDogPiic()
  .then((x) => {
    console.log(x);
console.log('1 get dog pics');
    console.log('3 done dog pics');
  })
  .catch((err) => console.log('errrrrrrrrrr'));
*/
