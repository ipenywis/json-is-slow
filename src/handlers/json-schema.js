import fastJsonStringify from 'fast-json-stringify';
import { BasePreare } from '../base';
import getAllSchema from '../schema/json-schema/get-all.json';

const getAllHandler = BasePreare(getAllSchema);
getAllHandler.setCompiler(fastJsonStringify);
