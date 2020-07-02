module Main exposing (main, viewPay)

-- IMPORT

import Browser
import Dict exposing (Dict)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font exposing (Font)
import Element.Input as Input exposing (Placeholder)
import Html exposing (Html)
import Image



-- MAIN


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , update = update
        , view = view
        }



-- MODEL


type alias Model =
    { reserves : Dict Int Reserve
    , calendar : Calendar
    , chosenMaturityDate : Date
    , bestMaturityDate : Date
    , transaction : Transaction
    , deposits : Dict Int Deposit
    , loans : Dict Int Loan
    , mode : Mode
    }


type alias Reserve =
    { tokens : Float
    , interest : Float
    , interestRate : Float
    }


type Date
    = Now
    | Future Int


type Calendar
    = OpenedCalendar
    | ClosedCalendar


type Transaction
    = Pay Amount
    | Receive Amount Collaterals (Maybe InputFloat)


type Amount
    = NoAmount
    | JustInput InputFloat
    | JustOutput InputFloat
    | CompleteAmount
        { input : InputFloat
        , output : InputFloat
        }


type InputFloat
    = Simply Float
    | WithDot Float


type Token
    = Dai
    | Eth


type alias Deposit =
    { deposit : Float
    , token : Token
    , shown : Shown
    }


type Shown
    = Expand
    | Compress


type alias Loan =
    { loan : Float
    , token : Token
    , collaterals : Collaterals
    , shown : Shown
    }


type alias Collaterals =
    { eth : Float }


type Mode
    = Day
    | Night



-- INIT


init : Model
init =
    { reserves = initialReserves
    , calendar = ClosedCalendar
    , chosenMaturityDate = Now
    , bestMaturityDate = Now
    , transaction = Pay NoAmount
    , deposits = Dict.empty
    , loans = Dict.empty
    , mode = Day
    }


initialReserves : Dict Int Reserve
initialReserves =
    Dict.empty
        |> Dict.insert 1 reserveDay1
        |> Dict.insert 5 reserveDay5
        |> Dict.insert 6 reserveDay6
        |> Dict.insert 20 reserveDay20
        |> Dict.insert 30 reserveDay30


reserveDay1 : Reserve
reserveDay1 =
    { tokens = 3000
    , interest = 0.2
    , interestRate = 0.2 / 3000
    }


reserveDay5 : Reserve
reserveDay5 =
    { tokens = 6000
    , interest = 2
    , interestRate = 2 / 6000
    }


reserveDay6 : Reserve
reserveDay6 =
    { tokens = 4000
    , interest = 2.2
    , interestRate = 2.2 / 4000
    }


reserveDay20 : Reserve
reserveDay20 =
    { tokens = 18000
    , interest = 35
    , interestRate = 35 / 18000
    }


reserveDay30 : Reserve
reserveDay30 =
    { tokens = 4000
    , interest = 14
    , interestRate = 14 / 4000
    }


emptyCollaterals : Collaterals
emptyCollaterals =
    { eth = 0 }


minimumCollateralRatio : Float
minimumCollateralRatio =
    1.5


ethToDai : Float
ethToDai =
    200



-- MSG


type Msg
    = SwitchToReceive
    | SwitchToPay
    | SwitchCalendar
    | SwitchDepositShown Int
    | ChangeMaturityDate Date
    | ChangeInputAmount String
    | ChangeOutputAmount String
    | ChangeCollateralAmount String
    | AddCollateral
    | RemoveCollateral Token
    | Swap



-- UPDATE


