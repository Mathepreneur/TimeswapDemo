port module Main exposing (idDecoder, main)

-- IMPORT

import Browser
import Browser.Events
import Data exposing (Address, Deposit, Loan, Reserve, UnsignedInteger)
import Dict exposing (Dict)
import Element exposing (Color, Element, FocusStyle)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font exposing (Font)
import Element.Input as Input exposing (Placeholder)
import Html exposing (Html)
import Image
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as Pipeline
import Json.Encode as Encode exposing (Value)
import Network exposing (Network)
import Sort.Dict
import Time exposing (Posix)



-- MAIN


main : Program Flag Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type alias Model =
    { window : Window
    , state : State
    , error : Maybe String
    }


type alias Window =
    { width : Int
    , height : Int
    }


type State
    = Rinkeby Info
    | NotConnected
    | NoMetamask


type alias Info =
    { user : Address
    , tokenApproved : Maybe Approved
    , collateralApproved : Maybe Approved
    , reserve : Maybe Reserve
    , transaction : Transaction
    , deposit : Maybe Deposit
    , loan : Sort.Dict.Dict UnsignedInteger Loan
    , log : Log
    }


type Approved
    = Approved
    | NotApproved


type alias Transaction =
    { transactionType : TransactionType
    , token : String
    , collateral : String
    , interest : String
    }


type TransactionType
    = Lend
    | Borrow


type alias Log =
    { id : Int
    , record : Record
    }


type alias Record =
    Dict Int Function


type Function
    = ViewReserves
    | DepositOf
    | LoanOf UnsignedInteger
    | AllowanceToken
    | AllowanceCollateral
    | ApproveToken
    | ApproveCollateral
    | Lending
    | Borrowing


type alias Outcome =
    { value : Value
    , log : Log
    }


type Method
    = Call
    | SendTransaction



-- INIT


init : Flag -> ( Model, Cmd Msg )
init { width, height, hasMetamask } =
    let
        state : State
        state =
            if hasMetamask then
                NotConnected

            else
                NoMetamask
    in
    ( Model (Window width height) state Nothing, Cmd.none )


type alias Flag =
    { width : Int
    , height : Int
    , hasMetamask : Bool
    }



-- MSG


type Msg
    = ChangeWindow Int Int
    | SendConnect
    | ReceiveConnect Value
    | ReceiveUser Value
    | ReceiveNetwork Value
    | ReceiveTransaction Value
    | Check Posix
    | SwitchToLend
    | SwitchToBorrow
    | ChangeTokenAmount String
    | ChangeCollateralAmount String
    | ChangeInterestAmount String
    | Approve
    | Swap



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model.state ) of
        ( ChangeWindow width height, _ ) ->
            ( { model | window = Window width height }, Cmd.none )

        ( SendConnect, NotConnected ) ->
            ( model, sendConnect () )

        ( ReceiveConnect value, NotConnected ) ->
            updateConnect value model

        ( ReceiveUser value, Rinkeby _ ) ->
            updateUser value model

        ( ReceiveNetwork value, Rinkeby info ) ->
            updateNetwork value info model

        ( ReceiveTransaction value, Rinkeby info ) ->
            updateTransaction value info model

        ( Check _, Rinkeby info ) ->
            updateCheck info model

        ( SwitchToLend, Rinkeby info ) ->
            updateToLend info model

        ( SwitchToBorrow, Rinkeby info ) ->
            updateToBorrow info model

        ( ChangeTokenAmount input, Rinkeby info ) ->
            updateTokenAmount input info model

        ( ChangeCollateralAmount input, Rinkeby info ) ->
            updateCollateralAmount input info model

        ( ChangeInterestAmount input, Rinkeby info ) ->
            updateInterestAmount input info model

        ( Approve, Rinkeby info ) ->
            updateApprove info model

        ( Swap, Rinkeby info ) ->
            updateSwap info model

        _ ->
            ( model, Cmd.none )


updateConnect : Value -> Model -> ( Model, Cmd Msg )
updateConnect value model =
    let
        resultConnect : Result Decode.Error ResultConnect
        resultConnect =
            Decode.decodeValue decoderConnect value
    in
    case resultConnect of
        Ok { network, user } ->
            case ( network, user ) of
                ( Ok _, Ok address ) ->
                    let
                        viewReservesOutcome : Outcome
                        viewReservesOutcome =
                            viewReserves
                                { id = 0
                                , record = Dict.empty
                                }

                        depositOfOutcome : Outcome
                        depositOfOutcome =
                            depositOf address viewReservesOutcome.log

                        loanOfOutcome : Outcome
                        loanOfOutcome =
                            loanOf address Data.unsignedIntegerZero depositOfOutcome.log

                        allowanceTokenOutcome : Outcome
                        allowanceTokenOutcome =
                            allowanceToken address loanOfOutcome.log

                        allowanceCollateralOutcome : Outcome
                        allowanceCollateralOutcome =
                            allowanceCollateral address allowanceTokenOutcome.log

                        sendTransactionCommand : Cmd Msg
                        sendTransactionCommand =
                            Cmd.batch
                                [ sendTransaction viewReservesOutcome.value
                                , sendTransaction depositOfOutcome.value
                                , sendTransaction loanOfOutcome.value
                                , sendTransaction allowanceTokenOutcome.value
                                , sendTransaction allowanceCollateralOutcome.value
                                ]

                        state : State
                        state =
                            initialState address allowanceCollateralOutcome.log
                    in
                    ( { model | state = state }, sendTransactionCommand )

                ( Err error, _ ) ->
                    ( { model | error = Just error }, Cmd.none )

                ( _, Err error ) ->
                    ( { model | error = Just error }, Cmd.none )

        Err decodeError ->
            ( { model | error = Just <| Decode.errorToString decodeError }
            , Cmd.none
            )


initialState : Address -> Log -> State
initialState address log =
    Rinkeby
        { user = address
        , tokenApproved = Nothing
        , collateralApproved = Nothing
        , reserve = Nothing
        , transaction = defaultLend
        , deposit = Nothing
        , loan = Sort.Dict.empty Data.sorter
        , log = log
        }


defaultLend : Transaction
defaultLend =
    { transactionType = Lend
    , token = ""
    , collateral = ""
    , interest = ""
    }


defaultBorrow : Transaction
defaultBorrow =
    { transactionType = Borrow
    , token = ""
    , collateral = ""
    , interest = ""
    }


type alias ResultConnect =
    { network : Result String Network
    , user : Result String Address
    }


decoderConnect : Decoder ResultConnect
decoderConnect =
    Decode.succeed ResultConnect
        |> Pipeline.required "network" Network.decoder
        |> Pipeline.required "user" Data.addressDecoder


