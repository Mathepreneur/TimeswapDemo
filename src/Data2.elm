module Data2 exposing (Data, encode)

import BigInt exposing (BigInt)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode exposing (Value)
import Utility2 as Utility


type Data
    = Data Selector (List Parameter)


type Selector
    = Selector String


type Parameter
    = AddressParameter Address
    | UintParameter Uint


type Address
    = Address String


type Uint
    = Uint BigInt



-- DATA


encode : Data -> Value
encode (Data (Selector string) list) =
    List.foldl append string list
        |> String.append "0x"
        |> Encode.string


append : Parameter -> String -> String
append parameter string =
    case parameter of
        AddressParameter (Address stringAddress) ->
            stringAddress
                |> String.toLower
                |> String.padLeft 64 '0'
                |> String.append string

        UintParameter uint ->
            uint
                |> toHexString
                |> String.padLeft 64 '0'
                |> String.append string



-- ADDRESS


toAddress : String -> Maybe Address
toAddress string =
    string
        |> Utility.maybeOr (String.startsWith "0x") (String.startsWith "0X")
        |> Maybe.map (String.dropLeft 2)
        |> Utility.andThenMaybe (String.all Char.isHexDigit)
        |> Utility.andThenMaybe (String.length >> (==) 40)
        |> Maybe.map Address



-- UINT


fromInt : Int -> Maybe Uint
fromInt integer =
    integer
        |> BigInt.fromInt
        |> Utility.maybe hasOverflow
        |> Maybe.map Uint


fromIntString : String -> Maybe Uint
fromIntString string =
    string
        |> BigInt.fromIntString
        |> Utility.andThenMaybe hasOverflow
        |> Maybe.map Uint


fromHexString : String -> Maybe Uint
fromHexString string =
    string
        |> BigInt.fromHexString
        |> Utility.andThenMaybe hasOverflow
        |> Maybe.map Uint


hasOverflow : BigInt -> Bool
hasOverflow bigInt =
    BigInt.lte zeroBigInt bigInt && BigInt.gte maxBigInt bigInt


zeroBigInt : BigInt
zeroBigInt =
    BigInt.fromInt 0


maxBigInt : BigInt
maxBigInt =
    BigInt.sub (BigInt.pow (BigInt.fromInt 2) (BigInt.fromInt 256)) (BigInt.fromInt 1)


toString : Uint -> String
toString (Uint bigInt) =
    bigInt
        |> BigInt.toString


toHexString : Uint -> String
toHexString (Uint bigInt) =
    bigInt
        |> BigInt.toHexString