update : Msg -> Model -> Model
update msg model =
    case msg of
        SwitchToPay ->
            case model.transaction of
                Receive _ _ _ ->
                    { model | transaction = Pay NoAmount }

                _ ->
                    model

        SwitchToReceive ->
            case model.transaction of
                Pay _ ->
                    { model | transaction = Receive NoAmount emptyCollaterals Nothing }

                _ ->
                    model

        SwitchCalendar ->
            case model.calendar of
                OpenedCalendar ->
                    { model | calendar = ClosedCalendar }

                ClosedCalendar ->
                    { model | calendar = OpenedCalendar }

        SwitchDepositShown integer ->
            { model | deposits = Dict.update integer switchShown model.deposits }

        ChangeMaturityDate chosenDate ->
            case model.transaction of
                Pay amount ->
                    case amount of
                        NoAmount ->
                            { model
                                | chosenMaturityDate = chosenDate
                                , bestMaturityDate = chosenDate
                            }

                        JustInput float ->
                            case queryDepositOutput chosenDate (toFloat float) model.reserves of
                                Just { date, output } ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = date
                                        , transaction = Pay <| CompleteAmount { input = float, output = Simply output }
                                    }

                                Nothing ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = chosenDate
                                    }

                        JustOutput float ->
                            case queryDepositInput chosenDate (toFloat float) model.reserves of
                                Just { date, input } ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = date
                                        , transaction = Pay <| CompleteAmount { input = Simply input, output = float }
                                    }

                                Nothing ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = chosenDate
                                    }

                        CompleteAmount { input } ->
                            case queryDepositOutput chosenDate (toFloat input) model.reserves of
                                Just { date, output } ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = date
                                        , transaction = Pay <| CompleteAmount { input = input, output = Simply output }
                                    }

                                Nothing ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = chosenDate
                                        , transaction = Pay <| JustInput input
                                    }

                Receive amount collaterals maybeAddCollateral ->
                    case amount of
                        NoAmount ->
                            { model
                                | chosenMaturityDate = chosenDate
                                , bestMaturityDate = chosenDate
                            }

                        JustInput float ->
                            case queryLoanOutput chosenDate (toFloat float) model.reserves of
                                Just { date, output } ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = date
                                        , transaction = Receive (CompleteAmount { input = float, output = Simply output }) collaterals maybeAddCollateral
                                    }

                                Nothing ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = chosenDate
                                    }

                        JustOutput float ->
                            case queryLoanInput chosenDate (toFloat float) model.reserves of
                                Just { date, input } ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = date
                                        , transaction = Receive (CompleteAmount { input = Simply input, output = float }) collaterals maybeAddCollateral
                                    }

                                Nothing ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = chosenDate
                                    }

                        CompleteAmount { input } ->
                            case queryLoanOutput chosenDate (toFloat input) model.reserves of
                                Just { date, output } ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = date
                                        , transaction = Receive (CompleteAmount { input = input, output = Simply output }) collaterals maybeAddCollateral
                                    }

                                Nothing ->
                                    { model
                                        | chosenMaturityDate = chosenDate
                                        , bestMaturityDate = chosenDate
                                        , transaction = Receive (JustInput input) collaterals maybeAddCollateral
                                    }

        ChangeInputAmount string ->
            case model.transaction of
                Pay _ ->
                    case string of
                        "" ->
                            { model | transaction = Pay NoAmount }

                        notEmpty ->
                            case fromStringToFloat notEmpty of
                                Nothing ->
                                    model

                                Just (Simply float) ->
                                    case queryDepositOutput model.chosenMaturityDate float model.reserves of
                                        Just { date, output } ->
                                            { model | bestMaturityDate = date, transaction = Pay <| CompleteAmount { input = Simply float, output = Simply output } }

                                        Nothing ->
                                            { model | bestMaturityDate = model.chosenMaturityDate, transaction = Pay <| JustInput <| Simply float }

                                Just (WithDot float) ->
                                    case queryDepositOutput model.chosenMaturityDate float model.reserves of
                                        Just { date, output } ->
                                            { model | bestMaturityDate = date, transaction = Pay <| CompleteAmount { input = WithDot float, output = Simply output } }

                                        Nothing ->
                                            { model | bestMaturityDate = model.chosenMaturityDate, transaction = Pay <| JustInput <| WithDot float }

                Receive _ collaterals maybeAddCollateral ->
                    case string of
                        "" ->
                            { model | transaction = Receive NoAmount collaterals maybeAddCollateral }

                        notEmpty ->
                            case fromStringToFloat notEmpty of
                                Nothing ->
                                    model

                                Just (Simply float) ->
                                    case queryLoanOutput model.chosenMaturityDate float model.reserves of
                                        Just { date, output } ->
                                            { model | bestMaturityDate = date, transaction = Receive (CompleteAmount { input = Simply float, output = Simply output }) collaterals maybeAddCollateral }

                                        Nothing ->
                                            { model | bestMaturityDate = model.chosenMaturityDate, transaction = Receive (JustInput <| Simply float) collaterals maybeAddCollateral }

                                Just (WithDot float) ->
                                    case queryLoanOutput model.chosenMaturityDate float model.reserves of
                                        Just { date, output } ->
                                            { model | bestMaturityDate = date, transaction = Receive (CompleteAmount { input = WithDot float, output = Simply output }) collaterals maybeAddCollateral }

                                        Nothing ->
                                            { model | bestMaturityDate = model.chosenMaturityDate, transaction = Receive (JustInput <| Simply float) collaterals maybeAddCollateral }

        ChangeOutputAmount string ->
            case model.transaction of
                Pay _ ->
                    case string of
                        "" ->
                            { model | transaction = Pay NoAmount }

                        notEmpty ->
                            case fromStringToFloat notEmpty of
                                Nothing ->
                                    model

                                Just (Simply float) ->
                                    case queryDepositInput model.chosenMaturityDate float model.reserves of
                                        Just { date, input } ->
                                            { model | bestMaturityDate = date, transaction = Pay <| CompleteAmount { input = Simply input, output = Simply float } }

                                        Nothing ->
                                            { model | bestMaturityDate = model.chosenMaturityDate, transaction = Pay <| JustOutput <| Simply float }

                                Just (WithDot float) ->
                                    case queryDepositInput model.chosenMaturityDate float model.reserves of
                                        Just { date, input } ->
                                            { model | bestMaturityDate = date, transaction = Pay <| CompleteAmount { input = Simply input, output = WithDot float } }

                                        Nothing ->
                                            { model | bestMaturityDate = model.chosenMaturityDate, transaction = Pay <| JustOutput <| WithDot float }

                Receive _ collaterals maybeAddCollateral ->
                    case string of
                        "" ->
                            { model | transaction = Receive NoAmount collaterals maybeAddCollateral }

                        notEmpty ->
                            case fromStringToFloat notEmpty of
                                Nothing ->
                                    model

                                Just (Simply float) ->
                                    case queryLoanInput model.chosenMaturityDate float model.reserves of
                                        Just { date, input } ->
                                            { model | bestMaturityDate = date, transaction = Receive (CompleteAmount { input = Simply input, output = Simply float }) collaterals maybeAddCollateral }

                                        Nothing ->
                                            { model | bestMaturityDate = model.chosenMaturityDate, transaction = Receive (JustOutput <| Simply float) collaterals maybeAddCollateral }

                                Just (WithDot float) ->
                                    case queryLoanInput model.chosenMaturityDate float model.reserves of
                                        Just { date, input } ->
                                            { model | bestMaturityDate = date, transaction = Receive (CompleteAmount { input = Simply input, output = WithDot float }) collaterals maybeAddCollateral }

                                        Nothing ->
                                            { model | bestMaturityDate = model.chosenMaturityDate, transaction = Receive (JustOutput <| WithDot float) collaterals maybeAddCollateral }

        ChangeCollateralAmount string ->
            case model.transaction of
                Receive amount collaterals _ ->
                    case string of
                        "" ->
                            { model | transaction = Receive amount collaterals Nothing }

                        notEmpty ->
                            case fromStringToFloat notEmpty of
                                Nothing ->
                                    model

                                Just (Simply float) ->
                                    { model | transaction = Receive amount collaterals (Just <| Simply float) }

                                Just (WithDot float) ->
                                    { model | transaction = Receive amount collaterals (Just <| WithDot float) }

                _ ->
                    model

        AddCollateral ->
            case model.transaction of
                Receive amount collateral (Just (Simply float)) ->
                    { model | transaction = Receive amount (addEthCollateral float collateral) Nothing }

                Receive amount collateral (Just (WithDot float)) ->
                    { model | transaction = Receive amount (addEthCollateral float collateral) Nothing }

                _ ->
                    model

        RemoveCollateral Eth ->
            case model.transaction of
                Receive amount collateral _ ->
                    { model | transaction = Receive amount (removeEthCollateral collateral) Nothing }

                _ ->
                    model

        RemoveCollateral _ ->
            model

        Swap ->
            case ( model.transaction, model.bestMaturityDate ) of
                ( Pay (CompleteAmount _), Now ) ->
                    { model
                        | chosenMaturityDate = Now
                        , bestMaturityDate = Now
                        , transaction = Pay NoAmount
                    }

                ( Pay (CompleteAmount { input, output }), Future integer ) ->
                    case Dict.get integer model.reserves of
                        Just reserve ->
                            let
                                nextReserve : Reserve
                                nextReserve =
                                    { reserve
                                        | tokens = reserve.tokens + toFloat input
                                        , interest = reserve.interest + toFloat input - toFloat output
                                    }
                            in
                            { model
                                | reserves = Dict.insert integer nextReserve model.reserves
                                , chosenMaturityDate = Now
                                , bestMaturityDate = Now
                                , transaction = Pay NoAmount
                                , deposits = Dict.update integer (updateDeposits <| toFloat output) model.deposits
                            }

                        Nothing ->
                            { model
                                | chosenMaturityDate = Now
                                , bestMaturityDate = Now
                                , transaction = Pay NoAmount
                            }

                ( Receive (CompleteAmount _) collaterals maybeAddCollateral, Now ) ->
                    { model
                        | chosenMaturityDate = Now
                        , bestMaturityDate = Now
                        , transaction = Receive NoAmount collaterals maybeAddCollateral
                    }

                ( Receive (CompleteAmount { input, output }) collaterals maybeAddCollateral, Future integer ) ->
                    case Dict.get integer model.reserves of
                        Just reserve ->
                            case Dict.get integer model.loans of
                                Just loan ->
                                    if getCollateralRatio reserve.interestRate { loan | loan = loan.loan + toFloat output, collaterals = addCollaterals collaterals loan.collaterals } >= minimumCollateralRatio then
                                        let
                                            nextReserve : Reserve
                                            nextReserve =
                                                { reserve
                                                    | tokens = reserve.tokens - toFloat input
                                                    , interest = reserve.interest - toFloat input + toFloat output
                                                }
                                        in
                                        { model
                                            | reserves = Dict.insert integer nextReserve model.reserves
                                            , chosenMaturityDate = Now
                                            , bestMaturityDate = Now
                                            , transaction = Receive NoAmount emptyCollaterals Nothing
                                            , loans = Dict.update integer (updateLoans (toFloat output) collaterals) model.loans
                                        }

                                    else
                                        model

                                Nothing ->
                                    if getCollateralRatio reserve.interestRate { loan = toFloat output, token = Dai, collaterals = collaterals, shown = Compress } >= minimumCollateralRatio then
                                        let
                                            nextReserve : Reserve
                                            nextReserve =
                                                { reserve
                                                    | tokens = reserve.tokens - toFloat input
                                                    , interest = reserve.interest - toFloat input + toFloat output
                                                }
                                        in
                                        { model
                                            | reserves = Dict.insert integer nextReserve model.reserves
                                            , chosenMaturityDate = Now
                                            , bestMaturityDate = Now
                                            , transaction = Receive NoAmount emptyCollaterals Nothing
                                            , loans = Dict.update integer (updateLoans (toFloat output) collaterals) model.loans
                                        }

                                    else
                                        model

                        Nothing ->
                            { model
                                | chosenMaturityDate = Now
                                , bestMaturityDate = Now
                                , transaction = Receive NoAmount collaterals maybeAddCollateral
                            }

                _ ->
                    model


