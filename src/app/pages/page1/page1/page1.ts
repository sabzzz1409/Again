import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../../shared/services/api';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-page1',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './page1.html',
  styleUrl: './page1.scss',
})
export class Page1 {
  public pageForm!: FormGroup;

  public tableRows: any = [
    {
      displayName: 'test 1',
      type: 'main',
      submodules: [
        {
          displayName: 'stest 1',
          elements: [
            {
              type: 'form',
              fields: [
                {
                  label: 'Text Data',
                  key: 'textData',
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                },
              ],
            },
            {
              type: 'cards',
              fields: [
                {
                  label: 'Total',
                  key: 'total',
                  actions: [
                    {
                      act: 'click',
                    },
                    {
                      act: 'drag',
                    },
                  ],
                },
                {
                  label: 'Today',
                  key: 'today',
                  actions: [
                    {
                      act: 'click',
                    },
                    {
                      act: 'drag',
                    },
                  ],
                },
              ],
            },
            {
              type: 'table',
              fields: [
                {
                  label: 'S.No',
                  key: '$index',
                },
                {
                  label: 'Text Data',
                  key: 'textData',
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      displayName: 'test 2',
      type: 'sub',
      submodules: [
        {
          displayName: 'test 2.1',
          elements: [
            {
              type: 'form',
              fields: [
                {
                  label: 'Text Data',
                  key: 'textData',
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                },
              ],
            },
            {
              type: 'cards',
              fields: [
                {
                  label: 'Total',
                  key: 'total',
                  actions: [
                    {
                      act: 'click',
                    },
                    {
                      act: 'drag',
                    },
                  ],
                },
                {
                  label: 'Today',
                  key: 'today',
                  actions: [
                    {
                      act: 'click',
                    },
                    {
                      act: 'drag',
                    },
                  ],
                },
              ],
            },
            {
              type: 'table',
              fields: [
                {
                  label: 'S.No',
                  key: '$index',
                },
                {
                  label: 'Text Data',
                  key: 'textData',
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                },
              ],
            },
          ],
        },
        {
          displayName: 'test 2.2',
          elements: [
            {
              type: 'form',
              fields: [
                {
                  label: 'Text Data',
                  key: 'textData',
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                },
              ],
            },
            {
              type: 'cards',
              fields: [
                {
                  label: 'Total',
                  key: 'total',
                  actions: [
                    {
                      act: 'click',
                    },
                    {
                      act: 'drag',
                    },
                  ],
                },
                {
                  label: 'Today',
                  key: 'today',
                  actions: [
                    {
                      act: 'click',
                    },
                    {
                      act: 'drag',
                    },
                  ],
                },
              ],
            },
            {
              type: 'table',
              fields: [
                {
                  label: 'S.No',
                  key: '$index',
                },
                {
                  label: 'Text Data',
                  key: 'textData',
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  constructor(private fb: FormBuilder) {
    this.pageForm = this.fb.group({});

    this.tableRows.forEach((piece: any) => {
      piece.submodules.forEach((part: any) => {
        part.elements.forEach((pack: any) => {
          pack.fields.forEach((parcel: any) => {
            parcel.rowspan = parcel?.actions?.length || 1;
          });
          pack.rowspan = pack.fields.reduce((acc: any, item: any) => acc + item.rowspan, 0);
        });
        part.rowspan = part.elements.reduce((acc: any, item: any) => acc + item.rowspan, 0);
      });
      piece.rowspan = piece.submodules.reduce((acc: any, item: any) => acc + item.rowspan, 0);
      console.log(piece);
    });
  }
}
