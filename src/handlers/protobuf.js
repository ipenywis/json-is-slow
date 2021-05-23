import path from 'path';
import protobuf from 'protobufjs';
import { BasePreare } from '../base/index.js';

const fromHandler = () => (data, self) =>
  self.compiler.encode(self.compiler.create(data)).finish();
const toHandler = () => (data, self) => self.compiler.decode(data);

const getAllProto = await protobuf.load(
  path.resolve('src/schema/protobuf/get-all.proto')
);
const getAllHandler = new BasePreare({});
getAllHandler.compiler = getAllProto.GetAllItems;
getAllHandler.setSerializer(fromHandler);
getAllHandler.setDeserializer(toHandler);

const getOneProto = await protobuf.load(
  path.resolve('src/schema/protobuf/get-one.proto')
);
const getOneHandler = new BasePreare({});
getOneHandler.compiler = getOneProto.GetOneItem;
getOneHandler.setSerializer(fromHandler);
getOneHandler.setDeserializer(toHandler);

const healthProto = await protobuf.load(
  path.resolve('src/schema/protobuf/health.proto')
);
const healthHandler = new BasePreare({});
healthHandler.compiler = healthProto.HealthMessage;
healthHandler.setSerializer(fromHandler);
healthHandler.setDeserializer(toHandler);

export { getAllHandler, getOneHandler, healthHandler };