updateUser : Value -> Model -> ( Model, Cmd Msg )
updateUser value model =
    let
        resultAddress : Result Decode.Error (Maybe (Result String Address))
        resultAddress =
            Decode.decodeValue (Decode.nullable Data.addressDecoder) value
    in
    case resultAddress of
        Ok (Just (Ok address)) ->
            let
                viewReservesOutcome : Outcome
                viewReservesOutcome =
                    viewReserves
                        { id = 0
                        , record = Dict.empty
                        }

                depositOfOutcome : Outcome
                depositOfOutcome =
                    depositOf address viewReservesOutcome.log

                loanOfOutcome : Outcome
                loanOfOutcome =
                    loanOf address Data.unsignedIntegerZero depositOfOutcome.log

                allowanceTokenOutcome : Outcome
                allowanceTokenOutcome =
                    allowanceToken address loanOfOutcome.log

                allowanceCollateralOutcome : Outcome
                allowanceCollateralOutcome =
                    allowanceCollateral address allowanceTokenOutcome.log

                sendTransactionCommand : Cmd Msg
                sendTransactionCommand =
                    Cmd.batch
                        [ sendTransaction viewReservesOutcome.value
                        , sendTransaction depositOfOutcome.value
                        , sendTransaction loanOfOutcome.value
                        , sendTransaction allowanceTokenOutcome.value
                        , sendTransaction allowanceCollateralOutcome.value
                        ]

                state : State
                state =
                    initialState address allowanceCollateralOutcome.log
            in
            ( { model | state = state }
            , sendTransactionCommand
            )

        Ok (Just (Err error)) ->
            ( { model | state = NotConnected, error = Just error }
            , Cmd.none
            )

        Ok Nothing ->
            ( { model | state = NotConnected, error = Just "You have been logged out. Decentralized Counter only works with Kovan Test Network. Please switch your network on Metamask." }
            , Cmd.none
            )

        Err decodeError ->
            ( { model | error = Just <| Decode.errorToString decodeError }
            , Cmd.none
            )


updateNetwork : Value -> Info -> Model -> ( Model, Cmd Msg )
updateNetwork value info model =
    let
        resultNetwork : Result Decode.Error (Result String Network)
        resultNetwork =
            Decode.decodeValue Network.decoder value
    in
    case resultNetwork of
        Ok (Ok _) ->
            let
                viewReservesOutcome : Outcome
                viewReservesOutcome =
                    viewReserves
                        { id = 0
                        , record = Dict.empty
                        }

                depositOfOutcome : Outcome
                depositOfOutcome =
                    depositOf info.user viewReservesOutcome.log

                loanOfOutcome : Outcome
                loanOfOutcome =
                    loanOf info.user Data.unsignedIntegerZero depositOfOutcome.log

                allowanceTokenOutcome : Outcome
                allowanceTokenOutcome =
                    allowanceToken info.user loanOfOutcome.log

                allowanceCollateralOutcome : Outcome
                allowanceCollateralOutcome =
                    allowanceCollateral info.user allowanceTokenOutcome.log

                sendTransactionCommand : Cmd Msg
                sendTransactionCommand =
                    Cmd.batch
                        [ sendTransaction viewReservesOutcome.value
                        , sendTransaction depositOfOutcome.value
                        , sendTransaction loanOfOutcome.value
                        , sendTransaction allowanceTokenOutcome.value
                        , sendTransaction allowanceCollateralOutcome.value
                        ]

                state : State
                state =
                    initialState info.user allowanceCollateralOutcome.log
            in
            ( { model | state = state }
            , sendTransactionCommand
            )

        Ok (Err error) ->
            ( { model | state = NotConnected, error = Just error }
            , Cmd.none
            )

        Err decodeError ->
            ( { model | error = Just <| Decode.errorToString decodeError }
            , Cmd.none
            )


updateTransaction : Value -> Info -> Model -> ( Model, Cmd Msg )
updateTransaction value info model =
    let
        id : Result Decode.Error Int
        id =
            value
                |> Decode.decodeValue idDecoder

        function : Result Decode.Error (Maybe Function)
        function =
            info.log.record
                |> Ok
                |> Result.map2 Dict.get id

        jsonrpc : Result Decode.Error String
        jsonrpc =
            value
                |> Decode.decodeValue jsonrpcDecoder
    in
    case ( jsonrpc, function ) of
        ( Ok "2.0", Ok (Just ViewReserves) ) ->
            let
                reserve : Maybe Reserve
                reserve =
                    value
                        |> Decode.decodeValue viewReservesDecoder
                        |> Result.map Result.toMaybe
                        |> Result.withDefault Nothing

                nextInfo : Info
                nextInfo =
                    { info | reserve = reserve }
            in
            ( { model | state = Rinkeby nextInfo }, Cmd.none )

        ( Ok "2.0", Ok (Just DepositOf) ) ->
            let
                deposit : Maybe Deposit
                deposit =
                    value
                        |> Decode.decodeValue depositOfDecoder
                        |> Result.map Result.toMaybe
                        |> Result.withDefault Nothing

                nextInfo : Info
                nextInfo =
                    { info | deposit = deposit }
            in
            ( { model | state = Rinkeby nextInfo }, Cmd.none )

        ( Ok "2.0", Ok (Just (LoanOf index)) ) ->
            let
                resultLoan : Maybe Loan
                resultLoan =
                    value
                        |> Decode.decodeValue loanOfDecoder
                        |> Result.map Result.toMaybe
                        |> Result.withDefault Nothing
            in
            case resultLoan of
                Just loan ->
                    let
                        nextIndex : UnsignedInteger
                        nextIndex =
                            Result.withDefault Data.unsignedIntegerZero <| Data.increment index

                        loanOfOutcome : Outcome
                        loanOfOutcome =
                            loanOf info.user nextIndex info.log

                        nextInfo : Info
                        nextInfo =
                            { info | loan = Sort.Dict.insert index loan info.loan, log = loanOfOutcome.log }
                    in
                    ( { model | state = Rinkeby nextInfo }
                    , sendTransaction loanOfOutcome.value
                    )

                Nothing ->
                    ( model, Cmd.none )

        ( Ok "2.0", Ok (Just AllowanceToken) ) ->
            let
                resultUnsignedInteger : Maybe UnsignedInteger
                resultUnsignedInteger =
                    value
                        |> Decode.decodeValue unsignedIntegerDecoder
                        |> Result.map Result.toMaybe
                        |> Result.withDefault Nothing
            in
            case resultUnsignedInteger of
                Just unsignedInteger ->
                    let
                        tokenApproved : Approved
                        tokenApproved =
                            if unsignedInteger == Data.unsignedIntegerMaxInteger then
                                Approved

                            else
                                NotApproved

                        nextInfo : Info
                        nextInfo =
                            { info | tokenApproved = Just tokenApproved }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                Nothing ->
                    let
                        nextInfo : Info
                        nextInfo =
                            { info | tokenApproved = Nothing }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

        ( Ok "2.0", Ok (Just AllowanceCollateral) ) ->
            let
                resultUnsignedInteger : Maybe UnsignedInteger
                resultUnsignedInteger =
                    value
                        |> Decode.decodeValue unsignedIntegerDecoder
                        |> Result.map Result.toMaybe
                        |> Result.withDefault Nothing
            in
            case resultUnsignedInteger of
                Just unsignedInteger ->
                    let
                        collateralApproved : Approved
                        collateralApproved =
                            if unsignedInteger == Data.unsignedIntegerMaxInteger then
                                Approved

                            else
                                NotApproved

                        nextInfo : Info
                        nextInfo =
                            { info | collateralApproved = Just collateralApproved }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                Nothing ->
                    let
                        nextInfo : Info
                        nextInfo =
                            { info | collateralApproved = Nothing }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

        _ ->
            ( model, Cmd.none )


