import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ]
})
export class RichTextEditorComponent implements OnInit, ControlValueAccessor {

  editorData = `<h3></h3>`;
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() { }

  ngOnInit() {
  }

  onContentChanged() {
    this.onChange(this.editorData);
    this.onTouch();
  }

  onSelectionChanged() {
    this.onTouch();
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.editorData = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    // Mettez en œuvre la logique pour activer ou désactiver le composant en fonction de l'état fourni
  }

}
