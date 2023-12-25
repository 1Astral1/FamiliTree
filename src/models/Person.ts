export class Person {
    id: string;
    fullName: string;
    sex: 'm' | 'f';
    relationsIds: string[];
}

export class PersonFactory {
    static fromTree(map: Record<string, any>): Person {
        const relations: string[] = [];

        if (Array.isArray(map.Relations)) {
            relations.push(...map.Relations);
        } else if (typeof map.Relations === 'string') {
            relations.push(map.Relations);
        }

        const person = new Person();

        person.id = map.Id;
        person.fullName = map.Fullname;
        person.sex = map.Sex === 'F' ? 'f' : 'm';
        person.relationsIds = relations;

        return person;
    }
}