idDecoder : Decoder Int
idDecoder =
    Decode.field "id" Decode.int


jsonrpcDecoder : Decoder String
jsonrpcDecoder =
    Decode.field "jsonrpc" Decode.string


viewReservesDecoder : Decoder (Result String Reserve)
viewReservesDecoder =
    Decode.field "result" Data.viewReservesDecoder


depositOfDecoder : Decoder (Result String Deposit)
depositOfDecoder =
    Decode.field "result" Data.depositOfDecoder


loanOfDecoder : Decoder (Result String Loan)
loanOfDecoder =
    Decode.field "result" Data.loanOfDecoder


unsignedIntegerDecoder : Decoder (Result String UnsignedInteger)
unsignedIntegerDecoder =
    Decode.field "result" Data.unsignedIntegerDecoder


updateCheck : Info -> Model -> ( Model, Cmd Msg )
updateCheck info model =
    let
        viewReservesOutcome : Outcome
        viewReservesOutcome =
            viewReserves info.log

        depositOfOutcome : Outcome
        depositOfOutcome =
            depositOf info.user viewReservesOutcome.log

        loanOfOutcome : Outcome
        loanOfOutcome =
            loanOf info.user Data.unsignedIntegerZero depositOfOutcome.log

        allowanceTokenOutcome : Outcome
        allowanceTokenOutcome =
            allowanceToken info.user loanOfOutcome.log

        allowanceCollateralOutcome : Outcome
        allowanceCollateralOutcome =
            allowanceCollateral info.user allowanceTokenOutcome.log

        sendTransactionCommand : Cmd Msg
        sendTransactionCommand =
            Cmd.batch
                [ sendTransaction viewReservesOutcome.value
                , sendTransaction depositOfOutcome.value
                , sendTransaction loanOfOutcome.value
                , sendTransaction allowanceTokenOutcome.value
                , sendTransaction allowanceCollateralOutcome.value
                ]

        nextInfo : Info
        nextInfo =
            { info | log = allowanceCollateralOutcome.log }
    in
    ( { model | state = Rinkeby nextInfo }
    , sendTransactionCommand
    )


updateToLend : Info -> Model -> ( Model, Cmd Msg )
updateToLend info model =
    let
        nextInfo : Info
        nextInfo =
            { info | transaction = defaultLend }
    in
    ( { model | state = Rinkeby nextInfo }, Cmd.none )


updateToBorrow : Info -> Model -> ( Model, Cmd Msg )
updateToBorrow info model =
    let
        nextInfo : Info
        nextInfo =
            { info | transaction = defaultBorrow }
    in
    ( { model | state = Rinkeby nextInfo }, Cmd.none )


updateTokenAmount : String -> Info -> Model -> ( Model, Cmd Msg )
updateTokenAmount input info model =
    let
        initialTransaction : Transaction
        initialTransaction =
            info.transaction

        resultToken : Result String UnsignedInteger
        resultToken =
            Data.toUnsignedIntegerFromStringToken input

        resultCollateral : Result String UnsignedInteger
        resultCollateral =
            Data.toUnsignedIntegerFromStringToken initialTransaction.collateral
    in
    case info.reserve of
        Just reserve ->
            case ( initialTransaction.transactionType, resultToken, resultCollateral ) of
                ( Lend, Ok token, Ok collateral ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | token = input, interest = getInterestLend token collateral reserve }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                ( Borrow, Ok token, Ok collateral ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | token = input, interest = getInterestBorrow token collateral reserve }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                _ ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | token = input }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

        Nothing ->
            ( model, Cmd.none )


updateCollateralAmount : String -> Info -> Model -> ( Model, Cmd Msg )
updateCollateralAmount input info model =
    let
        initialTransaction : Transaction
        initialTransaction =
            info.transaction

        resultToken : Result String UnsignedInteger
        resultToken =
            Data.toUnsignedIntegerFromStringToken initialTransaction.token

        resultCollateral : Result String UnsignedInteger
        resultCollateral =
            Data.toUnsignedIntegerFromStringToken input
    in
    case info.reserve of
        Just reserve ->
            case ( initialTransaction.transactionType, resultToken, resultCollateral ) of
                ( Lend, Ok token, Ok collateral ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | collateral = input, interest = getInterestLend token collateral reserve }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                ( Borrow, Ok token, Ok collateral ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | collateral = input, interest = getInterestBorrow token collateral reserve }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                _ ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | collateral = input }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

        Nothing ->
            ( model, Cmd.none )


updateInterestAmount : String -> Info -> Model -> ( Model, Cmd Msg )
updateInterestAmount input info model =
    let
        initialTransaction : Transaction
        initialTransaction =
            info.transaction

        resultCollateral : Result String UnsignedInteger
        resultCollateral =
            Data.toUnsignedIntegerFromStringToken initialTransaction.collateral

        resultInterest : Result String UnsignedInteger
        resultInterest =
            Data.toUnsignedIntegerFromStringToken input
    in
    case info.reserve of
        Just reserve ->
            case ( initialTransaction.transactionType, resultCollateral, resultInterest ) of
                ( Lend, Ok collateral, Ok interest ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | token = getTokenLend collateral interest reserve, interest = input }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                ( Borrow, Ok collateral, Ok interest ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | token = getTokenBorrow collateral interest reserve, interest = input }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                _ ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | interest = input }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

        Nothing ->
            ( model, Cmd.none )


