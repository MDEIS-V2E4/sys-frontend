export interface ProductRequest {
  sku: string;
  nombre: string;
  nombreExtranjero?: string;
  codGrupoProducto: string;
  idFabricante: number;
  idProveedor: number;
  peso: number;
  idUnidadMedida: number;
  precioLista: number;
  codBarra?: string;
  skuAlternante?: string;
}

export interface ClientRequest {
  id?: number;
  name: string;
  ciNit: string;
  documentType: string;
  email: string;
}

export interface InvoiceRequest {
  clientCode: string;
  payCondition: string;
  total: number;
  productsItem: InvoiceItemRequest[];
}
export interface InvoiceItemRequest {
  id: number;
  name: string;
  quantity: number;
  price: number;
  subTotal: number;
}
