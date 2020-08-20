port module Main exposing (main)

-- IMPORT

import BigInt exposing (BigInt)
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
import Utility



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
    , tokenBalance : Maybe UnsignedInteger
    , collateralBalance : Maybe UnsignedInteger
    , tokenApproved : Maybe Approved
    , collateralApproved : Maybe Approved
    , collateralPoolBalance : Maybe UnsignedInteger
    , totalDeposit : Maybe Deposit
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
    | BalanceOfToken
    | BalanceOfCollateral
    | BalanceOfPoolCollateral
    | TotalDeposit
    | AllowanceToken
    | AllowanceCollateral
    | MintToken
    | MintCollateral
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
    | SlideCollateralAmount Float
    | ChangeCollateralAmount String
    | ChangeInterestAmount String
    | WatchToken
    | WatchCollateral
    | SendMintToken
    | SendMintCollateral
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

        ( SlideCollateralAmount input, Rinkeby info ) ->
            updateSliderAmount input info model

        ( ChangeCollateralAmount input, Rinkeby info ) ->
            updateCollateralAmount input info model

        ( ChangeInterestAmount input, Rinkeby info ) ->
            updateInterestAmount input info model

        ( WatchToken, Rinkeby _ ) ->
            ( model, request watchToken )

        ( WatchCollateral, Rinkeby _ ) ->
            ( model, request watchCollateral )

        ( SendMintToken, Rinkeby info ) ->
            updateMintToken info model

        ( SendMintCollateral, Rinkeby info ) ->
            updateMintCollateral info model

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

                        balanceOfTokenOutcome : Outcome
                        balanceOfTokenOutcome =
                            balanceOfToken address loanOfOutcome.log

                        balanceOfCollateralOutcome : Outcome
                        balanceOfCollateralOutcome =
                            balanceOfCollateral address balanceOfTokenOutcome.log

                        balanceOfCollateralPoolOutcome : Outcome
                        balanceOfCollateralPoolOutcome =
                            balanceOfPoolCollateral balanceOfCollateralOutcome.log

                        totalDepositOutcome : Outcome
                        totalDepositOutcome =
                            totalDeposit balanceOfCollateralPoolOutcome.log

                        allowanceTokenOutcome : Outcome
                        allowanceTokenOutcome =
                            allowanceToken address totalDepositOutcome.log

                        allowanceCollateralOutcome : Outcome
                        allowanceCollateralOutcome =
                            allowanceCollateral address allowanceTokenOutcome.log

                        sendTransactionCommand : Cmd Msg
                        sendTransactionCommand =
                            Cmd.batch
                                [ sendTransaction viewReservesOutcome.value
                                , sendTransaction depositOfOutcome.value
                                , sendTransaction loanOfOutcome.value
                                , sendTransaction balanceOfTokenOutcome.value
                                , sendTransaction balanceOfCollateralOutcome.value
                                , sendTransaction balanceOfCollateralPoolOutcome.value
                                , sendTransaction totalDepositOutcome.value
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
        , tokenBalance = Nothing
        , collateralBalance = Nothing
        , tokenApproved = Nothing
        , collateralApproved = Nothing
        , collateralPoolBalance = Nothing
        , totalDeposit = Nothing
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

        ( Ok "2.0", Ok (Just BalanceOfToken) ) ->
            let
                resultUnsignedInteger : Result String UnsignedInteger
                resultUnsignedInteger =
                    value
                        |> Decode.decodeValue unsignedIntegerDecoder
                        |> Result.withDefault (Err "Cannot turn to big int")
            in
            case resultUnsignedInteger of
                Ok unsignedInteger ->
                    let
                        nextInfo : Info
                        nextInfo =
                            { info | tokenBalance = Just unsignedInteger }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                _ ->
                    let
                        nextInfo : Info
                        nextInfo =
                            { info | tokenBalance = Nothing }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

        ( Ok "2.0", Ok (Just BalanceOfCollateral) ) ->
            let
                resultUnsignedInteger : Result String UnsignedInteger
                resultUnsignedInteger =
                    value
                        |> Decode.decodeValue unsignedIntegerDecoder
                        |> Result.withDefault (Err "Cannot turn to big int")
            in
            case resultUnsignedInteger of
                Ok unsignedInteger ->
                    let
                        nextInfo : Info
                        nextInfo =
                            { info | collateralBalance = Just unsignedInteger }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                _ ->
                    let
                        nextInfo : Info
                        nextInfo =
                            { info | collateralBalance = Nothing }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

        ( Ok "2.0", Ok (Just BalanceOfPoolCollateral) ) ->
            let
                resultUnsignedInteger : Result String UnsignedInteger
                resultUnsignedInteger =
                    value
                        |> Decode.decodeValue unsignedIntegerDecoder
                        |> Result.withDefault (Err "Cannot turn to big int")
            in
            case resultUnsignedInteger of
                Ok unsignedInteger ->
                    let
                        nextInfo : Info
                        nextInfo =
                            { info | collateralPoolBalance = Just unsignedInteger }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                _ ->
                    let
                        nextInfo : Info
                        nextInfo =
                            { info | collateralBalance = Nothing }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

        ( Ok "2.0", Ok (Just TotalDeposit) ) ->
            let
                deposit : Maybe Deposit
                deposit =
                    value
                        |> Decode.decodeValue depositOfDecoder
                        |> Result.map Result.toMaybe
                        |> Result.withDefault Nothing

                nextInfo : Info
                nextInfo =
                    { info | totalDeposit = deposit }
            in
            ( { model | state = Rinkeby nextInfo }, Cmd.none )

        ( Ok "2.0", Ok (Just AllowanceToken) ) ->
            let
                resultUnsignedInteger : Result String BigInt
                resultUnsignedInteger =
                    value
                        |> Decode.decodeValue unsignedIntegerDecoder
                        |> Result.withDefault (Err "Cannot turn to big int")
                        |> Result.andThen Data.toBigInt
            in
            case resultUnsignedInteger of
                Ok unsignedInteger ->
                    let
                        tokenApproved : Approved
                        tokenApproved =
                            if BigInt.gt unsignedInteger maxUint112 then
                                Approved

                            else
                                NotApproved

                        nextInfo : Info
                        nextInfo =
                            { info | tokenApproved = Just tokenApproved }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                _ ->
                    let
                        nextInfo : Info
                        nextInfo =
                            { info | tokenApproved = Nothing }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

        ( Ok "2.0", Ok (Just AllowanceCollateral) ) ->
            let
                resultUnsignedInteger : Result String BigInt
                resultUnsignedInteger =
                    value
                        |> Decode.decodeValue unsignedIntegerDecoder
                        |> Result.withDefault (Err "Cannot turn to big int")
                        |> Result.andThen Data.toBigInt
            in
            case resultUnsignedInteger of
                Ok unsignedInteger ->
                    let
                        collateralApproved : Approved
                        collateralApproved =
                            if BigInt.gt unsignedInteger maxUint112 then
                                Approved

                            else
                                NotApproved

                        nextInfo : Info
                        nextInfo =
                            { info | collateralApproved = Just collateralApproved }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                _ ->
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

        resultToken : Result String BigInt
        resultToken =
            fromTokenToBigInt input

        resultCollateral : Result String BigInt
        resultCollateral =
            fromTokenToBigInt initialTransaction.collateral
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


updateSliderAmount : Float -> Info -> Model -> ( Model, Cmd Msg )
updateSliderAmount input info model =
    let
        initialTransaction : Transaction
        initialTransaction =
            info.transaction

        resultToken : Result String BigInt
        resultToken =
            fromTokenToBigInt initialTransaction.token

        maxCollateral : Result String BigInt
        maxCollateral =
            info.reserve
                |> Result.fromMaybe "No Maybe"
                |> Utility.andThen2 getCollateralMax resultToken

        resultCollateral : Result String BigInt
        resultCollateral =
            if input < 0 then
                Err "Cannot be less than zero"

            else if input > 100 then
                Err "Cannot be greater than one hundred"

            else
                input
                    |> String.fromFloat
                    |> fromTokenToBigInt
                    |> Utility.andThen2 mulBy maxCollateral
                    |> Utility.andThen2 divBy (mulBy (BigInt.fromInt 100) quintillion)
    in
    case info.reserve of
        Just reserve ->
            case ( initialTransaction.transactionType, resultToken, resultCollateral ) of
                ( Lend, Ok token, Ok collateral ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | collateral = roundDownString <| Result.withDefault "" <| fromBigIntToToken collateral, interest = getInterestLend token collateral reserve }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                ( Borrow, Ok token, Ok collateral ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | collateral = roundDownString <| Result.withDefault "" <| fromBigIntToToken collateral, interest = getInterestBorrow token collateral reserve }

                        nextInfo : Info
                        nextInfo =
                            { info | transaction = transaction }
                    in
                    ( { model | state = Rinkeby nextInfo }, Cmd.none )

                _ ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | collateral = "" }

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

        resultToken : Result String BigInt
        resultToken =
            fromTokenToBigInt initialTransaction.token

        resultCollateral : Result String BigInt
        resultCollateral =
            fromTokenToBigInt input
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
    ( model, Cmd.none )