switchShown : Maybe { any | shown : Shown } -> Maybe { any | shown : Shown }
switchShown maybeWithShown =
    let
        changeShown : { any | shown : Shown } -> { any | shown : Shown }
        changeShown withShown =
            case withShown.shown of
                Expand ->
                    { withShown | shown = Compress }

                Compress ->
                    { withShown | shown = Expand }
    in
    maybeWithShown
        |> Maybe.map changeShown


toFloat : InputFloat -> Float
toFloat inputFloat =
    case inputFloat of
        Simply float ->
            float

        WithDot float ->
            float


fromStringToFloat : String -> Maybe InputFloat
fromStringToFloat string =
    if String.right 1 string == "." then
        if String.contains "." (String.dropRight 1 string) then
            Nothing

        else
            String.toFloat (String.dropRight 1 string)
                |> Maybe.map WithDot

    else
        String.toFloat string
            |> Maybe.map Simply


updateDeposits : Float -> Maybe Deposit -> Maybe Deposit
updateDeposits output maybeDeposit =
    case maybeDeposit of
        Just deposit ->
            Just { deposit | deposit = deposit.deposit + output }

        Nothing ->
            Just { deposit = output, token = Dai, shown = Compress }


updateLoans : Float -> Collaterals -> Maybe Loan -> Maybe Loan
updateLoans output outputCollaterals maybeLoan =
    case maybeLoan of
        Just loan ->
            Just { loan | loan = loan.loan + output, collaterals = addCollaterals outputCollaterals loan.collaterals }

        Nothing ->
            Just { loan = output, token = Dai, collaterals = outputCollaterals, shown = Compress }


addCollaterals : Collaterals -> Collaterals -> Collaterals
addCollaterals outputCollaterals collaterals =
    { eth = outputCollaterals.eth + collaterals.eth }


addEthCollateral : Float -> Collaterals -> Collaterals
addEthCollateral amount collaterals =
    { collaterals | eth = collaterals.eth + amount }


removeEthCollateral : Collaterals -> Collaterals
removeEthCollateral collaterals =
    { collaterals | eth = 0 }


