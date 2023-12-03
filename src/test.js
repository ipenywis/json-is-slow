import fastJson from 'fast-json-stringify';
import getAllSchema from './schema/json-schema/get-all.json' assert { type: 'json' };
import getAllData from './data/get-all.json' assert { type: 'json' };

const stringify = fastJson(getAllSchema);

const result = stringify(getAllData);

console.log('Result: ', result);
