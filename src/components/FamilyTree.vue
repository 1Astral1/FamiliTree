<template>
    <div>
        <div
            class="h-screen"
            ref="canvasElement"
        ></div>
    </div>
</template>

<script setup lang="ts">
    import vis from 'vis';
    import { Person, PersonFactory } from '@/models/Person';
    import { Relation, RelationFactory } from '@/models/Relation';
    import { onMounted, ref } from 'vue';
    import { tree } from '@/tree.js';
    import { manPictureSrc, womanPictureSrc } from '@/core/constants';

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

        persons.forEach((person) => {
            let isOrphan: boolean = true;

            for (const personRelationId of person.relationsIds) {
                const relation = relations.find((relation) => relation.id === personRelationId);

                if (!relation) {
                    continue;
                }

                const isPersonIsChild = !!relation.children.find(
                    (childId) => childId === person.id
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
                person: person
            });
        });

        orphans.sort((a, b) => b.generationCount - a.generationCount);

        const ancestor = orphans.at(0)!.person;

        const nodes: {
            id: string;
            label: string;
            shape: 'image';
            image: string;
            level: number;
        }[] = [];

        // create an array with edges
        const edges: {
            id: string;
            from: string;
            to: string;
        }[] = [];

        const families: {
            dad: string;
            mom: string;
            ofst: number;
            childs: string[];
        }[] = [];

        // persons.forEach((person) => {
        //     nodes.push({
        //         id: person.id,
        //         label: person.fullName,
        //         shape: 'image',
        //         image: person.sex === 'm' ? manPictureSrc : womanPictureSrc,
        //         level: 0
        //     });
        // });

        // relations.forEach((relation) => {
        //     if (relation.husband && relation.wife) {
        //         edges.push({
        //             id: `${relation.husband}-${relation.wife}-HUSBAND-WIFE`,
        //             from: relation.husband,
        //             to: relation.wife
        //         });

        //         edges.push({
        //             id: `${relation.wife}-${relation.husband}-WIFE-HUSBAND`,
        //             from: relation.wife,
        //             to: relation.husband
        //         });
        //     }

        //     relation.children.forEach((child) => {
        //         if (relation.husband) {
        //             edges.push({
        //                 id: `${relation.husband}-${child}-HUSBAND-CHILD`,
        //                 from: relation.husband,
        //                 to: child
        //             });

        //             edges.push({
        //                 id: `${child}-${relation.husband}-CHILD-HUSBAND`,
        //                 from: child,
        //                 to: relation.husband
        //             });
        //         }

        //         if (relation.wife) {
        //             edges.push({
        //                 id: `${relation.wife}-${child}-WIFE-CHILD`,
        //                 from: relation.wife,
        //                 to: child
        //             });

        //             edges.push({
        //                 id: `${child}-${relation.wife}-CHILD-WIFE`,
        //                 from: child,
        //                 to: relation.wife
        //             });
        //         }
        //     });
        // });

        function recursivePersonAdd(person: Person, level: number = 0, parentRelationId?: string) {
            if (level > 500) {
                return;
            }

            person.relationsIds.forEach((relationId) => {
                if (relationId === parentRelationId) {
                    return;
                }

                const relation = relations.find((r) => r.id === relationId);

                if (!relation) {
                    return;
                }

                const husband = persons.find((p) => p.id === relation.husband);
                const wife = persons.find((p) => p.id === relation.wife);

                const children: Person[] = [];

                relation.children.forEach((childId) => {
                    const person = persons.find((p) => p.id === childId);

                    if (!person) {
                        return;
                    }

                    children.push(person);
                });

                if (husband) {
                    if (nodes.find((n) => n.id === husband.id) === undefined) {
                        nodes.push({
                            id: husband.id,
                            label: husband.fullName,
                            shape: 'image',
                            image: manPictureSrc,
                            level: level
                        });
                    }
                }

                if (wife) {
                    if (nodes.find((n) => n.id === wife.id) === undefined) {
                        nodes.push({
                            id: wife.id,
                            label: wife.fullName,
                            shape: 'image',
                            image: womanPictureSrc,
                            level: level
                        });
                    }
                }

                if (husband && wife) {
                    edges.push({
                        id: `${husband.id}-${wife.id}-HUSBAND-WIFE`,
                        from: husband.id,
                        to: wife.id
                    });

                    edges.push({
                        id: `${wife.id}-${husband.id}-WIFE-HUSBAND`,
                        from: wife.id,
                        to: husband.id
                    });
                }

                children.forEach((child) => {
                    if (nodes.find((n) => n.id === child.id) === undefined) {
                        nodes.push({
                            id: child.id,
                            label: child.fullName,
                            shape: 'image',
                            image: child.sex === 'm' ? manPictureSrc : womanPictureSrc,
                            level: level + 1
                        });
                    }

                    if (husband) {
                        edges.push({
                            id: `${husband.id}-${child.id}-HUSBAND-CHILD`,
                            from: husband.id,
                            to: child.id
                        });
                    }

                    recursivePersonAdd(child, level + 1, relation.id);
                });
            });
        }

        recursivePersonAdd(ancestor);

        // create a network
        const network = new vis.Network(
            canvasElement.value!,
            {
                nodes: nodes,
                edges: edges
            },
            {
                physics: {
                    enabled: false
                },
                interaction: {
                    dragNodes: false
                },
                layout: {
                    hierarchical: {
                        direction: 'UD'
                    }
                },
                edges: {
                    color: 'transparent'
                }
            }
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
