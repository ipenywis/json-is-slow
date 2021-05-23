import BSON from 'bson';
import { BasePreare } from '../base/index.js';

const fromHandler = () => BSON.serialize;
const toHandler = () => BSON.deserialize;

const getAllHandler = new BasePreare({});
getAllHandler.setSerializer(fromHandler);
getAllHandler.setDeserializer(toHandler);

const getOneHandler = new BasePreare({});
getOneHandler.setSerializer(fromHandler);
getOneHandler.setDeserializer(toHandler);

const healthHandler = new BasePreare({});
healthHandler.setSerializer(fromHandler);
healthHandler.setDeserializer(toHandler);

export { getAllHandler, getOneHandler, healthHandler };
