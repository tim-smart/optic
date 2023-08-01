/**
 * @since 1.0.0
 */

import { pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as SortedMap from "@effect/data/SortedMap"
import * as Optic from "@fp-ts/optic"
import type { At } from "@fp-ts/optic/typeclass/At"
import type { Index } from "@fp-ts/optic/typeclass/Index"
import { fromAt } from "@fp-ts/optic/typeclass/Index"

/**
 * @since 1.0.0
 */
export const getAt = <K, A>(): At<SortedMap.SortedMap<K, A>, K, Option.Option<A>> => ({
  at: (k) =>
    Optic.lens(SortedMap.get(k), (oa) =>
      (s) =>
        pipe(
          oa,
          Option.match({
            onNone: () => pipe(s, SortedMap.remove(k)),
            onSome: (a) => pipe(s, SortedMap.set(k, a))
          })
        ))
})

/**
 * @since 1.0.0
 */
export const getIndex = <K, A>(): Index<SortedMap.SortedMap<K, A>, K, A> => fromAt(getAt())
