const lastDate = [
  {position: '16.91', kw_id: 643392, name: 'digital house'},
  {position: '3.00', kw_id: 643758, name: 'tadley web design'},
];

const previousToLastDate = [
  {position: '91', kw_id: 643392, name: 'digital house'},
];

let joinedArrays = [...lastDate, ...previousToLastDate];

const commonNames = {};

joinedArrays.forEach(item => {
  if (commonNames[item.name]) {
    commonNames[item.name] += 1;
  } else {
    commonNames[item.name] = 1;
  }
});

let commonName = '';
let occurrences = 0;

for (const i in commonNames) {
  if (commonNames[i] > occurrences) {
    commonName = i;
    occurrences = commonNames[i];
  }
}

joinedArrays = joinedArrays.filter(item => {
  return item.name === commonName;
});

console.log(joinedArrays, '-----');
