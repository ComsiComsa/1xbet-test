export class Category {
    visible: boolean;
    id: string;
    name: string;
    goodsIds: {
        [goodsId: string]: [name: string, limit: number];
    };

    constructor(props?: Partial<Category>) {
        this.visible = props?.visible ?? false;
        this.id = props?.id ?? '0';
        this.name = props?.name ?? '';
        this.goodsIds = props?.goodsIds ?? {};
    }
}