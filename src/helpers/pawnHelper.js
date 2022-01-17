export function GetPawnDiameter(size) {
    switch(size){
        case "tiny":
            return 22.5;
        default:
        case "small":
        case "medium":
            return 45;
        case "large":
            return 90;
        case "huge":
            return 135;
        case "gargantuan":
            return 180;
    }
}