updateMintToken : Info -> Model -> ( Model, Cmd Msg )
updateMintToken info model =
    let
        mintTokenOutcome : Outcome
        mintTokenOutcome =
            mintToken info.user info.log

        nextInfo : Info
        nextInfo =
            { info | log = mintTokenOutcome.log }
    in
    ( { model | state = Rinkeby nextInfo }, sendTransaction mintTokenOutcome.value )


updateMintCollateral : Info -> Model -> ( Model, Cmd Msg )
updateMintCollateral info model =
    let
        mintCollateralOutcome : Outcome
        mintCollateralOutcome =
            mintCollateral info.user info.log

        nextInfo : Info
        nextInfo =
            { info | log = mintCollateralOutcome.log }
    in
    ( { model | state = Rinkeby nextInfo }, sendTransaction mintCollateralOutcome.value )


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


getCollateralMax : BigInt -> Reserve -> Result String BigInt
getCollateralMax token reserve =
    let
        reserveToken : Result String BigInt
        reserveToken =
            reserve.token
                |> Data.toBigInt

        reserveCollateral : Result String BigInt
        reserveCollateral =
            reserve.collateral
                |> Data.toBigInt

        sum : Result String BigInt
        sum =
            reserveToken
                |> Result.andThen (addBy token)
    in
    token
        |> Ok
        |> Utility.andThen2 mulBy reserveCollateral
        |> Utility.andThen2 divBy sum


getInterestMaxLend : BigInt -> Reserve -> Result String BigInt
getInterestMaxLend token reserve =
    let
        reserveToken : Result String BigInt
        reserveToken =
            reserve.token
                |> Data.toBigInt

        reserveInterest : Result String BigInt
        reserveInterest =
            reserve.interest
                |> Data.toBigInt

        sum : Result String BigInt
        sum =
            reserveToken
                |> Result.andThen (addBy token)
    in
    token
        |> Ok
        |> Utility.andThen2 mulBy reserveInterest
        |> Utility.andThen2 divBy sum


