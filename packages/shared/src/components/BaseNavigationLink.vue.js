const props = defineProps();
const emit = defineEmits();
function onClick(event) {
    emit('click', event);
    // Only intercept internal links (starting with /)
    if (props.href && props.href.startsWith('/')) {
        // Don't intercept if user is doing special navigation
        if (event.ctrlKey || event.metaKey || event.shiftKey || props.target === '_blank') {
            return;
        }
        event.preventDefault();
        // Dispatch navigation event for host to handle
        window.dispatchEvent(new CustomEvent('mf:navigate', {
            detail: { to: props.href }
        }));
    }
    // For external links or special cases, let the browser handle normally
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    ...{ onClick: (__VLS_ctx.onClick) },
    href: (__VLS_ctx.href),
    title: (__VLS_ctx.title),
    target: (__VLS_ctx.target),
    rel: (__VLS_ctx.rel),
    ...{ class: (__VLS_ctx.className) },
    'data-id': (__VLS_ctx.dataId),
});
// @ts-ignore
[onClick, href, title, target, rel, className, dataId,];
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        onClick: onClick,
    }),
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
