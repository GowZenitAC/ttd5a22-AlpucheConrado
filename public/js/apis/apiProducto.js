var ruta = document.querySelector("[name=route]").value;

var apiProducto = ruta + '/apiProducto';  

new Vue({
    http: {
        headers: {
          'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
        }
      },
      el:"#producto",

      data:{
          productos:[],
          nombre:'',
          precio:'',
          cantidad:'',
          agregando:true,
          sku:'',
          buscar:''
      },

      //Cuando se cree la pagina
      created:function(){
        this.obtenerProductos();
      },

      methods:{
        obtenerProductos:function(){
          this.$http.get(apiProducto).then(function(json){
            this.productos=json.data;
          }).catch(function(json){
            console.log(json);
          });
        },
        mostrarModal:function(){
          this.agregando=true;
          this.nombre='';
          this.precio='';
          this.cantidad=''; 
          this.sku='';
          $('#modalMascota').modal('show');
        },
        guardarProducto:function(){

          //Se prepara los datos del json para enviarlos al controlador
          var producto = {
            sku:this.sku,
            nombre:this.nombre,
            precio:this.precio,
            cantidad:this.cantidad,
          };

          //se envian los datos dados anteriormente y se envian en formato json al controlador
          this.$http.post(apiProducto, producto).then(function(json){
            this.obtenerProductos();
            this.sku;
            this.nombre;
            this.precio;
            this.cantidad;
          }).catch(function(json){
            console.log(json);
          })

          $('#modalMascota').modal('hide');
        },

        eliminarProducto:function(id){
          var confir = confirm('Esta seguro de eliminar la mascota?');
          
          if (confir)
          {
            this.$http.delete(apiProducto + '/' + id).then(function(json){
              this.obtenerProductos();
            }).catch(function(json){
    
            });
          }
        },
    

        editandoProducto:function(id){
          this.agregando=false;
          this.sku=id;

          this.$http.get(apiProducto + '/' + id).then(function(json){
            this.nombre=json.data.nombre;
            this.precio=json.data.precio;
            this.cantidad=json.data.cantidad;
          });

          $('#modalMascota').modal('show');
        },
        
        actualizarProducto:function(){

          var jsonProducto = {
            nombre:this.nombre,
            precio:this.precio,
            cantidad:this.cantidad,
            sku:this.sku,
          };

          this.$http.patch(apiProducto + '/' + this.sku ,jsonProducto).then(function(json){
            this.obtenerProductos();
          });

          $('#modalMascota').modal('hide');
        }

      },
      //FIN DE METHODS
      computed:{
        filtroProducto:function(){
          return this.productos.filter((producto)=>{
            return producto.nombre.toLowerCase().match(this.buscar.toLowerCase().trim()) 
    
          });
        }
      }
})