queryDepositOutput : Date -> Float -> Dict Int Reserve -> Maybe { date : Date, output : Float }
queryDepositOutput latestDate input reserves =
    let
        recursive : Int -> Int -> Maybe { date : Date, output : Float } -> Maybe { date : Date, output : Float }
        recursive latestCounter counter accumulator =
            if counter <= latestCounter then
                case ( Dict.get counter reserves, accumulator ) of
                    ( Just reserve, Just { output } ) ->
                        if getDepositOutput input reserve > output then
                            Just
                                { date = Future counter
                                , output = getDepositOutput input reserve
                                }
                                |> recursive latestCounter (counter + 1)

                        else
                            accumulator
                                |> recursive latestCounter (counter + 1)

                    ( Just reserve, Nothing ) ->
                        Just
                            { date = Future counter
                            , output = getDepositOutput input reserve
                            }
                            |> recursive latestCounter (counter + 1)

                    ( Nothing, _ ) ->
                        accumulator
                            |> recursive latestCounter (counter + 1)

            else
                accumulator
    in
    case latestDate of
        Now ->
            Just { date = Now, output = input }

        Future integer ->
            recursive integer 1 Nothing


queryLoanOutput : Date -> Float -> Dict Int Reserve -> Maybe { date : Date, output : Float }
queryLoanOutput earliestDate input reserves =
    let
        recursive : Int -> Int -> Maybe { date : Date, output : Float } -> Maybe { date : Date, output : Float }
        recursive latestCounter counter accumulator =
            if counter <= latestCounter then
                case ( Dict.get counter reserves, accumulator ) of
                    ( Just reserve, Just { output } ) ->
                        if getLoanOutput input reserve < output then
                            Just
                                { date = Future counter
                                , output = getLoanOutput input reserve
                                }
                                |> recursive latestCounter (counter + 1)

                        else
                            accumulator
                                |> recursive latestCounter (counter + 1)

                    ( Just reserve, Nothing ) ->
                        Just
                            { date = Future counter
                            , output = getLoanOutput input reserve
                            }
                            |> recursive latestCounter (counter + 1)

                    ( Nothing, _ ) ->
                        accumulator
                            |> recursive latestCounter (counter + 1)

            else
                accumulator
    in
    case earliestDate of
        Now ->
            Just { date = Now, output = input }

        Future integer ->
            recursive 30 integer Nothing


queryDepositInput : Date -> Float -> Dict Int Reserve -> Maybe { date : Date, input : Float }
queryDepositInput latestDate output reserves =
    let
        recursive : Int -> Int -> Maybe { date : Date, input : Float } -> Maybe { date : Date, input : Float }
        recursive latestCounter counter accumulator =
            if counter <= latestCounter then
                case ( Dict.get counter reserves, accumulator ) of
                    ( Just reserve, Just { input } ) ->
                        if getDepositInput output reserve < input then
                            Just
                                { date = Future counter
                                , input = getDepositInput output reserve
                                }
                                |> recursive latestCounter (counter + 1)

                        else
                            accumulator
                                |> recursive latestCounter (counter + 1)

                    ( Just reserve, Nothing ) ->
                        Just
                            { date = Future counter
                            , input = getDepositInput output reserve
                            }
                            |> recursive latestCounter (counter + 1)

                    ( Nothing, _ ) ->
                        accumulator
                            |> recursive latestCounter (counter + 1)

            else
                accumulator
    in
    case latestDate of
        Now ->
            Just { date = Now, input = output }

        Future integer ->
            recursive integer 1 Nothing


queryLoanInput : Date -> Float -> Dict Int Reserve -> Maybe { date : Date, input : Float }
queryLoanInput earliestDate output reserves =
    let
        recursive : Int -> Int -> Maybe { date : Date, input : Float } -> Maybe { date : Date, input : Float }
        recursive latestCounter counter accumulator =
            if counter <= latestCounter then
                case ( Dict.get counter reserves, accumulator ) of
                    ( Just reserve, Just { input } ) ->
                        if getLoanInput output reserve > input then
                            Just
                                { date = Future counter
                                , input = getLoanInput output reserve
                                }
                                |> recursive latestCounter (counter + 1)

                        else
                            accumulator
                                |> recursive latestCounter (counter + 1)

                    ( Just reserve, Nothing ) ->
                        Just
                            { date = Future counter
                            , input = getLoanInput output reserve
                            }
                            |> recursive latestCounter (counter + 1)

                    ( Nothing, _ ) ->
                        accumulator
                            |> recursive latestCounter (counter + 1)

            else
                accumulator
    in
    case earliestDate of
        Now ->
            Just { date = Now, input = output }

        Future integer ->
            recursive 30 integer Nothing


getDepositOutput : Float -> Reserve -> Float
getDepositOutput input reserve =
    input + input * reserve.interest / (reserve.tokens + input)


getLoanOutput : Float -> Reserve -> Float
getLoanOutput input reserve =
    input + input * reserve.interest / (reserve.tokens - input)


getDepositInput : Float -> Reserve -> Float
getDepositInput output reserve =
    let
        a : Float
        a =
            1

        b : Float
        b =
            reserve.tokens + reserve.interest - output

        c : Float
        c =
            negate output * reserve.tokens

        positive : Float
        positive =
            (negate b + sqrt (b ^ 2 - 4 * a * c)) / (2 * a)

        negative : Float
        negative =
            (negate b - sqrt (b ^ 2 - 4 * a * c)) / (2 * a)
    in
    if positive > 0 && positive < output && negative > 0 && negative < output then
        if positive > negative then
            positive

        else
            negative

    else if positive > 0 && positive < output then
        positive

    else
        negative


getLoanInput : Float -> Reserve -> Float
getLoanInput output reserve =
    let
        a : Float
        a =
            1

        b : Float
        b =
            negate <| reserve.tokens + reserve.interest + output

        c : Float
        c =
            output * reserve.tokens

        positive : Float
        positive =
            (negate b + sqrt (b ^ 2 - 4 * a * c)) / (2 * a)

        negative : Float
        negative =
            (negate b - sqrt (b ^ 2 - 4 * a * c)) / (2 * a)
    in
    if positive > 0 && positive < output && negative > 0 && negative < output then
        if positive > negative then
            positive

        else
            negative

    else if positive > 0 && positive < output then
        positive

    else
        negative