getInterestLend : BigInt -> BigInt -> Reserve -> String
getInterestLend token collateral reserve =
    let
        collateralMax : Result String BigInt
        collateralMax =
            getCollateralMax token reserve

        interestMax : Result String BigInt
        interestMax =
            getInterestMaxLend token reserve

        difference : Result String BigInt
        difference =
            collateralMax
                |> Result.andThen (subBy collateral)
    in
    interestMax
        |> Utility.andThen2 mulBy difference
        |> Utility.andThen2 divBy collateralMax
        |> Result.andThen fromBigIntToToken
        |> Result.withDefault ""


getCollateralMin : BigInt -> Reserve -> Result String BigInt
getCollateralMin token reserve =
    let
        reserveToken : Result String BigInt
        reserveToken =
            reserve.token
                |> Data.toBigInt

        reserveCollateral : Result String BigInt
        reserveCollateral =
            reserve.collateral
                |> Data.toBigInt

        difference : Result String BigInt
        difference =
            reserveToken
                |> Result.andThen (subBy token)
    in
    token
        |> Ok
        |> Utility.andThen2 mulBy reserveCollateral
        |> Utility.andThen2 divBy difference


getInterestMaxBorrow : BigInt -> Reserve -> Result String BigInt
getInterestMaxBorrow token reserve =
    let
        reserveToken : Result String BigInt
        reserveToken =
            reserve.token
                |> Data.toBigInt

        reserveInterest : Result String BigInt
        reserveInterest =
            reserve.interest
                |> Data.toBigInt

        difference : Result String BigInt
        difference =
            reserveToken
                |> Result.andThen (subBy token)
    in
    token
        |> Ok
        |> Utility.andThen2 mulBy reserveInterest
        |> Utility.andThen2 divBy difference


getInterestBorrow : BigInt -> BigInt -> Reserve -> String
getInterestBorrow token collateral reserve =
    let
        collateralMin : Result String BigInt
        collateralMin =
            getCollateralMin token reserve

        interestMax : Result String BigInt
        interestMax =
            getInterestMaxBorrow token reserve

        checkedCollateral : Result String BigInt
        checkedCollateral =
            if Result.withDefault False (Result.map2 BigInt.gte (Ok collateral) collateralMin) then
                Ok collateral

            else
                Err "Collateral must be greeater than minimum"
    in
    interestMax
        |> Utility.andThen2 mulBy collateralMin
        |> Utility.andThen2 divBy checkedCollateral
        |> Result.andThen fromBigIntToToken
        |> Result.withDefault ""


getTokenLend : BigInt -> BigInt -> Reserve -> String
getTokenLend collateral interest reserve =
    let
        reserveToken : Result String BigInt
        reserveToken =
            reserve.token
                |> Data.toBigInt

        reserveCollateral : Result String BigInt
        reserveCollateral =
            reserve.collateral
                |> Data.toBigInt

        reserveInterest : Result String BigInt
        reserveInterest =
            reserve.interest
                |> Data.toBigInt

        first : Result String BigInt
        first =
            collateral
                |> Ok
                |> Utility.andThen2 mulBy reserveInterest

        second : Result String BigInt
        second =
            interest
                |> Ok
                |> Utility.andThen2 mulBy reserveCollateral

        denominator : Result String BigInt
        denominator =
            reserveCollateral
                |> Utility.andThen2 mulBy reserveInterest

        quotient : Result String BigInt
        quotient =
            first
                |> Utility.andThen2 addBy second
                |> Utility.andThen2 mulBy (Ok quintillion)
                |> Utility.andThen2 divBy denominator

        difference : Result String BigInt
        difference =
            quintillion
                |> Ok
                |> Utility.andThen2 subBy quotient
    in
    quotient
        |> Utility.andThen2 mulBy reserveToken
        |> Utility.andThen2 divBy difference
        |> Result.andThen fromBigIntToToken
        |> Result.withDefault ""


getTokenBorrow : BigInt -> BigInt -> Reserve -> String
getTokenBorrow collateral interest reserve =
    let
        reserveToken : Result String BigInt
        reserveToken =
            reserve.token
                |> Data.toBigInt

        reserveCollateral : Result String BigInt
        reserveCollateral =
            reserve.collateral
                |> Data.toBigInt

        reserveInterest : Result String BigInt
        reserveInterest =
            reserve.interest
                |> Data.toBigInt

        denominator : Result String BigInt
        denominator =
            reserveCollateral
                |> Utility.andThen2 mulBy reserveInterest

        quotient : Result String BigInt
        quotient =
            collateral
                |> mulBy interest
                |> Utility.andThen2 mulBy (Ok quintillion)
                |> Utility.andThen2 divBy denominator
                |> Result.andThen squareRoot

        sum : Result String BigInt
        sum =
            quintillion
                |> Ok
                |> Utility.andThen2 addBy quotient
    in
    quotient
        |> Utility.andThen2 mulBy reserveToken
        |> Utility.andThen2 divBy sum
        |> Result.andThen fromBigIntToToken
        |> Result.withDefault ""


watchToken : Value
watchToken =
    let
        parameter : Value
        parameter =
            Encode.object
                [ ( "type", tokenERC20Encode )
                , ( "options", options )
                ]

        options : Value
        options =
            Encode.object
                [ ( "address", Data.addressEncode Data.addressDaiTSDemo )
                , ( "symbol", tokenEncode )
                , ( "decimals", decimalsEncode )
                ]
    in
    Encode.object
        [ ( "method", method2Encode )
        , ( "params", parameter )
        ]


