import type { ObjectSchemaAsync } from '../../schemas/object/index.ts';

/**
 * Creates an object schema that passes unknown keys.
 *
 * @param schema A object schema.
 *
 * @returns A object schema.
 */
export function passthroughAsync<TSchema extends ObjectSchemaAsync<any>>(
  schema: TSchema
): TSchema {
  return {
    ...schema,

    /**
     * Parses unknown input based on its schema.
     *
     * @param input The input to be parsed.
     * @param info The parse info.
     *
     * @returns The parsed output.
     */
    async _parse(input, info) {
      const result = await schema._parse(input, info);
      return !result.issues
        ? { output: { ...(input as object), ...result.output } }
        : result;
    },
  };
}
