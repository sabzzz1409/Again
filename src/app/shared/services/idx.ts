import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class Idx {
  private db!: Dexie;
  private dbName = 'MyDb';
  private currentSchema: { [table: string]: string } = {};
  private version = 1;
  // initiate DB
  initDb(schema: { [table: string]: string }) {
    if (this.db) {
      console.warn('DB already initialized, skipping init.');
      return; // DB already exists, no need to init again
    }
    this.currentSchema = { ...schema };
    this.db = new Dexie(this.dbName);
    this.db.version(1).stores(this.currentSchema);
    this.db.open().catch(console.error);
  }
  // initiate table
  tableInit(table: string, schema: string) {
    this.currentSchema[table] = schema;
    this.db.close();
    this.db = new Dexie(this.dbName);

    this.db.version(this.version).stores(this.currentSchema);
  }
  // drop table
  async dropTable(table: string) {
    delete this.currentSchema[table];

    await this.db.delete();

    this.db = new Dexie(this.dbName);
    this.version++;
    this.db.version(this.version).stores(this.currentSchema);
  }
  // drop db
  async dropDb() {
    await this.db.delete();
  }

  // Create
  async create(table: string, data: any | any[]) {
    if (!this.db) throw new Error('DB not initialized');

    this.db.open();
    if (!this.db.tables.find((t) => t.name === table)) {
      console.warn(`Table "${table}" missing! Creating it now.`);
      this.tableInit(table, '++id, displayName, type'); // or dynamic schema
    }

    const t = this.db.table(table);
    return Array.isArray(data) ? await t.bulkAdd(data) : await t.add(data);
  }

  async read(table: string, query?: any) {
    if (!this.db) throw new Error('DB not initialized');
    const t = this.db.table(table);

    // get all
    if (!query) return await t.toArray();

    // get by id
    if (typeof query === 'number') {
      return await t.get(query);
    }

    // object query (safe way)
    if (typeof query === 'object') {
      return await t
        .filter((item) => Object.keys(query).every((key) => item[key] === query[key]))
        .toArray();
    }

    throw new Error('Invalid query');
  }
  // Update
  async update(table: string, idOrData: any, data?: any) {
    if (!this.db) throw new Error('DB not initialized');
    const t = this.db.table(table);

    if (Array.isArray(idOrData)) {
      return await t.bulkPut(idOrData);
    }

    return await t.update(idOrData, data);
  }

  // Delete
  async delete(table: string, idOrArray?: any) {
    if (!this.db) throw new Error('DB not initialized');
    const t = this.db.table(table);

    if (!idOrArray) return await t.clear();

    if (Array.isArray(idOrArray)) {
      return await Promise.all(idOrArray.map((id) => t.delete(id)));
    }

    return await t.delete(idOrArray);
  }
}
