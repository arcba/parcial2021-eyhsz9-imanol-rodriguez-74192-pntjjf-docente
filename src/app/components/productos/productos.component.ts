import { Component, OnInit } from '@angular/core';
import { Producto, Productos } from '../../models/productos';
import { ProductosService } from '../../services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  Productos: Producto[] = [];
  AccionABMC = 'L';
  submitted = false;
  FormRegistro: FormGroup;

  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...'
  };

  constructor(
    public formBuilder: FormBuilder,
    private productosServices: ProductosService
  ) {}

  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      ProductoID: [0],
      ProductoNombre: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(50)]
      ],
      ProductoStock: [
        null,
        [Validators.required, Validators.pattern('^\\d{1,7}$')]
      ],

      ProductoFechaAlta: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          )
        ]
      ]
    });

    this.iniciarGrillaProductos();
  }

  iniciarGrillaProductos() {
    this.productosServices.get().subscribe((res: Producto[]) => {
      this.Productos = res;
    });
  }

  AgregarProducto() {
    this.AccionABMC = 'A';
    this.submitted = false;
  }

  Grabar() {
    this.submitted = true;
    if (this.FormRegistro.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormRegistro.value };

    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.ProductoFechaAlta.substr(0, 10).split('/');
    if (arrFecha.length == 3)
      itemCopy.ProductoFechaAlta = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    // agregar post
    if (this.AccionABMC == 'A') {
      //this.modalDialogService.BloquearPantalla();
      this.productosServices.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        // this.modalDialogService.Alert('Registro agregado correctamente.');
        this.iniciarGrillaProductos();
        //this.modalDialogService.DesbloquearPantalla();
      });
    }
  }

  Volver() {
    this.AccionABMC = 'L';
  }
}
