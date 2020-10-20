export * from 'tswrap'

import { Either } from 'fp-ts/lib/Either'
import * as iots from 'io-ts'

export const parseData = <T>(data: any, structure: iots.TypeC<any> | iots.IntersectionC<any>): Either<iots.Errors, any> | T => {
  const decoded = structure.decode(data)

  if (decoded._tag === 'Left') {
    return decoded
  }

  return decoded.right as T
}

export const isParseError = (arg: any): arg is Either<iots.Errors, any> => {
  return arg && arg._tag === 'Left'
}

export const asyncForEach = async <T> (array: T[], callback: (el: T, i: number, a: T[]) => void) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const echo = () => {
  return 'OK'
}

/* Register Types Here */

export const HelloRequest = iots.interface({
  name!: iots.string
})

export type HelloRequestType = iots.TypeOf<typeof HelloRequest>
