module Hexadecimal exposing
    ( Hexadecimal
    , addBy
    , addressDaiTSDemo
    , addressFileTSDemo
    , addressTimeswapConvenience
    , addressTimeswapPool
    , allowance
    , append
    , approve
    , balanceOf
    , borrow
    , counter
    , decimalSquareRoot
    , decoder
    , decrement
    , depositOf
    , divideBy
    , encode
    , equal
    , fromStringDecimal
    , fromStringHexadecimal
    , fromStringHexadecimalToList
    , fromStringToken
    , increment
    , lend
    , length
    , loanOf
    , maxUnsignedInteger
    , mint
    , mintCollateralAmount
    , mintTokenAmount
    , multiplyBy
    , one
    , padUpto64
    , squareRoot
    , subtractBy
    , toBigInt
    , toInputTextDecimal
    , toInputTextHexadecimal
    , toStringToken
    , toTextDecimal
    , toTextHexadecimal
    , toTextHexadecimalShort
    , tokenOne
    , viewReserves
    , zero
    )

import BigInt exposing (BigInt)
import Element exposing (Attribute, Element)
import Element.Input as Input exposing (Label, Placeholder)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Digit
    = Zero
    | One
    | Two
    | Three
    | Four
    | Five
    | Six
    | Seven
    | Eight
    | Nine
    | LowercaseA
    | UppercaseA
    | LowercaseB
    | UppercaseB
    | LowercaseC
    | UppercaseC
    | LowercaseD
    | UppercaseD
    | LowercaseE
    | UppercaseE
    | LowercaseF
    | UppercaseF


type Hexadecimal
    = Hexadecimal
        { leftMostDigit : Digit
        , otherDigits : List Digit
        }



-- HEXADECIMAL


create : Digit -> List Digit -> Hexadecimal
create leftMostDigit otherDigits =
    Hexadecimal
        { leftMostDigit = leftMostDigit
        , otherDigits = otherDigits
        }


decoder : Decoder (Result String Hexadecimal)
decoder =
    Decode.map fromStringHexadecimal Decode.string


encode : Hexadecimal -> Encode.Value
encode hexadecimal =
    Encode.string <| toStringHexadecimal hexadecimal



-- HEXADECIMAL CONSTRUCTOR


fromStringHexadecimal : String -> Result String Hexadecimal
fromStringHexadecimal string =
    let
        remove0x : List Char -> Result String (List Char)
        remove0x characters =
            case characters of
                [] ->
                    Err "Cannot be empty string"

                '0' :: 'x' :: remainingCharacters ->
                    Ok remainingCharacters

                '0' :: 'X' :: remainingCharacters ->
                    Ok remainingCharacters

                _ ->
                    Err "Must start wiht 0x or 0X"

        initial : List Char -> Result String Hexadecimal
        initial initialCharacters =
            recursive initialCharacters []

        recursive : List Char -> List Digit -> Result String Hexadecimal
        recursive characters accumulatingDigits =
            case ( characters, accumulatingDigits ) of
                ( [], [] ) ->
                    Err "Cannot be empty string after 0x or 0X"

                ( [], singletonDigit :: remainingDigits ) ->
                    Ok <| create singletonDigit remainingDigits

                ( singletonCharacter :: remainingCharacters, digits ) ->
                    let
                        resultDigit : Result String Digit
                        resultDigit =
                            fromCharToDigit singletonCharacter

                        recursiveRemaining : List Digit -> Result String Hexadecimal
                        recursiveRemaining =
                            recursive remainingCharacters
                    in
                    digits
                        |> Result.Ok
                        |> Result.map2 (::) resultDigit
                        |> Result.andThen recursiveRemaining
    in
    string
        |> String.toList
        |> remove0x
        |> Result.map List.reverse
        |> Result.andThen initial
        |> Result.map remove0


fromStringHexadecimalToList : String -> Result String (List Hexadecimal)
fromStringHexadecimalToList string =
    let
        remove0x : List Char -> Result String (List Char)
        remove0x characters =
            case characters of
                [] ->
                    Err "Cannot be empty string"

                '0' :: 'x' :: remainingCharacters ->
                    Ok remainingCharacters

                '0' :: 'X' :: remainingCharacters ->
                    Ok remainingCharacters

                _ ->
                    Err "Must start wiht 0x or 0X"

        initial : List Char -> Result String Hexadecimal
        initial initialCharacters =
            recursive initialCharacters []

        recursive : List Char -> List Digit -> Result String Hexadecimal
        recursive characters accumulatingDigits =
            case ( characters, accumulatingDigits ) of
                ( [], [] ) ->
                    Err "Cannot be empty string after 0x or 0X"

                ( [], singletonDigit :: remainingDigits ) ->
                    Ok <| create singletonDigit remainingDigits

                ( singletonCharacter :: remainingCharacters, digits ) ->
                    let
                        resultDigit : Result String Digit
                        resultDigit =
                            fromCharToDigit singletonCharacter

                        recursiveRemaining : List Digit -> Result String Hexadecimal
                        recursiveRemaining =
                            recursive remainingCharacters
                    in
                    digits
                        |> Result.Ok
                        |> Result.map2 (::) resultDigit
                        |> Result.andThen recursiveRemaining

        cut64 : Hexadecimal -> List Hexadecimal -> Result String (List Hexadecimal)
        cut64 ((Hexadecimal hexadecimal) as currentHexadecimal) accumulatingList =
            if length currentHexadecimal >= 64 then
                let
                    leftMostDigit : Digit
                    leftMostDigit =
                        hexadecimal.leftMostDigit

                    otherDigits : List Digit
                    otherDigits =
                        List.take 63 hexadecimal.otherDigits

                    singletonHexadecimal : Hexadecimal
                    singletonHexadecimal =
                        create leftMostDigit otherDigits
                            |> remove0

                    remainingDigits : List Digit
                    remainingDigits =
                        List.drop 63 hexadecimal.otherDigits
                in
                case remainingDigits of
                    [] ->
                        accumulatingList
                            |> (::) singletonHexadecimal
                            |> List.reverse
                            |> Ok

                    singleton :: remaining ->
                        accumulatingList
                            |> (::) singletonHexadecimal
                            |> cut64 (create singleton remaining)

            else
                Err "Problem with the result"

        resultWholeHexadecimal : Result String Hexadecimal
        resultWholeHexadecimal =
            string
                |> String.toList
                |> remove0x
                |> Result.map List.reverse
                |> Result.andThen initial
    in
    case resultWholeHexadecimal of
        Ok wholeHexadecimal ->
            cut64 wholeHexadecimal []

        Err error ->
            Err error


