// @flow
import { Entity } from "webiny-entity";
import type { IRole } from "./Role.entity";

export interface IGroup extends Entity {
    name: string;
    createdBy: string;
    slug: string;
    description: string;
    system: boolean;
    roles: Promise<Array<IRole>>;
}

export function groupFactory(context: Object): Class<IGroup> {
    return class Group extends Entity {
        static classId = "SecurityGroup";

        name: string;
        createdBy: string;
        slug: string;
        description: string;
        system: boolean;
        roles: Promise<Array<IRole>>;

        constructor() {
            super();

            const {
                getUser,
                security: { entities }
            } = context;

            this.attr("createdBy").char();
            this.attr("name")
                .char()
                .setValidators("required");
            this.attr("slug")
                .char()
                .setValidators("required")
                .setOnce();

            this.attr("description").char();
            this.attr("system").boolean();

            this.attr("roles")
                .entities(entities.Role, "entity")
                .setUsing(entities.Roles2Entities, "role");

            this.on("beforeCreate", async () => {
                if (getUser()) {
                    this.createdBy = getUser().id;
                }

                const existingGroup = await Group.findOne({ query: { slug: this.slug } });
                if (existingGroup) {
                    throw Error(`Group with slug "${this.slug}" already exists.`);
                }
            });

            this.on("beforeDelete", async () => {
                if (this.system) {
                    throw Error(`Cannot delete system role.`);
                }
            });
        }
    };
}
