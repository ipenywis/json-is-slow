import Benchmark from 'benchmark';
import getAllData from '../../data/get-all.json';
import { getAllHandler as avroAvscGetAllHandler } from '../../handlers/avro-avsc.js';
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
const avroAvscSerialized = avroAvscGetAllHandler.serialize(getAllData);
const jsBinarySerialized = jsBinaryGetAllHandler.serialize(getAllData);
const v8Serialized = v8GetAllHandler.serialize(getAllData);
const protobufSerialized = protobufGetAllHandler.serialize({
  items: getAllData
});

suite.add('getAll: JSON.parse', () => {
  jsonSchemaGetAllHandler.deserialize(jsonSchemaSerialized);
});
suite.add('getAll: msgpackR.unpack', () => {
  msgpackRGetAllHandler.deserialize(msgpackRSerialized);
});
suite.add('getAll: msgpack.decode', () => {
  msgpackGetAllHandler.deserialize(msgpackSerialized);
});
suite.add('getAll: avro-avsc.fromBuffer', () => {
  avroAvscGetAllHandler.deserialize(avroAvscSerialized);
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

export default suite;
