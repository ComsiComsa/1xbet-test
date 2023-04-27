export class CartItem {
    goodsId: number;
    title: string;
    count: number;
    price: number;
    remaining: number;

    constructor(props?: Partial<CartItem>) {
        this.goodsId = props?.goodsId ?? 0;
        this.title = props?.title ?? '';
        this.count = props?.count ?? 1;
        this.price = props?.price ?? 0;
        this.remaining = props?.remaining ?? 0;
    }
}