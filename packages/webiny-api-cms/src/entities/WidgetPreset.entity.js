// @flow
import { Entity } from "webiny-api";

class WidgetPreset extends Entity {
    title: string;
    type: string;
    data: Object;
    constructor() {
        super();
        this.attr("title").char();
        this.attr("type").char();
        this.attr("data").object();
    }
}

WidgetPreset.classId = "CmsWidgetPreset";
WidgetPreset.tableName = "Cms_WidgetPresets";

export default WidgetPreset;
