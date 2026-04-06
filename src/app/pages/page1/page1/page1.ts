import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page1',
  imports: [FormsModule],
  templateUrl: './page1.html',
  styleUrl: './page1.scss',
})
export class Page1 {
  @ViewChildren('editInput') inputs!: QueryList<ElementRef>;
  // 5 TIER DESIGN

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
                  actions: [{}],
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                  actions: [{}],
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
                  actions: [{}],
                },
                {
                  label: 'Text Data',
                  key: 'textData',
                  actions: [{}],
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                  actions: [{}],
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
                  actions: [{}],
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                  actions: [{}],
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
                  actions: [{}],
                },
                {
                  label: 'Text Data',
                  key: 'textData',
                  actions: [{}],
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                  actions: [{}],
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
                  actions: [{}],
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                  actions: [{}],
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
                  actions: [{}],
                },
                {
                  label: 'Text Data',
                  key: 'textData',
                  actions: [{}],
                },
                {
                  label: 'Number Data',
                  key: 'numData',
                  actions: [{}],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  private selectedData: any;
  public editData: any;
  private prevKey: any;

  constructor() {
    this.setTable();
  }

  private setTable() {
    this.tableRows.forEach((piece: any) => {
      piece.submodules.forEach((part: any) => {
        part.elements.forEach((pack: any) => {
          pack.fields.forEach((parcel: any) => {
            parcel?.actions?.forEach((perk: any) => {
              perk.edit = false;
            });
            parcel.rowspan = parcel?.actions?.length || 1;
            parcel.edit = false;
          });
          pack.rowspan = pack.fields.reduce((acc: any, item: any) => acc + item.rowspan, 0);
          pack.edit = false;
        });
        part.rowspan = part.elements.reduce((acc: any, item: any) => acc + item.rowspan, 0);
        part.edit = false;
      });
      piece.rowspan = piece.submodules.reduce((acc: any, item: any) => acc + item.rowspan, 0);
      piece.edit = false;
    });
  }

  editAction(i = -1, j = -1, k = -1, l = -1, m = -1) {
    let key;

    this.setTable();

    console.log(i, j, k, l, m);
    const module = i > -1 ? this.tableRows[i] : null;
    const submodule = j > -1 ? module.submodules[j] : null;
    const element = k > -1 ? submodule.elements[k] : null;
    const field = l > -1 ? element.fields[l] : null;
    const action = m > -1 ? field.actions[m] : null;

    if (action) {
      action.edit = !action.edit;
      this.selectedData = action;
      this.editData = action?.act;
      key = 'act';
    } else {
      if (field) {
        field.edit = !field.edit;
        this.selectedData = field;
        this.editData = field.label;
        key = 'label';
      } else {
        if (element) {
          element.edit = !element.edit;
          this.selectedData = element;
          this.editData = element.type;
          key = 'type';
        } else {
          if (submodule) {
            submodule.edit = !submodule.edit;
            this.selectedData = submodule;
            this.editData = submodule.displayName;
            key = 'displayName';
          } else {
            if (module) {
              module.edit = !module.edit;
              this.selectedData = module;
              this.editData = module.displayName;
              key = 'displayName';
            } else {
              this.setTable();
              this.selectedData[this.prevKey] = this.editData;
              this.selectedData = null;
              this.editData = null;
              key = null;
            }
          }
        }
      }
    }

    setTimeout(() => {
      this.inputs?.last?.nativeElement?.focus();
    });

    this.prevKey = key;
    console.log(this.selectedData);
  }

  addItem(i = -1, j = -1, k = -1, l = -1, m = -1) {
    let key;

    this.setTable();

    console.log(i, j, k, l, m);
    const module = i > -1 ? this.tableRows[i] : null;
    const submodule = j > -1 ? module.submodules[j] : null;
    const element = k > -1 ? submodule.elements[k] : null;
    const field = l > -1 ? element.fields[l] : null;
    const action = m > -1 ? field.actions[m] : null;

    if (action) {
      field.actions.push({
        act: 't',
        edit: true,
      });
      this.selectedData = action;
      this.editData = action?.act;
      key = 'act';
    } else {
      if (field) {
        element.fields.push({
          label: '',
          edit: true,
          actions: [{}],
        });
        this.selectedData = field;
        this.editData = field.label;
        key = 'label';
      } else {
        if (element) {
          submodule.elements.push({
            edit: true,
            type: '',
            elements: [
              {
                type: '',
                fields: [
                  {
                    type: '',
                    actions: [{}],
                  },
                ],
              },
            ],
          });
          this.selectedData = element;
          this.editData = element.type;
          key = 'type';
        } else {
          if (submodule) {
            module.submodules.push({
              edit: true,
              displayName: '',
              elements: [
                {
                  type: '',
                  elements: [
                    {
                      type: '',
                      fields: [
                        {
                          type: '',
                          actions: [{}],
                        },
                      ],
                    },
                  ],
                },
              ],
            });
            this.selectedData = submodule;
            this.editData = submodule.displayName;
            key = 'displayName';
          } else {
            if (module) {
              this.tableRows.push({
                displayName: '',
                edit: true,
                submodules: [
                  {
                    displayName: '',
                    elements: [
                      {
                        type: '',
                        elements: [
                          {
                            type: '',
                            fields: [
                              {
                                type: '',
                                actions: [{}],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              });
              this.selectedData = module;
              this.editData = module.displayName;
              key = 'displayName';
            } else {
              this.setTable();
              this.selectedData[this.prevKey] = this.editData;
              this.selectedData = null;
              this.editData = null;
              key = null;
            }
          }
        }
      }
    }

    setTimeout(() => {
      this.inputs?.last?.nativeElement?.focus();
    });

    this.prevKey = key;
    this.setTable();
    console.log(this.tableRows);
  }

  keyHandle(ev: any) {
    if (ev.key == 'Enter') {
      this.editAction();
    }
  }
}
