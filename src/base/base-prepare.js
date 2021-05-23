/**
 * Base class
 * @name BasePreare
 * @param schema Prepare schema
 * @returns BaseClass
 * @example
 * import MyCompiler from 'my-compiler';
 * const parser = new BasePreare({type:'object'})
 */

class BasePreare {
  static invalid(message) {
    throw new Error(message);
  }
  constructor(schema) {
    this.schema = schema;

    this.deserializer = null;
    this.serializer = null;

    return this;
  }

  /**
   * This method sets serializer by input function
   * @param {Function} func Serializer function
   * @returns this
   * @memberof BaseClass
   * @example .setSerializer((handler) => (data) => handler.serialize(data))
   * @example .setSerializer((compiler) => compiler)
   */
  setSerializer(func) {
    if (!this.schema) {
      BasePreare.invalid('Schema was not defined, please set schema first');
    }

    this.serializer = func(this.schema);

    return this;
  }

  /**
   * This method sets deserializer by input function
   * @param {Function} func Deserializer function
   * @returns this
   * @memberof BaseClass
   * @example .setDeserializer((handler) => (data) => handler.deserialize(data))
   * @example .setDeserializer((compiler) => compiler)
   */
  setDeserializer(func) {
    if (!this.schema) {
      BasePreare.invalid('Schema was not defined, please set schema first');
    }

    this.deserializer = func(this.schema);

    return this;
  }

  /**
   * Serializes data from before given prepares
   * @param {*} data Any input data which should be serialized
   * @returns {String|Buffer|ArrayBuffer|Uint8Array}
   * @memberof BaseClass
   * @example .serialize({data: {foo:'bar'}})
   */
  serialize(data) {
    return this.serializer(data, this);
  }

  /**
   * Deserializes data from before given prepares
   * @param {*} data Any input data which should be deserialized
   * @returns {Object|Buffer|ArrayBuffer}
   * @memberof BaseClass
   * @example .deserialize('{"data":{"foo":"bar"}}')
   */
  deserialize(data) {
    return this.deserializer(data, this);
  }
}

export default BasePreare;
