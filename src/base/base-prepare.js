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
    this.compiler = null;
    this.handler = null;

    this.deserializer = null;
    this.serializer = null;

    return this;
  }

  /**
   * This method sets compiler for future actions
   * @param compiler Set compiler
   * @returns this
   * @memberof BaseClass
   * @example .setCompiler(turboJsonParse)
   */
  setCompiler(compiler) {
    this.compiler = compiler;
    this._compiler = true;

    return this;
  }

  /**
   * This method compiles `schema` and makes handler available
   * @returns this
   * @memberof BaseClass
   * @example .compile()
   */
  compile() {
    if (!this.schema) {
      BasePreare.invalid('Schema was not defined, please set schema first');
    }
    if (typeof this.compiler !== 'function') {
      BasePreare.invalid(
        'Compiler is not a function, please make set correctly all arguments and parameters'
      );
    }

    this.handler = this.compiler(this.schema);

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
    if (!this.handler && this._compiler) {
      BasePreare.invalid('Handler was not defined, please set compiler first');
    }

    this.serializer = func.bind(null, this.handler);

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
    if (!this.handler && this._compiler) {
      BasePreare.invalid('Handler was not defined, please set compiler first');
    }

    this.deserializer = func.bind(null, this.handler);

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
    return this.serializer(data);
  }

  /**
   * Deserializes data from before given prepares
   * @param {*} data Any input data which should be deserialized
   * @returns {Object|Buffer|ArrayBuffer}
   * @memberof BaseClass
   * @example .deserialize('{"data":{"foo":"bar"}}')
   */
  deserialize(data) {
    return this.deserializer(data);
  }
}

export default BasePreare;
