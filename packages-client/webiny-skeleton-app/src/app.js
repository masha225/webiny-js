import React from "react";
import { app as uiApp } from "webiny-client-ui";
import Menu from "./services/menu";

export default () => {
    return (params, next) => {
        return new Promise(resolve => {
            uiApp()(params, resolve);

            const { app } = params;

            app.services.add("menu", () => new Menu());

            app.router.addRoute({
                name: "Me.Account",
                path: "/me/account",
                component: () => app.modules.load("Skeleton.UserAccountForm"),
                title: "My Account"
            });

            app.router.addRoute({
                name: "Dashboard",
                path: "/",
                exact: true,
                render() {
                    return <h2>Missing Dashboard view!</h2>;
                },
                title: "My Account"
            });

            app.modules.register([
                {
                    name: "Skeleton.AdminLayout",
                    factory: () => import("./components/Layouts/AdminLayout")
                },
                {
                    name: "Skeleton.EmptyLayout",
                    factory: () => import("./components/Layouts/EmptyLayout")
                },
                {
                    name: "Skeleton.UserAccountForm",
                    factory: () => import("./components/UserAccount/UserAccountForm")
                },
                {
                    name: "Skeleton.Header",
                    factory: () => import("./components/Header")
                },
                {
                    name: "Skeleton.Footer",
                    factory: () => import("./components/Footer")
                },
                {
                    name: "Skeleton.Logo",
                    factory: () => import("./components/Logo")
                },
                {
                    name: "Skeleton.Navigation",
                    factory: () => import("./components/Navigation")
                },
                {
                    name: "Skeleton.Navigation.Desktop",
                    factory: () => import("./components/Navigation/Desktop")
                },
                {
                    name: "Skeleton.Navigation.Mobile",
                    factory: () => import("./components/Navigation/Mobile")
                },
                {
                    name: "Skeleton.UserMenu",
                    factory: () => import("./components/UserMenu")
                },
                {
                    name: "Skeleton.UserMenu.AccountPreferences",
                    factory: () => import("./components/UserMenu/AccountPreferences"),
                    tags: ["user-menu-item"]
                },
                {
                    name: "Skeleton.UserMenu.Logout",
                    factory: () => import("./components/UserMenu/Logout"),
                    tags: ["user-logout-menu-item"]
                },
                {
                    name: "Skeleton.Notifications.Widget",
                    factory: () => import("./components/Notifications/Widget")
                },
                {
                    name: "Skeleton.Notifications.Container",
                    factory: () => import("./components/Notifications/Container")
                },
                {
                    name: "Skeleton.Notifications.Notification",
                    factory: () => import("./components/Notifications/Notification")
                }
            ]);

            next();
        });
    };
};
