module Image exposing (Image, chevronDown, timeswapDayLogo, toElement)

import Element exposing (Attribute, Element)


type Image
    = Image { src : String, description : String }


toElement : List (Attribute msg) -> Image -> Element msg
toElement attributes (Image { src, description }) =
    Element.image attributes
        { src = src
        , description = description
        }


timeswapDayLogo : Image
timeswapDayLogo =
    createImage "TimeswapDayLogo.png" "Timeswap Day Logo"


chevronDown : Image
chevronDown =
    createImage "ChevronDown.svg" "Chevron Down Arrow"


createImage : String -> String -> Image
createImage filename description =
    Image <| { src = "./image/" ++ filename, description = description }