updateApprove : Info -> Model -> ( Model, Cmd Msg )
updateApprove info model =
    case ( info.transaction.transactionType, info.tokenApproved, info.collateralApproved ) of
        ( Lend, Just NotApproved, _ ) ->
            let
                approveOutcome : Outcome
                approveOutcome =
                    approveToken info.user info.log

                nextInfo : Info
                nextInfo =
                    { info | log = approveOutcome.log }
            in
            ( { model | state = Rinkeby nextInfo }, sendTransaction approveOutcome.value )

        ( Borrow, _, Just NotApproved ) ->
            let
                approveOutcome : Outcome
                approveOutcome =
                    approveCollateral info.user info.log

                nextInfo : Info
                nextInfo =
                    { info | log = approveOutcome.log }
            in
            ( { model | state = Rinkeby nextInfo }, sendTransaction approveOutcome.value )

        _ ->
            ( model, Cmd.none )


updateSwap : Info -> Model -> ( Model, Cmd Msg )
updateSwap info model =
    let
        initialTransaction : Transaction
        initialTransaction =
            info.transaction

        resultToken : Result String UnsignedInteger
        resultToken =
            Data.toUnsignedIntegerFromStringToken initialTransaction.token

        resultCollateral : Result String UnsignedInteger
        resultCollateral =
            Data.toUnsignedIntegerFromStringToken initialTransaction.collateral

        resultInterest : Result String UnsignedInteger
        resultInterest =
            Data.toUnsignedIntegerFromStringToken initialTransaction.interest
    in
    case ( resultToken, resultCollateral, resultInterest ) of
        ( Ok token, Ok collateral, Ok _ ) ->
            case initialTransaction.transactionType of
                Lend ->
                    let
                        lendOutcome : Outcome
                        lendOutcome =
                            lend token collateral info.user info.log

                        nextInfo : Info
                        nextInfo =
                            { info | log = lendOutcome.log, transaction = defaultLend }
                    in
                    ( { model | state = Rinkeby nextInfo }, sendTransaction lendOutcome.value )

                Borrow ->
                    let
                        borrowOutcome : Outcome
                        borrowOutcome =
                            borrow token collateral info.user info.log

                        nextInfo : Info
                        nextInfo =
                            { info | log = borrowOutcome.log, transaction = defaultBorrow }
                    in
                    ( { model | state = Rinkeby nextInfo }, sendTransaction borrowOutcome.value )

        _ ->
            ( model, Cmd.none )


getCollateralMax : UnsignedInteger -> Reserve -> Result String UnsignedInteger
getCollateralMax token reserve =
    case Data.addBy token reserve.token of
        Ok sum ->
            token
                |> Data.multiplyBy reserve.collateral
                |> Result.andThen (Data.divideBy sum)

        error ->
            error


getInterestMaxLend : UnsignedInteger -> Reserve -> Result String UnsignedInteger
getInterestMaxLend token reserve =
    case Data.addBy token reserve.token of
        Ok sum ->
            token
                |> Data.multiplyBy reserve.interest
                |> Result.andThen (Data.divideBy sum)

        error ->
            error


getInterestLend : UnsignedInteger -> UnsignedInteger -> Reserve -> String
getInterestLend token collateral reserve =
    if Data.greaterThan collateral reserve.collateral then
        ""

    else
        let
            resultCollateralMax : Result String UnsignedInteger
            resultCollateralMax =
                getCollateralMax token reserve

            resultInterestMax : Result String UnsignedInteger
            resultInterestMax =
                getInterestMaxLend token reserve
        in
        case ( resultCollateralMax, resultInterestMax ) of
            ( Ok collateralMax, Ok interestMax ) ->
                if Data.greaterThan collateral collateralMax then
                    ""

                else
                    case Data.subtractBy collateral collateralMax of
                        Ok difference ->
                            let
                                resultInterest : Result String UnsignedInteger
                                resultInterest =
                                    interestMax
                                        |> Data.multiplyBy difference
                                        |> Result.andThen (Data.divideBy collateralMax)
                            in
                            case resultInterest of
                                Ok interest ->
                                    Data.fromUnsignedIntegerToToken interest

                                _ ->
                                    ""

                        _ ->
                            ""

            _ ->
                ""


getCollateralMin : UnsignedInteger -> Reserve -> Result String UnsignedInteger
getCollateralMin token reserve =
    case Data.subtractBy token reserve.token of
        Ok difference ->
            token
                |> Data.multiplyBy reserve.collateral
                |> Result.andThen (Data.divideBy difference)

        error ->
            error


getInterestMaxBorrow : UnsignedInteger -> Reserve -> Result String UnsignedInteger
getInterestMaxBorrow token reserve =
    case Data.subtractBy token reserve.token of
        Ok difference ->
            token
                |> Data.multiplyBy reserve.interest
                |> Result.andThen (Data.divideBy difference)

        error ->
            error


getInterestBorrow : UnsignedInteger -> UnsignedInteger -> Reserve -> String
getInterestBorrow token collateral reserve =
    if Data.greaterThan token reserve.token then
        ""

    else
        let
            resultCollateralMin : Result String UnsignedInteger
            resultCollateralMin =
                getCollateralMin token reserve

            resultInterestMax : Result String UnsignedInteger
            resultInterestMax =
                getInterestMaxBorrow token reserve
        in
        case ( resultCollateralMin, resultInterestMax ) of
            ( Ok collateralMin, Ok interestMax ) ->
                if Data.greaterThan collateralMin collateral then
                    ""

                else
                    let
                        resultInterest : Result String UnsignedInteger
                        resultInterest =
                            interestMax
                                |> Data.multiplyBy collateralMin
                                |> Result.andThen (Data.divideBy collateral)
                    in
                    case resultInterest of
                        Ok interest ->
                            Data.fromUnsignedIntegerToToken interest

                        _ ->
                            ""

            _ ->
                ""


getTokenLend : UnsignedInteger -> UnsignedInteger -> Reserve -> String
getTokenLend collateral interest reserve =
    if Data.greaterThan collateral reserve.collateral then
        ""

    else
        let
            resultFirst : Result String UnsignedInteger
            resultFirst =
                collateral
                    |> Data.multiplyBy reserve.interest

            resultSecond : Result String UnsignedInteger
            resultSecond =
                interest
                    |> Data.multiplyBy reserve.collateral

            resultThird : Result String UnsignedInteger
            resultThird =
                reserve.collateral
                    |> Data.multiplyBy reserve.interest
        in
        case ( resultFirst, resultSecond, resultThird ) of
            ( Ok first, Ok second, Ok third ) ->
                let
                    resultW : Result String UnsignedInteger
                    resultW =
                        first
                            |> Data.addBy second
                            |> Result.andThen (Data.divideBy third)
                in
                case resultW of
                    Ok w ->
                        if w == Data.unsignedIntegerZero then
                            ""

                        else
                            case Data.subtractBy w Data.unsignedIntegerTokenOne of
                                Ok difference ->
                                    let
                                        resultToken : Result String UnsignedInteger
                                        resultToken =
                                            w
                                                |> Data.multiplyBy reserve.token
                                                |> Result.andThen (Data.divideBy difference)
                                    in
                                    case resultToken of
                                        Ok token ->
                                            Data.fromUnsignedIntegerToToken token

                                        _ ->
                                            ""

                                _ ->
                                    ""

                    _ ->
                        ""

            _ ->
                ""


