import Benchmark from 'benchmark';
import getAllData from '../../data/get-all.json';
import { getAllHandler as avroGetAllHandler } from '../../handlers/avro.js';
import { getAllHandler as avscGetAllHandler } from '../../handlers/avsc.js';
import { getAllHandler as bserGetAllHandler } from '../../handlers/bser.js';
import { getAllHandler as BSONGetAllHandler } from '../../handlers/bson.js';
import { getAllHandler as jsBinaryGetAllHandler } from '../../handlers/js-binary.js';
import { getAllHandler as jsonSchemaGetAllHandler } from '../../handlers/json-schema.js';
import { getAllHandler as msgpackGetAllHandler } from '../../handlers/msgpack.js';
import { getAllHandler as msgpackRGetAllHandler } from '../../handlers/msgpackr.js';
import { getAllHandler as protobufGetAllHandler } from '../../handlers/protobuf.js';
import { getAllHandler as v8GetAllHandler } from '../../handlers/v8.js';

// Suite
const suite = new Benchmark.Suite();
const table = [];
suite.on('cycle', (e) => {
  table.push({
    name: e.target.name,
    type: 'deserialization',
    ops: Math.round(e.target.hz)
  });
});
suite.on('complete', function () {
  console.table(table.sort((a, b) => b.ops - a.ops));
});

// Caches & Serialized content
const jsonSchemaSerialized = jsonSchemaGetAllHandler.serialize(getAllData);
const msgpackRSerialized = msgpackRGetAllHandler.serialize(getAllData);
const msgpackSerialized = msgpackGetAllHandler.serialize(getAllData);
const avscSerialized = avscGetAllHandler.serialize(getAllData);
const avroSerialized = avroGetAllHandler.serialize(getAllData);
const jsBinarySerialized = jsBinaryGetAllHandler.serialize(getAllData);
const v8Serialized = v8GetAllHandler.serialize(getAllData);
const protobufSerialized = protobufGetAllHandler.serialize({
  items: getAllData
});
const BSONSerialized = BSONGetAllHandler.serialize(getAllData);
const bserSerialized = bserGetAllHandler.serialize(getAllData);

suite.add('getAll: JSON.parse', () => {
  jsonSchemaGetAllHandler.deserialize(jsonSchemaSerialized);
});
suite.add('getAll: msgpackR.unpack', () => {
  msgpackRGetAllHandler.deserialize(msgpackRSerialized);
});
suite.add('getAll: msgpack.decode', () => {
  msgpackGetAllHandler.deserialize(msgpackSerialized);
});
suite.add('getAll: avsc.fromBuffer', () => {
  avscGetAllHandler.deserialize(avscSerialized);
});
suite.add('getAll: avro.fromBuffer', () => {
  avroGetAllHandler.deserialize(avroSerialized);
});
suite.add('getAll: js-binary.decode', () => {
  jsBinaryGetAllHandler.deserialize(jsBinarySerialized);
});
suite.add('getAll: v8.deserialize', () => {
  v8GetAllHandler.deserialize(v8Serialized);
});
suite.add('getAll: protobuf.decode', () => {
  protobufGetAllHandler.deserialize(protobufSerialized);
});
suite.add('getAll: BSON.deserialize', () => {
  BSONGetAllHandler.deserialize(BSONSerialized);
});
suite.add('getAll: bser.loadFromBuffer', () => {
  bserGetAllHandler.deserialize(bserSerialized);
});

export default suite;
