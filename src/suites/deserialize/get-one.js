import Benchmark from 'benchmark';
import getAllData from '../../data/get-one.json' assert { type: 'json' };
import { getOneHandler as avscGetAllHandler } from '../../handlers/avsc.js';
import { getOneHandler as bserGetAllHandler } from '../../handlers/bser.js';
import { getOneHandler as BSONGetAllHandler } from '../../handlers/bson.js';
import { getOneHandler as jsBinaryGetAllHandler } from '../../handlers/js-binary.js';
import { getOneHandler as jsonSchemaGetAllHandler } from '../../handlers/json-schema.js';
import { getOneHandler as msgpackGetAllHandler } from '../../handlers/msgpack.js';
import { getOneHandler as msgpackRGetAllHandler } from '../../handlers/msgpackr.js';
import { getOneHandler as protobufGetAllHandler } from '../../handlers/protobuf.js';
import { getOneHandler as v8GetAllHandler } from '../../handlers/v8.js';
import generatePlot from '../../utils/plot.js';

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
  // console.log(
  //   generatePlot(
  //     table.map((t) => t.name),
  //     table.map((t) => t.ops)
  //   )
  // );
});

// Caches & Serialized content
const jsonSchemaSerialized = jsonSchemaGetAllHandler.serialize(getAllData);
const msgpackRSerialized = msgpackRGetAllHandler.serialize(getAllData);
const msgpackSerialized = msgpackGetAllHandler.serialize(getAllData);
const avscSerialized = avscGetAllHandler.serialize(getAllData);
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
