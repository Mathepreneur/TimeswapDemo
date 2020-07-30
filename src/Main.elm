module Main exposing (main)

-- IMPORT

import Browser
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
    { reserve : Reserve
    , transaction : Transaction
    , deposit : Deposit
    , loan : Loan
    }


type alias Reserve =
    { token : Float
    , interest : Float
    , collateral : Float
    }


type alias Transaction =
    { state : State
    , token : String
    , collateral : String
    , interest : String
    }


type State
    = Lend
    | Borrow


type alias Deposit =
    { deposit : Float
    , insurance : Float
    }


type alias Loan =
    { loan : Float
    , collateral : Float
    }



-- INIT


init : Model
init =
    { reserve = initialReserve
    , transaction = defaultLend
    , deposit = noDeposit
    , loan = noLoan
    }


initialReserve : Reserve
initialReserve =
    { token = 100000
    , interest = 20000
    , collateral = 400
    }


defaultLend : Transaction
defaultLend =
    { state = Lend
    , token = ""
    , collateral = ""
    , interest = ""
    }


defaultBorrow : Transaction
defaultBorrow =
    { state = Borrow
    , token = ""
    , collateral = ""
    , interest = ""
    }


noDeposit : Deposit
noDeposit =
    { deposit = 0
    , insurance = 0
    }


noLoan : Loan
noLoan =
    { loan = 0
    , collateral = 0
    }



-- MSG


type Msg
    = SwitchToLend
    | SwitchToBorrow
    | ChangeInputAmount String
    | ChangeOutputAmount String
    | ChangeCollateralAmount String
    | Swap



-- UPDATE


