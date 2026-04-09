import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Idx } from '../../../shared/services/idx';

type Iaction = {
  act?: string;
  edit?: boolean;
  rowspan?: number;
  colspan?: number;
};

type Ifield = {
  label: string;
  key: string;
  actions: Iaction[];
  edit?: boolean;
  rowspan?: number;
  colspan?: number;
};

type Ielement = {
  type: string;
  fields: Ifield[];
  edit?: boolean;
  rowspan?: number;
  colspan?: number;
};

type IsubModule = {
  displayName: string;
  route: string;
  iconName: string;
  elements: Ielement[];
  edit?: boolean;
  rowspan?: number;
  colspan?: number;
};

type IModule = {
  displayName: string;
  type: 'main' | 'sub';
  route: string;
  iconName: string;
  submodules: IsubModule[];
  edit?: boolean;
  rowspan?: number;
  colspan?: number;
};

@Component({
  selector: 'app-page1',
  imports: [FormsModule],
  templateUrl: './page1.html',
  styleUrl: './page1.scss',
})
export class Page1 {
  @ViewChildren('editInput') inputs!: QueryList<ElementRef>;
  // 5 TIER DESIGN

  public tableRows: IModule[] = [];
  public editData: string | undefined | null;
  public prevKey: string | null = null;

  private selectedData: any = {};

  constructor(
    private idb: Idx,
    private cdr: ChangeDetectorRef,
  ) {
    this.idb.initDb({
      modules: '++id, displayName, type',
    });
    this.loadData();
  }

  private async loadData(mode: 'offline' | 'online' = 'offline') {
    console.log(mode);
    if (mode == 'offline') {
      try {
        const rows = await this.idb.read('modules');
        if (rows.length) {
          this.tableRows = rows;
          console.log(rows);
          this.setTable();
          this.cdr.detectChanges();
        }
      } catch (err) {
        console.error(err);
        console.warn('No modules table found yet. Starting fresh.');
      }
    }
  }

