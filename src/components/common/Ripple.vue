<template>
    <div style="height: 0; width: 0; position: absolute; visibility: hidden;"
         aria-hidden="true">
        <svg version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             focusable="false">
            <symbol id="ripply-scott"
                    viewBox="0 0 100 100">
                <circle id="ripple-shape"
                        cx="1"
                        cy="1"
                        r="1" />
            </symbol>
        </svg>
    </div>
</template>
<script>

</script>
<style>
    .ripple-obj {
        height: 100%;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        fill: #0c7cd5;
    }

    .ripple-obj use {
        opacity: 0;
    }
</style>