# json-(de)serialize

<p align='center'><b>Benchmarking serialization and deserialization for your API requests to understand which method gives better performance</b></p>

## Requires

- Node.js v15.10+
- `yarn` installed

## How to use

```bash
yarn
yarn benchmark
```

## Used libraries for benchmarking

- [Protobuf.js](https://github.com/protobufjs/protobuf.js/)
- [msgpackr](https://github.com/kriszyp/msgpackr)
- [@msgpack/msgpack](https://github.com/msgpack/msgpack-javascript)
- [avsc](https://github.com/mtth/avsc)
- [js-binary](https://github.com/sitegui/js-binary)
- [bser](https://facebook.github.io/watchman/docs/bser.html)
- [BSON](https://github.com/mongodb/js-bson)
- [fast-json-stringify](https://github.com/fastify/fast-json-stringify) [Serialization only]

## Results

### Deserialization

```bash
┌─────────┬───────────────────────────────┬───────────────────┬─────┐
│ (index) │             name              │       type        │ ops │
├─────────┼───────────────────────────────┼───────────────────┼─────┤
│    0    │     'getAll: JSON.parse'      │ 'deserialization' │ 745 │
│    1    │   'getAll: protobuf.decode'   │ 'deserialization' │ 625 │
│    2    │   'getAll: msgpackR.unpack'   │ 'deserialization' │ 623 │
│    3    │   'getAll: v8.deserialize'    │ 'deserialization' │ 530 │
│    4    │   'getAll: avsc.fromBuffer'   │ 'deserialization' │ 514 │
│    5    │   'getAll: msgpack.decode'    │ 'deserialization' │ 473 │
│    6    │  'getAll: js-binary.decode'   │ 'deserialization' │ 303 │
│    7    │  'getAll: BSON.deserialize'   │ 'deserialization' │ 157 │
│    8    │ 'getAll: bser.loadFromBuffer' │ 'deserialization' │ 150 │
└─────────┴───────────────────────────────┴───────────────────┴─────┘
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐ 745
├─ getAll: JSON.parse           ─────────────────────────────────────────────────────────────────────────── │
├─ getAll: protobuf.decode      ───────────────────────────────────────────────────────────────             │
├─ getAll: msgpackR.unpack      ──────────────────────────────────────────────────────────────              │
├─ getAll: v8.deserialize       ─────────────────────────────────────────────────────                       │
├─ getAll: avsc.fromBuffer      ───────────────────────────────────────────────────                         │
├─ getAll: msgpack.decode       ───────────────────────────────────────────────                             │
├─ getAll: js-binary.decode     ──────────────────────────────                                              │
├─ getAll: BSON.deserialize     ────────────────                                                            │
├─ getAll: bser.loadFromBuffer  ───────────────                                                             │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### For deserialization fastest is after native `JSON.parse` is **protobuf.js**

### Serialization

```bash
┌─────────┬───────────────────────────────┬─────────────────┬─────┐
│ (index) │             name              │      type       │ ops │
├─────────┼───────────────────────────────┼─────────────────┼─────┤
│    0    │    'getAll: v8.serialize'     │ 'serialization' │ 958 │
│    1    │    'getAll: msgpackR.pack'    │ 'serialization' │ 846 │
│    2    │   'getAll: protobuf.encode'   │ 'serialization' │ 621 │
│    3    │   'getAll: msgpack.encode'    │ 'serialization' │ 531 │
│    4    │ 'getAll: fast-json-stringify' │ 'serialization' │ 457 │
│    5    │    'getAll: avsc.toBuffer'    │ 'serialization' │ 429 │
│    6    │  'getAll: js-binary.encode'   │ 'serialization' │ 211 │
│    7    │   'getAll: bson.serialize'    │ 'serialization' │ 194 │
│    8    │  'getAll: bser.dumpToBuffer'  │ 'serialization' │ 126 │
└─────────┴───────────────────────────────┴─────────────────┴─────┘
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ 958
├─ getAll: v8.serialize         ──────────────────────────────────────────────────────────────────────────────────────────────── │
├─ getAll: msgpackR.pack        ─────────────────────────────────────────────────────────────────────────────────────            │
├─ getAll: protobuf.encode      ──────────────────────────────────────────────────────────────                                   │
├─ getAll: msgpack.encode       ─────────────────────────────────────────────────────                                            │
├─ getAll: fast-json-stringify  ──────────────────────────────────────────────                                                   │
├─ getAll: avsc.toBuffer        ───────────────────────────────────────────                                                      │
├─ getAll: js-binary.encode     ─────────────────────                                                                            │
├─ getAll: bson.serialize       ───────────────────                                                                              │
├─ getAll: bser.dumpToBuffer    ─────────────                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### For serialization fastest is **v8.serialize**

## License

MIT
