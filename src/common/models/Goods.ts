export class Goods {
    price: number;
    id: number;
    remaining: number;

    constructor(props?: Partial<Goods>) {
        this.price = props?.price ?? 0;
        this.id = props?.id ?? 0;
        this.remaining = props?.remaining ?? 0;
    }
}