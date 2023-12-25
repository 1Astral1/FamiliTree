<template>
    <div>
        <div
            class="h-screen"
            ref="canvasElement"
        ></div>
    </div>
</template>

<script setup lang="ts">
    import { Person, PersonFactory } from '@/models/Person';
    import { Relation, RelationFactory } from '@/models/Relation';
    import { onMounted, ref } from 'vue';
    import { tree } from '@/tree.js';

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
    });
</script>
