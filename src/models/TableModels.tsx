
export type dataModel = {
    "data": Comercio[],
    "page": number,
    "pages": number,
    "rowPerPage": number,
    "total": number
}

export type Comercio = {
    "ID": string,
    "Comercio": string,
    "CUIT": string,
    "Comercio1": number,
    "Comercio2": number,
    "Comercio3": number,
    "Comercio4": number,
    "Comercio5": number,
    "Comercio6": number,
    "BalanceActual": number,
    "Activo": string,
    "UltimaVenta": string
}