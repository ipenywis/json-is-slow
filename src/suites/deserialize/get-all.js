import Benchmark from 'benchmark';
import getAllData from '../../data/get-all.json';
import { getAllHandler as avroAvscGetAllHandler } from '../../handlers/avro-avsc.js';
import { getAllHandler as jsonSchemaGetAllHandler } from '../../handlers/json-schema.js';
import { getAllHandler as msgpackRGetAllHandler } from '../../handlers/msgpackr.js';

// Suite
const suite = new Benchmark.Suite();
suite.on('cycle', (e) => console.log(e.target.toString()));
suite.on('complete', function () {
  console.log('\n', 'Fastest is ' + this.filter('fastest').map('name'), '\n');
});

// Caches
const jsonSchemaSerialized = jsonSchemaGetAllHandler.serialize(getAllData);
const msgpackRSerialized = msgpackRGetAllHandler.serialize(getAllData);
const avroAvscSerialized = avroAvscGetAllHandler.serialize(getAllData);

suite.add('getAll::JSON Schema[deserialize]', () => {
  jsonSchemaGetAllHandler.deserialize(jsonSchemaSerialized);
});
suite.add('getAll::msgpackR[deserialize]', () => {
  msgpackRGetAllHandler.deserialize(msgpackRSerialized);
});
suite.add('getAll::avro-avsc[deserialize]', () => {
  avroAvscGetAllHandler.deserialize(avroAvscSerialized);
});

export default suite;
