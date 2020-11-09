<template>

  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/" style="text-align:center">e-volution</a>
    </nav>
    <div class="container hello">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="Login">
                <div class="form-group">
                  <input type="email" v-model="user.email" class="form-control" placeholder="Correo">
                </div>
                <div class="form-group">
                  <input type="password" v-model="user.password1" class="form-control" placeholder="Contraseña">
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary">Ingresar</button>
                </div>
              </form>
            </div>
          </div>
          <div class="card ">
             <a class="btn btn-button "> <router-link to="/register">No te encuentras registrado ? aqui</router-link></a>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
class User {
  constructor(email = '',password1 = '') {
    this.email = email;
    this.password1 = password1;
  }
}

export default {
  name: 'login',
  data() {
    return {
     user:new User()
    }
  },
  created() {
    var token = this.$cookies.get("token");
    if(token != null){
      this.$router.push({ name: 'task'});  
    }
  },
  methods: {
    Login() {
        fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(this.user),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
            .then(res => res.json())
            .then(data => {
              if(data.ok){
                console.log("login id");
                console.log(data.usuario._id);
                this.$cookies.set("token",data.token); 
                this.$cookies.set("_id",data.usuario._id); 
                try {
                    this.$router.push('/task');
                } catch (error) {
                    console.log("error");
                    console.log(error);
                 if (!(error instanceof NavigationDuplicated)) {
                    throw error;
                 }
                }
              }
             console.log(data);
            });
    }
  }
}
</script>
<!--
<style lang="css">
  .hello{
    background-color:red;
  }
  h3{
    margin: 1em 0;
  }
</style>-->