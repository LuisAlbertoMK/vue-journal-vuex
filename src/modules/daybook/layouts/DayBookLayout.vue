<template>
    <Navbar />
    <div v-if="isLoading" class="row justify-content-md-center">
        <div class="col-3 alert alert-info text-center mt-5">
            Espere porfavor...
            <h3 class="mt-2">
                 <i class="fa fa-sync fa-spin"></i>
            </h3>
        </div>
    </div>

    <div v-if="!isLoading" class="d-flex">
        <div class="col-4">
            <EntryList/>
        </div>
        <div class="col">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";
    export default{
        components:{
            Navbar: defineAsyncComponent(() => import('../components/Navbar.vue')),
            EntryList: defineAsyncComponent(() => import('../components/EntryList.vue'))
        },
        computed:{
            ...mapState('journal',['isLoading'])
        },
        methods:{
             ...mapActions('journal',['loadEntries'])
        },
        created(){
           this.loadEntries()
        }
    }
</script>