watchCollateral : Value
watchCollateral =
    let
        parameter : Value
        parameter =
            Encode.object
                [ ( "type", tokenERC20Encode )
                , ( "options", options )
                ]

        options : Value
        options =
            Encode.object
                [ ( "address", Data.addressEncode Data.addressFileTSDemo )
                , ( "symbol", collateralEncode )
                , ( "decimals", decimalsEncode )
                ]
    in
    Encode.object
        [ ( "method", method2Encode )
        , ( "params", parameter )
        ]


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


balanceOfToken : Address -> Log -> Outcome
balanceOfToken owner log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "to", Data.addressEncode Data.addressDaiTSDemo )
            , ( "data", Data.encode <| Data.balanceOf owner )
            ]

        nextLog : Log
        nextLog =
            next BalanceOfToken log

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


balanceOfCollateral : Address -> Log -> Outcome
balanceOfCollateral owner log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "to", Data.addressEncode Data.addressFileTSDemo )
            , ( "data", Data.encode <| Data.balanceOf owner )
            ]

        nextLog : Log
        nextLog =
            next BalanceOfCollateral log

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


balanceOfPoolCollateral : Log -> Outcome
balanceOfPoolCollateral log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "to", Data.addressEncode Data.addressFileTSDemo )
            , ( "data", Data.encode <| Data.balanceOf Data.addressTimeswapPool )
            ]

        nextLog : Log
        nextLog =
            next BalanceOfPoolCollateral log

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


totalDeposit : Log -> Outcome
totalDeposit log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "to", Data.addressEncode Data.addressTimeswapPool )
            , ( "data", Data.encode Data.totalDeposit )
            ]

        nextLog : Log
        nextLog =
            next TotalDeposit log

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


mintToken : Address -> Log -> Outcome
mintToken sender log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "from", Data.addressEncode sender )
            , ( "to", Data.addressEncode Data.addressDaiTSDemo )
            , ( "data", Data.encode <| Data.mint sender Data.mintTokenAmount )
            ]

        nextLog : Log
        nextLog =
            next MintToken log

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


mintCollateral : Address -> Log -> Outcome
mintCollateral sender log =
    let
        parameter : List ( String, Value )
        parameter =
            [ ( "from", Data.addressEncode sender )
            , ( "to", Data.addressEncode Data.addressFileTSDemo )
            , ( "data", Data.encode <| Data.mint sender Data.mintCollateralAmount )
            ]

        nextLog : Log
        nextLog =
            next MintCollateral log

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


method2Encode : Value
method2Encode =
    Encode.string "wallet_watchAsset"


tokenERC20Encode : Value
tokenERC20Encode =
    Encode.string "ERC20"


tokenEncode : Value
tokenEncode =
    Encode.string "DAI"


collateralEncode : Value
collateralEncode =
    Encode.string "FILE"


decimalsEncode : Value
decimalsEncode =
    Encode.int 18



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


port request : Value -> Cmd msg


port receiveConnect : (Value -> msg) -> Sub msg


port receiveUser : (Value -> msg) -> Sub msg


port receiveNetwork : (Value -> msg) -> Sub msg


port receiveTransaction : (Value -> msg) -> Sub msg



-- VIEW


view : Model -> Html Msg
view model =
    let
        viewHeader : Element Msg
        viewHeader =
            case model.state of
                Rinkeby info ->
                    viewHeaderConnected info.user

                NotConnected ->
                    viewHeaderNotConnected

                NoMetamask ->
                    Element.none

        viewFooter : Element Msg
        viewFooter =
            case model.state of
                Rinkeby _ ->
                    viewFooterConnected

                NotConnected ->
                    Element.none

                NoMetamask ->
                    Element.none
    in
    Element.layoutWith
        { options = [ Element.focusStyle focus ] }
        [ Element.inFront viewHeader
        , Element.inFront viewFooter
        ]
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
            Element.el
                [ Element.width Element.fill
                , Element.height Element.fill
                , Background.color imperfectWhite
                ]
            <|
                viewBody info

        NotConnected ->
            Element.el
                [ Element.width Element.fill
                , Element.height Element.fill
                , Background.color imperfectWhite
                ]
                viewBodyNotConnected

        NoMetamask ->
            viewBodyNoMetamask


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


viewHeaderConnected : Address -> Element Msg
viewHeaderConnected address =
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


viewFooterConnected : Element Msg
viewFooterConnected =
    Element.row
        [ Element.width Element.fill
        , Element.height <| Element.px 72
        , Element.padding 12
        , Element.spacing 12
        , Element.alignBottom
        ]
        [ viewMintToken
        , viewWatchToken
        , viewMintCollateral
        , viewWatchCollateral
        , viewEmail
        ]


viewMintToken : Element Msg
viewMintToken =
    Input.button
        [ Element.paddingXY 18 9
        , Element.alignLeft
        , Background.color blue
        , Border.rounded 30
        , Font.color imperfectWhite
        , Font.size 18
        , Font.family lato
        ]
        { onPress = Just SendMintToken
        , label = Element.text "Mint 1000 Test DAI"
        }


viewWatchToken : Element Msg
viewWatchToken =
    Input.button
        [ Element.paddingXY 18 9
        , Element.alignLeft
        , Background.color blue
        , Border.rounded 30
        , Font.color imperfectWhite
        , Font.size 18
        , Font.family lato
        ]
        { onPress = Just WatchToken
        , label = Element.text "Show Test DAI in Metamask"
        }


viewMintCollateral : Element Msg
viewMintCollateral =
    Input.button
        [ Element.paddingXY 18 9
        , Element.alignLeft
        , Background.color blue
        , Border.rounded 30
        , Font.color imperfectWhite
        , Font.size 18
        , Font.family lato
        ]
        { onPress = Just SendMintCollateral
        , label = Element.text "Mint 5 Test FILE"
        }


