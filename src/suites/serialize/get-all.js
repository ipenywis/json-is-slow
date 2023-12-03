import Benchmark from 'benchmark';
import getAllData from '../../data/get-all.json' assert { type: 'json' };
import { getAllHandler as avscGetAllHandler } from '../../handlers/avsc.js';
import { getAllHandler as bserGetAllHandler } from '../../handlers/bser.js';
import { getAllHandler as BSONGetAllHandler } from '../../handlers/bson.js';
import { getAllHandler as jsBinaryGetAllHandler } from '../../handlers/js-binary.js';
import { getAllHandler as jsonSchemaGetAllHandler } from '../../handlers/json-schema.js';
import { getAllHandler as msgpackGetAllHandler } from '../../handlers/msgpack.js';
import { getAllHandler as msgpackRGetAllHandler } from '../../handlers/msgpackr.js';
import { getAllHandler as protobufGetAllHandler } from '../../handlers/protobuf.js';
import { getAllHandler as v8GetAllHandler } from '../../handlers/v8.js';
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
  console.log(
    generatePlot(
      table.map((t) => t.name),
      table.map((t) => t.ops)
    )
  );
});

// suite.add('getAll: fast-json-stringify', () => {
//   jsonSchemaGetAllHandler.serialize(getAllData);
// });
suite.add('getAll: JSON.stringify', () => {
  jsonSchemaGetAllHandler.serialize(getAllData);
});
suite.add('getAll: msgpackR.pack', () => {
  msgpackRGetAllHandler.serialize(getAllData);
});
suite.add('getAll: msgpack.encode', () => {
  msgpackGetAllHandler.serialize(getAllData);
});
suite.add('getAll: avsc.toBuffer', () => {
  avscGetAllHandler.serialize(getAllData);
});
suite.add('getAll: js-binary.encode', () => {
  jsBinaryGetAllHandler.serialize(getAllData);
});
suite.add('getAll: v8.serialize', () => {
  v8GetAllHandler.serialize(getAllData);
});
suite.add('getAll: protobuf.encode', () => {
  protobufGetAllHandler.serialize({
    items: getAllData
  });
});
suite.add('getAll: bson.serialize', () => {
  BSONGetAllHandler.serialize(getAllData);
});
suite.add('getAll: bser.dumpToBuffer', () => {
  bserGetAllHandler.serialize(getAllData);
});

export default suite;
