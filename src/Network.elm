module Network exposing (Network, decoder)

import Json.Decode as Decode exposing (Decoder)


type Network
    = Rinkeby


decoder : Decoder (Result String Network)
decoder =
    Decode.map fromNetworkId Decode.string


fromNetworkId : String -> Result String Network
fromNetworkId string =
    case string of
        "4" ->
            Ok Rinkeby

        _ ->
            Err "Timeswap only works with Rinkeby Test Network. Please switch your network on Metamask."