getCollateralRatio : Float -> Loan -> Float
getCollateralRatio interestRate loan =
    let
        numerator : Float
        numerator =
            loan.collaterals.eth

        denominator : Float
        denominator =
            loan.loan / (1 + interestRate) / ethToDai
    in
    numerator / denominator



-- VIEW


view : Model -> Html Msg
view model =
    layoutWith
        { options = [ focusStyle focus ] }
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
    column
        [ width fill
        , height fill
        , Background.color imperfectWhite
        ]
        [ viewHeader
        , viewBody model

        --, viewFooter
        ]


viewHeader : Element Msg
viewHeader =
    row
        [ width fill
        , height <| px 72
        , padding 12
        ]
        [ viewLogo
        , viewWallet
        ]


viewLogo : Element Msg
viewLogo =
    Image.toElement
        [ width <| px 200
        , height shrink
        ]
        Image.timeswapDayLogo


viewWallet : Element Msg
viewWallet =
    el
        [ paddingXY 18 9
        , alignRight
        , Background.color blue
        , Border.rounded 30
        , Font.color imperfectWhite
        , Font.size 18
        , Font.family lato
        ]
        (text "matheprenuer.eth")


viewBody : Model -> Element Msg
viewBody model =
    row
        [ width fill
        , height fill
        , paddingXY 20 100
        , spacing 20
        ]
        [ viewAssetList model.deposits
        , viewLiabilityList model.loans
        , viewSwap model
        ]


viewSwap : Model -> Element Msg
viewSwap model =
    let
        viewPayColumn : Maybe InputFloat -> Maybe InputFloat -> Maybe Msg -> Element Msg
        viewPayColumn inputAmount outputAmount maybeSwap =
            column
                [ width <| px 400
                , padding 20
                , spacing 20
                , centerX
                , alignTop
                , Background.color dirtyWhite
                , Border.rounded 30
                ]
                [ viewTabs
                , viewInputPayBox inputAmount
                , viewOutputReceiveBox outputAmount model.chosenMaturityDate model.bestMaturityDate model.calendar
                , viewSwapButton maybeSwap
                ]

        viewReceiveColumn : Maybe InputFloat -> Maybe InputFloat -> Maybe Msg -> Collaterals -> Maybe Float -> Maybe InputFloat -> Maybe Msg -> Element Msg
        viewReceiveColumn inputAmount outputAmount maybeSwap collaterals maybeCollateralRatio maybeCollateralAmount maybeAddCollateral =
            column
                [ width <| px 400
                , padding 20
                , spacing 20
                , centerX
                , alignTop
                , Background.color dirtyWhite
                , Border.rounded 30
                ]
                [ viewTabs
                , viewInputReceiveBox inputAmount
                , viewOutputPayBox outputAmount model.chosenMaturityDate model.bestMaturityDate model.calendar
                , viewCollateralBox collaterals maybeCollateralRatio maybeCollateralAmount maybeAddCollateral
                , viewSwapButton maybeSwap
                ]
    in
    case model.transaction of
        Pay NoAmount ->
            viewPayColumn Nothing Nothing Nothing

        Pay (JustInput input) ->
            viewPayColumn (Just input) Nothing Nothing

        Pay (JustOutput output) ->
            viewPayColumn Nothing (Just output) Nothing

        Pay (CompleteAmount { input, output }) ->
            viewPayColumn (Just input) (Just output) (Just Swap)

        Receive NoAmount collaterals Nothing ->
            viewReceiveColumn Nothing Nothing Nothing collaterals Nothing Nothing Nothing

        Receive NoAmount collaterals justAddCollateral ->
            viewReceiveColumn Nothing Nothing Nothing collaterals Nothing justAddCollateral (Just AddCollateral)

        Receive (JustInput input) collaterals Nothing ->
            viewReceiveColumn (Just input) Nothing Nothing collaterals Nothing Nothing Nothing

        Receive (JustInput input) collaterals justAddCollateral ->
            viewReceiveColumn (Just input) Nothing Nothing collaterals Nothing justAddCollateral (Just AddCollateral)

        Receive (JustOutput output) collaterals Nothing ->
            viewReceiveColumn Nothing (Just output) Nothing collaterals Nothing Nothing Nothing

        Receive (JustOutput output) collaterals justAddCollateral ->
            viewReceiveColumn Nothing (Just output) Nothing collaterals Nothing justAddCollateral (Just AddCollateral)

        Receive (CompleteAmount { input, output }) collaterals Nothing ->
            case model.bestMaturityDate of
                Future integer ->
                    case Dict.get integer model.reserves of
                        Just reserve ->
                            case Dict.get integer model.loans of
                                Just loan ->
                                    let
                                        collateralRatio : Float
                                        collateralRatio =
                                            getCollateralRatio reserve.interestRate { loan | loan = loan.loan + toFloat output, collaterals = addCollaterals collaterals loan.collaterals }
                                    in
                                    if collateralRatio >= minimumCollateralRatio then
                                        viewReceiveColumn (Just input) (Just output) (Just Swap) collaterals (Just collateralRatio) Nothing Nothing

                                    else
                                        viewReceiveColumn (Just input) (Just output) Nothing collaterals (Just collateralRatio) Nothing Nothing

                                Nothing ->
                                    let
                                        collateralRatio : Float
                                        collateralRatio =
                                            getCollateralRatio reserve.interestRate { loan = toFloat output, token = Dai, collaterals = collaterals, shown = Compress }
                                    in
                                    if collateralRatio >= minimumCollateralRatio then
                                        viewReceiveColumn (Just input) (Just output) (Just Swap) collaterals (Just collateralRatio) Nothing Nothing

                                    else
                                        viewReceiveColumn (Just input) (Just output) Nothing collaterals (Just collateralRatio) Nothing Nothing

                        Nothing ->
                            viewReceiveColumn Nothing Nothing Nothing collaterals Nothing Nothing Nothing

                Now ->
                    viewReceiveColumn (Just input) (Just output) (Just Swap) collaterals Nothing Nothing Nothing

        Receive (CompleteAmount { input, output }) collaterals justAddCollateral ->
            case model.bestMaturityDate of
                Future integer ->
                    case Dict.get integer model.reserves of
                        Just reserve ->
                            case Dict.get integer model.loans of
                                Just loan ->
                                    let
                                        collateralRatio : Float
                                        collateralRatio =
                                            getCollateralRatio reserve.interestRate { loan | loan = loan.loan + toFloat output, collaterals = addCollaterals collaterals loan.collaterals }
                                    in
                                    if collateralRatio >= minimumCollateralRatio then
                                        viewReceiveColumn (Just input) (Just output) (Just Swap) collaterals (Just collateralRatio) justAddCollateral (Just AddCollateral)

                                    else
                                        viewReceiveColumn (Just input) (Just output) Nothing collaterals (Just collateralRatio) justAddCollateral (Just AddCollateral)

                                Nothing ->
                                    let
                                        collateralRatio : Float
                                        collateralRatio =
                                            getCollateralRatio reserve.interestRate { loan = toFloat output, token = Dai, collaterals = collaterals, shown = Compress }
                                    in
                                    if collateralRatio >= minimumCollateralRatio then
                                        viewReceiveColumn (Just input) (Just output) (Just Swap) collaterals (Just collateralRatio) justAddCollateral (Just AddCollateral)

                                    else
                                        viewReceiveColumn (Just input) (Just output) Nothing collaterals (Just collateralRatio) justAddCollateral (Just AddCollateral)

                        Nothing ->
                            viewReceiveColumn Nothing Nothing Nothing collaterals Nothing justAddCollateral (Just AddCollateral)

                Now ->
                    viewReceiveColumn (Just input) (Just output) (Just Swap) collaterals Nothing justAddCollateral (Just AddCollateral)