fromStringDecimal : String -> Result String Hexadecimal
fromStringDecimal string =
    string
        |> decimalFromString
        |> Result.andThen fromDecimal


fromStringToken : String -> Result String Hexadecimal
fromStringToken string =
    string
        |> tokenFromString
        |> Result.andThen fromDecimal



-- HEXADECIMAL DECIMAL


toDecimal : Hexadecimal -> Decimal
toDecimal (Hexadecimal { leftMostDigit, otherDigits }) =
    let
        leftMostDecimalDigit : Int
        leftMostDecimalDigit =
            fromDigitToInt leftMostDigit

        otherDecimalDigits : List Int
        otherDecimalDigits =
            otherDigits
                |> List.map fromDigitToInt

        multiplyWith : Int -> Int -> Decimal
        multiplyWith index integer =
            decimalHexadecimalPower index
                |> decimalMultiplyByDigit integer

        leftMostProduct : Decimal
        leftMostProduct =
            let
                otherDigitsLength : Int
                otherDigitsLength =
                    List.length otherDecimalDigits
            in
            decimalHexadecimalPower otherDigitsLength
                |> decimalMultiplyByDigit leftMostDecimalDigit
    in
    otherDecimalDigits
        |> List.reverse
        |> List.indexedMap multiplyWith
        |> List.foldl decimalAddBy decimalZero
        |> decimalAddBy leftMostProduct


fromDecimal : Decimal -> Result String Hexadecimal
fromDecimal decimal =
    let
        recursive : Decimal -> List Digit -> Result String Hexadecimal
        recursive currentDecimal accumulatingDigits =
            let
                quotient : Decimal
                quotient =
                    currentDecimal
                        |> decimalDivide16

                resultRemainder : Result String Digit
                resultRemainder =
                    currentDecimal
                        |> decimalModBy16
                        |> fromIntToDigit

                nextRecursive : List Digit -> Result String Hexadecimal
                nextRecursive =
                    recursive quotient
            in
            if quotient == Decimal 0 [] then
                accumulatingDigits
                    |> Ok
                    |> Result.map2 create resultRemainder

            else
                accumulatingDigits
                    |> Ok
                    |> Result.map2 (::) resultRemainder
                    |> Result.andThen nextRecursive
    in
    recursive decimal []



-- HEXADECIMAL STRING


toStringHexadecimal : Hexadecimal -> String
toStringHexadecimal (Hexadecimal { leftMostDigit, otherDigits }) =
    otherDigits
        |> (::) leftMostDigit
        |> List.map fromDigitToChar
        |> String.fromList
        |> (++) "0x"


toStringDecimal : Hexadecimal -> String
toStringDecimal hexadecimal =
    hexadecimal
        |> toDecimal
        |> decimalToString


toStringToken : Hexadecimal -> String
toStringToken hexadecimal =
    let
        numbers : String
        numbers =
            hexadecimal
                |> toStringDecimal
                |> String.dropRight 12

        whole : String
        whole =
            numbers
                |> String.dropRight 6

        fraction : String
        fraction =
            numbers
                |> String.right 6
    in
    if whole == "" && fraction == "000000" then
        "0"

    else if fraction == "000000" then
        whole

    else if whole == "" then
        "0." ++ fraction

    else
        whole ++ "." ++ fraction


toStringHexadecimalShort : Hexadecimal -> String
toStringHexadecimalShort hexadecimal =
    let
        string : String
        string =
            toStringHexadecimal hexadecimal

        left : String
        left =
            String.left 6 string

        right : String
        right =
            String.right 4 string
    in
    left ++ "..." ++ right



-- HEXADECIMAL TEXT


toTextHexadecimal : Hexadecimal -> Element msg
toTextHexadecimal hexadecimal =
    Element.text <| toStringHexadecimal hexadecimal


toTextDecimal : Hexadecimal -> Element msg
toTextDecimal hexadecimal =
    Element.text <| toStringDecimal hexadecimal


toTextHexadecimalShort : Hexadecimal -> Element msg
toTextHexadecimalShort hexadecimal =
    Element.text <| toStringHexadecimalShort hexadecimal



-- HEXADECIMAL INPUT


type alias InputDetails msg =
    { onChange : String -> msg
    , hexadecimal : Maybe Hexadecimal
    , placeholder : Maybe (Placeholder msg)
    , label : Label msg
    }


toInputTextHexadecimal : List (Attribute msg) -> InputDetails msg -> Element msg
toInputTextHexadecimal =
    toInputText toStringHexadecimal


toInputTextDecimal : List (Attribute msg) -> InputDetails msg -> Element msg
toInputTextDecimal =
    toInputText toStringDecimal


