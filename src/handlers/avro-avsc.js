import avroAvsc from 'avsc';
import { BasePreare } from '../base/index.js';
import getAllSchema from '../schema/avro-schema/get-all.json';
import getOneSchema from '../schema/avro-schema/get-one.json';
import healthSchema from '../schema/avro-schema/health.json';

const fromHandler = (instance, data) => instance.toBuffer(data);
const toHandler = (instance, data) => instance.fromBuffer(data);

const getAllHandler = new BasePreare(getAllSchema);
getAllHandler
  .setCompiler(avroAvsc.Type.forSchema)
  .compile()
  .setSerializer(fromHandler)
  .setDeserializer(toHandler);

const getOneHandler = new BasePreare(getOneSchema);
getOneHandler
  .setCompiler(avroAvsc.Type.forSchema)
  .compile()
  .setSerializer(fromHandler)
  .setDeserializer(toHandler);

const healthHandler = new BasePreare(healthSchema);
healthHandler
  .setCompiler(avroAvsc.Type.forSchema)
  .compile()
  .setSerializer(fromHandler)
  .setDeserializer(toHandler);

export { getAllHandler, getOneHandler, healthHandler };
