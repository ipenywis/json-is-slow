import OutputSizeJson from './data/output-size.json' assert { type: 'json' };
import protobuf from 'protobufjs';
import path from 'path';
import * as bson from 'bson';
import v8 from 'v8';

(async () => {
  const benchs = [];

  //1️⃣ JSON.stringify
  const jsonStringify = JSON.stringify(OutputSizeJson);

  const outputSizeProtoSchema = await protobuf.load(
    path.resolve('src/schema/protobuf/output-size.proto')
  );

  //2️⃣ Protobuf
  const protoEncoded =
    outputSizeProtoSchema.OutputSize.encode(OutputSizeJson).finish();

  //3️⃣ Mongodb BSON
  const bsonEncoded = bson.serialize(OutputSizeJson);
  const bsonEncodedHex = bsonEncoded.toString('hex');

  //4️⃣ V8
  const v8Encoded = v8.serialize(OutputSizeJson);
  const v8EncodedHex = v8Encoded.toString('hex');

  benchs.push(
    {
      name: 'JSON.stringify',
      length: jsonStringify.length,
      value: jsonStringify
    },
    {
      name: 'protobuf.encode',
      length: String(protoEncoded).length,
      value: String(protoEncoded)
    },
    {
      name: 'bson.serialize',
      length: bsonEncodedHex.length,
      value: bsonEncodedHex
    },
    {
      name: 'v8.serialize',
      length: v8EncodedHex.length,
      value: v8EncodedHex
    }
  );

  console.table(benchs.sort((a, b) => b.ops - a.ops));
})();
