import avro from 'avro-js';
import { BasePreare } from '../base/index.js';
import getAllSchema from '../schema/avro-schema/get-all.json';
import getOneSchema from '../schema/avro-schema/get-one.json';
import healthSchema from '../schema/avro-schema/health.json';

const fromHandler = () => (data, self) => self.compiler.toBuffer(data);
const toHandler = () => (data, self) => self.compiler.fromBuffer(data);

const getAllHandler = new BasePreare(getAllSchema);
getAllHandler.compiler = avro.parse(getAllHandler.schema);
getAllHandler.setSerializer(fromHandler);
getAllHandler.setDeserializer(toHandler);

getAllHandler.serialize([{ id: 'foo' }]);

const getOneHandler = new BasePreare(getOneSchema);
getOneHandler.compiler = avro.parse(getOneHandler.schema);
getOneHandler.setSerializer(fromHandler);
getOneHandler.setDeserializer(toHandler);

const healthHandler = new BasePreare(healthSchema);
healthHandler.compiler = avro.parse(healthHandler.schema);
healthHandler.setSerializer(fromHandler);
healthHandler.setDeserializer(toHandler);

export { getAllHandler, getOneHandler, healthHandler };
