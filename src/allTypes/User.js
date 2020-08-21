import { objectType } from '@nexus/schema';

export const User = objectType({
    name: 'User',
    definition(t){
        t.string('name');
        t.string('email');
        t.string('password', { nullable: true });
        t.string('createdAt');
        t.id('_id');
    }
})