update : Msg -> Model -> Model
update msg model =
    case msg of
        SwitchToLend ->
            { model | transaction = defaultLend }

        SwitchToBorrow ->
            { model | transaction = defaultBorrow }

        ChangeInputAmount input ->
            let
                initialTransaction : Transaction
                initialTransaction =
                    model.transaction

                maybeToken : Maybe Float
                maybeToken =
                    String.toFloat input

                maybeCollateral : Maybe Float
                maybeCollateral =
                    String.toFloat model.transaction.collateral
            in
            case ( initialTransaction.state, maybeToken, maybeCollateral ) of
                ( Lend, Just token, Just collateral ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | token = input, interest = getInterestLend token collateral model.reserve }
                    in
                    { model | transaction = transaction }

                ( Borrow, Just token, Just collateral ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | token = input, interest = getInterestBorrow token collateral model.reserve }
                    in
                    { model | transaction = transaction }

                _ ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | token = input }
                    in
                    { model | transaction = transaction }

        ChangeOutputAmount output ->
            let
                initialTransaction : Transaction
                initialTransaction =
                    model.transaction

                maybeCollateral : Maybe Float
                maybeCollateral =
                    String.toFloat model.transaction.collateral

                maybeInterest : Maybe Float
                maybeInterest =
                    String.toFloat output
            in
            case ( initialTransaction.state, maybeCollateral, maybeInterest ) of
                ( Lend, Just collateral, Just interest ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | interest = output, token = getTokenLend collateral interest model.reserve }
                    in
                    { model | transaction = transaction }

                ( Borrow, Just collateral, Just interest ) ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | interest = output, token = getTokenBorrow collateral interest model.reserve }
                    in
                    { model | transaction = transaction }

                _ ->
                    let
                        transaction : Transaction
                        transaction =
                            { initialTransaction | interest = output }
                    in
                    { model | transaction = transaction }

        ChangeCollateralAmount col ->
            let
                initialTransaction : Transaction
                initialTransaction =
                    model.transaction

                maybeToken : Maybe Float
                maybeToken =
                    String.toFloat model.transaction.token

                maybeCollateral : Maybe Float
                maybeCollateral =
                    String.toFloat col

                maybeInterest : Maybe Float
                maybeInterest =
                    String.toFloat model.transaction.interest
            in
            case initialTransaction.state of
                Lend ->
                    case ( maybeToken, maybeCollateral, maybeInterest ) of
                        ( Just token, Just collateral, _ ) ->
                            let
                                transaction : Transaction
                                transaction =
                                    { initialTransaction | collateral = col, interest = getInterestLend token collateral model.reserve }
                            in
                            { model | transaction = transaction }

                        ( Nothing, Just collateral, Just interest ) ->
                            let
                                transaction : Transaction
                                transaction =
                                    { initialTransaction | collateral = col, interest = getTokenLend collateral interest model.reserve }
                            in
                            { model | transaction = transaction }

                        _ ->
                            let
                                transaction : Transaction
                                transaction =
                                    { initialTransaction | collateral = col }
                            in
                            { model | transaction = transaction }

                Borrow ->
                    case ( maybeToken, maybeCollateral, maybeInterest ) of
                        ( Just token, Just collateral, _ ) ->
                            let
                                transaction : Transaction
                                transaction =
                                    { initialTransaction | collateral = col, interest = getInterestBorrow token collateral model.reserve }
                            in
                            { model | transaction = transaction }

                        ( Nothing, Just collateral, Just interest ) ->
                            let
                                transaction : Transaction
                                transaction =
                                    { initialTransaction | collateral = col, interest = getTokenBorrow collateral interest model.reserve }
                            in
                            { model | transaction = transaction }

                        _ ->
                            let
                                transaction : Transaction
                                transaction =
                                    { initialTransaction | collateral = col }
                            in
                            { model | transaction = transaction }

        Swap ->
            let
                initialTransaction : Transaction
                initialTransaction =
                    model.transaction

                maybeToken : Maybe Float
                maybeToken =
                    String.toFloat model.transaction.token

                maybeCollateral : Maybe Float
                maybeCollateral =
                    String.toFloat model.transaction.collateral

                maybeInterest : Maybe Float
                maybeInterest =
                    String.toFloat model.transaction.interest

                startReserve : Reserve
                startReserve =
                    model.reserve
            in
            case initialTransaction.state of
                Lend ->
                    case ( maybeToken, maybeCollateral, maybeInterest ) of
                        ( Just token, Just collateral, Just interest ) ->
                            let
                                newToken : Float
                                newToken =
                                    startReserve.token + token

                                newCollateral : Float
                                newCollateral =
                                    startReserve.collateral - collateral

                                newInterest : Float
                                newInterest =
                                    startReserve.interest - interest

                                reserve : Reserve
                                reserve =
                                    { startReserve | token = newToken, collateral = newCollateral, interest = newInterest }

                                deposit : Deposit
                                deposit =
                                    addDeposit (token + interest) collateral model.deposit

                                transaction : Transaction
                                transaction =
                                    { initialTransaction | interest = getInterestLend token collateral reserve }
                            in
                            { model | reserve = reserve, transaction = transaction, deposit = deposit }

                        _ ->
                            model

                Borrow ->
                    case ( maybeToken, maybeCollateral, maybeInterest ) of
                        ( Just token, Just collateral, Just interest ) ->
                            let
                                newToken : Float
                                newToken =
                                    startReserve.token - token

                                newCollateral : Float
                                newCollateral =
                                    startReserve.collateral + collateral

                                newInterest : Float
                                newInterest =
                                    startReserve.interest + interest

                                reserve : Reserve
                                reserve =
                                    { startReserve | token = newToken, collateral = newCollateral, interest = newInterest }

                                loan : Loan
                                loan =
                                    addLoan (token + interest) collateral model.loan

                                transaction : Transaction
                                transaction =
                                    { initialTransaction | interest = getInterestBorrow token collateral reserve }
                            in
                            { model | reserve = reserve, transaction = transaction, loan = loan }

                        _ ->
                            model