viewWatchCollateral : Element Msg
viewWatchCollateral =
    Input.button
        [ Element.paddingXY 18 9
        , Element.alignLeft
        , Background.color blue
        , Border.rounded 30
        , Font.color imperfectWhite
        , Font.size 18
        , Font.family lato
        ]
        { onPress = Just WatchCollateral
        , label = Element.text "Show Test FILE in Metamask"
        }


viewEmail : Element Msg
viewEmail =
    Element.el
        [ Element.paddingXY 18 9
        , Element.alignRight
        , Background.color blue
        , Border.rounded 30
        , Font.color imperfectWhite
        , Font.size 18
        , Font.family lato
        ]
        (Element.text "Mathepreneur.eth@gmail.com")


viewBody : Info -> Element Msg
viewBody info =
    Element.row
        [ Element.width Element.fill
        , Element.height Element.fill
        , Element.paddingXY 20 172
        , Element.spacing 20
        ]
        [ viewAssetBox info.deposit info.collateralPoolBalance info.totalDeposit
        , viewSwap info
        , viewLiabilityBox info.loan
        ]


viewBodyNotConnected : Element Msg
viewBodyNotConnected =
    Element.paragraph
        [ Element.width Element.fill
        , Element.padding 100
        , Element.centerY
        , Font.color blue
        , Font.size 48
        , Font.family lato
        , Font.center
        ]
        [ Element.text "Connect to Metamask Rinkeby Test Network." ]


viewBodyNoMetamask : Element Msg
viewBodyNoMetamask =
    Element.paragraph
        [ Element.width Element.fill
        , Element.padding 100
        , Element.centerY
        , Font.color blue
        , Font.size 48
        , Font.family lato
        , Font.center
        ]
        [ Element.text "Timeswap Demo requires Metamask." ]


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
                , viewInsurance info.transaction.token info.transaction.collateral info.reserve info.collateralPoolBalance info.totalDeposit
                , viewInterest info.transaction.token info.transaction.interest
                , viewApproveButton info.tokenApproved
                , viewSwapButton info.tokenBalance info.collateralBalance info.tokenApproved info.transaction
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
                , viewSwapButton info.tokenBalance info.collateralBalance info.collateralApproved info.transaction
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
        , Font.color blue
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
        , Font.color blue
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


viewInsurance2 : String -> String -> Maybe Reserve -> Maybe UnsignedInteger -> Maybe Deposit -> Element Msg
viewInsurance2 token collateral maybeReserve maybeCollateralPoolBalance maybeTotalDeposit =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputInsuranceDetails <| getInsuranceDetails token maybeReserve
        , viewInput collateral "" ChangeCollateralAmount
        , viewClaim collateral maybeCollateralPoolBalance maybeTotalDeposit
        ]


viewInsurance : String -> String -> Maybe Reserve -> Maybe UnsignedInteger -> Maybe Deposit -> Element Msg
viewInsurance token collateral maybeReserve maybeCollateralPoolBalance maybeTotalDeposit =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputInsuranceDetails <| getInsuranceDetails token maybeReserve
        , viewSlider collateral <| getInsuranceDetails token maybeReserve
        , viewInput collateral "" ChangeCollateralAmount
        , viewClaim collateral maybeCollateralPoolBalance maybeTotalDeposit
        ]


viewClaim : String -> Maybe UnsignedInteger -> Maybe Deposit -> Element Msg
viewClaim collateral maybeCollateralPoolBalance maybeTotalDeposit =
    let
        resultCollateral : Result String BigInt
        resultCollateral =
            collateral
                |> fromTokenToBigInt

        resultCollateralPoolBalance : Result String BigInt
        resultCollateralPoolBalance =
            maybeCollateralPoolBalance
                |> Result.fromMaybe "Empty"
                |> Result.andThen Data.toBigInt

        resultTotalInsurance : Result String BigInt
        resultTotalInsurance =
            maybeTotalDeposit
                |> Result.fromMaybe "Empty"
                |> Result.map .insurance
                |> Result.andThen Data.toBigInt

        maxClaim : String
        maxClaim =
            resultCollateral
                |> Utility.andThen2 mulBy resultCollateralPoolBalance
                |> Utility.andThen2 divBy resultTotalInsurance
                |> Result.andThen fromBigIntToToken
                |> Result.map roundDownString
                |> Result.withDefault "0.0"
    in
    Element.el
        [ Element.padding 5
        , Border.rounded 30
        , Font.color gray
        , Font.size 14
        , Font.family lato
        ]
        (Element.text <| "Current Max Claim of " ++ maxClaim ++ " FILE")


viewCollateral : String -> String -> Maybe Reserve -> Element Msg
viewCollateral token collateral maybeReserve =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputCollateralDetails <| getCollateralDetails token maybeReserve
        , viewInput collateral "FILE" ChangeCollateralAmount
        ]


getInsuranceDetails : String -> Maybe Reserve -> Maybe String
getInsuranceDetails token maybeReserve =
    maybeReserve
        |> Result.fromMaybe "No reserves"
        |> Utility.andThen2 getCollateralMax (fromTokenToBigInt token)
        |> Result.andThen fromBigIntToToken
        |> Result.map roundDownString
        |> Result.toMaybe


getCollateralDetails : String -> Maybe Reserve -> Maybe String
getCollateralDetails token maybeReserve =
    maybeReserve
        |> Result.fromMaybe "No reserve"
        |> Utility.andThen2 getCollateralMin (fromTokenToBigInt token)
        |> Result.andThen fromBigIntToToken
        |> Result.map roundDownString
        |> Result.toMaybe


