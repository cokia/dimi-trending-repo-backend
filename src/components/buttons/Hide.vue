<template>
    <div
        class="vue-ads-cursor-pointer"
        @click="click"
    >
        <slot>
            <i style="margin-top:0.3em;" class="fa fa-bars fa-2x"/>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'VueAdsHideButton',

    props: {
        hidden: {
            required: true,
            validator: (value) => {
                return value === null || typeof value === 'boolean';
            },
        },
    },

    methods: {
        click () {
            this.$emit('clicked', !this.hidden, this.activated);
        },
    },
};
</script>