getTokenBorrow : UnsignedInteger -> UnsignedInteger -> Reserve -> String
getTokenBorrow collateral interest reserve =
    let
        resultDenominator : Result String UnsignedInteger
        resultDenominator =
            reserve.collateral
                |> Data.multiplyBy reserve.interest
    in
    case resultDenominator of
        Ok denominator ->
            let
                resultW : Result String UnsignedInteger
                resultW =
                    collateral
                        |> Data.multiplyBy interest
                        |> Result.andThen (Data.divideBy denominator)
                        |> Result.andThen Data.squareRoot
            in
            case resultW of
                Ok w ->
                    if w == Data.unsignedIntegerZero then
                        ""

                    else
                        case Data.addBy w Data.unsignedIntegerTokenOne of
                            Ok sum ->
                                let
                                    resultToken : Result String UnsignedInteger
                                    resultToken =
                                        w
                                            |> Data.multiplyBy reserve.token
                                            |> Result.andThen (Data.divideBy sum)
                                in
                                case resultToken of
                                    Ok token ->
                                        Data.fromUnsignedIntegerToToken token

                                    _ ->
                                        ""

                            _ ->
                                ""

                _ ->
                    ""

        _ ->
            ""


viewReserves : Log -> Outcome
viewReserves log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "to", Data.addressEncode Data.addressTimeswapPool )
            , ( "data", Data.encode Data.viewReserves )
            ]

        nextLog : Log
        nextLog =
            next ViewReserves log

        value : Value
        value =
            Encode.object
                [ ( "id", idEncode nextLog )
                , ( "jsonrpc", jsonrpcEncode )
                , ( "method", methodEncode Call )
                , ( "params", parameterEncode parameter )
                ]
    in
    Outcome value nextLog


depositOf : Address -> Log -> Outcome
depositOf owner log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "to", Data.addressEncode Data.addressTimeswapPool )
            , ( "data", Data.encode <| Data.depositOf owner )
            ]

        nextLog : Log
        nextLog =
            next DepositOf log

        value : Value
        value =
            Encode.object
                [ ( "id", idEncode nextLog )
                , ( "jsonrpc", jsonrpcEncode )
                , ( "method", methodEncode Call )
                , ( "params", parameterEncode parameter )
                ]
    in
    Outcome value nextLog


loanOf : Address -> UnsignedInteger -> Log -> Outcome
loanOf owner index log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "to", Data.addressEncode Data.addressTimeswapPool )
            , ( "data", Data.encode <| Data.loanOf owner index )
            ]

        nextLog : Log
        nextLog =
            next (LoanOf index) log

        value : Value
        value =
            Encode.object
                [ ( "id", idEncode nextLog )
                , ( "jsonrpc", jsonrpcEncode )
                , ( "method", methodEncode Call )
                , ( "params", parameterEncode parameter )
                ]
    in
    Outcome value nextLog


allowanceToken : Address -> Log -> Outcome
allowanceToken owner log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "to", Data.addressEncode Data.addressDaiTSDemo )
            , ( "data", Data.encode <| Data.allowance owner Data.addressTimeswapConvenience )
            ]

        nextLog : Log
        nextLog =
            next AllowanceToken log

        value : Value
        value =
            Encode.object
                [ ( "id", idEncode nextLog )
                , ( "jsonrpc", jsonrpcEncode )
                , ( "method", methodEncode Call )
                , ( "params", parameterEncode parameter )
                ]
    in
    Outcome value nextLog


allowanceCollateral : Address -> Log -> Outcome
allowanceCollateral owner log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "to", Data.addressEncode Data.addressFileTSDemo )
            , ( "data", Data.encode <| Data.allowance owner Data.addressTimeswapConvenience )
            ]

        nextLog : Log
        nextLog =
            next AllowanceCollateral log

        value : Value
        value =
            Encode.object
                [ ( "id", idEncode nextLog )
                , ( "jsonrpc", jsonrpcEncode )
                , ( "method", methodEncode Call )
                , ( "params", parameterEncode parameter )
                ]
    in
    Outcome value nextLog


approveToken : Address -> Log -> Outcome
approveToken sender log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "from", Data.addressEncode sender )
            , ( "to", Data.addressEncode Data.addressDaiTSDemo )
            , ( "data", Data.encode <| Data.approve Data.addressTimeswapConvenience Data.unsignedIntegerMaxInteger )
            ]

        nextLog : Log
        nextLog =
            next ApproveToken log

        value : Value
        value =
            Encode.object
                [ ( "id", idEncode nextLog )
                , ( "jsonrpc", jsonrpcEncode )
                , ( "method", methodEncode SendTransaction )
                , ( "params", parameterEncode parameter )
                ]
    in
    Outcome value nextLog


approveCollateral : Address -> Log -> Outcome
approveCollateral sender log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "from", Data.addressEncode sender )
            , ( "to", Data.addressEncode Data.addressFileTSDemo )
            , ( "data", Data.encode <| Data.approve Data.addressTimeswapConvenience Data.unsignedIntegerMaxInteger )
            ]

        nextLog : Log
        nextLog =
            next ApproveCollateral log

        value : Value
        value =
            Encode.object
                [ ( "id", idEncode nextLog )
                , ( "jsonrpc", jsonrpcEncode )
                , ( "method", methodEncode SendTransaction )
                , ( "params", parameterEncode parameter )
                ]
    in
    Outcome value nextLog


lend : UnsignedInteger -> UnsignedInteger -> Address -> Log -> Outcome
lend token collateral sender log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "from", Data.addressEncode sender )
            , ( "to", Data.addressEncode Data.addressTimeswapConvenience )
            , ( "data", Data.encode <| Data.lend Data.addressTimeswapPool token collateral sender )
            ]

        nextLog : Log
        nextLog =
            next Lending log

        value : Value
        value =
            Encode.object
                [ ( "id", idEncode nextLog )
                , ( "jsonrpc", jsonrpcEncode )
                , ( "method", methodEncode SendTransaction )
                , ( "params", parameterEncode parameter )
                ]
    in
    Outcome value nextLog


borrow : UnsignedInteger -> UnsignedInteger -> Address -> Log -> Outcome
borrow token collateral sender log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "from", Data.addressEncode sender )
            , ( "to", Data.addressEncode Data.addressTimeswapConvenience )
            , ( "data", Data.encode <| Data.borrow Data.addressTimeswapPool token collateral sender )
            ]

        nextLog : Log
        nextLog =
            next Borrowing log

        value : Value
        value =
            Encode.object
                [ ( "id", idEncode nextLog )
                , ( "jsonrpc", jsonrpcEncode )
                , ( "method", methodEncode SendTransaction )
                , ( "params", parameterEncode parameter )
                ]
    in
    Outcome value nextLog


