import bser from 'bser';
import { BasePreare } from '../base/index.js';

const fromHandler = () => bser.dumpToBuffer;
const toHandler = () => bser.loadFromBuffer;

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