toInputText : (Hexadecimal -> String) -> List (Attribute msg) -> InputDetails msg -> Element msg
toInputText function attributes { onChange, hexadecimal, placeholder, label } =
    let
        text : String
        text =
            case hexadecimal of
                Just currentHexadecimal ->
                    function currentHexadecimal

                Nothing ->
                    ""
    in
    Input.text attributes
        { onChange = onChange
        , text = text
        , placeholder = placeholder
        , label = label
        }



-- HEXADECIMAL HELPER


equal : Hexadecimal -> Hexadecimal -> Bool
equal (Hexadecimal first) (Hexadecimal second) =
    first == second


length : Hexadecimal -> Int
length (Hexadecimal { otherDigits }) =
    List.length otherDigits + 1


addBy : Hexadecimal -> Hexadecimal -> Result String Hexadecimal
addBy first second =
    let
        firstDecimal : Decimal
        firstDecimal =
            toDecimal first

        secondDecimal : Decimal
        secondDecimal =
            toDecimal second
    in
    firstDecimal
        |> decimalAddBy secondDecimal
        |> fromDecimal


subtractBy : Hexadecimal -> Hexadecimal -> Result String Hexadecimal
subtractBy small big =
    let
        smallDecimal : Decimal
        smallDecimal =
            toDecimal small

        bigDecimal : Decimal
        bigDecimal =
            toDecimal big
    in
    bigDecimal
        |> decimalSubtractBy smallDecimal
        |> Result.andThen fromDecimal


multiplyBy : Hexadecimal -> Hexadecimal -> Result String Hexadecimal
multiplyBy first second =
    let
        firstDecimal : Decimal
        firstDecimal =
            toDecimal first

        secondDecimal : Decimal
        secondDecimal =
            toDecimal second
    in
    firstDecimal
        |> decimalMultiplyBy secondDecimal
        |> fromDecimal


divideBy : Hexadecimal -> Hexadecimal -> Result String Hexadecimal
divideBy small big =
    let
        smallDecimal : Decimal
        smallDecimal =
            toDecimal small

        bigDecimal : Decimal
        bigDecimal =
            toDecimal big
    in
    bigDecimal
        |> decimalDivideBy smallDecimal
        |> Result.andThen fromDecimal


squareRoot : Hexadecimal -> Result String Hexadecimal
squareRoot hexadecimal =
    hexadecimal
        |> toDecimal
        |> decimalSquareRoot
        |> Result.andThen fromDecimal


padUpto64 : Hexadecimal -> Hexadecimal
padUpto64 ((Hexadecimal { leftMostDigit, otherDigits }) as hexadecimal) =
    if length hexadecimal == 64 then
        hexadecimal

    else
        let
            numberOfZeroes : Int
            numberOfZeroes =
                63 - length hexadecimal

            zeroes : List Digit
            zeroes =
                List.repeat numberOfZeroes Zero
        in
        otherDigits
            |> (::) leftMostDigit
            |> (++) zeroes
            |> create Zero


remove0 : Hexadecimal -> Hexadecimal
remove0 (Hexadecimal { leftMostDigit, otherDigits }) =
    let
        recursive : Digit -> List Digit -> Hexadecimal
        recursive currentLeft currentOther =
            case ( currentLeft, currentOther ) of
                ( Zero, [] ) ->
                    zero

                ( Zero, singleton :: remaining ) ->
                    recursive singleton remaining

                _ ->
                    create currentLeft currentOther
    in
    recursive leftMostDigit otherDigits


append : Hexadecimal -> Hexadecimal -> Hexadecimal
append (Hexadecimal first) (Hexadecimal second) =
    second.otherDigits
        |> (::) second.leftMostDigit
        |> (++) first.otherDigits
        |> create first.leftMostDigit



-- HEXADECIMAL CONSTANT


zero : Hexadecimal
zero =
    create Zero []


one : Hexadecimal
one =
    create One []


mintTokenAmount : Hexadecimal
mintTokenAmount =
    Hexadecimal
        { leftMostDigit = Three
        , otherDigits =
            [ Six
            , Three
            , Five
            , LowercaseC
            , Nine
            , LowercaseA
            , LowercaseD
            , LowercaseC
            , Five
            , LowercaseD
            , LowercaseE
            , LowercaseA
            , Zero
            , Zero
            , Zero
            , Zero
            , Zero
            ]
        }


mintCollateralAmount : Hexadecimal
mintCollateralAmount =
    Hexadecimal
        { leftMostDigit = Four
        , otherDigits =
            [ Five
            , Six
            , Three
            , Nine
            , One
            , Eight
            , Two
            , Four
            , Four
            , LowercaseF
            , Four
            , Zero
            , Zero
            , Zero
            , Zero
            ]
        }


tokenOne : Hexadecimal
tokenOne =
    create LowercaseD
        [ LowercaseE
        , Zero
        , LowercaseB
        , Six
        , LowercaseB
        , Three
        , LowercaseA
        , Seven
        , Six
        , Four
        , Zero
        , Zero
        , Zero
        , Zero
        ]


maxUnsignedInteger : Hexadecimal
maxUnsignedInteger =
    create LowercaseF <| List.repeat 63 LowercaseF


counter : Hexadecimal
counter =
    Hexadecimal
        { leftMostDigit = Six
        , otherDigits =
            [ One
            , LowercaseB
            , LowercaseC
            , Two
            , Two
            , One
            , LowercaseA
            ]
        }


viewReserves : Hexadecimal
viewReserves =
    Hexadecimal
        { leftMostDigit = Three
        , otherDigits =
            [ LowercaseA
            , LowercaseF
            , Seven
            , LowercaseD
            , LowercaseF
            , Five
            , LowercaseC
            ]
        }


depositOf : Hexadecimal
depositOf =
    Hexadecimal
        { leftMostDigit = Two
        , otherDigits =
            [ Three
            , LowercaseE
            , Three
            , LowercaseF
            , LowercaseB
            , LowercaseD
            , Five
            ]
        }


