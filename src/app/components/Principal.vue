<template>
 <div> 
    <div class="row">
      <div class="container-fluid"> 
       <button class="btn btn-light" style="width:100px"><router-link to="/register">Registrar</router-link></button>
      </div>
      <div class="container-fluid">   
        <button class="btn btn-light" style="width:100px"><router-link to="/login">Loguear    </router-link></button>
      </div>    
    </div>
    <router-view class="view"></router-view>
 </div>
</template>

<script>
export default {
  name: 'principal',
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
  }
}
</script>