viewTabs : Element Msg
viewTabs =
    row
        [ width fill
        , padding 10
        , Background.color dirtyWhite
        ]
        [ viewPayTab
        , viewReceiveTab
        ]


viewPayTab : Element Msg
viewPayTab =
    Input.button
        [ width fill
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Just SwitchToPay
        , label = text "Pay"
        }


viewReceiveTab : Element Msg
viewReceiveTab =
    Input.button
        [ width fill
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Just SwitchToReceive
        , label = text "Receive"
        }


viewInputPayBox : Maybe InputFloat -> Element Msg
viewInputPayBox maybeInput =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputPayDetails
        , viewInput maybeInput
        ]


viewInputReceiveBox : Maybe InputFloat -> Element Msg
viewInputReceiveBox maybeInput =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputReceiveDetails
        , viewInput maybeInput
        ]


viewInputPayDetails : Element Msg
viewInputPayDetails =
    row
        [ width fill ]
        [ viewPay
        , viewNow
        ]


viewInputReceiveDetails : Element Msg
viewInputReceiveDetails =
    row
        [ width fill ]
        [ viewReceive
        , viewNow
        ]


viewPay : Element Msg
viewPay =
    el
        [ padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text "Pay")


viewReceive : Element Msg
viewReceive =
    el
        [ padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text "Receive")


viewArrow : Element Msg
viewArrow =
    Image.toElement
        [ width <| px 10
        , height shrink
        ]
        Image.chevronDown


viewNow : Element Msg
viewNow =
    el
        [ padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text "Now")


viewInput : Maybe InputFloat -> Element Msg
viewInput maybeInput =
    row
        [ width fill
        , spacing 10
        ]
        [ viewInputNumber maybeInput
        , viewToken
        ]


viewInputNumber : Maybe InputFloat -> Element Msg
viewInputNumber maybeInput =
    let
        inputText : String -> Element Msg
        inputText text =
            Input.text
                [ padding 5
                , Background.color imperfectWhite
                , Border.width 0
                , Font.color imperfectBlack
                , Font.size 24
                , Font.family lato
                ]
                { onChange = ChangeInputAmount
                , text = text
                , placeholder = Just viewZeros
                , label = Input.labelHidden "Input"
                }
    in
    case maybeInput of
        Just input ->
            inputText <| fromInputFloat input

        Nothing ->
            inputText ""


fromInputFloat : InputFloat -> String
fromInputFloat inputFloat =
    case inputFloat of
        Simply float ->
            String.fromFloat float

        WithDot float ->
            String.fromFloat float ++ "."


viewZeros : Placeholder Msg
viewZeros =
    Input.placeholder
        [ Font.color gray
        , Font.size 24
        , Font.family lato
        ]
        (text "0.0")


viewToken : Element Msg
viewToken =
    Input.button
        [ width shrink
        , height fill
        , padding 5
        , Border.rounded 30
        , mouseOver [ Background.color dirtyWhite ]
        , alignRight
        ]
        { onPress = Nothing
        , label = viewDai
        }


viewDai : Element Msg
viewDai =
    row
        [ spacing 5
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ text "DAI"
        , viewArrow
        ]


viewOutputReceiveBox : Maybe InputFloat -> Date -> Date -> Calendar -> Element Msg
viewOutputReceiveBox maybeOutput chosenMaturityDate bestMaturityDate calendar =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewOutputReceiveDetails chosenMaturityDate bestMaturityDate calendar
        , viewOutput maybeOutput
        ]


viewOutputPayBox : Maybe InputFloat -> Date -> Date -> Calendar -> Element Msg
viewOutputPayBox maybeOutput chosenMaturityDate bestMaturityDate calendar =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewOutputPayDetails chosenMaturityDate bestMaturityDate calendar
        , viewOutput maybeOutput
        ]


viewOutputReceiveDetails : Date -> Date -> Calendar -> Element Msg
viewOutputReceiveDetails chosenMaturityDate bestMaturityDate calendar =
    row
        [ width fill ]
        [ viewReceiveBox
        , viewDateBox chosenMaturityDate bestMaturityDate calendar
        ]


