import fastJsonStringify from 'fast-json-stringify';
import { BasePreare } from '../base/index.js';
import getAllSchema from '../schema/json-schema/get-all.json' assert { type: 'json' };
import getOneSchema from '../schema/json-schema/get-one.json' assert { type: 'json' };
import healthSchema from '../schema/json-schema/health.json' assert { type: 'json' };

//📚 NOTE: fast-json-stringify is a lot faster implementation of JSON.stringify
//That outputs the same serialized json string.

const getAllHandler = new BasePreare(getAllSchema);
// getAllHandler.setSerializer(fastJsonStringify);
getAllHandler.setSerializer(() => JSON.stringify);
getAllHandler.setDeserializer(() => JSON.parse);

const getOneHandler = new BasePreare(getOneSchema);
// getOneHandler.setSerializer(fastJsonStringify);
getOneHandler.setSerializer(() => JSON.stringify);
getOneHandler.setDeserializer(() => JSON.parse);

const healthHandler = new BasePreare(healthSchema);
// healthHandler.setSerializer(fastJsonStringify);
healthHandler.setSerializer(() => JSON.stringify);
healthHandler.setDeserializer(() => JSON.parse);

export { getAllHandler, getOneHandler, healthHandler };
