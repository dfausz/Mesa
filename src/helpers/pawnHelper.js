export function GetPawnDiameter(size) {
    switch(size){
        case "tiny":
            return 20;
        default:
        case "small":
        case "medium":
            return 40;
        case "large":
            return 80;
        case "huge":
            return 120;
        case "gargantuan":
            return 160;
    }
}