loanOf : Hexadecimal
loanOf =
    Hexadecimal
        { leftMostDigit = LowercaseB
        , otherDigits =
            [ Three
            , One
            , Six
            , One
            , Zero
            , Nine
            , Five
            ]
        }


balanceOf : Hexadecimal
balanceOf =
    Hexadecimal
        { leftMostDigit = Seven
        , otherDigits =
            [ Zero
            , LowercaseA
            , Zero
            , Eight
            , Two
            , Three
            , One
            ]
        }


allowance : Hexadecimal
allowance =
    Hexadecimal
        { leftMostDigit = LowercaseD
        , otherDigits =
            [ LowercaseD
            , Six
            , Two
            , LowercaseE
            , LowercaseD
            , Three
            , LowercaseE
            ]
        }


mint : Hexadecimal
mint =
    Hexadecimal
        { leftMostDigit = Four
        , otherDigits =
            [ Zero
            , LowercaseC
            , One
            , Zero
            , LowercaseF
            , One
            , Nine
            ]
        }


approve : Hexadecimal
approve =
    Hexadecimal
        { leftMostDigit = Zero
        , otherDigits =
            [ Nine
            , Five
            , LowercaseE
            , LowercaseA
            , Seven
            , LowercaseB
            , Three
            ]
        }


lend : Hexadecimal
lend =
    Hexadecimal
        { leftMostDigit = Six
        , otherDigits =
            [ LowercaseF
            , LowercaseF
            , Nine
            , One
            , Eight
            , Two
            , LowercaseE
            ]
        }


borrow : Hexadecimal
borrow =
    Hexadecimal
        { leftMostDigit = Eight
        , otherDigits =
            [ Nine
            , Eight
            , Nine
            , Eight
            , Nine
            , LowercaseA
            , LowercaseE
            ]
        }


increment : Hexadecimal
increment =
    Hexadecimal
        { leftMostDigit = LowercaseD
        , otherDigits =
            [ Zero
            , Nine
            , LowercaseD
            , LowercaseE
            , Zero
            , Eight
            , LowercaseA
            ]
        }


decrement : Hexadecimal
decrement =
    Hexadecimal
        { leftMostDigit = Two
        , otherDigits =
            [ LowercaseB
            , LowercaseA
            , LowercaseE
            , LowercaseC
            , LowercaseE
            , LowercaseB
            , Seven
            ]
        }


addressTimeswapPool : Hexadecimal
addressTimeswapPool =
    Hexadecimal
        { leftMostDigit = UppercaseF
        , otherDigits =
            [ Four
            , UppercaseD
            , Six
            , Five
            , Zero
            , LowercaseF
            , UppercaseD
            , Four
            , UppercaseC
            , Zero
            , Four
            , Nine
            , LowercaseD
            , Three
            , LowercaseA
            , Five
            , LowercaseA
            , Six
            , Two
            , UppercaseD
            , Four
            , Three
            , UppercaseE
            , One
            , UppercaseD
            , LowercaseF
            , UppercaseF
            , Seven
            , Eight
            , UppercaseD
            , Nine
            , Nine
            , Five
            , UppercaseD
            , UppercaseA
            , Nine
            , UppercaseE
            , UppercaseB
            , UppercaseF
            ]
        }


addressDaiTSDemo : Hexadecimal
addressDaiTSDemo =
    Hexadecimal
        { leftMostDigit = LowercaseC
        , otherDigits =
            [ LowercaseF
            , LowercaseC
            , Four
            , LowercaseE
            , UppercaseD
            , Eight
            , Three
            , Six
            , One
            , Five
            , Eight
            , LowercaseC
            , LowercaseC
            , UppercaseC
            , LowercaseD
            , Nine
            , LowercaseC
            , Five
            , Five
            , Zero
            , LowercaseD
            , Four
            , Two
            , Two
            , Four
            , Five
            , Eight
            , Five
            , UppercaseE
            , LowercaseD
            , Eight
            , One
            , UppercaseD
            , One
            , Three
            , LowercaseA
            , Three
            , Eight
            , Six
            ]
        }


addressFileTSDemo : Hexadecimal
addressFileTSDemo =
    Hexadecimal
        { leftMostDigit = LowercaseB
        , otherDigits =
            [ Six
            , LowercaseB
            , UppercaseE
            , LowercaseF
            , LowercaseF
            , Nine
            , One
            , Five
            , Nine
            , Eight
            , Seven
            , Eight
            , UppercaseB
            , UppercaseA
            , Five
            , Three
            , LowercaseA
            , LowercaseD
            , Zero
            , Zero
            , Zero
            , Zero
            , Nine
            , Zero
            , LowercaseC
            , LowercaseD
            , Seven
            , UppercaseE
            , One
            , UppercaseE
            , Five
            , LowercaseC
            , Three
            , Four
            , Four
            , Four
            , Two
            , Two
            , UppercaseC
            ]
        }


addressTimeswapConvenience : Hexadecimal
addressTimeswapConvenience =
    Hexadecimal
        { leftMostDigit = UppercaseE
        , otherDigits =
            [ UppercaseF
            , Eight
            , UppercaseA
            , Six
            , Zero
            , UppercaseA
            , UppercaseE
            , LowercaseA
            , LowercaseF
            , Nine
            , Three
            , Zero
            , LowercaseB
            , Eight
            , Three
            , Six
            , Five
            , Seven
            , Zero
            , LowercaseD
            , UppercaseF
            , Two
            , Five
            , LowercaseF
            , LowercaseF
            , Zero
            , Seven
            , Seven
            , Two
            , Two
            , LowercaseD
            , Nine
            , Three
            , Seven
            , UppercaseB
            , Eight
            , Nine
            , LowercaseC
            , Seven
            ]
        }



