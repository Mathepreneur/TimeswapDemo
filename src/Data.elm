module Data exposing
    ( Address
    , Data
    , Deposit
    , Loan
    , Reserve
    , UnsignedInteger
    , addBy
    , addressDaiTSDemo
    , addressDecoder
    , addressEncode
    , addressFileTSDemo
    , addressTimeswapConvenience
    , addressTimeswapPool
    , allowance
    , approve
    , balanceOf
    , borrow
    , depositOf
    , depositOfDecoder
    , divideBy
    , encode
    , fromAddressToText
    , fromAddressToTextShort
    , fromUnsignedIntegerToText
    , fromUnsignedIntegerToToken
    , greaterThan
    , increment
    , lend
    , loanOf
    , loanOfDecoder
    , mint
    , mintCollateralAmount
    , mintTokenAmount
    , multiplyBy
    , sorter
    , squareRoot
    , subtractBy
    , toBigInt
    , toUnsignedIntegerFromStringDecimal
    , toUnsignedIntegerFromStringHexadecimal
    , toUnsignedIntegerFromStringToken
    , totalDeposit
    , unsignedIntegerDecoder
    , unsignedIntegerInputText
    , unsignedIntegerMaxInteger
    , unsignedIntegerTokenOne
    , unsignedIntegerZero
    , viewReserves
    , viewReservesDecoder
    )

import BigInt exposing (BigInt)
import Element exposing (Attribute, Element)
import Element.Input exposing (Label, Placeholder)
import Hexadecimal exposing (Hexadecimal)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode exposing (Value)
import Sort exposing (Sorter)


type Data
    = Data Selector (List Parameter)


type Parameter
    = AddressParameter Address
    | UnsignedIntegerParameter UnsignedInteger


type Selector
    = Selector Hexadecimal


type Address
    = Address Hexadecimal


type UnsignedInteger
    = UnsignedInteger Hexadecimal


type alias Reserve =
    { token : UnsignedInteger
    , collateral : UnsignedInteger
    , interest : UnsignedInteger
    }


type alias Deposit =
    { deposit : UnsignedInteger
    , insurance : UnsignedInteger
    }


type alias Loan =
    { loan : UnsignedInteger
    , collateral : UnsignedInteger
    }



-- DATA


encode : Data -> Value
encode (Data (Selector hexadecimal) list) =
    List.foldl append hexadecimal list
        |> Hexadecimal.encode


append : Parameter -> Hexadecimal -> Hexadecimal
append parameter hexadecimal =
    let
        appendWithPad : Hexadecimal -> Hexadecimal
        appendWithPad currentHexadecimal =
            currentHexadecimal
                |> Hexadecimal.padUpto64
                |> Hexadecimal.append hexadecimal
    in
    case parameter of
        AddressParameter (Address address) ->
            appendWithPad address

        UnsignedIntegerParameter (UnsignedInteger unsignedInteger) ->
            appendWithPad unsignedInteger


viewReserves : Data
viewReserves =
    Data selectorViewReserves []


depositOf : Address -> Data
depositOf owner =
    Data selectorDepositOf [ AddressParameter owner ]


loanOf : Address -> UnsignedInteger -> Data
loanOf owner index =
    Data selectorLoanOf [ AddressParameter owner, UnsignedIntegerParameter index ]


balanceOf : Address -> Data
balanceOf owner =
    Data selectorBalanceOf [ AddressParameter owner ]


totalDeposit : Data
totalDeposit =
    Data selectorTotalDeposit []


allowance : Address -> Address -> Data
allowance owner spender =
    Data selectorAllowance [ AddressParameter owner, AddressParameter spender ]


mint : Address -> UnsignedInteger -> Data
mint recipient amount =
    Data selectorMint [ AddressParameter recipient, UnsignedIntegerParameter amount ]


approve : Address -> UnsignedInteger -> Data
approve spender amount =
    Data selectorApprove [ AddressParameter spender, UnsignedIntegerParameter amount ]


lend : Address -> UnsignedInteger -> UnsignedInteger -> Address -> Data
lend pool token collateral reciepient =
    Data selectorLend
        [ AddressParameter pool
        , UnsignedIntegerParameter token
        , UnsignedIntegerParameter collateral
        , AddressParameter reciepient
        ]


