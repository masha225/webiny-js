import React from "react";
import { app, i18n, createComponent } from "webiny-app";

const t = i18n.namespace("Security.RoleGroupsForm");

class RoleGroupsForm extends React.Component {
    render() {
        const {
            AdminLayout,
            Form,
            FormData,
            FormError,
            Section,
            View,
            Grid,
            Input,
            Button,
            Loader
        } = this.props.modules;

        return (
            <AdminLayout>
                <FormData
                    entity="SecurityRoleGroup"
                    withRouter
                    fields="id name slug description roles { id }"
                    defaultModel={{ roles: [] }}
                    onSubmitSuccess="RoleGroups.List"
                    onCancel="RoleGroups.List"
                    onSuccessMessage={({ model }) => (
                        <span>
                            {t`Role group {group} was saved successfully!`({ group: model.name })}
                        </span>
                    )}
                >
                    {({ model, onSubmit, error, invalidFields, loading }) => (
                        <Form model={model} onSubmit={onSubmit} invalidFields={invalidFields}>
                            {({ model, form, Bind }) => {
                                return (
                                    <View.Form>
                                        <View.Header
                                            title={
                                                model.id
                                                    ? t`Security - Edit Role Group`
                                                    : t`Security - Create Role Group`
                                            }
                                        />
                                        {error && (
                                            <View.Error>
                                                <FormError error={error} />
                                            </View.Error>
                                        )}
                                        <View.Body>
                                            {loading && <Loader />}
                                            <Section title={t`General`} />
                                            <Grid.Row>
                                                <Grid.Col all={6}>
                                                    <Bind>
                                                        <Input
                                                            label={t`Name`}
                                                            name="name"
                                                            validate="required"
                                                        />
                                                    </Bind>
                                                </Grid.Col>
                                                <Grid.Col all={6}>
                                                    <Bind>
                                                        <Input
                                                            label={t`Slug`}
                                                            name="slug"
                                                            validate="required"
                                                        />
                                                    </Bind>
                                                </Grid.Col>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Col all={12}>
                                                    <Bind>
                                                        <Input
                                                            label={t`Description`}
                                                            name="description"
                                                            validate="required"
                                                        />
                                                    </Bind>
                                                </Grid.Col>
                                            </Grid.Row>
                                        </View.Body>
                                        <View.Footer>
                                            <Button
                                                type="default"
                                                onClick={() =>
                                                    app.router.goToRoute("RoleGroups.List")
                                                }
                                                label={t`Go back`}
                                            />
                                            <Button
                                                type="primary"
                                                onClick={form.submit}
                                                label={t`Save role group`}
                                                align="right"
                                            />
                                        </View.Footer>
                                    </View.Form>
                                );
                            }}
                        </Form>
                    )}
                </FormData>
            </AdminLayout>
        );
    }
}

export default createComponent(RoleGroupsForm, {
    modules: [
        "Form",
        "View",
        "Input",
        "Button",
        "Grid",
        "Section",
        "Loader",
        {
            AdminLayout: "Admin.Layout"
        }
    ]
});