-- DECIMAL


type alias Decimal =
    { leftMostDigit : Int
    , otherDigits : List Int
    }



-- DECIMAL CONSTANT


decimalZero : Decimal
decimalZero =
    { leftMostDigit = 0
    , otherDigits = []
    }


decimalFromString : String -> Result String Decimal
decimalFromString string =
    let
        initial : List Char -> Result String Decimal
        initial initialCharacters =
            recursive initialCharacters []

        recursive : List Char -> List Int -> Result String Decimal
        recursive characters accumulatingIntegers =
            case ( characters, accumulatingIntegers ) of
                ( [], [] ) ->
                    Err "Cannot be empty string"

                ( [], singletonInteger :: remainingIntegers ) ->
                    Ok <| Decimal singletonInteger remainingIntegers

                ( singletonCharacter :: remainingCharacters, integers ) ->
                    let
                        resultInteger : Result String Int
                        resultInteger =
                            fromCharToInt singletonCharacter

                        recursiveRemaining : List Int -> Result String Decimal
                        recursiveRemaining =
                            recursive remainingCharacters
                    in
                    integers
                        |> Result.Ok
                        |> Result.map2 (::) resultInteger
                        |> Result.andThen recursiveRemaining
    in
    string
        |> String.toList
        |> List.reverse
        |> initial


tokenFromString : String -> Result String Decimal
tokenFromString string =
    let
        initial : List Char -> Result String Decimal
        initial initialCharacters =
            recursive initialCharacters False 0 []

        recursive : List Char -> Bool -> Int -> List Int -> Result String Decimal
        recursive characters hasPoint accumulatingDecimals accumulatingIntegers =
            if hasPoint then
                case ( characters, accumulatingIntegers, accumulatingDecimals ) of
                    ( [], [], _ ) ->
                        Err "Cannot by empty string"

                    ( [], singletonInteger :: remainingIntegers, decimals ) ->
                        Ok <| decimalPadRight (18 - decimals) <| Decimal singletonInteger remainingIntegers

                    ( singletonCharacter :: remainingCharacters, integers, decimals ) ->
                        let
                            resultInteger : Result String Int
                            resultInteger =
                                fromCharToInt singletonCharacter

                            recursiveRemaining : List Int -> Result String Decimal
                            recursiveRemaining =
                                recursive remainingCharacters True decimals
                        in
                        integers
                            |> Result.Ok
                            |> Result.map2 (::) resultInteger
                            |> Result.andThen recursiveRemaining

            else
                case ( characters, accumulatingIntegers, accumulatingDecimals ) of
                    ( [], [], _ ) ->
                        Err "Cannot be empty string"

                    ( [], singletonInteger :: remainingIntegers, _ ) ->
                        Ok <| decimalPadRight 18 <| Decimal singletonInteger remainingIntegers

                    ( '.' :: _, _, 0 ) ->
                        Err "Cannot end in decimal"

                    ( '.' :: remainingCharacters, integers, decimals ) ->
                        if decimals <= 18 then
                            integers
                                |> recursive remainingCharacters True decimals

                        else
                            Err "Cannot have more than 18 decimals"

                    ( singletonCharacter :: remainingCharacters, integers, decimals ) ->
                        let
                            resultInteger : Result String Int
                            resultInteger =
                                fromCharToInt singletonCharacter

                            recursiveRemaining : List Int -> Result String Decimal
                            recursiveRemaining =
                                recursive remainingCharacters False <| decimals + 1
                        in
                        integers
                            |> Result.Ok
                            |> Result.map2 (::) resultInteger
                            |> Result.andThen recursiveRemaining
    in
    string
        |> String.toList
        |> List.reverse
        |> initial



{- }
   tokenFromString : String -> Result String Decimal
   tokenFromString string =
       let
           index : List Int
           index =
               String.indexes "." string

           stringLength : Int
           stringLength =
               String.length string

           notPeriod : Char -> Bool
           notPeriod character =
               character /= '.'
       in
       case index of
           [] ->
               string
                   ++ String.repeat 18 "0"
                   |> decimalFromString

           integer :: [] ->
               String.filter notPeriod string
                   ++ String.repeat (stringLength - integer - 1) "0"
                   |> decimalFromString

           _ ->
               Err "Not able to be a token"
-}


decimalToString : Decimal -> String
decimalToString decimal =
    let
        normal : Decimal
        normal =
            decimalRemove0 decimal
    in
    normal.otherDigits
        |> (::) normal.leftMostDigit
        |> List.map String.fromInt
        |> String.concat



-- DECIMAL HELPER


decimalRemove0 : Decimal -> Decimal
decimalRemove0 ({ leftMostDigit, otherDigits } as decimal) =
    case ( leftMostDigit, otherDigits ) of
        ( 0, singletonDigit :: remainingDigits ) ->
            decimalRemove0 <| Decimal singletonDigit remainingDigits

        _ ->
            decimal