borrow : Address -> UnsignedInteger -> UnsignedInteger -> Address -> Data
borrow pool token collateral reciepient =
    Data selectorBorrow
        [ AddressParameter pool
        , UnsignedIntegerParameter token
        , UnsignedIntegerParameter collateral
        , AddressParameter reciepient
        ]



-- SELECTOR


selectorViewReserves : Selector
selectorViewReserves =
    Selector Hexadecimal.viewReserves


selectorDepositOf : Selector
selectorDepositOf =
    Selector Hexadecimal.depositOf


selectorLoanOf : Selector
selectorLoanOf =
    Selector Hexadecimal.loanOf


selectorBalanceOf : Selector
selectorBalanceOf =
    Selector Hexadecimal.balanceOf


selectorTotalDeposit : Selector
selectorTotalDeposit =
    Selector Hexadecimal.totalDeposit


selectorAllowance : Selector
selectorAllowance =
    Selector Hexadecimal.allowance


selectorMint : Selector
selectorMint =
    Selector Hexadecimal.mint


selectorApprove : Selector
selectorApprove =
    Selector Hexadecimal.approve


selectorLend : Selector
selectorLend =
    Selector Hexadecimal.lend


selectorBorrow : Selector
selectorBorrow =
    Selector Hexadecimal.borrow



-- DECODER


viewReservesDecoder : Decoder (Result String Reserve)
viewReservesDecoder =
    Decode.map toReserveFromString Decode.string


toReserveFromString : String -> Result String Reserve
toReserveFromString string =
    let
        resultHexadecimal : Result String (List Hexadecimal)
        resultHexadecimal =
            string
                |> Hexadecimal.fromStringHexadecimalToList
    in
    case resultHexadecimal of
        Ok (token :: collateral :: interest :: _) ->
            Ok <| Reserve (UnsignedInteger token) (UnsignedInteger collateral) (UnsignedInteger interest)

        _ ->
            Err "Decoding Error"


depositOfDecoder : Decoder (Result String Deposit)
depositOfDecoder =
    Decode.map toDepositFromString Decode.string


toDepositFromString : String -> Result String Deposit
toDepositFromString string =
    let
        resultHexadecimal : Result String (List Hexadecimal)
        resultHexadecimal =
            string
                |> Hexadecimal.fromStringHexadecimalToList
    in
    case resultHexadecimal of
        Ok (deposit :: insurance :: _) ->
            Ok <| Deposit (UnsignedInteger deposit) (UnsignedInteger insurance)

        _ ->
            Err "Decoding Error"


loanOfDecoder : Decoder (Result String Loan)
loanOfDecoder =
    Decode.map toLoanFromString Decode.string


toLoanFromString : String -> Result String Loan
toLoanFromString string =
    let
        resultHexadecimal : Result String (List Hexadecimal)
        resultHexadecimal =
            string
                |> Hexadecimal.fromStringHexadecimalToList
    in
    case resultHexadecimal of
        Ok (debt :: collateral :: _) ->
            Ok <| Loan (UnsignedInteger debt) (UnsignedInteger collateral)

        _ ->
            Err "Decoding Error"



-- ADDRESS


addressDecoder : Decoder (Result String Address)
addressDecoder =
    Decode.map toAddressFromString Decode.string


addressEncode : Address -> Value
addressEncode (Address hexadecimal) =
    Hexadecimal.encode hexadecimal


fromAddressToText : Address -> Element msg
fromAddressToText (Address hexadecimal) =
    Hexadecimal.toTextHexadecimal hexadecimal


fromAddressToTextShort : Address -> Element msg
fromAddressToTextShort (Address hexadecimal) =
    Hexadecimal.toTextHexadecimalShort hexadecimal


toAddressFromString : String -> Result String Address
toAddressFromString string =
    let
        resultHexadecimal : Result String Hexadecimal
        resultHexadecimal =
            string
                |> Hexadecimal.fromStringHexadecimal

        resultLength : Result String Int
        resultLength =
            resultHexadecimal
                |> Result.map Hexadecimal.length
    in
    case ( resultHexadecimal, resultLength ) of
        ( Ok hexadecimal, Ok 40 ) ->
            Ok <| Address <| hexadecimal

        ( Ok _, Ok _ ) ->
            Err <| "Address must be 20 bytes"

        ( Err error, _ ) ->
            Err <| error

        ( Ok _, Err error ) ->
            Err <| error