viewOutputPayDetails : Date -> Date -> Calendar -> Element Msg
viewOutputPayDetails chosenMaturityDate bestMaturityDate calendar =
    row
        [ width fill ]
        [ viewPayBox
        , viewDateBox chosenMaturityDate bestMaturityDate calendar
        ]


viewReceiveBox : Element Msg
viewReceiveBox =
    Input.button
        [ padding 5
        , Border.rounded 30
        , mouseOver [ Background.color dirtyWhite ]
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        { onPress = Nothing
        , label = text "Receive"
        }


viewPayBox : Element Msg
viewPayBox =
    Input.button
        [ padding 5
        , Border.rounded 30
        , mouseOver [ Background.color dirtyWhite ]
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        { onPress = Nothing
        , label = text "Pay"
        }


viewDateBox : Date -> Date -> Calendar -> Element Msg
viewDateBox chosenMaturityDate bestMaturityDate calendar =
    let
        viewButton : Element Msg -> Element Msg
        viewButton viewBelow =
            Input.button
                [ padding 5
                , Border.rounded 30
                , mouseOver [ Background.color dirtyWhite ]
                , below viewBelow
                ]
                { onPress = Just SwitchCalendar
                , label = viewDate chosenMaturityDate bestMaturityDate
                }
    in
    case calendar of
        OpenedCalendar ->
            viewButton viewCalendar

        ClosedCalendar ->
            viewButton none


viewDate : Date -> Date -> Element Msg
viewDate chosenMaturityDate bestMaturityDate =
    let
        viewRow : String -> Element Msg
        viewRow string =
            row
                [ spacing 2
                , Font.color imperfectBlack
                , Font.size 14
                , Font.family lato
                ]
                [ text string
                , viewArrow
                ]
    in
    case ( chosenMaturityDate, bestMaturityDate ) of
        ( Now, Now ) ->
            viewRow "Now"

        ( Now, Future bestInteger ) ->
            viewRow <| "on " ++ toHumanDate bestInteger ++ " (Now)"

        ( Future chosenInteger, Now ) ->
            viewRow <| "Now" ++ " (" ++ toHumanDate chosenInteger ++ ")"

        ( Future chosenInteger, Future bestInteger ) ->
            if chosenInteger == bestInteger then
                viewRow <| "on " ++ toHumanDate chosenInteger

            else
                viewRow <| "on " ++ toHumanDate bestInteger ++ " (" ++ toHumanDate chosenInteger ++ ")"


toHumanDate : Int -> String
toHumanDate integer =
    "April " ++ String.fromInt integer ++ ", 2020"


viewOutput : Maybe InputFloat -> Element Msg
viewOutput maybeOutput =
    row
        [ width fill
        , spacing 10
        ]
        [ viewOutputNumber maybeOutput
        , viewToken
        ]


viewOutputNumber : Maybe InputFloat -> Element Msg
viewOutputNumber maybeOutput =
    let
        outputText : String -> Element Msg
        outputText text =
            Input.text
                [ padding 5
                , Background.color imperfectWhite
                , Border.width 0
                , Font.color imperfectBlack
                , Font.size 24
                , Font.family lato
                ]
                { onChange = ChangeOutputAmount
                , text = text
                , placeholder = Just viewZeros
                , label = Input.labelHidden "Output"
                }
    in
    case maybeOutput of
        Just output ->
            outputText <| fromInputFloat output

        Nothing ->
            outputText ""


viewCalendar : Element Msg
viewCalendar =
    column
        [ height <| px 200
        , Background.color imperfectWhite
        , padding 10
        , spacing 10
        , clipY
        , scrollbarX
        ]
        (choiceNow :: choices)


choiceNow : Element Msg
choiceNow =
    Input.button
        [ Background.color imperfectWhite
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        { onPress = Just <| ChangeMaturityDate Now
        , label = text "Now"
        }


choice : Int -> Element Msg
choice integer =
    Input.button
        [ Background.color imperfectWhite
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        { onPress = Just <| ChangeMaturityDate <| Future integer
        , label = text <| toHumanDate integer
        }


choices : List (Element Msg)
choices =
    List.range 1 30
        |> List.map choice


viewSwapButton : Maybe Msg -> Element Msg
viewSwapButton maybeMsg =
    Input.button
        [ width fill
        , padding 12
        , Background.color blue
        , Border.rounded 30
        , Font.color imperfectWhite
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = maybeMsg
        , label = text "Swap"
        }


viewCollateralBox : Collaterals -> Maybe Float -> Maybe InputFloat -> Maybe Msg -> Element Msg
viewCollateralBox collaterals maybeCollateralRatio maybeCollateralAmount maybeAddCollateral =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewAddCollateralDetails maybeCollateralRatio
        , viewCollaterals collaterals
        , viewAddCollateral maybeCollateralAmount maybeAddCollateral
        ]


viewAddCollateralDetails : Maybe Float -> Element Msg
viewAddCollateralDetails maybeCollateralRatio =
    row
        [ width fill ]
        [ viewAddCollateralText
        , viewCollateralRatio maybeCollateralRatio
        ]


viewAddCollateralText : Element Msg
viewAddCollateralText =
    el
        [ padding 5
        , Border.rounded 30
        , mouseOver [ Background.color dirtyWhite ]
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text "Add Collaterals")


viewCollateralRatio : Maybe Float -> Element Msg
viewCollateralRatio maybeCollateralRatio =
    case maybeCollateralRatio of
        Just collateralRatio ->
            if collateralRatio > 2 then
                el
                    [ padding 5
                    , Border.rounded 30
                    , alignRight
                    , mouseOver [ Background.color dirtyWhite ]
                    , Font.color imperfectBlack
                    , Font.size 14
                    , Font.family lato
                    ]
                    (text <| toPercentage collateralRatio)

            else
                el
                    [ padding 5
                    , Border.rounded 30
                    , alignRight
                    , mouseOver [ Background.color dirtyWhite ]
                    , Font.color red
                    , Font.size 14
                    , Font.family lato
                    ]
                    (text <| toPercentage collateralRatio)

        Nothing ->
            none


toPercentage : Float -> String
toPercentage float =
    ((Basics.toFloat <| floor <| float * 10000) / 100 |> String.fromFloat) ++ "%"


viewCollaterals : Collaterals -> Element Msg
viewCollaterals collaterals =
    column
        [ width fill
        , spacing 10
        ]
        [ viewCollateral collaterals.eth "ETH" (RemoveCollateral Eth)
        ]


viewCollateral : Float -> String -> Msg -> Element Msg
viewCollateral amount tokenName removeCollateral =
    if amount == 0 then
        none

    else
        row
            [ width fill
            , spacing 10
            ]
            [ viewCollateralAmount amount
            , viewCollateralToken tokenName
            , viewRemoveCollateral removeCollateral
            ]


viewCollateralAmount : Float -> Element Msg
viewCollateralAmount float =
    el
        [ padding 5
        , Background.color imperfectWhite
        , Border.width 0
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        (text <| String.fromFloat float)


viewCollateralToken : String -> Element Msg
viewCollateralToken string =
    el
        [ padding 5
        , alignRight
        , Background.color imperfectWhite
        , Border.width 0
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        (text string)


viewRemoveCollateral : Msg -> Element Msg
viewRemoveCollateral removeCollateralMsg =
    Input.button
        [ padding 5
        , alignRight
        , Background.color imperfectWhite
        , Border.width 0
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        { onPress = Just removeCollateralMsg
        , label = text "x"
        }


viewAddCollateral : Maybe InputFloat -> Maybe Msg -> Element Msg
viewAddCollateral maybeCollateralAmount maybeAddCollateral =
    row
        [ width fill
        , spacing 10
        ]
        [ viewCollateralNumber maybeCollateralAmount
        , viewCollateralToken "ETH"
        , viewAddCollateralButton maybeAddCollateral
        ]


viewCollateralNumber : Maybe InputFloat -> Element Msg
viewCollateralNumber maybeCollateralAmount =
    let
        outputText : String -> Element Msg
        outputText text =
            Input.text
                [ padding 5
                , Background.color imperfectWhite
                , Border.width 0
                , Font.color imperfectBlack
                , Font.size 24
                , Font.family lato
                ]
                { onChange = ChangeCollateralAmount
                , text = text
                , placeholder = Just viewZeros
                , label = Input.labelHidden "Collateral Amount"
                }
    in
    case maybeCollateralAmount of
        Just collateralAmount ->
            outputText <| fromInputFloat collateralAmount

        Nothing ->
            outputText ""


viewAddCollateralButton : Maybe Msg -> Element Msg
viewAddCollateralButton maybeAddCollateral =
    Input.button
        [ padding 5
        , alignRight
        , Background.color imperfectWhite
        , Border.width 0
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        { onPress = maybeAddCollateral
        , label = text "+"
        }



-- VIEW ASSET LIST


viewAssetList : Dict Int Deposit -> Element Msg
viewAssetList deposits =
    if Dict.isEmpty deposits then
        none

    else
        column
            [ width <| px 400
            , padding 20
            , spacing 20
            , centerX
            , alignTop
            , Background.color dirtyWhite
            , Border.rounded 30
            , clipY
            , scrollbarX
            ]
            (List.map viewDepositBox <| Dict.toList deposits)


viewDepositBox : ( Int, Deposit ) -> Element Msg
viewDepositBox ( maturityDate, { deposit } ) =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewDepositMaturity maturityDate
        , viewDepositAmount deposit
        ]


viewDepositAmount : Float -> Element Msg
viewDepositAmount deposit =
    row
        [ width fill
        , padding 5
        , spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ text <| String.fromFloat deposit
        , el [ alignRight ] <| text "DAI"
        ]


viewDepositMaturity : Int -> Element Msg
viewDepositMaturity date =
    el
        [ padding 5
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text <| "Receive on " ++ toHumanDate date)



-- VIEW LIABILITY LIST


viewLiabilityList : Dict Int Loan -> Element Msg
viewLiabilityList loans =
    if Dict.isEmpty loans then
        none

    else
        column
            [ width <| px 400
            , padding 20
            , spacing 20
            , centerX
            , alignTop
            , Background.color dirtyWhite
            , Border.rounded 30
            , clipY
            , scrollbarX
            ]
            (List.map viewLoanBox <| Dict.toList loans)


viewLoanBox : ( Int, Loan ) -> Element Msg
viewLoanBox ( maturityDate, { loan } ) =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewLoanMaturity maturityDate
        , viewLoanAmount loan
        ]


viewLoanAmount : Float -> Element Msg
viewLoanAmount loan =
    row
        [ width fill
        , padding 5
        , spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ text <| String.fromFloat loan
        , el [ alignRight ] <| text "DAI"
        ]


viewLoanMaturity : Int -> Element Msg
viewLoanMaturity date =
    el
        [ padding 5
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text <| "Pay on " ++ toHumanDate date)



-- FONT


lato : List Font
lato =
    [ Font.typeface "Lato"
    , Font.sansSerif
    ]



-- COLOR


imperfectWhite : Color
imperfectWhite =
    fromRgb255
        { red = 254
        , green = 254
        , blue = 254
        , alpha = 1
        }


dirtyWhite : Color
dirtyWhite =
    fromRgb255
        { red = 248
        , green = 248
        , blue = 248
        , alpha = 1
        }


imperfectBlack : Color
imperfectBlack =
    fromRgb255
        { red = 34
        , green = 34
        , blue = 34
        , alpha = 1
        }


gray : Color
gray =
    fromRgb255
        { red = 152
        , green = 152
        , blue = 152
        , alpha = 1
        }


blue : Color
blue =
    fromRgb255
        { red = 0
        , green = 158
        , blue = 241
        , alpha = 1
        }


red : Color
red =
    fromRgb255
        { red = 255
        , green = 0
        , blue = 0
        , alpha = 1
        }
