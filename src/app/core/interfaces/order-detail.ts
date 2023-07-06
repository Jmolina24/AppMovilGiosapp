export interface OrderDetail {
	iddetalleorden: number;
	idorden: number;
	tipoorden: string;
	idclientesede: number;
	cliente: string;
	clientesede: string;
	direccion_sede: string;
	contacto_sede: string;
	telefono_sede: string;
	correo_destino: string;
	fecha: string;
	fechaentrega: string;
	horaentrega: string;
	idservicio: number;
	idterceroservicio: number;
	servicio: string;
	referencia: string;
	cantidad: number;
	precio_compra: number;
	precio_venta: number;
	unidadmedida: string;
	idtercero: number;
	tercero: string;
	idciudadservicio: number;
	ciudadservicio: string;
	iddepartamentoservicio: number;
	deptoservicio: string;
	observacion: string;
	estado: string;
	codigoestado: string;
}