module Utility2 exposing (andThenMaybe, maybe, maybeOr)


maybe : (a -> Bool) -> a -> Maybe a
maybe functor element =
    if functor element then
        Just element

    else
        Nothing


maybeOr : (a -> Bool) -> (a -> Bool) -> a -> Maybe a
maybeOr functor1 functor2 element =
    if functor1 element || functor2 element then
        Just element

    else
        Nothing


andThenMaybe : (a -> Bool) -> Maybe a -> Maybe a
andThenMaybe functor =
    maybe functor
        |> Maybe.andThen
