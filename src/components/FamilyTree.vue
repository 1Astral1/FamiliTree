<template>
    <div>
        <div
            class="h-screen"
            ref="canvasElement"
        ></div>
    </div>
</template>

<script setup lang="ts">
    import { Network, DataSet } from 'vis-network/standalone';
    import { Person, PersonFactory } from '@/models/Person';
    import { Relation, RelationFactory } from '@/models/Relation';
    import { onMounted, ref } from 'vue';
    import { tree } from '@/tree.js';
    import { manPictureSrc, womanPictureSrc } from '@/core/constants';
    import randomString from '@/utils/randomString';

    const canvasElement = ref<HTMLDivElement | null>(null);

    onMounted(() => {
        const persons: Person[] = [];
        const relations: Relation[] = [];

        tree.Individuals.forEach((person) => {
            persons.push(PersonFactory.fromTree(person));
        });

        tree.Relations.forEach((relation) => {
            relations.push(RelationFactory.fromTree(relation));
        });

        const orphans: { generationCount: number; person: Person }[] = [];

        // Ищем всех крайних членов семьи
        persons.forEach((person) => {
            let isOrphan: boolean = true;

            for (const personRelationId of person.relationsIds) {
                const relation = relations.find((relation) => relation.id === personRelationId);

                if (!relation) {
                    continue;
                }

                const isPersonIsChild = !!relation.children.find(
                    (childId) => childId === person.id,
                );

                if (isPersonIsChild === true) {
                    isOrphan = false;

                    break;
                }
            }

            if (!isOrphan) {
                return;
            }

            const allChildren: string[] = [];

            person.relationsIds.forEach((relationId) => {
                const relation = relations.find((r) => r.id === relationId);

                if (!relation) {
                    return;
                }

                if (relation.husband !== person.id && relation.wife !== person.id) {
                    return;
                }

                allChildren.push(...relation.children);
            });

            function recursiveGenerationCounter(children: string[], count: number = 0): number {
                count++;

                children.forEach((child) => {
                    let localCount: number;

                    const person = persons.find((p) => p.id === child);

                    if (!person) {
                        return;
                    }

                    person.relationsIds.forEach((relationId) => {
                        const relation = relations.find((r) => r.id === relationId);

                        if (!relation) {
                            return;
                        }

                        if (relation.husband !== person.id && relation.wife !== person.id) {
                            return;
                        }

                        localCount = recursiveGenerationCounter(relation.children, count);
                    });

                    if (localCount > count) {
                        count = localCount;
                    }
                });

                return count;
            }

            const generationCount = recursiveGenerationCounter(allChildren);

            orphans.push({
                generationCount: generationCount,
                person: person,
            });
        });

        // Сортируем по длине поколений
        orphans.sort((a, b) => b.generationCount - a.generationCount);

        // Самый крайний предок
        const ancestor = orphans.at(0)!.person;

        //

        // Создаем переменную узлов
        const nodes = new DataSet<
            {
                id: string;
                label: string;
                shape: 'image';
                image: string;
                level: number;
            },
            'id'
        >();

        // Создаем переменную связей
        const edges = new DataSet<
            {
                id: string;
                from: string;
                to: string;
            },
            'id'
        >();

        // Создаем переменную семей
        const families: {
            dad: string;
            mom: string;
            ofst: number;
            childs: string[];
        }[] = [];

        nodes.add({
            id: ancestor.id,
            label: ancestor.fullName,
            shape: 'image',
            image: ancestor.sex === 'm' ? manPictureSrc : womanPictureSrc,
            level: 0,
        });

        crawlFromPerson(ancestor, 0);

        function crawlFromPerson(person: Person, level: number) {
            let curLevel = level;

            person.relationsIds.forEach((relationId) => {
                curLevel = level;

                const relation = relations.find((r) => r.id === relationId);

                if (!relation) {
                    return;
                }

                // Relation, в котором человек выступает ребенком, обрабатываем отдельно
                if (relation.children.findIndex((childId) => childId === person.id) !== -1) {
                    curLevel -= 1;

                    return;
                }

                let isPersonHusband = false;

                const husbandId = relation.husband;
                const wifeId = relation.wife;

                if (husbandId === person.id) {
                    isPersonHusband = true;
                }

                const husband: Person = husbandId
                    ? persons.find((p) => p.id === husbandId)
                    : { id: `${person.id}-FANTOM`, fullName: '', sex: 'm', relationsIds: [] };

                const wife: Person = wifeId
                    ? persons.find((p) => p.id === wifeId)
                    : { id: `${person.id}-FANTOM`, fullName: '', sex: 'f', relationsIds: [] };

                if (nodes.get(husband.id) === null) {
                    nodes.add({
                        id: husband.id,
                        label: husband.fullName,
                        shape: 'image',
                        image: manPictureSrc,
                        level: curLevel,
                    });
                }

                if (nodes.get(wife.id) === null) {
                    nodes.add({
                        id: wife.id,
                        label: wife.fullName,
                        image: womanPictureSrc,
                        level: curLevel,
                        shape: 'image',
                    });
                }

                if (
                    (isPersonHusband ? wife.relationsIds.length : husband.relationsIds.length) > 1
                ) {
                    crawlFromPerson(isPersonHusband ? wife : husband, curLevel);
                }

                if (edges.get(`${husband.id}-${wife.id}-HUSBAND-WIFE`) === null) {
                    edges.add({
                        id: `${husband.id}-${wife.id}-HUSBAND-WIFE`,
                        from: husband.id,
                        to: wife.id,
                    });
                }

                relation.children.forEach((childId) => {
                    const child = persons.find((p) => p.id === childId);

                    if (!child) {
                        return;
                    }

                    if (nodes.get(child.id) === null) {
                        nodes.add({
                            id: child.id,
                            label: child.fullName,
                            shape: 'image',
                            image: child.sex === 'm' ? manPictureSrc : womanPictureSrc,
                            level: curLevel + 1,
                        });
                    }

                    if (edges.get(`${husband.id}-${child.id}-FATHER-CHILD`) === null) {
                        edges.add({
                            id: `${husband.id}-${child.id}-FATHER-CHILD`,
                            from: husband.id,
                            to: child.id,
                        });
                    }

                    if (edges.get(`${wife.id}-${child.id}-MOTHER-CHILD`) === null) {
                        edges.add({
                            id: `${wife.id}-${child.id}-MOTHER-CHILD`,
                            from: wife.id,
                            to: child.id,
                        });
                    }

                    if (child.relationsIds.length > 1) {
                        crawlFromPerson(child, curLevel + 1);
                    }
                });

                families.push({
                    dad: husband.id,
                    mom: wife.id,
                    childs: relation.children,
                    ofst: 0,
                });
            });
        }

        //
        const network = new Network(
            canvasElement.value!,
            {
                nodes: nodes,
                edges: edges,
            },
            {
                physics: {
                    enabled: false,
                },
                interaction: {
                    dragNodes: false,
                },
                layout: {
                    hierarchical: {
                        direction: 'UD',
                        nodeSpacing: 300,
                    },
                },
                edges: {
                    color: 'transparent',
                },
            },
        );

        network.on('beforeDrawing', function (ctx) {
            const dy = 150 / 5;

            ctx.strokeStyle = '#F00';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(0, 0);

            for (const fam of families) {
                try {
                    let prnt = network.getPositions([fam.dad, fam.mom]);

                    let starty = prnt[fam.dad].y + dy + fam.ofst;

                    let midx = (prnt[fam.dad].x + prnt[fam.mom].x) / 2;
                    let chld = network.getPositions(fam.childs);

                    ctx.moveTo(prnt[fam.dad].x, prnt[fam.dad].y + fam.ofst);

                    // прямая связь между супругами, без детей
                    if (fam.childs.length == 0) {
                        ctx.lineTo(prnt[fam.mom].x, prnt[fam.mom].y + fam.ofst);
                        continue;
                    }
                    ctx.lineTo(prnt[fam.dad].x, starty);
                    ctx.lineTo(prnt[fam.mom].x, starty);
                    ctx.lineTo(prnt[fam.mom].x, prnt[fam.dad].y + fam.ofst);
                    ctx.moveTo(midx, starty);

                    for (const ch of fam.childs) {
                        let midy = (chld[ch].y + starty) / 2 + fam.ofst;

                        ctx.moveTo(midx, starty);
                        ctx.lineTo(midx, midy);
                        ctx.lineTo(chld[ch].x, midy);
                        ctx.lineTo(chld[ch].x, chld[ch].y);
                    }
                } catch (e) {
                    console.log('error ' + JSON.stringify(e, null, 4));
                }
            }

            ctx.moveTo(0, 0);
            ctx.closePath();
            ctx.stroke();
        });
    });
</script>
