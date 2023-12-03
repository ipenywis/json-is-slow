import Benchmark from 'benchmark';
import getOneData from '../../data/get-one.json' assert { type: 'json' };
import { getOneHandler as avscgetOneHandler } from '../../handlers/avsc.js';
import { getOneHandler as bsergetOneHandler } from '../../handlers/bser.js';
import { getOneHandler as BSONgetOneHandler } from '../../handlers/bson.js';
import { getOneHandler as jsBinarygetOneHandler } from '../../handlers/js-binary.js';
import { getOneHandler as jsonSchemagetOneHandler } from '../../handlers/json-schema.js';
import { getOneHandler as msgpackgetOneHandler } from '../../handlers/msgpack.js';
import { getOneHandler as msgpackRgetOneHandler } from '../../handlers/msgpackr.js';
import { getOneHandler as protobufgetOneHandler } from '../../handlers/protobuf.js';
import { getOneHandler as v8getOneHandler } from '../../handlers/v8.js';
import generatePlot from '../../utils/plot.js';

// Suite
const suite = new Benchmark.Suite();
const table = [];
suite.on('cycle', (e) => {
  table.push({
    name: e.target.name,
    type: 'serialization',
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

// suite.add('getOne: fast-json-stringify', () => {
//   jsonSchemagetOneHandler.serialize(getOneData);
// });
suite.add('getOne: JSON.stringify', () => {
  jsonSchemagetOneHandler.serialize(getOneData);
});
suite.add('getOne: msgpackR.pack', () => {
  msgpackRgetOneHandler.serialize(getOneData);
});
suite.add('getOne: msgpack.encode', () => {
  msgpackgetOneHandler.serialize(getOneData);
});
suite.add('getOne: avsc.toBuffer', () => {
  avscgetOneHandler.serialize(getOneData);
});
suite.add('getOne: js-binary.encode', () => {
  jsBinarygetOneHandler.serialize(getOneData);
});
suite.add('getOne: v8.serialize', () => {
  v8getOneHandler.serialize(getOneData);
});
suite.add('getOne: protobuf.encode', () => {
  protobufgetOneHandler.serialize({
    items: getOneData
  });
});
suite.add('getOne: bson.serialize', () => {
  BSONgetOneHandler.serialize(getOneData);
});
suite.add('getOne: bser.dumpToBuffer', () => {
  bsergetOneHandler.serialize(getOneData);
});

export default suite;