addressTimeswapPool : Address
addressTimeswapPool =
    Address Hexadecimal.addressTimeswapPool


addressDaiTSDemo : Address
addressDaiTSDemo =
    Address Hexadecimal.addressDaiTSDemo


addressFileTSDemo : Address
addressFileTSDemo =
    Address Hexadecimal.addressFileTSDemo


addressTimeswapConvenience : Address
addressTimeswapConvenience =
    Address Hexadecimal.addressTimeswapConvenience



-- UNSIGNED INTEGER


unsignedIntegerDecoder : Decoder (Result String UnsignedInteger)
unsignedIntegerDecoder =
    Decode.map toUnsignedIntegerFromStringHexadecimal Decode.string


fromUnsignedIntegerToHexadecimal : UnsignedInteger -> Hexadecimal
fromUnsignedIntegerToHexadecimal (UnsignedInteger hexadecimal) =
    hexadecimal


fromUnsignedIntegerToToken : UnsignedInteger -> String
fromUnsignedIntegerToToken (UnsignedInteger hexadecimal) =
    Hexadecimal.toStringToken hexadecimal


fromUnsignedIntegerToText : UnsignedInteger -> Element msg
fromUnsignedIntegerToText (UnsignedInteger hexadecimal) =
    Hexadecimal.toTextDecimal hexadecimal


toUnsignedIntegerFromStringHexadecimal : String -> Result String UnsignedInteger
toUnsignedIntegerFromStringHexadecimal string =
    let
        resultHexadecimal : Result String Hexadecimal
        resultHexadecimal =
            string
                |> Hexadecimal.fromStringHexadecimal

        resultLength : Result String Int
        resultLength =
            resultHexadecimal
                |> Result.map Hexadecimal.length
    in
    case ( resultHexadecimal, resultLength ) of
        ( Ok hexadecimal, Ok length ) ->
            if length <= 64 then
                Ok <| UnsignedInteger hexadecimal

            else
                Err <| "Unsigned Integer must be 32 bytes"

        ( Err error, _ ) ->
            Err error

        ( Ok _, Err error ) ->
            Err error


toUnsignedIntegerFromStringDecimal : String -> Result String UnsignedInteger
toUnsignedIntegerFromStringDecimal string =
    let
        resultHexadecimal : Result String Hexadecimal
        resultHexadecimal =
            string
                |> Hexadecimal.fromStringDecimal

        resultLength : Result String Int
        resultLength =
            resultHexadecimal
                |> Result.map Hexadecimal.length
    in
    case ( resultHexadecimal, resultLength ) of
        ( Ok hexadecimal, Ok length ) ->
            if length <= 64 then
                Ok <| UnsignedInteger hexadecimal

            else
                Err <| "Unsigned Integer must be 32 bytes"

        ( Err error, _ ) ->
            Err error

        ( Ok _, Err error ) ->
            Err error


toUnsignedIntegerFromStringToken : String -> Result String UnsignedInteger
toUnsignedIntegerFromStringToken string =
    let
        resultHexadecimal : Result String Hexadecimal
        resultHexadecimal =
            string
                |> Hexadecimal.fromStringToken

        resultLength : Result String Int
        resultLength =
            resultHexadecimal
                |> Result.map Hexadecimal.length
    in
    case ( resultHexadecimal, resultLength ) of
        ( Ok hexadecimal, Ok length ) ->
            if length <= 64 then
                Ok <| UnsignedInteger hexadecimal

            else
                Err <| "Unsigned Integer must be 32 bytes"

        ( Err error, _ ) ->
            Err error

        ( Ok _, Err error ) ->
            Err error


type alias InputDetails msg =
    { onChange : String -> msg
    , unsignedInteger : Maybe UnsignedInteger
    , placeholder : Maybe (Placeholder msg)
    , label : Label msg
    }


unsignedIntegerInputText : List (Attribute msg) -> InputDetails msg -> Element msg
unsignedIntegerInputText attributes { onChange, unsignedInteger, placeholder, label } =
    let
        hexadecimal : Maybe Hexadecimal
        hexadecimal =
            Maybe.map fromUnsignedIntegerToHexadecimal unsignedInteger
    in
    Hexadecimal.toInputTextDecimal attributes
        { onChange = onChange
        , hexadecimal = hexadecimal
        , placeholder = placeholder
        , label = label
        }



