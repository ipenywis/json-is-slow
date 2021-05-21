import * as mgpackR from 'msgpackr';
import { BasePreare } from '../base/index.js';
import getAllSchema from '../schema/json-schema/get-all.json';
import getOneSchema from '../schema/json-schema/get-one.json';
import healthSchema from '../schema/json-schema/health.json';

const getAllHandler = new BasePreare(getAllSchema);
getAllHandler.setSerializer(() => mgpackR.pack);
getAllHandler.setDeserializer(() => mgpackR.unpack);

const getOneHandler = new BasePreare(getOneSchema);
getOneHandler.setSerializer(() => mgpackR.pack);
getOneHandler.setDeserializer(() => mgpackR.unpack);

const healthHandler = new BasePreare(healthSchema);
healthHandler.setSerializer(() => mgpackR.pack);
healthHandler.setDeserializer(() => mgpackR.unpack);

export { getAllHandler, getOneHandler, healthHandler };
