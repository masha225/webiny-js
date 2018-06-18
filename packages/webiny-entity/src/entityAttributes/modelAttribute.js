// @flow
import { ModelAttribute as BaseModelAttribute } from "webiny-model";
import { EntityModel } from "webiny-entity";

class ModelAttribute extends BaseModelAttribute {
    getModelInstance() {
        const parentModel = ((this.getParentModel(): any): EntityModel);
        const parentEntity = parentModel.getParentEntity();
        const modelClass = ((this.getModelClass(): any): EntityModel);
        return new modelClass({ parentEntity });
    }
}

export default ModelAttribute;
