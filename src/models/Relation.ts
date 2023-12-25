export class Relation {
    id: string;
    children: string[];
    husband?: string;
    wife?: string;
}

export class RelationFactory {
    static fromTree(map: Record<string, any>): Relation {
        const children: string[] = [];

        if (Array.isArray(map.Children)) {
            children.push(...map.Children);
        } else if (typeof map.Children === 'string') {
            children.push(map.Children);
        }

        const relation = new Relation();

        relation.id = map.Id;
        relation.husband = map.Husband;
        relation.wife = map.Wife;
        relation.children = children;

        return relation;
    }
}
