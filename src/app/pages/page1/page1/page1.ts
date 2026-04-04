import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../../shared/services/api';

@Component({
  selector: 'app-page1',
  imports: [ReactiveFormsModule],
  templateUrl: './page1.html',
  styleUrl: './page1.scss',
})
export class Page1 {
  private fb = inject(FormBuilder);
  // private srv = inject(Api);

  public pageForm = this.fb.group({});
  public tableRows = [
    {
      displayName: 'test 1',
      type: 'main',
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
      displayName: 'test 2',
      type: 'main',
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
  ];
}
