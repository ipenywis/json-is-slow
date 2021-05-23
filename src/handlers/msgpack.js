import { decode, encode } from '@msgpack/msgpack';
import { BasePreare } from '../base/index.js';

const fromHandler = () => encode;
const toHandler = () => decode;

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
