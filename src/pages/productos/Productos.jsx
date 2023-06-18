/* eslint-disable prefer-destructuring */
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from '@/components/Page';
import Iconify from '@/components/Iconify';
import useAxios from 'hooks/useAxios';
import Axios from 'apis';
import DataTable from '@/components/dataTable/DataTable';
import { COLUMNS_TABLE } from '@/constants/dataTable';
import { toast, ToastContainer } from 'react-toastify';
import { getBOBCurrency } from '@/utils/dataHandler';

const buttonsActions = { edit: true, remove: true };
const columnsPdf = ['N°', 'Nombre', 'Stock', 'Precio de compra', 'Precio de venta', 'fecha de vencimiento'];
export default function Productos() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const [optionsReportPDF, setOptionsReportPDF] = useState({});
  const [optionsReportCSV, setOptionsReportCSV] = useState({
    data: [],
    header: [],
  });

  const headerCSV = [
    {
      label: 'N°',
      key: 'n',
    },
    {
      label: 'Nombre',
      key: 'nombre',
    },
    {
      label: 'Stock',
      key: 'stock',
    },
    {
      label: 'Precio de compra',
      key: 'fechaCompra',
    },
    {
      label: 'Precio de venta',
      key: 'precioVenta',
    },
    {
      label: 'fecha de vencimiento',
      key: 'fechaVencimiento',
    },
  ];

  useEffect(() => {
    if (!resGet.length) return;

    const dataPDF = resGet.map(({ nombre, stock, precioVenta, precioCompra, fechaVencimiento }, index) => [
      index + 1,
      nombre,
      stock,
      getBOBCurrency(precioCompra),
      getBOBCurrency(precioVenta),
      new Date(fechaVencimiento).toLocaleDateString(),
    ]);

    setOptionsReportPDF({
      columns: columnsPdf,
      data: dataPDF,
      logo: {
        src: 'public/static/gym-logo.png',
        type: 'PNG', // optional, when src= data:uri (nodejs case)
        width: 25, // aspect ratio = width/height
        height: 13.66,
        margin: {
          top: 0, // negative or positive num, from the current position
          left: 0, // negative or positive num, from the current position
        },
      },
      stamp: {
        inAllPages: true, // by default = false, just in the last page
        src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
        type: 'JPG', // optional, when src= data:uri (nodejs case)
        width: 20, // aspect ratio = width/height
        height: 20,
        margin: {
          top: 0, // negative or positive num, from the current position
          left: 0, // negative or positive num, from the current position
        },
      },
      business: {
        name: 'Gimnacio',
      },
    });

    const dataCSV = resGet.map(({ nombre, stock, precioVenta, precioCompra, fechaVencimiento }, index) => ({
      n: index + 1,
      nombre,
      stock,
      precioCompra: getBOBCurrency(precioCompra),
      precioVentas: getBOBCurrency(precioVenta),
      fechaVencimiento: new Date(fechaVencimiento).toLocaleDateString(),
    }));

    console.log('TCL: Productos -> dataCSV', dataCSV);
    setOptionsReportCSV({
      data: dataCSV,
      header: headerCSV,
    });
  }, [resGet]);

  useEffect(() => {
    let message;
    if (location.state?.message) {
      message = location.state.message;
      navigate(location.pathname, { replace: true });
    }
    // if (!Array.isArray(resDelete) && !errorDelete) {
    //   message = resDelete?.message;
    //   setResGet(resGet.filter((item) => item.id !== resDelete.id));
    // }

    // if (Array.isArray(resDelete) && errorDelete) {
    //   message = errorDelete.message;
    //   severity = 'error';
    //   setErrorDelete(null);
    // }

    if (message) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    // setOpenDialog(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: '/api/v1/productos',
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Productos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Productos
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/productos/nuevo"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nuevo producto
          </Button>
        </Stack>
        <DataTable
          columns={COLUMNS.productos}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={buttonsActions}
          orderByDefault="nombre"
          minStock={3}
          generateReports
          dataToReportsPdf={optionsReportPDF}
          dataToReportsCSV={optionsReportCSV}
        />
        <ToastContainer draggablePercent={60} />
      </Container>
    </Page>
  );
}