getInterestLend : Float -> Float -> Reserve -> String
getInterestLend token collateral reserve =
    if collateral >= reserve.collateral then
        ""

    else
        let
            yMax : Float
            yMax =
                token * reserve.interest / (reserve.token + token)

            zMax : Float
            zMax =
                token * reserve.collateral / (reserve.token + token)
        in
        if collateral > zMax then
            ""

        else
            (yMax * (zMax - collateral) / zMax)
                |> String.fromFloat


getInterestBorrow : Float -> Float -> Reserve -> String
getInterestBorrow token collateral reserve =
    if token >= reserve.token then
        ""

    else
        let
            yMax : Float
            yMax =
                token * reserve.interest / (reserve.token - token)

            zMin : Float
            zMin =
                token * reserve.collateral / (reserve.token - token)
        in
        if collateral < zMin then
            ""

        else
            (yMax * zMin / collateral)
                |> String.fromFloat


getTokenLend : Float -> Float -> Reserve -> String
getTokenLend collateral interest reserve =
    if collateral >= reserve.collateral then
        ""

    else
        let
            w : Float
            w =
                ((interest * reserve.collateral) + (collateral * reserve.interest)) / (reserve.collateral * reserve.interest)
        in
        if w <= 0 then
            ""

        else
            (w * reserve.token / (1 - w))
                |> String.fromFloat


getTokenBorrow : Float -> Float -> Reserve -> String
getTokenBorrow collateral interest reserve =
    let
        w : Float
        w =
            sqrt (collateral * interest / (reserve.collateral * reserve.interest))
    in
    if w <= 0 then
        ""

    else
        (w * reserve.token / (1 + w))
            |> String.fromFloat


addDeposit : Float -> Float -> Deposit -> Deposit
addDeposit initialDeposit initialInsurance depositData =
    let
        deposit : Float
        deposit =
            depositData.deposit + initialDeposit

        insurance : Float
        insurance =
            depositData.insurance + initialInsurance
    in
    { depositData | deposit = deposit, insurance = insurance }


addLoan : Float -> Float -> Loan -> Loan
addLoan initialLoan initialCollateral loanData =
    let
        loan : Float
        loan =
            loanData.loan + initialLoan

        collateral : Float
        collateral =
            loanData.collateral + initialCollateral
    in
    { loanData | loan = loan, collateral = collateral }



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
        [ viewAsset model.deposit
        , viewLiability model.loan
        , viewSwap model
        ]


viewSwap : Model -> Element Msg
viewSwap model =
    column
        [ width <| px 400
        , padding 20
        , spacing 20
        , centerX
        , alignTop
        , Background.color dirtyWhite
        , Border.rounded 30
        ]
        [ viewTabs model.transaction.state
        , viewToken model.transaction.token
        , viewCollateral model.transaction.collateral
        , viewInterest model.transaction.interest
        , viewSwapButton
        ]


viewTabs : State -> Element Msg
viewTabs state =
    case state of
        Lend ->
            row
                [ width fill
                , padding 10
                , Background.color dirtyWhite
                ]
                [ viewLendTabChosen
                , viewBorrowTab
                ]

        Borrow ->
            row
                [ width fill
                , padding 10
                , Background.color dirtyWhite
                ]
                [ viewLendTab
                , viewBorrowTabChosen
                ]


viewLendTab : Element Msg
viewLendTab =
    Input.button
        [ width fill
        , Font.color gray
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Just SwitchToLend
        , label = text "Lend"
        }


viewLendTabChosen : Element Msg
viewLendTabChosen =
    Input.button
        [ width fill
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Just SwitchToLend
        , label = text "Lend"
        }


viewBorrowTab : Element Msg
viewBorrowTab =
    Input.button
        [ width fill
        , Font.color gray
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Just SwitchToBorrow
        , label = text "Borrow"
        }


viewBorrowTabChosen : Element Msg
viewBorrowTabChosen =
    Input.button
        [ width fill
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        , Font.center
        ]
        { onPress = Just SwitchToBorrow
        , label = text "Borrow"
        }


viewToken : String -> Element Msg
viewToken token =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputTokenDetails
        , viewInput token "DAI" ChangeInputAmount
        ]


