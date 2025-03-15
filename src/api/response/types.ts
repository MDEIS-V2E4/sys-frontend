// src/types.ts

export interface Fabricante {
  id: number;
  sku_fabricante: string;
  nombre_fabricante: string;
}

export interface Proveedor {
  id: number;
  sku_proveedor: string;
  nombre_proveedor: string;
}

export interface GrupoProducto {
  id: number;
  cod_grupo_producto: string;
  nombre_grupo_producto: string;
}

export interface UnidadMedida {
  id: number;
  unidad: string;
}

export interface Producto {
  sku: string;
  nombre: string;
  nombre_xtranjero?: string;
  cod_grupo_producto: string;
  id_fabricante: number;
  id_proveedor: number;
  peso: number;
  id_unidad_medida: number;
  precio_lista: number;
  cod_barra?: string;
  sku_alternante?: string;
}

export interface Client {
  id: number;
  name: string;
  ci_nit: string;
  document_type: string;
  email: string;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  hire_date: string; 
  job_title?: string;
  salary?: number;
  department_id?: number;
  manager_id?: number | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
  department_name:string;
  manager_name:string;
}