decimalAddBy : Decimal -> Decimal -> Decimal
decimalAddBy first second =
    let
        long : Decimal
        long =
            if decimalLength first >= decimalLength second then
                first

            else
                second

        shortNoPad : Decimal
        shortNoPad =
            if decimalLength first >= decimalLength second then
                second

            else
                first

        numberOfZeroes : Int
        numberOfZeroes =
            decimalLength long - decimalLength shortNoPad

        short : Decimal
        short =
            decimalPad numberOfZeroes shortNoPad

        leftMostSum : Int
        leftMostSum =
            long.leftMostDigit + short.leftMostDigit

        recursive : Int -> List Int -> List Int -> Decimal
        recursive increase currentList accumulatingList =
            case currentList of
                [] ->
                    Decimal increase accumulatingList

                singleton :: remaining ->
                    let
                        singletonIncrease : Int
                        singletonIncrease =
                            singleton + increase

                        ones : Int
                        ones =
                            singletonIncrease
                                |> modBy 10

                        tens : Int
                        tens =
                            singletonIncrease // 10
                    in
                    accumulatingList
                        |> (::) ones
                        |> recursive tens remaining

        initial : List Int -> Decimal
        initial currentList =
            recursive 0 currentList []

        addLeftMostDigit : Int -> Decimal -> Decimal
        addLeftMostDigit integer { leftMostDigit, otherDigits } =
            let
                leftMostSumIncrease : Int
                leftMostSumIncrease =
                    integer + leftMostDigit

                ones : Int
                ones =
                    leftMostSumIncrease
                        |> modBy 10

                tens : Int
                tens =
                    leftMostSumIncrease // 10
            in
            if tens == 0 then
                Decimal ones otherDigits

            else
                otherDigits
                    |> (::) ones
                    |> Decimal tens
                    |> addLeftMostDigit 0
    in
    List.map2 (+) long.otherDigits short.otherDigits
        |> List.reverse
        |> initial
        |> addLeftMostDigit leftMostSum


decimalSubtractBy : Decimal -> Decimal -> Result String Decimal
decimalSubtractBy small big =
    let
        long : Decimal
        long =
            if decimalLength small >= decimalLength big then
                small

            else
                big

        shortNoPad : Decimal
        shortNoPad =
            if decimalLength small >= decimalLength big then
                big

            else
                small

        numberOfZeroes : Int
        numberOfZeroes =
            decimalLength long - decimalLength shortNoPad

        short : Decimal
        short =
            decimalPad numberOfZeroes shortNoPad

        subtract : Int -> Int -> { difference : Int, decrease : Int }
        subtract first second =
            if second >= first then
                { difference = second - first
                , decrease = 0
                }

            else
                let
                    negative : Int
                    negative =
                        first - second

                    tens : Int
                    tens =
                        negative // 10 + 1

                    ones : Int
                    ones =
                        tens * 10 - negative
                in
                { difference = ones
                , decrease = tens
                }

        combineDifference : { difference : Int, decrease : Int } -> { list : List Int, decrease : Int } -> { list : List Int, decrease : Int }
        combineDifference first second =
            let
                next : { difference : Int, decrease : Int }
                next =
                    subtract second.decrease first.difference

                nextList : List Int
                nextList =
                    second.list
                        |> (::) next.difference
            in
            { list = nextList
            , decrease = first.decrease + next.decrease
            }

        subtractLeftMostDigit : { difference : Int, decrease : Int }
        subtractLeftMostDigit =
            long.leftMostDigit
                |> subtract short.leftMostDigit

        subtractOtherDigits : { list : List Int, decrease : Int }
        subtractOtherDigits =
            long.otherDigits
                |> List.map2 subtract short.otherDigits
                |> List.foldr combineDifference { list = [], decrease = 0 }
                |> combineDifference subtractLeftMostDigit
    in
    case ( subtractOtherDigits.list, subtractOtherDigits.decrease ) of
        ( singletonDigit :: remainingDigit, 0 ) ->
            Ok <| Decimal singletonDigit remainingDigit

        _ ->
            Err "Subtraction overflow"


decimalMultiplyByDigit : Int -> Decimal -> Decimal
decimalMultiplyByDigit digit decimal =
    let
        leftMostProduct : Int
        leftMostProduct =
            digit * decimal.leftMostDigit

        recursive : Int -> List Int -> List Int -> Decimal
        recursive increase currentList accumulatingList =
            case currentList of
                [] ->
                    Decimal increase accumulatingList

                singleton :: remaining ->
                    let
                        singletonIncrease : Int
                        singletonIncrease =
                            singleton + increase

                        ones : Int
                        ones =
                            singletonIncrease
                                |> modBy 10

                        tens : Int
                        tens =
                            singletonIncrease // 10
                    in
                    accumulatingList
                        |> (::) ones
                        |> recursive tens remaining

        multiplyByDigit : Int -> Int
        multiplyByDigit =
            (*) digit

        initial : List Int -> Decimal
        initial currentList =
            recursive 0 currentList []

        addLeftMostDigit : Int -> Decimal -> Decimal
        addLeftMostDigit integer { leftMostDigit, otherDigits } =
            let
                leftMostSumIncrease : Int
                leftMostSumIncrease =
                    integer + leftMostDigit

                ones : Int
                ones =
                    leftMostSumIncrease
                        |> modBy 10

                tens : Int
                tens =
                    leftMostSumIncrease // 10
            in
            if tens == 0 then
                Decimal ones otherDigits

            else
                otherDigits
                    |> (::) ones
                    |> Decimal tens
                    |> addLeftMostDigit 0
    in
    decimal.otherDigits
        |> List.map multiplyByDigit
        |> List.reverse
        |> initial
        |> addLeftMostDigit leftMostProduct


decimalMultiplyBy : Decimal -> Decimal -> Decimal
decimalMultiplyBy { leftMostDigit, otherDigits } second =
    let
        multiply : Int -> { list : Decimal, places : Int } -> { list : Decimal, places : Int }
        multiply integer { list, places } =
            let
                nextListIntegers : Decimal
                nextListIntegers =
                    second
                        |> decimalMultiplyByDigit integer
                        |> decimalPadRight places
                        |> decimalAddBy list
            in
            { list = nextListIntegers
            , places = places + 1
            }
    in
    otherDigits
        |> List.foldr multiply { list = decimalZero, places = 0 }
        |> multiply leftMostDigit
        |> .list