next : Function -> Log -> Log
next function { id, record } =
    let
        nextId : Int
        nextId =
            id + 1

        nextRecord : Record
        nextRecord =
            Dict.insert nextId function record
    in
    { id = nextId
    , record = nextRecord
    }


idEncode : Log -> Value
idEncode { id } =
    Encode.int id


jsonrpcEncode : Value
jsonrpcEncode =
    Encode.string "2.0"


methodEncode : Method -> Value
methodEncode method =
    case method of
        Call ->
            Encode.string "eth_call"

        SendTransaction ->
            Encode.string "eth_sendTransaction"


parameterEncode : List ( String, Value ) -> Value
parameterEncode parameter =
    Encode.list Encode.object <| List.singleton parameter



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions { state } =
    case state of
        Rinkeby _ ->
            Sub.batch
                [ Browser.Events.onResize ChangeWindow
                , receiveUser ReceiveUser
                , receiveNetwork ReceiveNetwork
                , receiveTransaction ReceiveTransaction
                , Time.every 10000 Check
                ]

        NotConnected ->
            Sub.batch
                [ Browser.Events.onResize ChangeWindow
                , receiveConnect ReceiveConnect
                ]

        NoMetamask ->
            Browser.Events.onResize ChangeWindow



-- PORT


port sendConnect : () -> Cmd msg


port sendTransaction : Value -> Cmd msg


port receiveConnect : (Value -> msg) -> Sub msg


port receiveUser : (Value -> msg) -> Sub msg


port receiveNetwork : (Value -> msg) -> Sub msg


port receiveTransaction : (Value -> msg) -> Sub msg



-- VIEW


view : Model -> Html Msg
view model =
    Element.layoutWith
        { options = [ Element.focusStyle focus ] }
        []
        (viewElement model)


focus : FocusStyle
focus =
    { borderColor = Nothing
    , backgroundColor = Nothing
    , shadow = Nothing
    }


viewElement : Model -> Element Msg
viewElement model =
    case model.state of
        Rinkeby info ->
            Element.column
                [ Element.width Element.fill
                , Element.height Element.fill
                , Background.color imperfectWhite
                ]
                [ viewHeader info.user
                , viewBody info
                ]

        NotConnected ->
            Element.column
                [ Element.width Element.fill
                , Element.height Element.fill
                , Background.color imperfectWhite
                ]
                [ viewHeaderNotConnected
                , Element.none -- Add More
                ]

        NoMetamask ->
            Element.none



-- Add More


viewHeaderNotConnected : Element Msg
viewHeaderNotConnected =
    Element.row
        [ Element.width Element.fill
        , Element.height <| Element.px 72
        , Element.padding 12
        ]
        [ viewLogo
        , viewWalletNotConnected
        ]


viewWalletNotConnected : Element Msg
viewWalletNotConnected =
    Input.button
        [ Element.paddingXY 18 9
        , Element.alignRight
        , Background.color blue
        , Border.rounded 30
        , Font.color imperfectWhite
        , Font.size 18
        , Font.family lato
        ]
        { onPress = Just SendConnect
        , label = Element.text "Connect Metamask"
        }


viewHeader : Address -> Element Msg
viewHeader address =
    Element.row
        [ Element.width Element.fill
        , Element.height <| Element.px 72
        , Element.padding 12
        ]
        [ viewLogo
        , viewWallet address
        ]


viewLogo : Element Msg
viewLogo =
    Image.toElement
        [ Element.width <| Element.px 200
        , Element.height Element.shrink
        ]
        Image.timeswapDayLogo


viewWallet : Address -> Element Msg
viewWallet address =
    Element.el
        [ Element.paddingXY 18 9
        , Element.alignRight
        , Background.color blue
        , Border.rounded 30
        , Font.color imperfectWhite
        , Font.size 18
        , Font.family lato
        ]
        (Data.fromAddressToTextShort address)


viewBody : Info -> Element Msg
viewBody info =
    Element.row
        [ Element.width Element.fill
        , Element.height Element.fill
        , Element.paddingXY 20 100
        , Element.spacing 20
        ]
        [ viewAsset info.deposit
        , viewLiability info.loan
        , viewSwap info
        ]


viewSwap : Info -> Element Msg
viewSwap info =
    case info.transaction.transactionType of
        Lend ->
            Element.column
                [ Element.width <| Element.px 400
                , Element.padding 20
                , Element.spacing 20
                , Element.centerX
                , Element.alignTop
                , Background.color dirtyWhite
                , Border.rounded 30
                ]
                [ viewLendTabs
                , viewToken info.transaction.token
                , viewInsurance info.transaction.token info.transaction.collateral info.reserve
                , viewInterest info.transaction.token info.transaction.interest
                , viewApproveButton info.tokenApproved
                , viewSwapButton info.tokenApproved info.transaction
                ]

        Borrow ->
            Element.column
                [ Element.width <| Element.px 400
                , Element.padding 20
                , Element.spacing 20
                , Element.centerX
                , Element.alignTop
                , Background.color dirtyWhite
                , Border.rounded 30
                ]
                [ viewBorrowTabs
                , viewToken info.transaction.token
                , viewCollateral info.transaction.token info.transaction.collateral info.reserve
                , viewInterest info.transaction.token info.transaction.interest
                , viewApproveButton info.collateralApproved
                , viewSwapButton info.collateralApproved info.transaction
                ]


viewLendTabs : Element Msg
viewLendTabs =
    Element.row
        [ Element.width Element.fill
        , Element.padding 10
        , Background.color dirtyWhite
        ]
        [ viewLendTabChosen
        , viewBorrowTab
        ]


viewBorrowTabs : Element Msg
viewBorrowTabs =
    Element.row
        [ Element.width Element.fill
        , Element.padding 10
        , Background.color dirtyWhite
        ]
        [ viewLendTab
        , viewBorrowTabChosen
        ]


viewLendTab : Element Msg
viewLendTab =
    Input.button
        [ Element.width Element.fill
        , Font.color gray
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Just SwitchToLend
        , label = Element.text "Lend"
        }


viewLendTabChosen : Element Msg
viewLendTabChosen =
    Input.button
        [ Element.width Element.fill
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Nothing
        , label = Element.text "Lend"
        }


viewBorrowTab : Element Msg
viewBorrowTab =
    Input.button
        [ Element.width Element.fill
        , Font.color gray
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Just SwitchToBorrow
        , label = Element.text "Borrow"
        }


