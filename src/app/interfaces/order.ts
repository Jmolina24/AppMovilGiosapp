export interface Order {
	idorden: number;
	idtipoorden: number;
	tipoorden: string;
	idclientesede: number;
	cliente: string;
	idcliente: number;
	clientesede: string;
	fecha: string;
	fechaentrega: string;
	horaentrega: string;
	observacion: string;
	idmotivorechazo: number | null;
	motivorechazo: string | null;
	estado: string;
	codigoestado: string;
	fecharegistro: string;
	fechaactualizacion: string | null;
	idusuarioregistra: number;
	idusuarioactualiza: number | null;
	usuarioregistra: string;
	usuarioactualiza: string | null;
}