decimalDivideToDigit : Decimal -> Decimal -> Result String { remainder : Decimal, quotient : Int }
decimalDivideToDigit small big =
    let
        recursive : { remainder : Decimal, quotient : Int } -> { remainder : Decimal, quotient : Int }
        recursive { remainder, quotient } =
            case decimalSubtractBy small remainder of
                Ok nextDecimal ->
                    recursive
                        { remainder = nextDecimal
                        , quotient = quotient + 1
                        }

                Err _ ->
                    { remainder = remainder
                    , quotient = quotient
                    }

        initial : { remainder : Decimal, quotient : Int }
        initial =
            { remainder = big
            , quotient = 0
            }

        actualSmall : Decimal
        actualSmall =
            decimalRemove0 small
    in
    if actualSmall.leftMostDigit == 0 && actualSmall.otherDigits == [] then
        Err "Divide by zero error"

    else
        Ok <| recursive initial


decimalDivideBy : Decimal -> Decimal -> Result String Decimal
decimalDivideBy small big =
    let
        smallLength : Int
        smallLength =
            decimalLength <| decimalRemove0 small

        initial : Decimal
        initial =
            Decimal big.leftMostDigit <| List.take (smallLength - 2) big.otherDigits

        remaining : List Int
        remaining =
            List.drop (smallLength - 2) big.otherDigits

        divide : Int -> Result String { remainder : Decimal, quotient : List Int } -> Result String { remainder : Decimal, quotient : List Int }
        divide integer accumulator =
            case accumulator of
                Ok { remainder, quotient } ->
                    let
                        current : Result String { remainder : Decimal, quotient : Int }
                        current =
                            Decimal remainder.leftMostDigit (remainder.otherDigits ++ [ integer ])
                                |> decimalDivideToDigit small

                        nextQuotient : { remainder : Decimal, quotient : Int } -> { remainder : Decimal, quotient : List Int }
                        nextQuotient next =
                            { remainder = next.remainder
                            , quotient = next.quotient :: quotient
                            }
                    in
                    current
                        |> Result.map nextQuotient

                error ->
                    error

        finalQuotient : Result String (List Int)
        finalQuotient =
            List.foldl divide (Ok { remainder = initial, quotient = [] }) remaining
                |> Result.map .quotient
                |> Result.map List.reverse

        getFinalQuotient : List Int -> Result String Decimal
        getFinalQuotient list =
            case list of
                [] ->
                    Err "Impossible to happen"

                0 :: otherDigits ->
                    getFinalQuotient otherDigits

                singletonDigit :: otherDigits ->
                    Ok <| Decimal singletonDigit otherDigits
    in
    case decimalSubtractBy small big of
        Ok _ ->
            finalQuotient
                |> Result.andThen getFinalQuotient

        _ ->
            Ok <| Decimal 0 []


decimalHexadecimalPower : Int -> Decimal
decimalHexadecimalPower integer =
    case integer of
        0 ->
            Decimal 1 []

        notZero ->
            let
                recursive : Int -> Decimal -> Decimal
                recursive currentInteger accumulatingDecimal =
                    if currentInteger == 0 then
                        accumulatingDecimal

                    else
                        let
                            nextInteger : Int
                            nextInteger =
                                currentInteger - 1
                        in
                        accumulatingDecimal
                            |> decimalMultiplyByDigit 16
                            |> recursive nextInteger

                initial : Int -> Decimal
                initial currentInteger =
                    recursive currentInteger <| Decimal 1 []
            in
            initial notZero


decimalDivide16 : Decimal -> Decimal
decimalDivide16 { leftMostDigit, otherDigits } =
    let
        recursive : Int -> List Int -> List Int -> List Int
        recursive increase integers accumulatingIntegers =
            case integers of
                [] ->
                    accumulatingIntegers

                singletonInteger :: remainingIntegers ->
                    let
                        dividend : Int
                        dividend =
                            increase * 10 + singletonInteger

                        quotient : Int
                        quotient =
                            dividend // 16

                        remainder : Int
                        remainder =
                            dividend
                                |> modBy 16
                    in
                    accumulatingIntegers
                        |> (::) quotient
                        |> recursive remainder remainingIntegers
    in
    case otherDigits of
        [] ->
            Decimal 0 []

        singletonDigit :: remainingDigits ->
            let
                leftMostDividend : Int
                leftMostDividend =
                    leftMostDigit * 10 + singletonDigit

                leftMostQuotient : Int
                leftMostQuotient =
                    leftMostDividend // 16

                remainder : Int
                remainder =
                    leftMostDividend
                        |> modBy 16
            in
            recursive remainder remainingDigits []
                |> List.reverse
                |> Decimal leftMostQuotient


decimalModBy16 : Decimal -> Int
decimalModBy16 { leftMostDigit, otherDigits } =
    let
        recursive : Int -> List Int -> Int
        recursive increase integers =
            case integers of
                [] ->
                    increase

                singletonInteger :: remainingIntegers ->
                    let
                        dividend : Int
                        dividend =
                            increase * 10 + singletonInteger

                        remainder : Int
                        remainder =
                            dividend
                                |> modBy 16
                    in
                    recursive remainder remainingIntegers
    in
    case otherDigits of
        [] ->
            leftMostDigit

        singletonDigit :: remainingDigits ->
            let
                leftMostDividend : Int
                leftMostDividend =
                    leftMostDigit * 10 + singletonDigit

                remainder : Int
                remainder =
                    leftMostDividend
                        |> modBy 16
            in
            recursive remainder remainingDigits