viewBorrowTabChosen : Element Msg
viewBorrowTabChosen =
    Input.button
        [ Element.width Element.fill
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Nothing
        , label = Element.text "Borrow"
        }


viewToken : String -> Element Msg
viewToken token =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputTokenDetails
        , viewInput token "DAI" ChangeTokenAmount
        ]


viewInsurance : String -> String -> Maybe Reserve -> Element Msg
viewInsurance token collateral maybeReserve =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputInsuranceDetails <| unsignedIntegerToString <| getCollateralMaxMaybe (Data.toUnsignedIntegerFromStringToken token) maybeReserve
        , viewInput collateral "FILE" ChangeCollateralAmount
        ]


viewCollateral : String -> String -> Maybe Reserve -> Element Msg
viewCollateral token collateral maybeReserve =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputCollateralDetails <| unsignedIntegerToString <| getCollateralMinMaybe (Data.toUnsignedIntegerFromStringToken token) maybeReserve
        , viewInput collateral "FILE" ChangeCollateralAmount
        ]


getCollateralMaxMaybe : Result String UnsignedInteger -> Maybe Reserve -> Result String UnsignedInteger
getCollateralMaxMaybe resultToken maybeReserve =
    case ( resultToken, maybeReserve ) of
        ( Ok token, Just reserve ) ->
            getCollateralMax token reserve

        _ ->
            Err "No Reserve"


getCollateralMinMaybe : Result String UnsignedInteger -> Maybe Reserve -> Result String UnsignedInteger
getCollateralMinMaybe resultToken maybeReserve =
    case ( resultToken, maybeReserve ) of
        ( Ok token, Just reserve ) ->
            getCollateralMin token reserve

        _ ->
            Err "No Reserve"


unsignedIntegerToString : Result String UnsignedInteger -> Maybe String
unsignedIntegerToString resultCollateral =
    resultCollateral
        |> Result.map Data.fromUnsignedIntegerToToken
        |> Result.toMaybe


viewInterest : String -> String -> Element Msg
viewInterest token interest =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputInterestDetails <| getAPR token interest
        , viewInput interest "DAI" ChangeInterestAmount
        ]


getAPR : String -> String -> Maybe String
getAPR token interest =
    let
        maybeTokenFloat : Maybe Float
        maybeTokenFloat =
            String.toFloat token

        maybeInterestFloat : Maybe Float
        maybeInterestFloat =
            String.toFloat interest

        getInterest : Float -> Float -> String
        getInterest tokenFloat interestFloat =
            interestFloat * 100 / tokenFloat |> roundDownPercent |> String.fromFloat
    in
    Maybe.map2 getInterest maybeTokenFloat maybeInterestFloat


viewInputTokenDetails : Element Msg
viewInputTokenDetails =
    Element.el
        [ Element.width Element.fill ]
        viewPrincipalText


viewInputInsuranceDetails : Maybe String -> Element Msg
viewInputInsuranceDetails maybeLimit =
    Element.row
        [ Element.width Element.fill ]
        [ viewInsuranceText
        , viewMaximumInsurance maybeLimit
        ]


viewInputCollateralDetails : Maybe String -> Element Msg
viewInputCollateralDetails maybeLimit =
    Element.row
        [ Element.width Element.fill ]
        [ viewCollateralText
        , viewMinimumCollateral maybeLimit
        ]


viewInputInterestDetails : Maybe String -> Element Msg
viewInputInterestDetails maybePercent =
    Element.row
        [ Element.width Element.fill ]
        [ viewInterestText
        , viewPercent maybePercent
        ]


