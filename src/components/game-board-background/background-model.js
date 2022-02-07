export default class BackgroundModel {
    /** @public */
    image;
    /** @public */
    name;
    /** @public */
    translate = {x: 0, y: 0};
    /** @public */
    scale = 1.0;

    constructor(name, image) {
        this.name = name ?? "Default";
        this.image = image ?? require('./clearing.jpg');
    }
}