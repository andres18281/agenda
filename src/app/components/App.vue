<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/">Nueva Tarea</a>
      <button class="btn btn-light" v-on:click="Cerrar">Cerrar</button>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input type="text" required v-model="task.title" class="form-control" placeholder="Nombre de tarea">
                </div>
                <div class="form-group">
                 <!-- <v-date-picker no-title v-model="task.dateend" :landscape="landscape" :reactive="reactive" :min="nowDate" :max="getEndDate"></v-date-picker>-->
                  
                  <input type="date" required v-on:keyup="validateEndDate"  v-model="task.dateend" class="form-control" placeholder="Fecha de la actividad">
                </div>
                <div class="form-group"> 
                 <select required v-model="task.nivel" class="form-control">
                   <option v-for="(value,index) in object" v-bind:value="index" :key="index">
                    {{ value.name }}
                   </option>
                 </select>
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Enviar</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Editar</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          
        </div>
      </div>

      <div>
        <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Ver eventos</b-button>
        <b-modal id="bv-modal-example" hide-footer>
          <template #modal-title>
             <code>Eventos</code>
          </template>
          <div class="d-block text-center">
            <h3>Actividades</h3>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Nivel</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="task of tasks" :key="task.id">
                    <td>{{task.title}}</td>
                    <td>{{task.dateend}}</td>
                    <td>{{task.nivel}}</td>
                    <td>
                      <button v-on:click="deleteTask(task._id)" class="btn btn-danger">Borrar</button>
                      <button v-on:click="editTask(task._id);$bvModal.hide('bv-modal-example')" class="btn btn-secondary">Editar</button>
                    </td>
                  </tr> 
                </tbody>
              </table>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Cerrar</b-button>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>

class Task {
  constructor(title = '',nivel = null,dateend = '') {
    this.title = title;
    this.nivel = nivel;
    this.dateend = dateend;
  }
}
 
export default {
  name: 'task',
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      taskToEdit: '',
      idUser:0,
      object:[{"name":"Alto","value":1},{"name":"Medio","value":2},{"name":"Bajo","value":3}],
      //nowDate: moment(new Date()).format('YYYY-MM-DD') ,
      nowDate: new Date().toISOString().slice(0, 10)
    }
  },
  created() {
    var token = this.$cookies.get("token");
    console.log(token);
    if(token == null){
      this.$router.push({ name: 'login'});  
    }else{
      this.task.dateend = new Date().toISOString().slice(0, 10);
      console.log("this.nowDate");
      console.log(this.nowDate);
      this.idUser = this.$cookies.get("_id");
      this.getTasks(this.idUser);
    } 
  },
  computed: {
    getEndDate() {
      var endDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        10
      );
      return endDate.toISOString().slice(0, 10);
    }
  },
  methods: {
     selectedFeature(nivel) {
       this.task.nivel = nivel;
     },
     validateEndDate(data){
        const day = (new Date(data)).getDay();
        console.log(day);
        var res = false;
        if (day==0 || day==6) {
          res = false;
        }else{
          res = true;
        }
        if(!res){
          this.task.dateend = '';
        } 
     },
     sendTask() {
      this.task.idUser =  this.$cookies.get("_id");
      if(this.edit === false) {
        fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify(this.task),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks(this.task.idUser);
            this.task = new Task();
          });
      }
      else {
        fetch('/api/tasks/' + this.taskToEdit, {
          method: 'PUT',
          body: JSON.stringify(this.task),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks(this.task.idUser);
            this.task = new Task();
            this.edit = !this.edit;
          });
      }
    },
    getTasks(id_) {
      fetch('/api/tasks/eventos/'+id_)
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
    },
    deleteTask(taskId) {
      fetch('/api/tasks/' + taskId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
        });
    },
    editTask(taskId) {
      fetch('/api/tasks/' + taskId)
        .then(res => res.json())
        .then(data => { 
          const { _id, title, nivel,dateend } = data;
          this.task = new Task(title, dateend , nivel);
          this.taskToEdit = _id;
          this.edit = true;
          this.selectedFeature(nivel-1);
          this.task.dateend = moment(new Date(dateend)).format('YYYY-MM-DD') 
        });
    },
    Cerrar(){
       this.$cookies.remove("_id");
       this.$cookies.remove("token");
       this.$router.push('/login');
    }   
  }
}
</script>
