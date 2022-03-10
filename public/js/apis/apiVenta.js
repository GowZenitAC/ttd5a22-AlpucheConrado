

var ruta = document.querySelector("[name=route]").value;

var apiProd=ruta + '/apiProducto';

new Vue({


	http: {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
      }
    },

	el:"#apiVenta",

	data:{
		prueba:'HOLA MUNDO',
		sku:'',
		producto:[],
		ventas:[],		
		cantidades:[1,1,1,1,1,1,1,1,1],
		auxSubTotal:0,
		frase:'Hola mundo',
		alineacion:'center',
		pagara_con:''
	},

	// // AL CREARSE LA PAGINA
	// created:function(){
	// 	this.obtenerMascotas();
	// 	this.obtenerEspecies();
	// },

	methods:{
		buscarProducto:function(){
			// console.log('HOLA');
			var encontrado = 0;
			var producto={};
			//rutina de busqueda
			for (var i=0;i<this.ventas.length;i++){
				console.log(this.ventas[i].sku);
				if(this.sku==this.ventas[i].sku)
				{
					encontrado=1;
					this.cantidades[i]++;
					this.ventas[i].cantidad++;
					this.sku='';
					break;
				}
					
			}

			//fin de busqueda
			//INICIO GET DE LA PETICION AJAX
			console.log(encontrado);
			if(encontrado === 0)
			// alert('HOLA');
			this.$http.get(apiProd + '/' + this.sku).then(function(j){
				this.producto=j.data;

				producto={sku: j.data.sku,
						 nombre:j.data.nombre,
						 precio:j.data.precio,
						cantidad:1,
					    total:j.data.precio_venta,
						foto:'prods/' + j.data.foto,
					};

				if (this.producto)
					this.ventas.push(producto);
				this.sku="";
			})
			//FIN DE LA PETICION	
		},

		eliminarProducto:function(id){
			this.ventas.splice(id,1);
		},
		mostrarCobro:function(){


		$('#modalCobro').modal('show');
	},
},
		
	// FIN DE METHODS



	// INICIO COMPUTED
	computed:{
		totalProducto(){
			return (id)=>{
				 var total =0;
				total=this.ventas[id].precio*this.cantidades[id];

				// Actualizo el total del producto en el array ventas
				this.ventas[id].total=total;
				// Actulizo la cantidad en el array ventas
				this.ventas[id].cantidad=this.cantidades[id];

				return total.toFixed(1);
				
			}


		},
		// Fin de TotalProducto

		subTotal(){
			
			 var total=0;
			 			
			for (var i = this.ventas.length - 1; i >= 0; i--) {
				total=total+this.ventas[i].total;

			}
			// Mando una copia del subTotal a la seccion del data
			//  para el uso de otros calculos
			this.auxSubTotal=total.toFixed(1);		 
			 return total.toFixed(1);
			},
		
		iva(){
			var auxIva=0;
			auxIva = this.auxSubTotal*0.16;
			return auxIva.toFixed(1);
		},

		granTotal(){
			var auxTotal=0;
			auxTotal=this.auxSubTotal*1.16;
			return auxTotal.toFixed(1);
		},

		noArticulos(){
			var acum=0;
			for (var i = this.ventas.length - 1; i >= 0; i--) {
				acum=acum+this.ventas[i].cantidad;
			}
			return acum;
		},
		cambio(){
			var camb=0;
			var camb=this.pagara_con-this.granTotal;
			camb=camb.toFixed(1);
			return camb;
		}	
		
		

		
	}
	// FIN DE COMPUTED



});