decimalSquareRoot : Decimal -> Result String Decimal
decimalSquareRoot decimal =
    let
        recursive : Decimal -> Result String Decimal
        recursive currentDecimal =
            let
                resultAlgorithm : Result String Decimal
                resultAlgorithm =
                    decimal
                        |> decimalDivideBy currentDecimal
                        |> Result.map (decimalAddBy currentDecimal)
                        |> Result.andThen (decimalDivideBy (Decimal 2 []))
            in
            case resultAlgorithm of
                Ok algorithm ->
                    if algorithm == currentDecimal then
                        Ok currentDecimal

                    else
                        recursive algorithm

                _ ->
                    Err "Problem with squareroot"
    in
    recursive decimal


decimalLength : Decimal -> Int
decimalLength { otherDigits } =
    List.length otherDigits + 1


decimalPad : Int -> Decimal -> Decimal
decimalPad amount ({ leftMostDigit, otherDigits } as decimal) =
    case amount of
        0 ->
            decimal

        notZero ->
            let
                numberOfZeroes : Int
                numberOfZeroes =
                    notZero - 1

                zeroes : List Int
                zeroes =
                    List.repeat numberOfZeroes 0
            in
            otherDigits
                |> (::) leftMostDigit
                |> (++) zeroes
                |> Decimal 0


decimalPadRight : Int -> Decimal -> Decimal
decimalPadRight amount ({ leftMostDigit, otherDigits } as decimal) =
    case amount of
        0 ->
            decimal

        notZero ->
            let
                numberOfZeroes : Int
                numberOfZeroes =
                    notZero

                zeroes : List Int
                zeroes =
                    List.repeat numberOfZeroes 0
            in
            zeroes
                |> (++) otherDigits
                |> Decimal leftMostDigit



-- OTHER


fromCharToDigit : Char -> Result String Digit
fromCharToDigit character =
    case character of
        '0' ->
            Ok Zero

        '1' ->
            Ok One

        '2' ->
            Ok Two

        '3' ->
            Ok Three

        '4' ->
            Ok Four

        '5' ->
            Ok Five

        '6' ->
            Ok Six

        '7' ->
            Ok Seven

        '8' ->
            Ok Eight

        '9' ->
            Ok Nine

        'a' ->
            Ok LowercaseA

        'A' ->
            Ok UppercaseA

        'b' ->
            Ok LowercaseB

        'B' ->
            Ok UppercaseB

        'c' ->
            Ok LowercaseC

        'C' ->
            Ok UppercaseC

        'd' ->
            Ok LowercaseD

        'D' ->
            Ok UppercaseD

        'e' ->
            Ok LowercaseE

        'E' ->
            Ok UppercaseE

        'f' ->
            Ok LowercaseF

        'F' ->
            Ok UppercaseF

        _ ->
            Err "Not hexadecimalable"


fromDigitToChar : Digit -> Char
fromDigitToChar digit =
    case digit of
        Zero ->
            '0'

        One ->
            '1'

        Two ->
            '2'

        Three ->
            '3'

        Four ->
            '4'

        Five ->
            '5'

        Six ->
            '6'

        Seven ->
            '7'

        Eight ->
            '8'

        Nine ->
            '9'

        LowercaseA ->
            'a'

        UppercaseA ->
            'A'

        LowercaseB ->
            'b'

        UppercaseB ->
            'B'

        LowercaseC ->
            'c'

        UppercaseC ->
            'C'

        LowercaseD ->
            'd'

        UppercaseD ->
            'D'

        LowercaseE ->
            'e'

        UppercaseE ->
            'E'

        LowercaseF ->
            'f'

        UppercaseF ->
            'F'


fromDigitToInt : Digit -> Int
fromDigitToInt digit =
    case digit of
        Zero ->
            0

        One ->
            1

        Two ->
            2

        Three ->
            3

        Four ->
            4

        Five ->
            5

        Six ->
            6

        Seven ->
            7

        Eight ->
            8

        Nine ->
            9

        LowercaseA ->
            10

        UppercaseA ->
            10

        LowercaseB ->
            11

        UppercaseB ->
            11

        LowercaseC ->
            12

        UppercaseC ->
            12

        LowercaseD ->
            13

        UppercaseD ->
            13

        LowercaseE ->
            14

        UppercaseE ->
            14

        LowercaseF ->
            15

        UppercaseF ->
            15


fromCharToInt : Char -> Result String Int
fromCharToInt character =
    case character of
        '0' ->
            Ok 0

        '1' ->
            Ok 1

        '2' ->
            Ok 2

        '3' ->
            Ok 3

        '4' ->
            Ok 4

        '5' ->
            Ok 5

        '6' ->
            Ok 6

        '7' ->
            Ok 7

        '8' ->
            Ok 8

        '9' ->
            Ok 9

        _ ->
            Err "Not decimalable"


fromIntToDigit : Int -> Result String Digit
fromIntToDigit integer =
    case integer of
        0 ->
            Ok Zero

        1 ->
            Ok One

        2 ->
            Ok Two

        3 ->
            Ok Three

        4 ->
            Ok Four

        5 ->
            Ok Five

        6 ->
            Ok Six

        7 ->
            Ok Seven

        8 ->
            Ok Eight

        9 ->
            Ok Nine

        10 ->
            Ok LowercaseA

        11 ->
            Ok LowercaseB

        12 ->
            Ok LowercaseC

        13 ->
            Ok LowercaseD

        14 ->
            Ok LowercaseE

        15 ->
            Ok LowercaseF

        _ ->
            Err "Not Hexadecimalable"



-- BIG INT


toBigInt : Hexadecimal -> Result String BigInt
toBigInt hexadecimal =
    hexadecimal
        |> toStringHexadecimal
        |> BigInt.fromHexString
        |> Result.fromMaybe "Not able to turn to hexadecimal"


fromBigInt : BigInt -> Result String Hexadecimal
fromBigInt bigInt =
    bigInt
        |> BigInt.toHexString
        |> (++) "0x"
        |> fromStringHexadecimal
