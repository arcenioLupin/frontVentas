import { customAxios, FDV_URL } from '../constants';

export default function(codCliente, numFichaVta) {
  const config = {
    params: {
      codAreaVta: '001',
      codCia: '06',
      codCliente,
      codVendedor: '50',
      numFichaVta,
    },
  };

  return customAxios.get(`${FDV_URL}/ficha-venta/fichas-venta/validar-cliente`, config)
              .then(response => response.data);
}