unsignedIntegerToString : Result String UnsignedInteger -> Maybe String
unsignedIntegerToString resultCollateral =
    resultCollateral
        |> Result.map Data.fromUnsignedIntegerToToken
        |> Result.toMaybe


viewInterest : String -> String -> Element Msg
viewInterest token interest =
    let
        resultToken : Result String BigInt
        resultToken =
            token
                |> fromTokenToBigInt

        resultInterest : Result String BigInt
        resultInterest =
            interest
                |> fromTokenToBigInt

        output : String
        output =
            resultInterest
                |> Utility.andThen2 addBy resultToken
                |> Result.andThen fromBigIntToToken
                |> Result.map roundDownString
                |> Result.withDefault ""
    in
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputInterestDetails <| getAPR token interest
        , viewInput output "DAI" ChangeInterestAmount
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


viewSlider : String -> Maybe String -> Element Msg
viewSlider collateral maybeLimit =
    let
        value : Float
        value =
            case maybeLimit of
                Just string ->
                    collateral
                        |> fromTokenToBigInt
                        |> Utility.andThen2 mulBy (mulBy (BigInt.fromInt 100) quintillion)
                        |> Utility.andThen2 divBy (fromTokenToBigInt string)
                        |> Result.andThen fromBigIntToToken
                        |> Result.map (String.split ".")
                        |> Result.toMaybe
                        |> Maybe.andThen List.head
                        |> Maybe.andThen String.toFloat
                        |> Maybe.withDefault 50

                Nothing ->
                    50
    in
    Input.slider
        [ Element.width Element.fill ]
        { onChange = SlideCollateralAmount
        , label = Input.labelHidden "Slider"
        , min = 0
        , max = 100
        , value = value
        , thumb = thumb value
        , step = Just 1
        }


thumb : Float -> Input.Thumb
thumb float =
    Input.thumb
        [ Element.width <| Element.px 40
        , Element.height <| Element.px 20
        , Element.inFront <| viewThumbPercent float
        , Border.rounded 20
        , Background.color blue
        ]


