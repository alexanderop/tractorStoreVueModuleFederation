import { computed } from 'vue';
const emit = defineEmits();
const props = withDefaults(defineProps(), {
    size: 'normal',
    variant: 'secondary'
});
function onClick(ev) {
    emit('click', ev);
    if (props.href && props.href.startsWith('/')) {
        ev.preventDefault();
        window.dispatchEvent(new CustomEvent('mf:navigate', { detail: { to: props.href } }));
    }
}
const buttonClasses = computed(() => {
    const classes = [
        'c_Button',
        `c_Button--${props.variant}`,
        `c_Button--size-${props.size}`,
        props.className || ''
    ];
    if (props.rounded) {
        classes.push('c_Button--rounded');
    }
    return classes.join(' ').trim();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    size: 'normal',
    variant: 'secondary'
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['c_Button--size-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button--rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button--size-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button--rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button--size-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button--rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button--size-small']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button--rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button--rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button__inner']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.href) {
    // @ts-ignore
    [href,];
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        ...{ onClick: (__VLS_ctx.onClick) },
        href: (__VLS_ctx.href),
        title: (__VLS_ctx.title),
        'data-id': (__VLS_ctx.dataId),
        ...{ class: (__VLS_ctx.buttonClasses) },
    });
    // @ts-ignore
    [href, onClick, title, dataId, buttonClasses,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "c_Button__inner" },
    });
    var __VLS_0 = {};
}
else {
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.href))
                    return;
                __VLS_ctx.emit('click', $event);
                // @ts-ignore
                [emit,];
            } },
        type: (__VLS_ctx.type || 'button'),
        value: (__VLS_ctx.value),
        disabled: (__VLS_ctx.disabled),
        title: (__VLS_ctx.title),
        'data-id': (__VLS_ctx.dataId),
        ...{ class: (__VLS_ctx.buttonClasses) },
    });
    // @ts-ignore
    [title, dataId, buttonClasses, type, value, disabled,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "c_Button__inner" },
    });
    var __VLS_2 = {};
}
/** @type {__VLS_StyleScopedClasses['c_Button__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['c_Button__inner']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        emit: emit,
        onClick: onClick,
        buttonClasses: buttonClasses,
    }),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
