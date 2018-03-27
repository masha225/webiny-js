import React from 'react';
import _ from 'lodash';
import { createComponent, i18n } from 'webiny-client';
import ModalAction from './ModalAction';

const t = i18n.namespace("Webiny.Ui.List.Table.Actions");
class DeleteAction extends React.Component {
    constructor() {
        super();
        this.dialogId = _.uniqueId('delete-action-modal-');
    }

    render() {
        if (this.props.render) {
            return this.props.render.call(this);
        }

        const {message, Modal} = this.props;
        const $this = this;

        return (
            <ModalAction {..._.pick(this.props, 'data', 'actions', 'label', 'hide', 'afterDelete', 'icon')}>
                {function render({data, actions, dialog}) {
                    const props = {
                        name: $this.dialogId,
                        title: $this.props.title,
                        confirm: $this.props.confirmButtonLabel,
                        cancel: $this.props.cancelButtonLabel,
                        message,
                        onComplete: () => {
                            actions.reload();
                        },
                        onConfirm: () => {
                            $this.props.onConfirm.call($this, {data, actions, dialog});
                        }
                    };
                    return (
                        <Modal.Confirmation {...props}/>
                    );
                }}
            </ModalAction>
        );
    }
}

DeleteAction.defaultProps = {
    label: t`Delete`,
    title: t`Delete confirmation`,
    icon: 'icon-cancel',
    message: t`Are you sure you want to delete this record?`,
    confirmButtonLabel: t`Yes, delete!`,
    cancelButtonLabel: t`No`,
    hide: _.noop,
    afterDelete: _.noop,
    onConfirm({data, actions, dialog}) {
        return actions.delete(data.id, false).then(res => {
            return Promise.resolve(this.props.afterDelete(res)).then(() => res);
        });
    }
};

export default createComponent(DeleteAction, {modules: ['Modal']});