  // add data C
  public addItem(i = -1, j = -1, k = -1, l = -1, m = -1) {
    let key: 'displayName' | 'type' | 'label' | 'act' | null;

    this.setTable();

    console.log(i, j, k, l, m);
    const module: IModule | null = i > -1 ? this.tableRows[i] || {} : null;
    const submodule: IsubModule | null | undefined = j > -1 ? module?.submodules[j] : null;
    const element: Ielement | null | undefined = k > -1 ? submodule?.elements[k] : null;
    const field: Ifield | null | undefined = l > -1 ? element?.fields[l] : null;
    const action: Iaction | null | undefined = m > -1 ? field?.actions[m] : null;

    if (action) {
      field?.actions.splice(m + 1, 0, {
        act: '',
        edit: true,
      });
      this.selectedData = action;
      this.editData = action?.act;
      key = 'act';
    } else {
      if (field) {
        element?.fields.splice(l + 1, 0, {
          label: '',
          key: '',
          edit: true,
          actions: [{}],
        });
        this.selectedData = field;
        this.editData = field.label;
        key = 'label';
      } else {
        if (element) {
          submodule?.elements.splice(k + 1, 0, {
            edit: true,
            type: '',
            fields: [
              {
                label: '',
                key: '',
                actions: [{}],
              },
            ],
          });
          this.selectedData = element;
          this.editData = element.type;
          key = 'type';
        } else {
          if (submodule) {
            module?.submodules.splice(j + 1, 0, {
              edit: true,
              displayName: '',
              route: '',
              iconName: '',
              elements: [
                {
                  type: '',
                  fields: [
                    {
                      label: '',
                      key: '',
                      actions: [{}],
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
              this.tableRows.splice(i + 1, 0, {
                displayName: '',
                edit: true,
                type: 'main',
                route: '',
                iconName: '',
                submodules: [
                  {
                    displayName: '',
                    route: '',
                    iconName: '',
                    elements: [
                      {
                        type: '',
                        fields: [
                          {
                            label: '',
                            key: '',
                            actions: [{}],
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
              if (this.prevKey) this.selectedData[this.prevKey] = this.editData;
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

    const module_: IModule | null =
      i > -1 ? this.tableRows[i + Number(i != -1 && j == -1)] || {} : null;
    const submodule_: IsubModule | null | undefined =
      j > -1 ? module_?.submodules[j + Number(j != -1 && k == -1)] : null;
    const element_: Ielement | null | undefined =
      k > -1 ? submodule_?.elements[k + Number(k != -1 && l == -1)] : null;
    const field_: Ifield | null | undefined =
      l > -1 ? element_?.fields[l + Number(l != -1 && m == -1)] : null;
    const action_: Iaction | null | undefined =
      m > -1 ? field_?.actions[m + Number(m != -1)] : null;

    if (action_) {
      action_.edit = true;
      this.selectedData = action_;
      this.editData = action_?.act;
      key = 'act';
    } else {
      if (field_) {
        field_.edit = true;
        this.selectedData = field_;
        this.editData = field_.label;
        key = 'label';
      } else {
        if (element_) {
          element_.edit = true;
          this.selectedData = element_;
          this.editData = element_.type;
          key = 'type';
        } else {
          if (submodule_) {
            submodule_.edit = true;
            this.selectedData = submodule_;
            this.editData = submodule_.displayName;
            key = 'displayName';
          } else {
            if (module_) {
              module_.edit = true;
              this.selectedData = module_;
              this.editData = module_.displayName;
              key = 'displayName';
            } else {
              this.setTable();
              if (this.prevKey) this.selectedData[this.prevKey] = this.editData;
              this.selectedData = null;
              this.editData = null;
              key = null;
            }
          }
        }
      }
    }
    // console.log(this.tableRows);
  }

  // render table read data R
  private setTable() {
    this.tableRows.forEach((piece: IModule) => {
      piece.submodules.forEach((part: IsubModule) => {
        part.elements.forEach((pack: Ielement) => {
          pack.fields.forEach((parcel: Ifield) => {
            parcel?.actions?.forEach((perk: Iaction) => {
              perk.edit = false;
            });
            parcel.rowspan = parcel?.actions?.length || 1;
            parcel.edit = false;
          });
          pack.rowspan = pack.fields.reduce(
            (acc: number, item: Ifield) => acc + Number(item.rowspan),
            0,
          );
          pack.edit = false;
        });
        part.rowspan = part.elements.reduce(
          (acc: number, item: Ielement) => acc + Number(item.rowspan),
          0,
        );
        part.edit = false;
      });
      piece.rowspan = piece.submodules.reduce(
        (acc: number, item: IsubModule) => acc + Number(item.rowspan),
        0,
      );
      piece.edit = false;
    });
  }

  // edit data U
  public editAction(i = -1, j = -1, k = -1, l = -1, m = -1) {
    let key: 'displayName' | 'type' | 'label' | 'act' | null;

    this.setTable();

    // console.log(i, j, k, l, m);
    const module: IModule | null = i > -1 ? this.tableRows[i] : null;
    const submodule: IsubModule | null | undefined = j > -1 ? module?.submodules[j] : null;
    const element: Ielement | null | undefined = k > -1 ? submodule?.elements[k] : null;
    const field: Ifield | null | undefined = l > -1 ? element?.fields[l] : null;
    const action: Iaction | null | undefined = m > -1 ? field?.actions[m] : null;

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
              if (this.prevKey) this.selectedData[this.prevKey] = this.editData;
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
    // console.log(this.selectedData);
  }

  public keyHandle(ev: KeyboardEvent) {
    if (ev.key == 'Enter') {
      this.editAction();
      this.idb.dropTable('modules');
      this.saveData();
    }
  }

  // delete data D
  public remove(i = -1, j = -1, k = -1, l = -1, m = -1) {
    this.setTable();

    // console.log(i, j, k, l, m);
    const module: IModule | null = i > -1 ? this.tableRows[i] : null;
    const submodule: IsubModule | null | undefined = j > -1 ? module?.submodules[j] : null;
    const element: Ielement | null | undefined = k > -1 ? submodule?.elements[k] : null;
    const field: Ifield | null | undefined = l > -1 ? element?.fields[l] : null;
    const action: Iaction | null | undefined = m > -1 ? field?.actions[m] : null;

    if (action && field && field.actions.length - 1) {
      field.actions.splice(m, 1);
    } else {
      if (field && element && element.fields.length - 1) {
        element.fields.splice(l, 1);
      } else {
        if (element && submodule && submodule.elements.length - 1) {
          submodule.elements.splice(k, 1);
        } else {
          if (submodule && module && module.submodules.length - 1) {
            module.submodules.splice(j, 1);
          } else {
            if (module) {
              this.tableRows.splice(i, 1);
            }
          }
        }
      }
    }

    this.setTable();
    this.saveData();
  }

  // save
  private async saveData() {
    try {
      await this.idb.dropTable('modules');
      await this.idb.create('modules', this.tableRows); // auto-creates table if missing
      console.log('Data saved!');
    } catch (err) {
      console.error('Failed to save data:', err);
    }
  }

  // post
  public register() {
    console.log(this.tableRows);
  }

  public addRoute(i: number = -1, j: number = -1) {
    this.setTable();
    const module: IModule | null = i > -1 ? this.tableRows[i] : null;
    const submodule: IsubModule | null | undefined = j > -1 ? module?.submodules[j] : null;

    if (submodule) {
      this.selectedData = submodule;
      this.prevKey = 'route';
      submodule.edit = true;
      this.editData = submodule.route;
    } else {
      if (module) {
        this.selectedData = module;
        this.prevKey = 'route';
        module.edit = true;
        this.editData = module.route;
      }
    }
  }

  public addIcon(i: number = -1, j: number = -1) {
    this.setTable();
    const module: IModule | null = i > -1 ? this.tableRows[i] : null;
    const submodule: IsubModule | null | undefined = j > -1 ? module?.submodules[j] : null;
    if (submodule) {
      this.selectedData = submodule;
      this.prevKey = 'iconName';
      submodule.edit = true;
      this.editData = submodule.iconName;
    } else {
      if (module) {
        this.selectedData = module;
        this.prevKey = 'iconName';
        module.edit = true;
        this.editData = module.iconName;
      }
    }
  }

  public addKey(i: number = -1, j: number = -1, k: number = -1, l: number = -1) {
    this.setTable();
    const module: IModule | null = i > -1 ? this.tableRows[i] : null;
    const submodule: IsubModule | null | undefined = j > -1 ? module?.submodules[j] : null;
    const element: Ielement | null | undefined = k > -1 ? submodule?.elements[k] : null;
    const field: Ifield | null | undefined = l > -1 ? element?.fields[l] : null;
    if (!module || !submodule || !element || !field) return;

    this.selectedData = field;
    field.edit = true;
    this.prevKey = 'key';
    this.editData = field.key;
  }
}
