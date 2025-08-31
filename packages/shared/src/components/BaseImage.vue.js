import { computed, ref } from 'vue';
import { src, srcset } from '../utils/utils';
const props = withDefaults(defineProps(), {
    loading: 'lazy',
    decoding: 'async',
    objectFit: 'cover'
});
const emit = defineEmits();
const imageError = ref(false);
const computedSrc = computed(() => {
    if (imageError.value && props.fallbackSrc) {
        return props.fallbackSrc;
    }
    if (props.srcSizes && props.srcSizes.length > 0) {
        return src(props.src, props.srcSizes[0]);
    }
    return props.src;
});
const computedSrcset = computed(() => {
    if (imageError.value && props.fallbackSrc) {
        return undefined;
    }
    if (props.srcSizes && props.srcSizes.length > 0) {
        return srcset(props.src, props.srcSizes);
    }
    return undefined;
});
const imageClasses = computed(() => {
    const classes = ['c_BaseImage'];
    if (props.className) {
        classes.push(props.className);
    }
    return classes.join(' ');
});
const imageStyles = computed(() => {
    if (props.objectFit) {
        return { objectFit: props.objectFit };
    }
    return undefined;
});
function onLoad(event) {
    imageError.value = false;
    emit('load', event);
}
function onError(event) {
    imageError.value = true;
    emit('error', event);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    loading: 'lazy',
    decoding: 'async',
    objectFit: 'cover'
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.img)({
    ...{ onLoad: (__VLS_ctx.onLoad) },
    ...{ onError: (__VLS_ctx.onError) },
    src: (__VLS_ctx.computedSrc),
    srcset: (__VLS_ctx.computedSrcset),
    sizes: (__VLS_ctx.sizes),
    alt: (__VLS_ctx.alt),
    width: (__VLS_ctx.width),
    height: (__VLS_ctx.height),
    loading: (__VLS_ctx.loading),
    decoding: (__VLS_ctx.decoding),
    ...{ class: (__VLS_ctx.imageClasses) },
    ...{ style: (__VLS_ctx.imageStyles) },
    'aria-label': (__VLS_ctx.ariaLabel),
    'aria-describedby': (__VLS_ctx.ariaDescribedBy),
});
// @ts-ignore
[onLoad, onError, computedSrc, computedSrcset, sizes, alt, width, height, loading, decoding, imageClasses, imageStyles, ariaLabel, ariaDescribedBy,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        computedSrc: computedSrc,
        computedSrcset: computedSrcset,
        imageClasses: imageClasses,
        imageStyles: imageStyles,
        onLoad: onLoad,
        onError: onError,
    }),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