viewPrincipalText : Element Msg
viewPrincipalText =
    Element.el
        [ Element.padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (Element.text "Principal")


viewInsuranceText : Element Msg
viewInsuranceText =
    Element.el
        [ Element.padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (Element.text "Insurance")


viewCollateralText : Element Msg
viewCollateralText =
    Element.el
        [ Element.padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (Element.text "Collateral")


viewInterestText : Element Msg
viewInterestText =
    Element.el
        [ Element.padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (Element.text "Interest on August 5, 2021")


viewMaximumInsurance : Maybe String -> Element Msg
viewMaximumInsurance maybeLimit =
    case maybeLimit of
        Just limit ->
            Element.el
                [ Element.alignRight
                , Element.padding 5
                , Border.rounded 30
                , Font.color imperfectBlack
                , Font.size 14
                , Font.family lato
                ]
                (Element.text <| "Maximum " ++ limit)

        Nothing ->
            Element.none


viewMinimumCollateral : Maybe String -> Element Msg
viewMinimumCollateral maybeLimit =
    case maybeLimit of
        Just limit ->
            Element.el
                [ Element.alignRight
                , Element.padding 5
                , Border.rounded 30
                , Font.color imperfectBlack
                , Font.size 14
                , Font.family lato
                ]
                (Element.text <| "Minimum " ++ limit)

        Nothing ->
            Element.none


viewPercent : Maybe String -> Element Msg
viewPercent maybePercent =
    case maybePercent of
        Just percent ->
            Element.el
                [ Element.alignRight
                , Element.padding 5
                , Border.rounded 30
                , Font.color imperfectBlack
                , Font.size 14
                , Font.family lato
                ]
                (Element.text <| "APR " ++ percent ++ "%")

        Nothing ->
            Element.none


viewArrow : Element Msg
viewArrow =
    Image.toElement
        [ Element.width <| Element.px 10
        , Element.height Element.shrink
        ]
        Image.chevronDown


viewInput : String -> String -> (String -> Msg) -> Element Msg
viewInput string currency msg =
    Element.row
        [ Element.width Element.fill
        , Element.spacing 10
        ]
        [ viewInputNumber string msg
        , viewTokenInput currency
        ]


viewInputNumber : String -> (String -> Msg) -> Element Msg
viewInputNumber text msg =
    Input.text
        [ Element.padding 5
        , Background.color imperfectWhite
        , Border.width 0
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        { onChange = msg
        , text = text
        , placeholder = Just viewZeros
        , label = Input.labelHidden "Input"
        }


viewZeros : Placeholder Msg
viewZeros =
    Input.placeholder
        [ Font.color gray
        , Font.size 24
        , Font.family lato
        ]
        (Element.text "0.0")


viewTokenInput : String -> Element Msg
viewTokenInput string =
    Input.button
        [ Element.width Element.shrink
        , Element.height Element.fill
        , Element.padding 5
        , Border.rounded 30
        , Element.mouseOver [ Background.color dirtyWhite ]
        , Element.alignRight
        ]
        { onPress = Nothing
        , label = viewCurrency string
        }


viewCurrency : String -> Element Msg
viewCurrency currency =
    Element.row
        [ Element.spacing 5
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ Element.text currency
        , viewArrow
        ]


viewApproveButton : Maybe Approved -> Element Msg
viewApproveButton approved =
    case approved of
        Just Approved ->
            Element.none

        Just NotApproved ->
            Input.button
                [ Element.width Element.fill
                , Element.padding 12
                , Background.color blue
                , Border.rounded 30
                , Font.color imperfectWhite
                , Font.size 24
                , Font.family lato
                , Font.center
                ]
                { onPress = Just Approve
                , label = Element.text "Approve"
                }

        Nothing ->
            Element.none


viewSwapButton : Maybe Approved -> Transaction -> Element Msg
viewSwapButton approved transaction =
    case approved of
        Just Approved ->
            let
                resultToken : Result String UnsignedInteger
                resultToken =
                    Data.toUnsignedIntegerFromStringToken transaction.token

                resultCollateral : Result String UnsignedInteger
                resultCollateral =
                    Data.toUnsignedIntegerFromStringToken transaction.collateral

                resultInterest : Result String UnsignedInteger
                resultInterest =
                    Data.toUnsignedIntegerFromStringToken transaction.interest
            in
            case ( resultToken, resultCollateral, resultInterest ) of
                ( Ok _, Ok _, Ok _ ) ->
                    Input.button
                        [ Element.width Element.fill
                        , Element.padding 12
                        , Background.color blue
                        , Border.rounded 30
                        , Font.color imperfectWhite
                        , Font.size 24
                        , Font.family lato
                        , Font.center
                        ]
                        { onPress = Just Swap
                        , label = Element.text "Swap"
                        }

                _ ->
                    Input.button
                        [ Element.width Element.fill
                        , Element.padding 12
                        , Background.color gray
                        , Border.rounded 30
                        , Font.color imperfectWhite
                        , Font.size 24
                        , Font.family lato
                        , Font.center
                        ]
                        { onPress = Nothing
                        , label = Element.text "Enter an Amount"
                        }

        _ ->
            Input.button
                [ Element.width Element.fill
                , Element.padding 12
                , Background.color gray
                , Border.rounded 30
                , Font.color imperfectWhite
                , Font.size 24
                , Font.family lato
                , Font.center
                ]
                { onPress = Nothing
                , label = Element.text "Requires Approval"
                }



-- VIEW ASSET


viewAsset : Maybe Deposit -> Element Msg
viewAsset maybeDeposit =
    case maybeDeposit of
        Nothing ->
            Element.none

        Just deposit ->
            if deposit.deposit == Data.unsignedIntegerZero && deposit.insurance == Data.unsignedIntegerZero then
                Element.none

            else
                Element.column
                    [ Element.width <| Element.px 400
                    , Element.padding 20
                    , Element.spacing 20
                    , Element.centerX
                    , Element.alignTop
                    , Background.color dirtyWhite
                    , Border.rounded 30
                    , Element.clipY
                    , Element.scrollbarX
                    ]
                    [ viewDepositTitle
                    , viewDepositBox deposit
                    ]


viewDepositTitle : Element Msg
viewDepositTitle =
    Element.el
        [ Element.width Element.fill
        , Font.color gray
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        (Element.text "Deposit")


viewDepositBox : Deposit -> Element Msg
viewDepositBox { deposit, insurance } =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewDeposit deposit
        , viewDepositInsurance insurance
        ]


viewDeposit : UnsignedInteger -> Element Msg
viewDeposit deposit =
    Element.row
        [ Element.width Element.fill
        , Element.padding 5
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ Element.text <| Maybe.withDefault "" <| unsignedIntegerToString <| Ok deposit
        , Element.el [ Element.alignRight ] <| Element.text "DAI"
        ]


viewDepositInsurance : UnsignedInteger -> Element Msg
viewDepositInsurance insurance =
    Element.row
        [ Element.width Element.fill
        , Element.padding 5
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ Element.text <| Maybe.withDefault "" <| unsignedIntegerToString <| Ok insurance
        , Element.el [ Element.alignRight ] <| Element.text "FILE"
        ]



-- VIEW LIABILITY LIST


viewLiability : Sort.Dict.Dict UnsignedInteger Loan -> Element Msg
viewLiability dictionaryLoan =
    if dictionaryLoan == Sort.Dict.empty Data.sorter then
        Element.none

    else
        Element.column
            [ Element.width <| Element.px 400
            , Element.padding 20
            , Element.spacing 20
            , Element.centerX
            , Element.alignTop
            , Background.color dirtyWhite
            , Border.rounded 30
            , Element.clipY
            , Element.scrollbarX
            ]
            (viewDebtTitle :: List.map viewLoanBox (List.reverse <| Sort.Dict.values dictionaryLoan))


viewDebtTitle : Element Msg
viewDebtTitle =
    Element.el
        [ Element.width Element.fill
        , Font.color gray
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        (Element.text "Debt")


viewLoanBox : Loan -> Element Msg
viewLoanBox { loan, collateral } =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewLoan loan
        , viewLoanCollateral collateral
        ]


viewLoan : UnsignedInteger -> Element Msg
viewLoan loan =
    Element.row
        [ Element.width Element.fill
        , Element.padding 5
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ Element.text <| Maybe.withDefault "" <| unsignedIntegerToString <| Ok loan
        , Element.el [ Element.alignRight ] <| Element.text "DAI"
        ]


viewLoanCollateral : UnsignedInteger -> Element Msg
viewLoanCollateral collateral =
    Element.row
        [ Element.width Element.fill
        , Element.padding 5
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ Element.text <| Maybe.withDefault "" <| unsignedIntegerToString <| Ok collateral
        , Element.el [ Element.alignRight ] <| Element.text "FILE"
        ]


roundDownPercent : Float -> Float
roundDownPercent =
    roundDown 2


roundDown : Int -> Float -> Float
roundDown decimals float =
    (float * toFloat (10 ^ decimals) |> truncate |> toFloat) / toFloat (10 ^ decimals)



-- FONT


lato : List Font
lato =
    [ Font.typeface "Lato"
    , Font.sansSerif
    ]



-- COLOR


imperfectWhite : Color
imperfectWhite =
    Element.fromRgb255
        { red = 254
        , green = 254
        , blue = 254
        , alpha = 1
        }


dirtyWhite : Color
dirtyWhite =
    Element.fromRgb255
        { red = 230
        , green = 230
        , blue = 230
        , alpha = 1
        }


imperfectBlack : Color
imperfectBlack =
    Element.fromRgb255
        { red = 34
        , green = 34
        , blue = 34
        , alpha = 1
        }


gray : Color
gray =
    Element.fromRgb255
        { red = 152
        , green = 152
        , blue = 152
        , alpha = 1
        }


blue : Color
blue =
    Element.fromRgb255
        { red = 0
        , green = 158
        , blue = 241
        , alpha = 1
        }