-- UNSIGNED INTEGERS CONSTANT


unsignedIntegerZero : UnsignedInteger
unsignedIntegerZero =
    UnsignedInteger Hexadecimal.zero


unsignedIntegerOne : UnsignedInteger
unsignedIntegerOne =
    UnsignedInteger Hexadecimal.one


unsignedIntegerTokenOne : UnsignedInteger
unsignedIntegerTokenOne =
    UnsignedInteger Hexadecimal.tokenOne


unsignedIntegerMaxInteger : UnsignedInteger
unsignedIntegerMaxInteger =
    UnsignedInteger Hexadecimal.maxUnsignedInteger


mintTokenAmount : UnsignedInteger
mintTokenAmount =
    UnsignedInteger Hexadecimal.mintTokenAmount


mintCollateralAmount : UnsignedInteger
mintCollateralAmount =
    UnsignedInteger Hexadecimal.mintCollateralAmount



-- UNSIGNED INTEGERS MATH


sorter : Sorter UnsignedInteger
sorter =
    Sort.custom compare


compare : UnsignedInteger -> UnsignedInteger -> Order
compare first second =
    if greaterThanStrict first second then
        GT

    else if greaterThanStrict second first then
        LT

    else
        EQ


greaterThan : UnsignedInteger -> UnsignedInteger -> Bool
greaterThan (UnsignedInteger first) (UnsignedInteger second) =
    case Hexadecimal.subtractBy second first of
        Ok _ ->
            True

        _ ->
            False


greaterThanStrict : UnsignedInteger -> UnsignedInteger -> Bool
greaterThanStrict (UnsignedInteger first) (UnsignedInteger second) =
    case Hexadecimal.subtractBy second first of
        Ok hexadecimal ->
            hexadecimal /= Hexadecimal.zero

        _ ->
            False


addBy : UnsignedInteger -> UnsignedInteger -> Result String UnsignedInteger
addBy (UnsignedInteger first) (UnsignedInteger second) =
    let
        sum : Result String Hexadecimal
        sum =
            Hexadecimal.addBy first second

        toUnsignedInteger : Hexadecimal -> Result String UnsignedInteger
        toUnsignedInteger hexadecimal =
            if Hexadecimal.length hexadecimal <= 64 then
                Ok (UnsignedInteger hexadecimal)

            else
                Err "Addition overflow"
    in
    sum
        |> Result.andThen toUnsignedInteger


increment : UnsignedInteger -> Result String UnsignedInteger
increment =
    addBy unsignedIntegerOne


subtractBy : UnsignedInteger -> UnsignedInteger -> Result String UnsignedInteger
subtractBy (UnsignedInteger small) (UnsignedInteger big) =
    Hexadecimal.subtractBy small big
        |> Result.map UnsignedInteger


multiplyBy : UnsignedInteger -> UnsignedInteger -> Result String UnsignedInteger
multiplyBy (UnsignedInteger first) (UnsignedInteger second) =
    let
        product : Result String Hexadecimal
        product =
            Hexadecimal.multiplyBy first second

        toUnsignedInteger : Hexadecimal -> Result String UnsignedInteger
        toUnsignedInteger hexadecimal =
            if Hexadecimal.length hexadecimal <= 64 then
                Ok (UnsignedInteger hexadecimal)

            else
                Err "Multiplication overflow"
    in
    product
        |> Result.andThen toUnsignedInteger


divideBy : UnsignedInteger -> UnsignedInteger -> Result String UnsignedInteger
divideBy (UnsignedInteger small) (UnsignedInteger big) =
    Hexadecimal.divideBy small big
        |> Result.map UnsignedInteger


squareRoot : UnsignedInteger -> Result String UnsignedInteger
squareRoot (UnsignedInteger hexadecimal) =
    hexadecimal
        |> Hexadecimal.squareRoot
        |> Result.map UnsignedInteger



-- BIG INT


toBigInt : UnsignedInteger -> Result String BigInt
toBigInt (UnsignedInteger hexadecimal) =
    hexadecimal
        |> Hexadecimal.toBigInt
