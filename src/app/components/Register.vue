<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/" style="text-align:center">e-volution</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="Guardar">
                <div class="form-group">
                  <input type="text" v-model="user.nombre" class="form-control" placeholder="Nombre de usuario">
                </div>
                <div class="form-group">
                  <input type="email" v-model="user.email" class="form-control" placeholder="Correo">
                </div>
                <div class="form-group">
                  <input type="password" v-model="user.password1" class="form-control" placeholder="Contraseña">
                </div>
                <div class="form-group">
                  <input type="password" v-model="user.password2" class="form-control" placeholder="Confirmar Contraseña">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Guardar</button>
                </div>
              </form>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

class User {
  constructor(nombre = '', email = '',password1 = '',password2 = '') {
    this.nombre = nombre;
    this.email = email;
    this.password1 = password1;
    this.password2 = password2;
  }
}

export default {
  name: 'register',
  data() {
    return {
      user:new User()
    }
  },
  created() {
    //this.getTasks();
  },
  methods: {
    Guardar() {
        fetch('/api/register', {
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
                this.Login();
              }
            console.log(data);    
        });
    },
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
