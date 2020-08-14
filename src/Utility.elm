module Utility exposing (andThen2)


andThen2 : (a -> b -> Result x c) -> Result x a -> Result x b -> Result x c
andThen2 monad result1 result2 =
    Result.map2 monad result1 result2
        |> Result.andThen identity