viewThumbPercent : Float -> Element Never
viewThumbPercent float =
    Element.el
        [ Element.centerX
        , Element.centerY
        , Font.color imperfectWhite
        , Font.size 12
        , Font.family lato
        ]
    <|
        Element.text (String.fromFloat float ++ "%")


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
        (Element.text "Output on August 5, 2021")


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
                (Element.text <| "Max " ++ limit)

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
                (Element.text <| "Min " ++ limit)

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
    Element.el
        [ Element.spacing 5
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
    <|
        Element.text currency


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


viewSwapButton : Maybe UnsignedInteger -> Maybe UnsignedInteger -> Maybe Approved -> Transaction -> Element Msg
viewSwapButton tokenBalance collateralBalance approved transaction =
    case approved of
        Just Approved ->
            let
                resultToken : Result String UnsignedInteger
                resultToken =
                    transaction.token
                        |> Data.toUnsignedIntegerFromStringToken

                resultTokenBigInt : Result String BigInt
                resultTokenBigInt =
                    transaction.token
                        |> fromTokenToBigInt

                resultCollateral : Result String UnsignedInteger
                resultCollateral =
                    transaction.collateral
                        |> Data.toUnsignedIntegerFromStringToken

                resultCollateralBigInt : Result String BigInt
                resultCollateralBigInt =
                    transaction.collateral
                        |> fromTokenToBigInt

                resultInterest : Result String UnsignedInteger
                resultInterest =
                    transaction.interest
                        |> Data.toUnsignedIntegerFromStringToken

                resultTokenBalance : Result String BigInt
                resultTokenBalance =
                    tokenBalance
                        |> Result.fromMaybe "Has not acquired balance"
                        |> Result.andThen Data.toBigInt

                resultCollateralBalance : Result String BigInt
                resultCollateralBalance =
                    collateralBalance
                        |> Result.fromMaybe "Has not acquired balance"
                        |> Result.andThen Data.toBigInt
            in
            case ( resultToken, resultCollateral, resultInterest ) of
                ( Ok _, Ok _, Ok _ ) ->
                    case transaction.transactionType of
                        Lend ->
                            case ( resultTokenBalance, resultTokenBigInt ) of
                                ( Ok currentTokenBalance, Ok tokenBigInt ) ->
                                    if BigInt.gte currentTokenBalance tokenBigInt then
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

                                    else
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
                                            { onPress = Nothing
                                            , label = Element.text "Not Enough Funds"
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

                        Borrow ->
                            case ( resultCollateralBalance, resultCollateralBigInt ) of
                                ( Ok currentCollateralBalance, Ok collateralBigInt ) ->
                                    if BigInt.gte currentCollateralBalance collateralBigInt then
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

                                    else
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
                                            { onPress = Nothing
                                            , label = Element.text "Not Enough Funds"
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


viewAssetBox : Maybe Deposit -> Maybe UnsignedInteger -> Maybe Deposit -> Element Msg
viewAssetBox maybeDeposit maybeCollateralBalance maybeTotalDeposit =
    Element.el
        [ Element.width Element.fill
        , Element.height Element.fill
        ]
    <|
        viewAsset maybeDeposit maybeCollateralBalance maybeTotalDeposit


viewAsset : Maybe Deposit -> Maybe UnsignedInteger -> Maybe Deposit -> Element Msg
viewAsset maybeDeposit maybeCollateralBalance maybeTotalDeposit =
    case ( maybeDeposit, maybeCollateralBalance, maybeTotalDeposit ) of
        ( Just deposit, Just collateralBalance, Just totalPoolDeposit ) ->
            if deposit.deposit == Data.unsignedIntegerZero && deposit.insurance == Data.unsignedIntegerZero then
                Element.none

            else
                Element.column
                    [ Element.width <| Element.px 400
                    , Element.padding 20
                    , Element.spacing 20
                    , Element.alignRight
                    , Element.alignTop
                    , Background.color dirtyWhite
                    , Border.rounded 30
                    , Element.clipY
                    , Element.scrollbarX
                    ]
                    [ viewDepositTitle
                    , viewDepositBox deposit collateralBalance totalPoolDeposit
                    ]

        _ ->
            Element.none


viewDepositTitle : Element Msg
viewDepositTitle =
    Element.column
        [ Element.width Element.fill
        , Element.spacing 5
        ]
        [ viewDepositText
        , viewDepositMaturity
        ]


viewDepositText : Element Msg
viewDepositText =
    Element.el
        [ Element.width Element.fill
        , Font.color blue
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        (Element.text "Asset")


viewDepositMaturity : Element Msg
viewDepositMaturity =
    Element.el
        [ Element.width Element.fill
        , Font.color gray
        , Font.size 12
        , Font.family lato
        , Font.center
        ]
        (Element.text "August 5, 2021")


viewDepositBox : Deposit -> UnsignedInteger -> Deposit -> Element Msg
viewDepositBox { deposit, insurance } collateralBalance totalPoolDeposit =
    Element.column
        [ Element.width Element.fill
        , Element.padding 20
        , Element.spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewDeposit deposit
        , viewDepositInsurance insurance collateralBalance totalPoolDeposit.insurance
        ]


viewDeposit : UnsignedInteger -> Element Msg
viewDeposit deposit =
    Element.column
        [ Element.width Element.fill
        , Element.padding 5
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ viewDepositInformation
        , viewDepositAmount deposit
        ]


viewDepositInformation : Element Msg
viewDepositInformation =
    Element.el
        [ Element.width Element.fill
        , Element.spacing 10
        , Font.color gray
        , Font.size 12
        , Font.family lato
        ]
    <|
        Element.text "Max Return"


viewDepositAmount : UnsignedInteger -> Element Msg
viewDepositAmount deposit =
    Element.row
        [ Element.width Element.fill
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ Element.text <| Maybe.withDefault "" <| unsignedIntegerToString <| Ok deposit
        , Element.el [ Element.alignRight ] <| Element.text "DAI"
        ]


viewDepositInsurance : UnsignedInteger -> UnsignedInteger -> UnsignedInteger -> Element Msg
viewDepositInsurance insurance collateralBalance totalPoolInsurance =
    Element.column
        [ Element.width Element.fill
        , Element.padding 5
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ viewDepositInsuranceAmount insurance
        , viewDepositClaimAmount insurance collateralBalance totalPoolInsurance
        ]


viewDepositInsuranceAmount : UnsignedInteger -> Element Msg
viewDepositInsuranceAmount insurance =
    Element.el
        [ Element.width Element.fill
        , Element.spacing 10
        , Font.color gray
        , Font.size 12
        , Font.family lato
        ]
    <|
        (Element.text <| "Current Max Claim with " ++ (Maybe.withDefault "" <| unsignedIntegerToString <| Ok insurance) ++ " Insurance")


viewDepositClaimAmount : UnsignedInteger -> UnsignedInteger -> UnsignedInteger -> Element Msg
viewDepositClaimAmount insurance collateralBalance totalPoolInsurance =
    let
        resultInsurance : Result String BigInt
        resultInsurance =
            insurance
                |> Data.toBigInt

        resultCollateralBalance : Result String BigInt
        resultCollateralBalance =
            collateralBalance
                |> Data.toBigInt

        resultTotalPoolInsurance : Result String BigInt
        resultTotalPoolInsurance =
            totalPoolInsurance
                |> Data.toBigInt

        maximumClaim : String
        maximumClaim =
            resultInsurance
                |> Utility.andThen2 mulBy resultCollateralBalance
                |> Utility.andThen2 divBy resultTotalPoolInsurance
                |> Result.andThen fromBigIntToToken
                |> Result.map roundDownString
                |> Result.withDefault ""
    in
    Element.row
        [ Element.width Element.fill
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ Element.text maximumClaim
        , Element.el [ Element.alignRight ] <| Element.text "FILE"
        ]



-- VIEW LIABILITY LIST


viewLiabilityBox : Sort.Dict.Dict UnsignedInteger Loan -> Element Msg
viewLiabilityBox dictionaryLoan =
    Element.el
        [ Element.width Element.fill
        , Element.height Element.fill
        ]
    <|
        viewLiability dictionaryLoan


viewLiability : Sort.Dict.Dict UnsignedInteger Loan -> Element Msg
viewLiability dictionaryLoan =
    if dictionaryLoan == Sort.Dict.empty Data.sorter then
        Element.none

    else
        Element.column
            [ Element.width <| Element.px 400
            , Element.padding 20
            , Element.spacing 20
            , Element.alignLeft
            , Element.alignTop
            , Background.color dirtyWhite
            , Border.rounded 30
            , Element.clipY
            , Element.scrollbarX
            ]
            (viewDebtTitle :: List.map viewLoanBox (List.reverse <| Sort.Dict.values dictionaryLoan))


viewDebtTitle : Element Msg
viewDebtTitle =
    Element.column
        [ Element.width Element.fill
        , Element.spacing 5
        ]
        [ viewDebtText
        , viewDebtMaturity
        ]


viewDebtText : Element Msg
viewDebtText =
    Element.el
        [ Element.width Element.fill
        , Font.color blue
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        (Element.text "Debt")


viewDebtMaturity : Element Msg
viewDebtMaturity =
    Element.el
        [ Element.width Element.fill
        , Font.color gray
        , Font.size 12
        , Font.family lato
        , Font.center
        ]
        (Element.text "August 5, 2021")


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
    Element.column
        [ Element.width Element.fill
        , Element.padding 5
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ viewLoanDebtDetails
        , viewLoanAmount loan
        ]


viewLoanDebtDetails : Element Msg
viewLoanDebtDetails =
    Element.el
        [ Element.width Element.fill
        , Font.color gray
        , Font.size 12
        , Font.family lato
        ]
    <|
        Element.text "Debt"


viewLoanAmount : UnsignedInteger -> Element Msg
viewLoanAmount loan =
    Element.row
        [ Element.width Element.fill
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
    Element.column
        [ Element.width Element.fill
        , Element.padding 5
        , Element.spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ viewLoanCollateralDetails
        , viewLoanCollateralAmount collateral
        ]


viewLoanCollateralDetails : Element Msg
viewLoanCollateralDetails =
    Element.el
        [ Element.width Element.fill
        , Font.color gray
        , Font.size 12
        , Font.family lato
        ]
    <|
        Element.text "Collateral Stake"


viewLoanCollateralAmount : UnsignedInteger -> Element Msg
viewLoanCollateralAmount collateral =
    Element.row
        [ Element.width Element.fill
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



-- BIG INT


quintillion : BigInt
quintillion =
    "1000000000000000000"
        |> BigInt.fromIntString
        |> Maybe.withDefault zero


fromTokenToBigInt : String -> Result String BigInt
fromTokenToBigInt string =
    let
        splits : List String
        splits =
            string
                |> String.split "."

        whole : String -> Result String BigInt
        whole wholeString =
            wholeString
                |> BigInt.fromIntString
                |> Result.fromMaybe "Not able to turn to big int"
                |> Result.map (BigInt.mul quintillion)

        decimal : String -> Result String BigInt
        decimal decimalString =
            let
                decimalLength : Int
                decimalLength =
                    decimalString
                        |> String.length
            in
            if decimalLength <= 18 then
                decimalString
                    |> String.padRight 18 '0'
                    |> BigInt.fromIntString
                    |> Result.fromMaybe "Not able to turn to big int"

            else
                decimalString
                    |> String.left 18
                    |> BigInt.fromIntString
                    |> Result.fromMaybe "Not able to turn to big int"
    in
    case splits of
        [] ->
            Err "Cannot be empty string"

        big :: [] ->
            whole big

        big :: small :: [] ->
            small
                |> decimal
                |> Result.map2 BigInt.add (whole big)
                |> Result.andThen checkSize

        _ ->
            Err "Cannot be unsignedInteger"


fromBigIntToToken : BigInt -> Result String String
fromBigIntToToken bigInt =
    let
        division : Result String ( BigInt, BigInt )
        division =
            BigInt.divmod bigInt quintillion
                |> Result.fromMaybe "cannot be turn to string"

        quotient : Result String String
        quotient =
            division
                |> Result.map Tuple.first
                |> Result.map BigInt.toString

        remainder : Result String String
        remainder =
            division
                |> Result.map Tuple.second
                |> Result.map BigInt.toString

        combine : String -> String -> String
        combine whole decimal =
            case ( whole, decimal ) of
                ( "0", "0" ) ->
                    "0"

                ( notZero, "0" ) ->
                    notZero

                ( "0", notZero ) ->
                    notZero
                        |> String.padLeft 18 '0'
                        |> (++) "0."

                _ ->
                    decimal
                        |> String.padLeft 18 '0'
                        |> (++) "."
                        |> (++) whole
    in
    Result.map2 combine quotient remainder


zero : BigInt
zero =
    0
        |> BigInt.fromInt


maxUint256 : BigInt
maxUint256 =
    BigInt.sub (BigInt.pow (BigInt.fromInt 2) (BigInt.fromInt 256)) (BigInt.fromInt 1)


maxUint112 : BigInt
maxUint112 =
    BigInt.sub (BigInt.pow (BigInt.fromInt 2) (BigInt.fromInt 112)) (BigInt.fromInt 1)


checkSize : BigInt -> Result String BigInt
checkSize bigInt =
    if BigInt.gt bigInt maxUint256 then
        Err "Overflow"

    else if BigInt.lt bigInt zero then
        Err "Overflow"

    else
        Ok bigInt


addBy : BigInt -> BigInt -> Result String BigInt
addBy bigInt1 bigInt2 =
    BigInt.add bigInt2 bigInt1
        |> checkSize


subBy : BigInt -> BigInt -> Result String BigInt
subBy bigInt1 bigInt2 =
    BigInt.sub bigInt2 bigInt1
        |> checkSize


mulBy : BigInt -> BigInt -> Result String BigInt
mulBy bigInt1 bigInt2 =
    BigInt.mul bigInt2 bigInt1
        |> checkSize


divBy : BigInt -> BigInt -> Result String BigInt
divBy bigInt1 bigInt2 =
    BigInt.div bigInt2 bigInt1
        |> checkSize


squareRoot : BigInt -> Result String BigInt
squareRoot bigInt =
    let
        recursive : BigInt -> Result String BigInt
        recursive currentBigInt =
            let
                check : BigInt -> Result String BigInt
                check algorithm =
                    if algorithm == currentBigInt then
                        Ok algorithm

                    else
                        recursive algorithm
            in
            bigInt
                |> mulBy quintillion
                |> Result.andThen (divBy currentBigInt)
                |> Result.andThen (addBy currentBigInt)
                |> Result.andThen (divBy (BigInt.fromInt 2))
                |> Result.andThen check
    in
    recursive bigInt


roundDownString : String -> String
roundDownString string =
    string
        |> String.dropRight 12