viewCollateral : String -> Element Msg
viewCollateral collateral =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputCollateralDetails
        , viewInput collateral "ETH" ChangeCollateralAmount
        ]


viewInterest : String -> Element Msg
viewInterest interest =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewInputInterestDetails
        , viewInput interest "DAI" ChangeOutputAmount
        ]


viewInputTokenDetails : Element Msg
viewInputTokenDetails =
    row
        [ width fill ]
        [ viewPrincipalText
        , viewNow
        ]


viewInputCollateralDetails : Element Msg
viewInputCollateralDetails =
    row
        [ width fill ]
        [ viewCollateralText
        , viewNow
        ]


viewInputInterestDetails : Element Msg
viewInputInterestDetails =
    row
        [ width fill ]
        [ viewInterestText
        , viewLater
        ]


viewPrincipalText : Element Msg
viewPrincipalText =
    el
        [ padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text "Principal")


viewCollateralText : Element Msg
viewCollateralText =
    el
        [ padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text "Insurance")


viewInterestText : Element Msg
viewInterestText =
    el
        [ padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text "Interest")


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


viewLater : Element Msg
viewLater =
    el
        [ padding 5
        , Border.rounded 30
        , Font.color imperfectBlack
        , Font.size 14
        , Font.family lato
        ]
        (text "on December 30, 2020")


viewInput : String -> String -> (String -> Msg) -> Element Msg
viewInput string currency msg =
    row
        [ width fill
        , spacing 10
        ]
        [ viewInputNumber string msg
        , viewTokenInput currency
        ]


viewInputNumber : String -> (String -> Msg) -> Element Msg
viewInputNumber text msg =
    Input.text
        [ padding 5
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
        (text "0.0")


viewTokenInput : String -> Element Msg
viewTokenInput string =
    Input.button
        [ width shrink
        , height fill
        , padding 5
        , Border.rounded 30
        , mouseOver [ Background.color dirtyWhite ]
        , alignRight
        ]
        { onPress = Nothing
        , label = viewCurrency string
        }


viewCurrency : String -> Element Msg
viewCurrency currency =
    row
        [ spacing 5
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ text currency
        , viewArrow
        ]


viewSwapButton : Element Msg
viewSwapButton =
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
        { onPress = Just Swap
        , label = text "Swap"
        }



-- VIEW ASSET


viewAsset : Deposit -> Element Msg
viewAsset deposit =
    if deposit == noDeposit then
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
            [ viewDepositBox deposit ]


viewDepositBox : Deposit -> Element Msg
viewDepositBox { deposit, insurance } =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewDeposit deposit
        , viewDepositInsurance insurance
        ]


viewDeposit : Float -> Element Msg
viewDeposit deposit =
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


viewDepositInsurance : Float -> Element Msg
viewDepositInsurance insurance =
    row
        [ width fill
        , padding 5
        , spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ text <| String.fromFloat insurance
        , el [ alignRight ] <| text "ETH"
        ]



-- VIEW LIABILITY LIST


viewLiability : Loan -> Element Msg
viewLiability loan =
    if loan == noLoan then
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
            [ viewLoanBox loan ]


viewLoanBox : Loan -> Element Msg
viewLoanBox { loan, collateral } =
    column
        [ width fill
        , padding 20
        , spacing 10
        , Background.color imperfectWhite
        , Border.rounded 30
        ]
        [ viewLoan loan
        , viewLoanCollateral collateral
        ]


viewLoan : Float -> Element Msg
viewLoan loan =
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


viewLoanCollateral : Float -> Element Msg
viewLoanCollateral collateral =
    row
        [ width fill
        , padding 5
        , spacing 10
        , Font.color imperfectBlack
        , Font.size 24
        , Font.family lato
        ]
        [ text <| String.fromFloat collateral
        , el [ alignRight ] <| text "ETH"
        ]



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
        { red = 230
        , green = 230
        , blue = 230
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
