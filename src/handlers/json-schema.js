import fastJsonStringify from 'fast-json-stringify';
import { BasePreare } from '../base/index.js';
import getAllSchema from '../schema/json-schema/get-all.json';
import getOneSchema from '../schema/json-schema/get-one.json';
import healthSchema from '../schema/json-schema/health.json';

const getAllHandler = new BasePreare(getAllSchema);
getAllHandler.setSerializer(fastJsonStringify);
getAllHandler.setDeserializer(() => JSON.parse);

const getOneHandler = new BasePreare(getOneSchema);
getOneHandler.setSerializer(fastJsonStringify);
getOneHandler.setDeserializer(() => JSON.parse);

const healthHandler = new BasePreare(healthSchema);
healthHandler.setSerializer(fastJsonStringify);
healthHandler.setDeserializer(() => JSON.parse);

export { getAllHandler, getOneHandler, healthHandler };
