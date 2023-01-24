import { parse as superjsonParse } from 'superjson'

/** @description For backend responses where NextJS complains about
 *  serializing dates, we use superjson to stringify network responses.
 *  Typing the input to the component as String kinda sucks, so this
 *  preserves the value of explicit typing when you have to parse it back
 *  into the proper shape
 */
export const parse = <T>(input: T) => {
  return superjsonParse(input as string) as T
}
