interface Props {
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    value?: string;
    disabled?: boolean;
    rounded?: boolean;
    className?: string;
    dataId?: string;
    size?: 'normal' | 'small';
    variant?: 'primary' | 'secondary';
    title?: string;
}
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (ev: Event) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((ev: Event) => any) | undefined;
}>, {
    size: "normal" | "small";
    variant: "primary" | "secondary";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
