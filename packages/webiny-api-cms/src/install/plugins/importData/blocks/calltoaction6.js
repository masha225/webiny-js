export default {
    id: "5c27a9f2a0b03cca7a7e097b",
    name: "Call to action #6",
    type: "block",
    content: {
        data: {
            settings: {
                padding: {
                    advanced: true,
                    desktop: { top: 0, bottom: 0 },
                    mobile: { top: 20, bottom: 20 }
                },
                height: { fullHeight: false, value: "100%" },
                background: {
                    image: {
                        src: "/files/bg-2_k7xjq8418m8.svg",
                        scaling: "contain",
                        position: "center"
                    }
                },
                verticalAlign: "center",
                width: { value: "1000px" },
                horizontalAlignFlex: "flex-end"
            }
        },
        elements: [
            {
                data: {
                    settings: {
                        margin: { advanced: false, desktop: { all: 100 } },
                        padding: { desktop: { all: 0 } },
                        background: { image: { src: null, scaling: "cover" } },
                        width: { value: "400px" },
                        horizontalAlign: "left"
                    }
                },
                elements: [
                    {
                        data: {
                            width: 100,
                            settings: {
                                animation: { name: "fade-left" },
                                margin: { mobile: { desktop: { all: 10 }, mobile: { all: 10 } } },
                                shadow: {
                                    color: "var(--webiny-cms-theme-background)",
                                    vertical: "2",
                                    horizontal: "0",
                                    blur: "2"
                                },
                                background: { color: "var(--webiny-cms-theme-surface)" },
                                padding: { desktop: { all: 50 }, mobile: { all: 15 } },
                                border: {
                                    color: "var(--webiny-cms-theme-background)",
                                    width: 1,
                                    radius: 2,
                                    style: "solid"
                                }
                            }
                        },
                        elements: [
                            {
                                data: {
                                    text: {
                                        object: "value",
                                        document: {
                                            object: "document",
                                            data: {},
                                            nodes: [
                                                {
                                                    object: "block",
                                                    type: "h4",
                                                    data: { align: "center" },
                                                    nodes: [
                                                        {
                                                            object: "text",
                                                            leaves: [
                                                                {
                                                                    object: "leaf",
                                                                    text: "Call to Action",
                                                                    marks: []
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    settings: {
                                        padding: { desktop: { all: 20 }, mobile: { all: 20 } }
                                    }
                                },
                                elements: [],
                                type: "cms-element-text"
                            },
                            {
                                data: {
                                    text: {
                                        object: "value",
                                        document: {
                                            object: "document",
                                            data: {},
                                            nodes: [
                                                {
                                                    object: "block",
                                                    type: "description",
                                                    data: { align: "center" },
                                                    nodes: [
                                                        {
                                                            object: "text",
                                                            leaves: [
                                                                {
                                                                    object: "leaf",
                                                                    text:
                                                                        "Duis magna minim mollit dolore id magna excepteur sint id eiusmod aliqua laboris ullamco aute. Amet minim amet tempor proident laborum aliquip sit in.",
                                                                    marks: []
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    settings: {
                                        padding: { desktop: { all: 20 }, mobile: { all: 20 } },
                                        margin: {
                                            advanced: true,
                                            desktop: { top: 20, bottom: 20 },
                                            mobile: { top: 15, bottom: 15 }
                                        }
                                    }
                                },
                                elements: [],
                                type: "cms-element-text"
                            },
                            {
                                data: {
                                    text: {
                                        object: "value",
                                        document: {
                                            object: "document",
                                            data: {},
                                            nodes: [
                                                {
                                                    object: "block",
                                                    type: "button",
                                                    data: {},
                                                    nodes: [
                                                        {
                                                            object: "text",
                                                            leaves: [
                                                                {
                                                                    object: "leaf",
                                                                    text: "LAUNCH",
                                                                    marks: []
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    type: "primary",
                                    icon: {
                                        id: ["fas", "rocket"],
                                        svg:
                                            '<svg width="25" viewBox="0 0 512 512"><path d="M505.1 19.1C503.8 13 499 8.2 492.9 6.9 460.7 0 435.5 0 410.4 0 307.2 0 245.3 55.2 199.1 128H94.9c-18.2 0-34.8 10.3-42.9 26.5L2.6 253.3c-8 16 3.6 34.7 21.5 34.7h95.1c-5.9 12.8-11.9 25.5-18 37.7-3.1 6.2-1.9 13.6 3 18.5l63.6 63.6c4.9 4.9 12.3 6.1 18.5 3 12.2-6.1 24.9-12 37.7-17.9V488c0 17.8 18.8 29.4 34.7 21.5l98.7-49.4c16.3-8.1 26.5-24.8 26.5-42.9V312.8c72.6-46.3 128-108.4 128-211.1.1-25.2.1-50.4-6.8-82.6zM400 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="currentColor"></path></svg>',
                                        width: "25",
                                        position: "top"
                                    },
                                    settings: {
                                        horizontalAlignFlex: "center",
                                        margin: { desktop: { all: 0 }, mobile: { all: 0 } },
                                        padding: { desktop: { all: 0 }, mobile: { all: 0 } }
                                    }
                                },
                                elements: [],
                                type: "cms-element-button"
                            }
                        ],
                        type: "cms-element-column"
                    }
                ],
                type: "cms-element-row"
            }
        ],
        type: "cms-element-block"
    },
    preview: {
        name: "cms-element-5c27a9f2a0b03cca7a7e097b_13ztjq9pz3ck.png",
        size: 56813,
        src: "/files/cms-element-5c27a9f2a0b03cca7a7e097b_13ztjq9pz3ck.png",
        type: "image/png",
        meta: { width: 1000, height: 459 }
    },
    category: "cms-block-category-cta"
};
