import { Type } from 'js-binary';
import { BasePreare } from '../base/index.js';
import getAllSchema from '../schema/js-binary-schema/get-all.json';
import getOneSchema from '../schema/js-binary-schema/get-one.json';
import healthSchema from '../schema/js-binary-schema/health.json';

const fromHandler = () => (data, self) => self.compiler.encode(data);
const toHandler = () => (data, self) => self.compiler.decode(data);

const getAllHandler = new BasePreare(getAllSchema);
getAllHandler.compiler = new Type(getAllHandler.schema);
getAllHandler.setSerializer(fromHandler);
getAllHandler.setDeserializer(toHandler);

const getOneHandler = new BasePreare(getOneSchema);
getOneHandler.compiler = new Type(getOneHandler.schema);
getOneHandler.setSerializer(fromHandler);
getOneHandler.setDeserializer(toHandler);

const healthHandler = new BasePreare(healthSchema);
healthHandler.compiler = new Type(healthHandler.schema);
healthHandler.setSerializer(fromHandler);
healthHandler.setDeserializer(toHandler);

export { getAllHandler, getOneHandler, healthHandler };
