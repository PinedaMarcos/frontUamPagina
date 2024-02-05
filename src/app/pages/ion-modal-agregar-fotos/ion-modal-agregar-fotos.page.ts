import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImagenesService} from '../../services/imagenes.service'


@Component({
  selector: 'app-ion-modal-agregar-fotos',
  templateUrl: './ion-modal-agregar-fotos.page.html',
  styleUrls: ['./ion-modal-agregar-fotos.page.scss'],
})
export class IonModalAgregarFotosPage implements OnInit {

  public agregar: FormGroup;
  public selectedFile: File;

  constructor(private FormBuilder: FormBuilder, private http: HttpClient,private imagenesService: ImagenesService) {

  }

  ngOnInit(): void {
    this.agregar = this.FormBuilder.group({
      nombreCientifico: ['', [Validators.required]],
      nombreColoquial: ['', [Validators.required]],
      Autor: ['', [Validators.required]],
      Imagen: [null, [Validators.required]],
      campoRequerido: [null, [Validators.required]],
    });
  }
  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  send(): void {
    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('nombreCientifico', this.agregar.value.nombreCientifico);
      formData.append('nombreColoquial', this.agregar.value.nombreColoquial);
      formData.append('autor', this.agregar.value.Autor);
      const campoRequeridoValue = (this.agregar.value.campoRequerido === 'Flora') ? 1 : 0;
      formData.append('campoRequerido', campoRequeridoValue.toString());
      if (this.selectedFile) {
        this.imagenesService.uploadImage(this.selectedFile).subscribe(
          (imgbbResponse) => {
            const imageUrl = imgbbResponse.data.display_url;
            formData.append('imgbbUrl', imageUrl);
            const backendURL = 'http://localhost:3902/api/crearDato';
            this.http.post(backendURL, formData)
              .subscribe((response) => {
                console.log('Datos guardados con éxito', response);
                // Puedes realizar acciones adicionales después de guardar los datos
              }, (error) => {
                console.error('Error al guardar los datos', error);
              });
          },
          (error) => {
            console.error('Error al cargar la imagen', error);
          }
        );
      } else {
        console.error('No se ha seleccionado ninguna imagen');
      }

    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }
}
