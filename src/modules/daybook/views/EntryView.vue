<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="mx-1 fs-3">{{month}}</span>
        <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
      </div>
      <div >
        <button v-if="entry.id" class="btn btn-danger mx-2"
        @click="onDeleteEntry"
        > Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <input type="file" @change="onSelectedImage"  
        ref="imagenSelector"
        v-show="false"
        accept="image/png, image/jpeg"
        >
        <button @click="onSelectImage" class="btn btn-primary mx-2"> Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿Qué sucedió hoy?"></textarea>
    </div>
     <img 
            v-if="entry.picture && !localImage"
            :src="entry.picture" 
            alt="entry-picture"
            class="img-thumbnail">

        <img 
            v-if="localImage"
            :src="localImage" 
            alt="entry-picture"
            class="img-thumbnail">
  </template>

  <Fab 
    icon="fa-save" 
    @on:click="saveEntry"
  />

</template>

<script>
  import {
    defineAsyncComponent
  } from 'vue'
  import { mapGetters, mapActions } from 'vuex';
  import Swal from 'sweetalert2'

  import getDayMonthyear from '../helpers/getDayMonthyear';
  import uploadImage from '../helpers/uplodImage'

  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    components: {
      Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    data() {
      return {
        entry: null,
        localImage:null,
        file: null
      }
    },
    computed: {
      ...mapGetters('journal', ['getEntryByID']),
      day() {
        const {
          day
        } = getDayMonthyear(this.entry.date)
        return day
      },
      month() {
        const {
          month
        } = getDayMonthyear(this.entry.date)
        return month
      },
      yearDay() {
        const {
          yearDay
        } = getDayMonthyear(this.entry.date)
        return yearDay
      },
    },
    methods: {
      ...mapActions('journal',['updateEntry','createEntry','deleteEntry']),
      loadEntry() {
        let entry;
        if (this.id === 'new') {
          entry = {
            text:'',
            date: new Date().toString()
          }
        }else{
          entry = this.getEntryByID(this.id)
          if (!entry) return this.$router.push({ name: 'no-entry' })
        }
        
        this.entry = entry
      },
      async saveEntry(){
        new Swal({
            title:'Espere por favor',
            allowOutsideClick: false
          })
          Swal.showLoading()
          const picture = await uploadImage( this.file)
          this.entry.picture = picture
        if(this.entry['id']){
          //actualizar entrada
          await this.updateEntry(this.entry)
        }else{
          //crear una nueva entrada
          const id = await  this.createEntry(this.entry)
          this.$router.push({name:'entry', params:{id}})
        }
        this.file = null
        this.localImage = null
        Swal.fire('Guardado','Entrada registrada con existo','success')
        
      },
      async onDeleteEntry(){
        const {isConfirmed} = await Swal.fire({
          title: '¿Está seguro?',
          text: 'Una cez borrado, no se puede recuperar',
          showDenyButton: true,
          confirmButtonText:'Confirmar',
          denyButtonText:'Cancelar'
        })
        
        if (isConfirmed) {
          Swal.showLoading()
          await this.deleteEntry(this.entry.id)
          this.$router.push({name:'no-entry'})
          Swal.fire('Eliminado','','success')
        }
      },
      onSelectedImage(event){
        const file = event.target.files[0]
        if(!file) {
          this.localImage = null
          this.file = null
          return
        }
        const fr = new FileReader()
        fr.onload = () => this.localImage = fr.result
        fr.readAsDataURL(file)
        this.file = file
      },
      onSelectImage(){
          this.$refs.imagenSelector.click()
      }
    },
    created() {
      this.loadEntry( )
    },

    watch: {
      id() {
        this.loadEntry()
      }
    }
  }
</script>

<style lang="scss" scoped>
  textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
      outline: none;
    }
  }

  img {
    max-height: 100px;
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>