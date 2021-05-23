import v8 from 'v8';
import { BasePreare } from '../base/index.js';

const getAllHandler = new BasePreare({});
getAllHandler.setSerializer(() => v8.serialize);
getAllHandler.setDeserializer(() => v8.deserialize);

const getOneHandler = new BasePreare({});
getOneHandler.setSerializer(v8.serialize);
getOneHandler.setDeserializer(() => v8.deserialize);

const healthHandler = new BasePreare({});
healthHandler.setSerializer(v8.serialize);
healthHandler.setDeserializer(() => v8.deserialize);

export { getAllHandler, getOneHandler, healthHandler };
